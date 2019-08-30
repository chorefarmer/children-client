<template>
  <el-form ref="form" :model="sizeForm" label-width="100px" size="medium">
    <div class="foodAvoid">
      <!-- 标签 - 食物过敏 -->
      <div class="label"
           style="width: 110px;
           font-size: 20px;
           border-radius: 0 20px 20px 0;
           background-color: rgba(25,132,198,0.6);
           color: rgb(255,255,255);
           padding-left: 10px;
           margin-bottom: 27px">食物过敏</div>

      <!-- 使用 el-checkbox-group 只能将数据类型设置为数组 -->
    <!--<el-form-item label="">-->
      <!--<el-checkbox-group v-model="sizeForm.allergy" size="medium">-->
        <!--<el-checkbox label="1" value="egg"><img src="../assets/foodIcon/鸡蛋.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">鸡蛋</div></el-checkbox>-->
        <!--<el-checkbox label="2" value="milk"><img src="../assets/foodIcon/milk_0.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">牛奶</div></el-checkbox>-->
        <!--<el-checkbox label="3" value="peanut"><img src="../assets/foodIcon/peanut_1.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">花生</div></el-checkbox>-->
        <!--<el-checkbox label="4" value="bean"><img src="../assets/foodIcon/bean.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">大豆</div></el-checkbox>-->
        <!--<el-checkbox label="5" value="barley"><img src="../assets/foodIcon/barley_1.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">大麦</div></el-checkbox>-->
        <!--<el-checkbox label="6" value="wheat"><img src="../assets/foodIcon/wheat.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">小麦</div></el-checkbox>-->
        <!--<el-checkbox label="7" value="nut"><img src="../assets/foodIcon/nut_0.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">坚果</div></el-checkbox>-->
        <!--<el-checkbox label="8" value="fish"><img src="../assets/foodIcon/fish_1.png" style="height: 80px;width: 80px"/><div style="padding-left: 32px">鱼</div></el-checkbox>-->
        <!--<el-checkbox label="9" value="shrimp"><img src="../assets/foodIcon/虾.png" style="height: 80px;width: 80px"/><div style="padding-left: 32px">虾</div></el-checkbox>-->
      <!--</el-checkbox-group>-->
    <!--</el-form-item>-->

      <!-- 食物过敏 -->
      <!-- 每个选项对应一个字段 date: 2019 - 04 - 11; author: White -->
      <el-form-item>
        <el-checkbox v-model="sizeForm.allergyEgg">
          <img src="../assets/foodIcon/鸡蛋.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">鸡蛋</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyMilk">
          <img src="../assets/foodIcon/milk_0.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">牛奶</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyPeanut">
          <img src="../assets/foodIcon/peanut_1.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">花生</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyBean">
          <img src="../assets/foodIcon/bean.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">大豆</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyBarley">
          <img src="../assets/foodIcon/barley_1.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">大麦</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyWheat">
          <img src="../assets/foodIcon/wheat.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">小麦</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyNut">
          <img src="../assets/foodIcon/nut_0.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">坚果</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyFish">
          <img src="../assets/foodIcon/fish_1.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">鱼</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.allergyShrimp">
          <img src="../assets/foodIcon/虾.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">虾</div>
        </el-checkbox>
      </el-form-item>

      <!-- 标签 - 食物不耐受 -->
      <div class="label"
           style="width: 130px;
           font-size: 20px;
           border-radius: 0 20px 20px 0;
           background-color: rgba(25,132,198,0.6);
           color: rgb(255,255,255);
           padding-left: 10px;
           margin-bottom: 20px">食物不耐受</div>

      <!-- 使用 el-checkbox-group 只能将数据类型设置为数组 -->
      <!--<el-form-item label="">-->
      <!--<el-radio-group v-model="sizeForm.intolerance" size="medium">-->
        <!--<el-checkbox label="" value="sugar"><img src="../assets/foodIcon/cube.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">乳糖</div></el-checkbox>-->
        <!--<el-checkbox label="" value="egg0"><img src="../assets/foodIcon/鸡蛋.png" style="height: 80px;width: 80px"/><div style="padding-left: 25px">鸡蛋</div></el-checkbox>-->
      <!--</el-radio-group>-->
    <!--</el-form-item>-->

      <!-- 每个选项对应一个字段 date: 2019 - 04 - 11; author: White -->
      <el-form-item>
        <el-checkbox v-model="sizeForm.intoleranceSugar">
          <img src="../assets/foodIcon/cube.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">乳糖</div>
        </el-checkbox>
        <el-checkbox v-model="sizeForm.intoleranceEgg">
          <img src="../assets/foodIcon/鸡蛋.png" style="height: 120px;width: 120px"/>
          <div style="padding-left: 30px;font-size: 20px;font-weight: bold">鸡蛋</div>
        </el-checkbox>
      </el-form-item>
    </div>

    <div class="submit-button">
      <el-form-item>
        <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="sizeFormBackTo()">返回</el-button>
        <el-button size="medium" type="primary" @click="submitSizeForm(sizeForm)">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          // 数据初始化
          // 食物过敏
          allergyEgg: '', // 鸡蛋
          allergyMilk: '', // 牛奶
          allergyPeanut: '', // 花生
          allergyBean: '', // 大豆
          allergyBarley: '', // 大麦
          allergyWheat: '', // 小麦
          allergyNut: '', // 坚果
          allergyFish: '', // 鱼
          allergyShrimp: '', // 虾

          // 食物不耐受
          intoleranceSugar: '', // 乳糖
          intoleranceEgg: '' // 鸡蛋
        }
      };
    },
    // 组件渲染时调用的钩子
    mounted () {
      //  获取当前用户 ID
      let _checkFoodId = this.$store.getters.getId;
      const _checkTimes = this.$store.getters.getMeasuresTimes;
      if (_checkFoodId === '') {
        this.$alert('请先填写您的基本信息', '提示！', {
          confirmButtonText: '确定',
          callback: action => {
            console.log("确认信息：" + action)
          }
        })
      } else {
        // 将当前用户 ID 传入请求函数
        this.getSizeFormData(_checkFoodId, _checkTimes);
      }
    },
    methods: {
      /**
       *  @function: string to boolean
       *  @author: White
       *  @date: 19 - 04 - 23
       *  @createReason: 后台录入转换为 string 类型，需转成 bool 才能回显
       * */
      changeStringToBool(stringParam) {
        return stringParam === 'true';
      },

      /**
       *  @function: 处理表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      dealSizeFormData (sizeFormObj) {
        const _sizeFormData = this.sizeForm;
        // 每个选项赋予对应 ID 的数据，还需开发
        // @downTime: 19 - 04 - 18
        _sizeFormData.allergyEgg = this.changeStringToBool(sizeFormObj.egg);
        _sizeFormData.allergyMilk = this.changeStringToBool(sizeFormObj.milk);
        _sizeFormData.allergyPeanut = this.changeStringToBool(sizeFormObj.peanut);
        _sizeFormData.allergyBean = this.changeStringToBool(sizeFormObj.soya);
        _sizeFormData.allergyBarley = this.changeStringToBool(sizeFormObj.barley);
        _sizeFormData.allergyWheat = this.changeStringToBool(sizeFormObj.wheat);
        _sizeFormData.allergyNut = this.changeStringToBool(sizeFormObj.mast);
        _sizeFormData.allergyFish = this.changeStringToBool(sizeFormObj.fish);
        _sizeFormData.allergyShrimp = this.changeStringToBool(sizeFormObj.prawn);
        _sizeFormData.intoleranceSugar = this.changeStringToBool(sizeFormObj.lactobiose);
        _sizeFormData.intoleranceEgg = this.changeStringToBool(sizeFormObj.egg_);
      },

      /**
       *  @function: 请求表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      getSizeFormData (foodCheckId, foodCheckTimes) {
        this.axios.get('http://localhost:8082/allergiesAndIntolerances/search', {
          params: {
            guardian_phone: foodCheckId,
            inspectOrder: foodCheckTimes
          }
        }).then((response) => {
          console.log(response)
          if (response.code = '200') {
            if (response.msg = '请求成功') {
              console.log("返回数据：")
              console.log(response)
              const sizeRequestData = response.data.data;
              console.log(sizeRequestData)
              this.$message({ message: '请求成功', type: 'success' });
              // 将请求数据传入处理函数
              this.dealSizeFormData(sizeRequestData);
              return;
            }
          } else {
            this.$message({ message: '请求失败', type: 'warning' });
          }
        }).catch(
          // 异常处理
        )
      },

      /**
       *  @function: 提交表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       *  @edit-date:
       * */
      submitSizeForm(sizeFormName) {
        console.log('submit!');
        console.log(sizeFormName);
        let that = this;
        // 表单数据的序列化
        let foodFormData = new FormData();
        // 拼接 key , value

        // 附带用户 ID
        let checkFoodId = this.$store.getters.getId;
        const checkFoodTimes = this.$store.getters.getMeasuresTimes;
        foodFormData.append('guardian_phone', checkFoodId);
        foodFormData.append('inspectOrder', checkFoodTimes);

        foodFormData.append('egg', that.sizeForm.allergyEgg);
        foodFormData.append('milk', that.sizeForm.allergyMilk);
        foodFormData.append('peanut', that.sizeForm.allergyPeanut);
        foodFormData.append('soya', that.sizeForm.allergyBean);
        foodFormData.append('barley', that.sizeForm.allergyBarley);
        foodFormData.append('wheat', that.sizeForm.allergyWheat);
        foodFormData.append('mast', that.sizeForm.allergyNut);
        foodFormData.append('fish', that.sizeForm.allergyFish);
        foodFormData.append('prawn', that.sizeForm.allergyShrimp);
        foodFormData.append('lactobiose', that.sizeForm.intoleranceSugar);
        foodFormData.append('egg_', that.sizeForm.intoleranceEgg);

        // console.log(foodFormData);

        // 提交请求
        this.axios.post('http://localhost:8082/allergiesAndIntolerances', foodFormData , {
          // 定义表头
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {  // 请求成功的回调函数
          if (response.code = '200') {
            this.$message({ message: '提交成功，进入下一项', type: 'success' });
            // 填写完成则跳到下一个页面
            this.$router.push('/eating');
          } else {
            this.$message({ message: '提交失败', type: 'warning' });
          }
        },err => {
          // 打印错误
          console.log("错误信息" + err)
        }).catch(
          // 异常处理
        )
      },

      /**
       *  @function: 返回（？主页，上个页面，暂定）
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      sizeFormBackTo () {
        this.$router.push('/Home');
      }
    }
  };
</script>

<style>
  .foodAvoid {
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    width: 83%;
    padding: 20px 0 0 0;
    border-radius: 10px;
  }
  .submit-button {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
</style>
