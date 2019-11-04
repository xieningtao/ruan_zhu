<template>
  <div id="app">
    <!-- <form>
        <input type="file" multiple id="files">
        <button type="button"  v-on:click="handle()">转换</button>
        <button type="button"  v-on:click="handleDownload()">下载</button>
    </form> -->

    <textarea rows="55" cols="100"  v-model="message" placeholder="输入代码"></textarea>

      <button class="middle_btn" type="button" v-on:click="doTransform()">转换</button>
    <textarea  rows="55" cols="100" readonly="readonly"  v-model="transformResult" placeholder="输入代码"></textarea>
  </div>
</template>

<script>
import { transformFile } from "./ruan_zhu.js";
var FileSaver = require("file-saver");
export default {
  name: "app",
  components: {

  },
  data(){
    return{
      request_name:"",
      message:"",
      transformResult:""
    }
  },
  created:function(){
    this.request_name = Date.parse(new Date())
  },
  methods: {
    handleDownload() {
      this.$http({
        url: "http://localhost:8088/download?mark_name="+this.request_name,
        method: "get",
        responseType: "blob"
      })
        .then(response => {
          this.download(response);
        })
        .catch(error => {});
    },
    //转换
    doTransform(){
        
        // var bufferContent = fs.readFileSync(srcPath);
        var content = this.message;
      
        //移除注释
        var remove_comment_back_splash = /\/\*{1,2}[\s\S]*?\*\//g
        var back_splash_result = content.replace(remove_comment_back_splash, "");
        var remove_double_splash = /\/\/[\s\S]*?\n/g
        var double_splash_result = back_splash_result.replace(remove_double_splash,"")
        var remove_empty = /(?<=\n)\s*?\n/g;
          var remove_empty_result = double_splash_result.replace(remove_empty, "");
        this.transformResult= remove_empty_result;
        var count = remove_empty_result.match(/\n/g).length;
    },
    // 下载文件
    download(res) {
      if (!res) {
        return;
      }
      let blob = new Blob([res.data]);
      let link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "download_1234.docx";
      link.style.display = "block";
      document.body.appendChild(link);
      link.click();
    },
    handle: function() {
      // transformFile()
      let myFiles = document.getElementById("files").files;
      let formdata = new FormData();
      for (var i = 0; i < myFiles.length; i++) {
        formdata.append("file[]", myFiles[i]);
      }
      formdata.append("mark_name",this.request_name);
      this.$http
        .post("http://localhost:8088/tranform", formdata, {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(
          response => {
            // JSON responses are automatically parsed.
            //
            console.log("response: " + response);
          },
          error => {
            //this.errors.push(e)
            console.log("error: " + error);
          }
        );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  margin-left:60px;
  margin-right:60px;
  align-items:center;
}

.middle_btn{
  height:50px;
  width:100px;
}
#left_code{

}
#right_code{
  
}
</style>
