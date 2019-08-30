<template>
  <div class="userInformation"
       style="margin-top: 13px;
       width: 90%;
       height: 600px;
       border-radius: 10px;
       padding: 15px 0 0 20px;
       background: #ffffff;">
    <div class="userInformation_0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>姓名</span>
        </div>
        <div v-model="name" class="text item">
          {{ name }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>性别</span>
        </div>
        <div v-model="sex" class="text item">
          {{ sex }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户编号</span>
        </div>
        <div v-model="guardian_phone" class="text item">
          {{ guardian_phone }}
        </div>
      </el-card>
    </div>

    <div class="userInformation_0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>年龄</span>
        </div>
        <div v-model="age" class="text item">
          {{ age }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>身高</span>
        </div>
        <div v-model="height" class="text item">
          {{ height }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>出生日期</span>
        </div>
        <div v-model="birth" class="text item">
          {{ birth }}
        </div>
      </el-card>
    </div>

    <div class="userInformation_0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>民族</span>
        </div>
        <div v-model="nation" class="text item">
          {{ nation }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>血型</span>
        </div>
        <div v-model="blood" class="text item">
          {{ blood }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>监护人</span>
        </div>
        <div v-model="guardian" class="text item">
          {{ guardian }}
        </div>
      </el-card>
    </div>

    <!--<div class="userInformation_0">-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header" class="clearfix">-->
          <!--<span>既往病史</span>-->
        <!--</div>-->
        <!--<div v-model="symptomFile" class="text item">-->
          <!--{{ symptomFile }}-->
        <!--</div>-->
      <!--</el-card>-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header" class="clearfix">-->
          <!--<span>运动情况</span>-->
        <!--</div>-->
        <!--<div v-model="sportsCondition" class="text item">-->
          <!--{{ sportsCondition }}-->
        <!--</div>-->
      <!--</el-card>-->
      <!--<el-card class="box-card">-->
        <!--<div slot="header" class="clearfix">-->
          <!--<span>睡眠时间</span>-->
        <!--</div>-->
        <!--<div v-model="sleepingTime" class="text item">-->
          <!--{{ sleepingTime }}-->
        <!--</div>-->
      <!--</el-card>-->
    <!--</div>-->

  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        sex: '',
        guardian_phone: '',
        age: '',
        height: '',
        birth: '',
        nation: '',
        blood: '',
        guardian: '',
        symptomFile: '',
        sportsCondition: '',
        sleepingTime: ''
      }
    },

    mounted () {
      // 获取当前用户 ID
      const currentUserId = this.$store.getters.getId;
      const currentUserTimes = this.$store.getters.getMeasuresTimes;

      this.getCurrentUserInformation(currentUserId, currentUserTimes);
    },

    methods: {
      /**
       * @function: 获取基本信息部分
       * @author: White
       * @date: 19 - 04 - 29
       * */
      dealCurrentUserInformation (currentUserInformationDataParam,currentUserInformationAgeParam) {
        // 姓名
        this.name = currentUserInformationDataParam.name;

        // 性别
        if (currentUserInformationDataParam.sex === 1) {
          this.sex = '男'
        } else if (currentUserInformationDataParam.sex === 0) {
          this.sex = '女'
        } else {
          return ''
        }

        // 监护人联系方式 - 用户编号
        this.guardian_phone = currentUserInformationDataParam.guardian_phone;

        // 身高
        this.height = currentUserInformationDataParam.height;

        // 出生日期
        let changeBirthDay = new Date(currentUserInformationDataParam.birth);
        // 转换格式
        this.birth = changeBirthDay.toLocaleDateString();

        // 年龄
        this.age = currentUserInformationAgeParam;

        // 血型
        if ( currentUserInformationDataParam.blood === 1 ) {
          this.blood = 'A'
        } else if ( currentUserInformationDataParam.blood === 2 ) {
          this.blood = 'B'
        } else if ( currentUserInformationDataParam.blood === 3 ){
          this.blood = 'AB'
        } else if ( currentUserInformationDataParam.blood === 4 ) {
          this.blood = 'O'
        } else {
          return '';
        }

        // 监护人
        this.guardian = currentUserInformationDataParam.guardian;

        // 民族
        if ( currentUserInformationDataParam.nation === 1 ) {
          this.nation = "汉族";
        } else if ( currentUserInformationDataParam.nation === 2) {
          this.nation = "少数民族";
        } else {
          return '';
        }
      },

      /**
       * @function: 获取基本信息部分
       * @author: White
       * @date: 19 - 04 - 29
       * */
      getCurrentUserInformation (currentUserId, times) {
        try {
          // 获取当前用户信息
          this.axios.get('http://localhost:8082/information/search', {
            params: {
              guardian_phone: currentUserId,
              inspectOrder: times
            }
          })
            .then((response) => {
              // 返回数据
              console.log(response)
              console.log(response.data.data)
              let currentUserInformationData = response.data.data;
              let currentUserInformationAge = response.data.data.age;
              // 传入处理函数
              this.dealCurrentUserInformation(currentUserInformationData,currentUserInformationAge);
          })
        } catch (e) {
/*          this.$message({
            message: '发生了一些错误：' + e,
            type: 'warning'
          })*/
          this.$alert('服务器开小差了' + e, '错误！', {
            confirmButtonText: '知道了',
            callback: action => {
              // 回调信息
              console.log("确认信息：" + action)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
    color: #14b4ff;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 330px;
  }
  .userInformation {
    display: flex;
  }
  .userInformation_0 {
    margin: 0 17px 15px 0;
  }
  .userInformation_0 div {
    margin-bottom: 25px;
  }
</style>
