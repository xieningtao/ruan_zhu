<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 style="color:black">计算机软件著作权申请工具</h1>
      </el-header>
      <el-main style="padding:0px">
        <div class="app_main">
          <div class="app_top">
            <!-- <el-image
              class="header_image"
              fit="cover"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            ></el-image>-->
            <div class="make_action_container"></div>
          </div>
          <div class="step_container">
            <el-timeline>
              <el-timeline-item timestamp="第一步" placement="top">
                <el-card>
                  <div class="card_container">
                    <h4>填写申请表</h4>
                    <ul>
                      <li>注册账号，然后登录就可以填写申请表</li>
                    </ul>
                    <div class="card_link" style="margin-top: 10px;">
                      <el-link
                        class="link_item"
                        href="http://www.ccopyright.com.cn/"
                        type="primary"
                        target="_blank"
                      >前往填写</el-link>
                      <el-link
                        class="link_item"
                        :href="`${doc_url}/pyf_template.html`"
                        type="primary"
                        target="_blank"
                      >查看模板</el-link>
                      <el-link
                        class="link_item"
                        href="http://www.ccopyright.com.cn/index.php?optionid=1081"
                        type="primary"
                        target="_blank"
                      >填表说明</el-link>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第二步" placement="top">
                <el-card>
                  <div class="card_container">
                    <h4>源代码文档</h4>
                    <ul>
                      <li>使用代码转换工具格式化代码，然后拷贝到word文档里面</li>
                    </ul>
                    <div class="card_link" style="margin-top: 10px;">
                      <el-link
                        class="link_item"
                        :href="`${doc_url}/source_code_template.docx`"
                        type="primary"
                     
                      >下载模板</el-link>
                      <el-link
                        class="link_item"
                        :href="`${doc_url}/source_code_example.docx`"
                        type="primary"
                        target="_blank"
                      >查看例子</el-link>
                      <el-link
                        class="link_item"
                        href="action.html"
                        type="primary"
                        target="_blank"
                      >代码转换工具</el-link>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第三步" placement="top">
                <el-card>
                  <div class="card_container">
                    <h4>书写说明文档</h4>
                    <div class="card_link">
                      <el-link
                        class="link_item"
                         :href="`${doc_url}/introduction_template.docx`"
                        type="primary"
                        target="_blank"
                      >下载模板</el-link>
                      <el-link
                        class="link_item"
                         :href="`${doc_url}/introducation_example.docx`"
                        type="primary"
                        target="_blank"
                      >查看例子</el-link>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第四步" placement="top">
                <el-card>
                  <h4>校验文件和打印资料</h4>
                  <ol>
                    <li>身份复印件，正方面印在一张纸上面</li>
                    <li>申请表，第一步填写的表，注意格式什么都不要改，直接打印</li>
                    <li>源代码，前半部分30页，后半部分30页，总共60页</li>
                    <li>说明文档，没有图片每页需要30行文字，有图片的，用文字说明图上功能，一般15页以上</li>
                  </ol>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第五步" placement="top">
                <el-card>
                  <h4>快递</h4>
                  <ol>
                    <li>使用顺丰快递，一般第二天就到达，他们前台接收，会自动转交给相关的部门（挺人性化的）</li>
                    <li>邮寄联系地址：北京市西城区天桥南大街1号天桥艺术大厦A座三层302（邮编：100050）</li>
                  </ol>
                  <h4>等待受理邮件</h4>
                  <ol>
                    <li>一般快递过去需要等1-2个星期他们才开始受理</li>
                    <li>正式受理后会以邮件的形式通知</li>
                  </ol>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="第六步" placement="top">
                <el-card>
                  <h4>后续操作</h4>
                  <ol>
                    <li>软件著作权登记申请，【受理之日】起30个工作日。一般都要等28个工作日</li>
                    <li>受理完成以后，接下来的流程就很快了，基本一个星期搞定</li>
                  </ol>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-link 
          class="link_item"
          href="action.html"
          type="primary"
          target="_blank"
          style="display:none"
        >粤ICP备 19133066号</el-link>
      </el-footer>
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
      request_name: "",
      doc_url:""
    };
  },
  created: function() {
    this.doc_url = process.env.NODE_ENV === 'production' ? "http://pengyf.fun:8088":"http://localhost:8088"
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
h1 {
  color: white;
}
.make_action_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0px;
  right: 0px;
  color: black;
}
.card_container {
  display: flex;
  flex-direction: column;
}
.card_link {
  display: flex;
  flex-direction: row;
}
.link_item {
  margin-right: 10px;
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
  width: 50%;
  margin-top: 20px;
}
.app_top {
  position: relative;
}
.app_main {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
}
</style>
