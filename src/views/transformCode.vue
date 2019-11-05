<template>
  <div id="container">
    <textarea rows="55" cols="100" v-model="message" placeholder="输入代码"></textarea>

    <!-- <button class="middle_btn" type="button" v-on:click="doTransform()">转换</button> -->

    <el-button type="primary" v-on:click="doTransform()">转换</el-button>
    <textarea rows="55" cols="100" readonly="readonly" v-model="transformResult" placeholder="输入代码"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      transformResult: ""
    };
  },
  methods:{
      //转换
    doTransform() {
      // var bufferContent = fs.readFileSync(srcPath);
      var content = this.message;

      //移除注释
      var remove_comment_back_splash = /\/\*{1,2}[\s\S]*?\*\//g;
      var back_splash_result = content.replace(remove_comment_back_splash, "");
      var remove_double_splash = /\/\/[\s\S]*?\n/g;
      var double_splash_result = back_splash_result.replace(
        remove_double_splash,
        ""
      );
      var remove_empty = /(?<=\n)\s*?\n/g;
      var remove_empty_result = double_splash_result.replace(remove_empty, "");
      this.transformResult = remove_empty_result;
      var count = remove_empty_result.match(/\n/g).length;
    },
  }
};
</script>
<style>

#container{
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 60px;
  margin-right: 60px;
  align-items: center;
}
</style>