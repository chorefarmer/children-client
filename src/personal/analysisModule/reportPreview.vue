<template>
  <!-- only one main div -->
  <div>
    <div class=""
         style="width: 100%;
       height: 600px;
       background: rgba(220,154,255,0.15);
       overflow-y: scroll;
       margin: 5px 0 0 0;">

      <!-- component userGrowCurve -->
      <div class="chartsTable">
        <user-grow-curve></user-grow-curve>
      </div>

      <!-- component userGrowCurveOfWeight -->
      <div class="chartsTable">
        <user-grow-curve-of-circumference></user-grow-curve-of-circumference>
      </div>

      <!-- component userGrowCurveOfBmi -->
      <div class="chartsTable">
        <user-grow-curve-of-bmi></user-grow-curve-of-bmi>
      </div>
    </div>

    <div class="reportButton"
         style="position: absolute;
         bottom: 25px;
         right: 20px;">
      <el-button round type="primary" @click="checkMyReport"><a :href=reportUrl target="_blank">查看报告</a></el-button>
    </div>
  </div>
</template>

<script>
  // 引入子组件
  import userGrowCurve from '@/personal/analysisModule/userGrowCurve'
  import userGrowCurveOfBmi from '@/personal/analysisModule/userGrowCurveOfBmi'
  import userGrowCurveOfCircumference from '@/personal/analysisModule/userGrowCurveOfCircumference'

  export default {
    // 声明子组件
    components: {
      userGrowCurve,
      userGrowCurveOfCircumference,
      userGrowCurveOfBmi
    },

    // 初始化状态
    data () {
      return {
        // 查看 PDF 的 API
        reportUrl: 'http://localhost:8082/pdf/preview/'
      }
    },

    mounted () {
      // 获取用户 ID
      const usersIdParam = this.$store.getters.getId;
      this.reportUrl += usersIdParam;
    },

    methods: {
      checkMyReport () {

      }
    }
  }
</script>

<style scoped>
.chartsTable {
  margin: 10px 0 10px 60px;
}
</style>
