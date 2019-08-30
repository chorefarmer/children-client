<template>
  <el-form ref="form" :model="form" label-width="70px">
    <div class="" style="display: flex;width: 100%;height: 620px">
      <div class="sports-content-0">

        <!--<div v-model="currentUserAge"></div>-->

        <!-- 标签 -->
        <div class="label"
             style="width: 120px;
             font-size: 20px;
             margin-bottom: 20px;
             border-radius: 0 20px 20px 0;
             background-color: rgba(25,132,198,0.6);
             color: rgb(255,255,255);
             padding-left: 10px">0 - 3 岁</div>
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">运动情况：</el-aside>
          <el-radio-group v-model="form.sportsValue0">

            <!-- @Date: 19 - 07 - 04，修改了 style -->
            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_1.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="1" :disabled="chooseFirstAge">
              正常活动，喜欢蹦跳
            </el-radio>

            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_2.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="2" :disabled="chooseFirstAge">
              <!--<img src="../assets/sport_2.png"
                   style="width: 90px;height: 90px;margin-top: 10px"/>-->
              平常较安静，活动量不大
            </el-radio>
            <!--<el-radio label="3" value="" :disabled="chooseFirstAge">-->
            <!--<img src="../assets/child_more.png"-->
            <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
            <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">非常活泼（大量运动）</div>-->
            <!--</el-radio>-->
          </el-radio-group>
        </el-form-item>

        <!-- 睡眠时间不用了 -->
        <!--<el-form-item label="睡眠时间">-->
        <!--<el-radio-group v-model="form.sleepValue">-->
        <!--<el-radio label="1" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_0.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">不足8小时</div>-->
        <!--</el-radio>-->
        <!--<el-radio label="2" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_1.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">8 - 10小时</div>-->
        <!--</el-radio>-->
        <!--<el-radio label="3" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_3.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">10小时以上</div>-->
        <!--</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
      </div>

      <!-- 第二个年龄段 -->
      <div class="sports-content-1">

        <!-- 标签 -->
        <div class="label"
             style="width: 120px;
             font-size: 20px;
             margin-bottom: 20px;
             border-radius: 0 20px 20px 0;
             background-color: rgba(25,132,198,0.6);
             color: rgb(255,255,255);
             padding-left: 10px">3 - 6 岁</div>
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">运动情况：</el-aside>
          <el-radio-group v-model="form.sportsValue1">
            <!-- @Date: 19 - 07 - 04，修改了 style -->
            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_1.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="1" :disabled="chooseSecondAge">
              <!--<img src="../assets/sport_1.png"
                   style="width: 90px;height: 90px;margin-top: 10px"/>
              <div style="padding-left: 30px;font-size: 15px">活泼好动</div>-->
              活泼好动
            </el-radio>

            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_2.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="2" :disabled="chooseSecondAge">
              <!--<img src="../assets/sport_2.png"
                   style="width: 90px;height: 90px;margin-top: 10px"/>
              <div style="font-size: 15px">比较安静，活动量不大</div>-->
              比较安静，活动量不大
            </el-radio>
            <!--<el-radio label="3" value="" :disabled="chooseFirstAge">-->
              <!--<img src="../assets/child_more.png"-->
                   <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">非常活泼（大量运动）</div>-->
            <!--</el-radio>-->
          </el-radio-group>
        </el-form-item>

        <!-- 睡眠时间，不用了 -->
        <!--<el-form-item label="睡眠时间">-->
          <!--<el-radio-group v-model="form.sleepValue">-->
            <!--<el-radio label="1" value="" :disabled="chooseFirstAge">-->
              <!--<img src="../assets/sleep_0.png"-->
                   <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">不足8小时</div>-->
            <!--</el-radio>-->
            <!--<el-radio label="2" value="" :disabled="chooseFirstAge">-->
              <!--<img src="../assets/sleep_1.png"-->
                   <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">8 - 10小时</div>-->
            <!--</el-radio>-->
            <!--<el-radio label="3" value="" :disabled="chooseFirstAge">-->
              <!--<img src="../assets/sleep_3.png"-->
                   <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">10小时以上</div>-->
            <!--</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
      </div>

      <!-- 第三个年龄段 -->
      <div class="sports-content-3">

        <!-- 标签 -->
        <div class="label"
             style="width: 120px;
           font-size: 20px;
           margin-bottom: 27px;
           border-radius: 0 20px 20px 0;
           background-color: rgba(25,132,198,0.6);
           color: rgb(255,255,255);
           padding-left: 10px">6 - 18 岁</div>
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">运动等级：</el-aside>
          <el-radio-group v-model="form.sportsValue2">
            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_0.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="1" :disabled="chooseThirdAge">
              大量运动
              <!--<img src="../assets/sport_0.png"
                   style="width: 90px;height: 90px;margin-top: 10px"/>-->
              <div class="radioDescription" style="width: 270px;height: 100px;font-size: 18px">
                <p style="white-space: normal;line-height: 1.5">全天内各种类型的身体活动时间应累计超过180分钟以上。其中，中等及以上强度的身体活动累计不少于60分钟。</p>
              </div>
            </el-radio>
            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_1.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="2" :disabled="chooseThirdAge">
              中等运动量
              <!--<img src="../assets/sport_1.png"
                   style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <div style="width: 265px;height: 80px;font-size: 18px">
                <p style="white-space: normal;line-height: 1.5">全天内各种类型的身体活动时间应累计少于180分钟且不少于60分钟。</p>
              </div>
            </el-radio>
            <div style="margin: 17px 0 17px 30px">
              <img src="../assets/sport_2.png" style="width: 120px;height: 120px" />
            </div>
            <el-radio label="3" :disabled="chooseThirdAge">
              少量运动
              <!--<img src="../assets/sport_2.png"
                   style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
              <div style="width: 265px;height: 80px;font-size: 18px">
                <p style="white-space: normal;line-height: 1.5">全天内各种类型的身体活动时间应累计少于60分钟，主要是看电子产品或以坐为主。</p>
              </div>
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 睡眠时间，用不上了 -->
        <!--<el-form-item label="睡眠时间">-->
        <!--<el-radio-group v-model="form.sleepValue">-->
        <!--<el-radio label="1" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_0.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">不足8小时</div>-->
        <!--</el-radio>-->
        <!--<el-radio label="2" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_1.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">8 - 10小时</div>-->
        <!--</el-radio>-->
        <!--<el-radio label="3" value="" :disabled="chooseFirstAge">-->
        <!--<img src="../assets/sleep_3.png"-->
        <!--style="width: 90px;height: 90px;margin-bottom: 10px"/>-->
        <!--<div style="padding: 0 0 0 19px;margin: -15px 0 0 0">10小时以上</div>-->
        <!--</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
      </div>

    </div>


      <div class="submit-button">
        <el-form-item>
          <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="sportsBackToHome">返回</el-button>
          <el-button size="medium" type="primary" @click="onSubmit(form)">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-form-item>
      </div>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        sportsValue0: '',
        sportsValue1: '',
        sportsValue2: ''
        // sleepValue: ''
      },

      // 初始每个年龄段选择按钮都开启
      chooseFirstAge: false,
      chooseSecondAge: false,
      chooseThirdAge: false,

      // 初始状态 - 年龄
      currentUserAge: 0
    }
  },

  // 组件渲染时调用的钩子
  mounted () {

    // 测试数据
    // let currentUserAge = Math.random()*10;
    // console.log("当前年龄：" + currentUserAge);
    // console.log("年龄数据类型：" + typeof currentUserAge)

    // 获取当前用户 ID
    let _sportsCheckId = this.$store.getters.getId;
    const _sportsTimes = this.$store.getters.getMeasuresTimes;

    // 检查当前用户 ID 是否为空
    if (_sportsCheckId === '') {
      this.$alert('请先填写您的基本信息', '提示！', {
        confirmButtonText: '确定',
        callback: action => {
          console.log("确认信息：" + action)
        }
      })
    } else {
      // 根据 ID 获取年龄
      this.axios.get('http://localhost:8082/information/search', {
        params: {
          guardian_phone: _sportsCheckId,
          inspectOrder: _sportsTimes
        }
      })
        .then((response) => {
          console.log(response)
          // 获取当前用户的初始年龄
          // let _currentUserAgeParam = response.data.data.age;

          // this.$store.commit('changeCurrentUserAge', _currentUserAgeParam);
          // let _currentUserAge = this.$store.getters.getCurrentUserAge;

          // 将当前用户年龄传入处理函数
          // this.dealCurrentUserAgeFormat(_currentUserAgeParam);
          // console.log("转换后的年龄：" + parseInt(_currentUserAgeParam));

          // 指向当前对象（在哪里被调用，就指向哪里），这里用不到了
          let that = this;
          // 获取当前用户年龄
          let translatedCurrentUserAge = this.$store.getters.getCurrentUserAge;

          /**
           * 年龄使用服务计算的，此处暂时不用
           * @date: 19 - 08 - 30
           * @author: xu
           * */
          const serversAge = response.data.data.age;
          this.currentUserAge = serversAge;

          // 分年龄段开启和关闭单选按钮

          /**
           * @exception: 系统刚启动时，运动调查的数据会在上一个年龄段显示。
           * @state: 每一项单独加判断，依然存在问题
           *
           * @exceptionResolved: 将请求的方法 axios.get 置于获取年龄的块语句内和打开关闭选项后
           * @Date: 19 - 05 - 07
           * @author: White
           * */
          // if (0 <= parseInt(translatedCurrentUserAge) && parseInt(translatedCurrentUserAge) < 3) {
          //   // 0 - 3 岁
          //   this.chooseFirstAge = false
          //   this.chooseSecondAge = true
          //   this.chooseThirdAge = true
          // } else if (3 <= parseInt(translatedCurrentUserAge) && parseInt(translatedCurrentUserAge) < 6) {
          //   // 3 - 6 岁
          //   this.chooseFirstAge = true
          //   this.chooseSecondAge = false
          //   this.chooseThirdAge = true
          // } else {
          //   // 6 - 18 岁
          //   this.chooseFirstAge = true
          //   this.chooseSecondAge = true
          //   this.chooseThirdAge = false
          // }

          // 0 - 3 岁
          if (0 <= parseInt(serversAge) && parseInt(serversAge) < 3) {
            this.chooseFirstAge = false
            this.chooseSecondAge = true
            this.chooseThirdAge = true
          }

          // 3 - 6 岁
          if (3 <= parseInt(serversAge) && parseInt(serversAge) < 6) {
            this.chooseFirstAge = true
            this.chooseSecondAge = false
            this.chooseThirdAge = true
          }

          // 6 - 18 岁
          if (6 <= parseInt(serversAge) && parseInt(serversAge) < 18) {
            this.chooseFirstAge = true
            this.chooseSecondAge = true
            this.chooseThirdAge = false
          }

          // 按 ID 查询
          // 调用此方法必须在年龄判断后
          this.getSportsFormData(_sportsCheckId, _sportsTimes);

        },err => {
          this.$alert('发生了一些错误：' + err, '提示！', {
            confirmButtonText: '确定',
            callback: action => {
              console.log("确认信息：" + action)
            }
          })
        }).catch(
          // 异常处理
      )
    }
  },

  methods: {
    /**
     *  @function: 年龄格式处理
     *  @param: age
     *  @author: White
     *  @date: 19 - 04 - 30
     *  @description: 服务处理完年龄了，暂时不再使用 19 - 08 - 30
     * */
    dealCurrentUserAgeFormat (currentUserAgeParam) {
      // 空数组用于存放分割后的岁数、月数
      let ageSplit = [];
      // 岁数
      let currentUserYear = parseInt(currentUserAgeParam);

      ageSplit = currentUserAgeParam.split('岁');
      console.log("分割完成的年龄：" + ageSplit);

      // 月数
      let currentUserMonth = parseInt(ageSplit[1]);
      console.log("转换后的月数：" + currentUserMonth);

      // 处理月数
      const dealMonth = currentUserMonth/12;
      console.log("月数转换成年表示：" + dealMonth);

      // 计算岁数
      const dealCurrentUserAge = currentUserYear + dealMonth;
      console.log("处理后的年龄：" + dealCurrentUserAge);
      console.log("四舍五入的年龄：" + Math.round(dealCurrentUserAge))

      // 将计算得到的岁数存入 Vuex 全局状态，以便调用
      this.$store.commit('changeCurrentUserAge', Math.round(dealCurrentUserAge));
      // this.currentUserAge = Math.round(dealCurrentUserAge);
    },

    /**
     *  @function: 回显数据处理
     *  @author: White
     *  @date: 19 - 04 - 11
     * */
    dealSportsFormData (sportsObj) {
      let _sportsFormData = this.form;
      // 当前用户年龄
      /**
       * not use this age at all.
       * */
      let _checkCurrentUserAge = this.$store.getters.getCurrentUserAge;
      const ageParam = this.currentUserAge;
      // console.log('当前年龄：' + _checkCurrentUserAge)
      // console.log('年龄类型：' + typeof _checkCurrentUserAge)
      // _sportsFormData.sportsValue = sportsObj.sport_status.toString();
      // _sportsFormData.sleepValue = sportsObj.sleepValue;

      // 0 - 3 岁
      if (0 <= parseInt(ageParam) && parseInt(ageParam) < 3) {
        _sportsFormData.sportsValue0 = sportsObj.sport_status.toString();
        _sportsFormData.sportsValue1 = '';
        _sportsFormData.sportsValue2 = '';
      }

      // 3 - 6 岁
      if (3 <= parseInt(ageParam) && parseInt(ageParam) < 6) {
        _sportsFormData.sportsValue0 = '';
        _sportsFormData.sportsValue1 = sportsObj.sport_status.toString();
        _sportsFormData.sportsValue2 = '';
      }

      // 6 - 18 岁
      if (6 <= parseInt(ageParam) && parseInt(ageParam) < 18) {
        _sportsFormData.sportsValue0 = '';
        _sportsFormData.sportsValue1 = '';
        _sportsFormData.sportsValue2 = sportsObj.sport_status.toString();
      }
    },

    /**
     *  @function: 提交表单
     *  @author: White
     *  @date: 19 - 04 - 11
     * */
    getSportsFormData (sportsUserParam, times) {
      // 获取当前用户编号 ID
      // const _checkSportsId = this.$store.getters.getId;
      // 请求数据
      this.axios.get('http://localhost:8082/sportsSurvey/search', {
        params: {
          guardian_phone: sportsUserParam,
          inspectOrder: times
        }
      }).then((response) => {
        // 判断数据请求的状态码
        if (response.status === 200) {
          // 提示框
          this.$message({
            message: '请求完成',
            type: 'success'
          });
          const sportsFormData = response.data.data;
          console.log("运动调查传回参数：")
          console.log(response)
          // 将获取的参数传入处理函数
          this.dealSportsFormData(sportsFormData);
        } else {
          this.$message({
            message: response.status,
            type: 'success'
          });
        }
      }).catch(
        // 错误处理 ...
      )
    },

    /**
     *  @function: 提交表单
     *  @author: White
     *  @date: 19 - 04 - 11
     * */
    onSubmit(formName) {
      // 第一个参数没实际作用
      // console.log(formName);
      // 不再记录睡眠时间
      // console.log('运动情况：' + this.form.sportsValue);
      // console.log('睡眠时间：' + this.form.sleepValue);

      // 获取当前用户年龄
      /**
       * not use this param at all
       * */
      let currentUserAge = this.$store.getters.getCurrentUserAge;
      // 获取当前用户 ID
      let checkCurrentUserId = this.$store.getters.getId;
      const sportsTimes = this.$store.getters.getMeasuresTimes;
      const ageParam = this.currentUserAge;

      let that = this;
      // 表单数据序列化
      let sportsFormData = new FormData();
      // 拼接 key 与 value
      sportsFormData.append('guardian_phone', checkCurrentUserId);
      sportsFormData.append('inspectOrder', sportsTimes);
      /**
       * @amend: 运动调查分年龄段，所以在创建新序列化表时需判断当前用户年龄在哪个区间
       * */

      if (0 <= parseInt(ageParam) && parseInt(ageParam) < 3) {
        // 0 - 3 岁
        sportsFormData.append('sport_status', that.form.sportsValue0);
      } else if (3 <= parseInt(ageParam) && parseInt(ageParam) < 6) {
        // 3 - 6 岁
        sportsFormData.append('sport_status', that.form.sportsValue1);
      } else {
        // 6 - 18 岁
        sportsFormData.append('sport_status', that.form.sportsValue2);
      }

      // sportsFormData.append('sport_status', that.form.sportsValue);
      // 睡眠时间，不再使用
      // sportsFormData.append('sleepValue', that.form.sleepValue);
      // 控制台打印，用于测试
      // console.log('序列化的 sportsFormData.sportsValue 的值：' + sportsFormData.get("sportsValue"));

      // 发起请求
      this.axios.post('http://localhost:8082/sportsSurvey', sportsFormData , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(response)
        if (response.code = '200') {
          this.$message({ message: '请查看您的报告', type: 'success' });
          // 提交完成跳转到系统分析，停留本组件
          this.$router.push('');
        } else {
          this.$message({ message: response.msg, type: 'warning' });
        }
      },err => {
        // 打印错误信息
        console.log("错误信息：" + err)
      }).catch(
        // 错误处理 ...
      )
    },

    sportsBackToHome () {
      this.$router.push('/Home');
    }
  }
}
</script>

<style scoped>
.sports-content-0 {
  flex: 0 28%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 0;
  border-radius: 10px;
}
.sports-content-1 {
  flex: 0 28%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 0;
  margin-left: 10px;
  border-radius: 10px;
}
.sports-content-3 {
  flex: 0 28%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 0;
  border-radius: 10px;
  margin-left: 10px;
  overflow-y: scroll;
}
.submit-button {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
