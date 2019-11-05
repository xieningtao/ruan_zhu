<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div class="app_main">
          <div class="app_top">
            <el-image
              class="header_image"
              fit="cover"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            ></el-image>
            <div class="make_action_container">
              <el-button class="make_action" type="primary">
              <el-link href="action.html" target="_blank">免费制作</el-link>
              </el-button>
            </div>
          </div>
          <div class="step_container">
            <el-timeline>
              <el-timeline-item timestamp="第一步" placement="top">
                <el-card>
                  <h4>填写申请表</h4>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第二步" placement="top">
                <el-card>
                  <h4>格式化代码</h4>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第三步" placement="top">
                <el-card>
                  <h4>书写说明文档</h4>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { transformFile } from "./ruan_zhu.js";
var FileSaver = require("file-saver");

export default {
  name: "app",

  data() {
    return {
      request_name: ""
    };
  },
  created: function() {
    this.request_name = Date.parse(new Date());
  },
  methods: {
    handleDownload() {
      this.$http({
        url: "http://localhost:8088/download?mark_name=" + this.request_name,
        method: "get",
        responseType: "blob"
      })
        .then(response => {
          this.download(response);
        })
        .catch(error => {});
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
      formdata.append("mark_name", this.request_name);
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
}
.make_action {
  margin-left: auto;
  margin-right: auto;
}
.make_action_container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0px;
  right: 0px;
}
.middle_btn {
  height: 50px;
  width: 100px;
}
.header_image {
  width: 100%;
  height: 400px;
}
.step_container {
  text-align: left;
}
.app_top {
  position: relative;
}
.app_main {
  display: flex;
  flex-direction: column;
  position: relative;
}
#left_code {
}
#right_code {
}
</style>
