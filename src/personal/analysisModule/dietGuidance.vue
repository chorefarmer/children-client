<template>
  <div class="" style="width: 90%;
  height: 630px;
  margin-top: 12px;
  background: #ffffff;">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          膳食指导
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dietGuidance'
  }
</script>

<style scoped>

</style>
