<template>
  <div>
  <el-menu
    :default-active="activeIndex2"
    router
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#37a9d2"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/userInformation">基本信息</el-menu-item>
    <!--<el-submenu index="2">-->
      <!--<template slot="title">我的工作台</template>-->
      <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
      <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
      <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
      <!--<el-submenu index="2-4">-->
        <!--<template slot="title">选项4</template>-->
        <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
      <!--</el-submenu>-->
    <!--</el-submenu>-->
    <el-menu-item index="/userOrganization">临床表现</el-menu-item>

    <!-- 增加了BMI、头围 -->
    <!--<el-menu-item index="/userGrowCurve">生长曲线</el-menu-item>-->
    <el-submenu index="2">
      <template slot="title">生长曲线图</template>
      <el-menu-item index="/userGrowCurve">身高百分数</el-menu-item>
      <el-menu-item index="/userGrowCurveOfCircumference">体重百分数</el-menu-item>
      <el-menu-item index="/userGrowCurveOfBmi">BMI百分数</el-menu-item>
    </el-submenu>

    <el-menu-item index="/dietGuidance">膳食指导</el-menu-item>
    <el-menu-item index="/sportsSuggestion">运动建议</el-menu-item>
    <!--<el-menu-item index="/doctorSuggestion">医生建议</el-menu-item>-->

    <!-- 组件引用测试 -->
    <el-menu-item index="/reportPreview">报告预览</el-menu-item>

    <!--<el-menu-item index=""><a :href=currentUsersReport target="_blank">报告预览</a></el-menu-item>-->
  </el-menu>
  <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex2: '/userInformation',
        currentUsersReport: ''
        // currentUsersReport: 'http://localhost:8082/pdf/preview/18746452379'
      }
    },

    // 使用钩子传递当前用户 ID
    mounted () {
      // 获取 ID
      let currentUserReportId = this.$store.getters.getId;

      this.setCurrentUserId(currentUserReportId);
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      /**
       * @function: 向服务端传递当前用户 ID
       * @author: White
       * @date: 19 - 05 - 07
       * */
      setCurrentUserId (usersIdParam) {
        let requestUrl = ''
        // 服务端 url
        let serverUrl = 'http://localhost:8082/pdf/preview/';

        requestUrl += serverUrl;
        requestUrl += usersIdParam;
        this.currentUsersReport = requestUrl;

        console.log('当前 url：');
        console.log(requestUrl)
      }
    }
  }
</script>

<style scoped>

</style>
