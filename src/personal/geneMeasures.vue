<template>
  <div>
    <el-container>
      <el-header>基因检测</el-header>
      <el-main>模块正在开发中...敬请期待</el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'geneMeasures'
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #349fba;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
