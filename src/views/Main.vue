<template>
     <div id="app">

  <el-tabs type="border-card">
  <el-tab-pane label="模板文件">配置管理</el-tab-pane>
   <el-tab-pane label="代码格式化">
    <transform-code></transform-code>
  </el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
    <!-- <form>
        <input type="file" multiple id="files">
        <button type="button"  v-on:click="handle()">转换</button>
        <button type="button"  v-on:click="handleDownload()">下载</button>
    </form> -->

   
  </div>
</template>

<script>
import TranformCode from './transformCode'
export default {
    components: {
    'transform-code' :TranformCode
  },
}
</script>

<style>

</style>