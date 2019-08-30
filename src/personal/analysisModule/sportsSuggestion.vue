<template>
  <div>
    <div class="" style="width: 90%;
  height: 630px;
  margin-top: 12px;
  padding: 15px 0 0 10px;
  background: #ffffff;">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            运动建议
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div>
              有氧运动：
            </div>
            <div>
              慢跑、健身操、游泳、自行车、球类等，3-5次/周，20分钟/次
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sportsSuggestion'
  }
</script>

<style scoped>

</style>
