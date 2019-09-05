<template>
  <el-form ref="form" :model="eatingForm" label-width="100px">
    <div class="region">
      <div class="region-0">

        <!-- 字段的修改 -->
        <!-- name, value -->

        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">每天食用主食量：</el-aside>
          <el-select v-model="eatingForm.staple" placeholder="" value="">
            <el-option label="不食用" value="1"></el-option>
            <el-option label="小于100克" value="2"></el-option>
            <el-option label="100-150克" value="3"></el-option>
            <el-option label="150-200克" value="4"></el-option>
            <el-option label="200-250克" value="5"></el-option>
            <el-option label="250-300克" value="6"></el-option>
            <el-option label="300-350克" value="7"></el-option>
            <el-option label="350-400克" value="8"></el-option>
            <el-option label="400-450克" value="9"></el-option>
            <el-option label="450-500克" value="10"></el-option>
            <el-option label="500-550克" value="11"></el-option>
            <el-option label="大于550克" value="12"></el-option>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">每天食用蔬菜量：</el-aside>
          <el-select v-model="eatingForm.vegetable" placeholder="" value="">
            <el-option label="不食用" value="1"></el-option>
            <el-option label="小于200克" value="2"></el-option>
            <el-option label="200-300克" value="3"></el-option>
            <el-option label="300-400克" value="4"></el-option>
            <el-option label="400-500克" value="5"></el-option>
            <el-option label="大于500克" value="6"></el-option>
            <el-option label="大于1000克" value="7"></el-option>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">每周食用海产品量：</el-aside>
          <el-select v-model="eatingForm.marine" placeholder="" value="">
            <el-option label="不食用" value="1"></el-option>
            <el-option label="小于150克" value="2"></el-option>
            <el-option label="150-250克" value="3"></el-option>
            <el-option label="250-350克" value="4"></el-option>
            <el-option label="350-450克" value="5"></el-option>
            <el-option label="450-550克" value="6"></el-option>
            <el-option label="550-650克" value="7"></el-option>
            <el-option label="650-750克" value="8"></el-option>
            <el-option label="750-850克" value="9"></el-option>
            <el-option label="850-950克" value="10"></el-option>
            <el-option label="大于1000克" value="11"></el-option>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: bold">每周食用鸡蛋量：</el-aside>
          <el-select v-model="eatingForm.egg" placeholder="" value="">
            <el-option label="不食用" value="1"></el-option>
            <el-option label="小于3个" value="2"></el-option>
            <el-option label="3-5个" value="3"></el-option>
            <el-option label="5-7个" value="4"></el-option>
            <el-option label="大于7个" value="5"></el-option>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>
      </div>

    <div class="region-1">
      <el-form-item label="">
        <el-aside style="font-size: 18px;font-weight: bold">每天食用水果量：</el-aside>
        <el-select v-model="eatingForm.fruit" placeholder="" value="">
          <el-option label="不食用" value="1"></el-option>
          <el-option label="小于100克" value="2"></el-option>
          <el-option label="100-200克" value="3"></el-option>
          <el-option label="200-300克" value="4"></el-option>
          <el-option label="300-400克" value="5"></el-option>
          <el-option label="400-500克" value="6"></el-option>
          <el-option label="大于500克" value="7"></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="">
        <el-aside style="font-size: 18px;font-weight: bold">每周食用禽畜肉量：</el-aside>
        <el-select v-model="eatingForm.meat" placeholder="" value="">
          <el-option label="不食用" value="1"></el-option>
          <el-option label="小于150克" value="2"></el-option>
          <el-option label="150-250克" value="3"></el-option>
          <el-option label="250-350克" value="4"></el-option>
          <el-option label="350-450克" value="5"></el-option>
          <el-option label="450-550克" value="6"></el-option>
          <el-option label="550-650克" value="7"></el-option>
          <el-option label="650-750克" value="8"></el-option>
          <el-option label="750-850克" value="9"></el-option>
          <el-option label="850-950克" value="10"></el-option>
          <el-option label="大于1000克" value="11"></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="">
        <el-aside style="font-size: 18px;font-weight: bold">每周饮用牛奶量：</el-aside>
        <el-select v-model="eatingForm.milk" placeholder="" value="">
          <el-option label="不食用" value="1"></el-option>
          <el-option label="小于1500毫升" value="2"></el-option>
          <el-option label="1500-2000毫升" value="3"></el-option>
          <el-option label="2000-2500毫升" value="4"></el-option>
          <el-option label="2500-3000毫升" value="5"></el-option>
          <el-option label="3000-3500毫升" value="6"></el-option>
          <el-option label="大于3500毫升" value="7"></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="">
        <el-aside style="font-size: 18px;font-weight: bold">每周食用坚果量：</el-aside>
        <el-select v-model="eatingForm.nut" placeholder="" value="">
          <el-option label="不食用" value="1"></el-option>
          <el-option label="50-70克" value="2"></el-option>
          <el-option label="70-90克" value="3"></el-option>
          <el-option label="90-110克" value="4"></el-option>
          <el-option label="110-130克" value="5"></el-option>
          <el-option label="130-150克" value="6"></el-option>
          <el-option label="大于150克" value="7"></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
    </div>
    </div>

    <div class="eating-habits">
      <div class="eatingHabits0">
      <div class="label"
           style="width: 110px;
           font-size: 20px;
           border-radius: 0 20px 20px 0;
           margin-bottom: 20px;
           background-color: rgba(25,132,198,0.6);
           color: rgb(255,255,255);
           padding-left: 10px">食物偏好</div>
      <el-form-item label="" prop="resource" label-width="80px">
        <!--<el-radio-group v-model="eatingForm.eatingPrefer">-->
          <el-checkbox border v-model="eatingForm.eatingPrefer0">偏好甜食</el-checkbox>
          <el-checkbox border v-model="eatingForm.eatingPrefer1">喜好油炸食品</el-checkbox>
          <el-checkbox border v-model="eatingForm.eatingPrefer2">喜好碳酸饮料</el-checkbox>
        <!--</el-radio-group>-->
      </el-form-item>
      </div>

      <div class="eatingHabits0">
        <div class="label"
             style="width: 110px;
             font-size: 20px;
             border-radius: 0 20px 20px 0;
             margin-bottom: 20px;
             background-color: rgba(25,132,198,0.6);
             color: rgb(255,255,255);
             padding-left: 10px">饮食习惯</div>
        <el-form-item label="" prop="resource" label-width="80px">
          <!--<el-checkbox-group v-model="">-->
          <el-checkbox border v-model="eatingForm.eatingHabits0">经常不吃早饭</el-checkbox>
          <el-checkbox border v-model="eatingForm.eatingHabits1">边吃边玩</el-checkbox>
          <el-checkbox border v-model="eatingForm.eatingHabits2">饮食无规律</el-checkbox>
          <!--</el-checkbox-group>-->
        </el-form-item>
      </div>
    </div>

    <div class="submit-button">
    <el-form-item>
      <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="eatingBackToHome()">返回</el-button>
      <el-button size="medium" type="primary" @click="eatingSubmit">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      <!--<el-button @click="checkValue">check</el-button>-->
      <!--<el-button @click="changeValue">change</el-button>-->
    </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      eatingForm: {
        // 状态初始化
        // 膳食调查
        staple: '',
        vegetable: '',
        marine: '',
        egg: '',
        fruit: '',
        meat: '',
        milk: '',
        nut: '',

        // 食物偏好
        eatingPrefer0: false,
        eatingPrefer1: false,
        eatingPrefer2: false,

        // 饮食习惯
        eatingHabits0: false,
        eatingHabits1: false,
        eatingHabits2: false
      }
    }
  },

  // 组件渲染时调用钩子
  mounted () {
    // 获取当前用户 ID
    let _eatingCheckId = this.$store.getters.getId;
    const _eatingTimes = this.$store.getters.getMeasuresTimes;
    if (_eatingCheckId === '') {
      this.$alert('请先填写您的基本信息', '提示！', {
        confirmButtonText: '确定',
        callback: action => {
          console.log("确认信息：" + action)
        }
      })
    } else {
      // 如果有建立用户的 ID 则带着 ID 请求对应数据
      this.getEatingFormData(_eatingCheckId, _eatingTimes);
      this.$message({
        message: '请求成功',
        type: 'success'
      })
    }
  },

  methods: {

    // 测试用按钮
    // ！！！回显单选框数据需为 string
    // @date: 19 - 04 - 23
    checkValue () {
      let that = this;
      console.log("每天主食量：" + that.eatingForm.staple)
      console.log("食物偏好：" +
        "偏好甜食，" + that.eatingForm.eatingPrefer0 +
        "；喜好油炸食品，" + that.eatingForm.eatingPrefer1 +
        "；喜好碳酸饮料，" + that.eatingForm.eatingPrefer2)
      console.log("饮食习惯：" +
        "经常不吃早饭，" + that.eatingForm.eatingHabits0 +
        "；边玩边吃，" + that.eatingForm.eatingHabits1 +
        "；饮食无规律，" + that.eatingForm.eatingHabits2)
    },
    changeValue () {
      this.eatingForm.staple = 1;
      this.eatingForm.eatingPrefer = '1';
    },

    // 对应数据转换 - 每天使用主食量
    changeStapleType (stapleValue) {
      if (stapleValue === 1) {
        return '不食用';
      } else if (stapleValue === 2) {
        return '小于75克'
      } else if (stapleValue === 3) {
        return '75-150克'
      } else if (stapleValue === 4) {
        return '150-225克'
      } else if (stapleValue === 5) {
        return '225-300克'
      } else if (stapleValue === 6) {
        return '大于300克'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每天食用蔬菜量
    changeVegetableType (vegetableValue) {
      if (vegetableValue === 1) {
        return '不食用';
      } else if (vegetableValue === 2) {
        return '小于100克'
      } else if (vegetableValue === 3) {
        return '100-200克'
      } else if (vegetableValue === 4) {
        return '200-300克'
      } else if (vegetableValue === 5) {
        return '300-400克'
      } else if (vegetableValue === 6) {
        return '大于400克'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每周食用海产品量
    changeMarineType (marineValue) {
      if (marineValue === 1) {
        return '不食用';
      } else if (marineValue === 2) {
        return '小于75克'
      } else if (marineValue === 3) {
        return '75-150克'
      } else if (marineValue === 4) {
        return '150-225克'
      } else if (marineValue === 5) {
        return '225-300克'
      } else if (marineValue === 6) {
        return '大于300克'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每周食用鸡蛋量
    changeEggType (eggValue) {
      if (eggValue === 1) {
        return '不食用';
      } else if (eggValue === 2) {
        return '小于3个'
      } else if (eggValue === 3) {
        return '3-5个'
      } else if (eggValue === 4) {
        return '6-8个'
      } else if (eggValue === 5) {
        return '大于8个'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每天食用水果量
    changeFruitType (fruitValue) {
      if (fruitValue === 1) {
        return '不食用';
      } else if (fruitValue === 2) {
        return '小于100克'
      } else if (fruitValue === 3) {
        return '100-200克'
      } else if (fruitValue === 4) {
        return '200-300克'
      } else if (fruitValue === 5) {
        return '300-400克'
      } else if (fruitValue === 6) {
        return '大于400克'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每周食用禽畜肉量
    changeMeatType (meatValue) {
      if (meatValue === 1) {
        return '不食用';
      } else if (meatValue === 2) {
        return '小于150克'
      } else if (meatValue === 3) {
        return '150-250克'
      } else if (meatValue === 4) {
        return '250-350克'
      } else if (meatValue === 5) {
        return '350-500克'
      } else if (meatValue === 6) {
        return '大于500克'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每周饮用牛奶量
    changeMilkType (milkValue) {
      if (milkValue === 1) {
        return '不食用';
      } else if (milkValue === 2) {
        return '小于1000毫升'
      } else if (milkValue === 3) {
        return '1000-1500毫升'
      } else if (milkValue === 4) {
        return '1500-2000毫升'
      } else if (milkValue === 5) {
        return '大于2000毫升'
      } else {
        return ''
      }
    },

    // 对应数据转换 - 每周食用坚果量
    changeNutType (nutValue) {
      if (nutValue === 1) {
        return '不食用';
      } else if (nutValue === 2) {
        return '小于30克'
      } else if (nutValue === 3) {
        return '30-50克'
      } else if (nutValue === 4) {
        return '50-70克'
      } else if (nutValue === 5) {
        return '大于70克'
      } else {
        return ''
      }
    },

    /**
     * @function: 处理数据
     * @author: White
     * @date: 19 - 04 - 11
     * */
    dealEatingFormData (eatingFormObj) {
      const _eatingForm = this.eatingForm;


      /**
       *  @amendContent: 将返回参数（integer类型）转换为 string 类型，即可显示对应的值
       *  @date: 19 - 04 - 24
       *  @2rdAmend: 增加一个修正，防止出现 null 后续不会执行的情况
       *  @date: 19 - 04 - 28
       * */
      // @log: 所有内容均需要填写，否则从返回 NULL 开始，之后的数据将回显不成功
      // 将从后台获取到的值赋给 form

      if (eatingFormObj.stapleFood === null) {
        _eatingForm.staple = ''
      } else {
        _eatingForm.staple = eatingFormObj.stapleFood.toString();
      }

      // _eatingForm.staple = this.changeStapleType(eatingFormObj.stapleFood);

      if (eatingFormObj.vegetables === null) {
        _eatingForm.vegetable = ''
      } else {
        _eatingForm.vegetable = eatingFormObj.vegetables.toString();
      }

      // _eatingForm.vegetable = this.changeVegetableType(eatingFormObj.vegetables);

      if (eatingFormObj.marineProducts === null) {
        _eatingForm.marine = ''
      } else {
        _eatingForm.marine = eatingFormObj.marineProducts.toString();
      }

      // _eatingForm.marine = this.changeMarineType(eatingFormObj.marineProducts);

      if (eatingFormObj.egg === null) {
        _eatingForm.egg = ''
      } else {
        _eatingForm.egg = eatingFormObj.egg.toString();
      }

      // _eatingForm.egg = this.changeEggType(eatingFormObj.egg);

      if (eatingFormObj.fruits === null) {
        _eatingForm.fruit = ''
      } else {
        _eatingForm.fruit = eatingFormObj.fruits.toString();
      }

      // _eatingForm.fruit = this.changeFruitType(eatingFormObj.fruits);
        // 缺少肉类，已加

      if (eatingFormObj.poultryMeat === null) {
        _eatingForm.meat = ''
      } else {
        _eatingForm.meat = eatingFormObj.poultryMeat.toString();
      }

      // _eatingForm.meat = this.changeMeatType(eatingFormObj.poultryMeat);

      if (eatingFormObj.milk === null) {
        _eatingForm.milk = ''
      } else {
        _eatingForm.milk = eatingFormObj.milk.toString();
      }

      // _eatingForm.milk = this.changeMilkType(eatingFormObj.milk);

      if (eatingFormObj.nut === null) {
        _eatingForm.nut = ''
      } else {
        _eatingForm.nut = eatingFormObj.nut.toString();
      }

      // _eatingForm.nut = this.changeNutType(eatingFormObj.nut);
      // 饮食偏好
      _eatingForm.eatingPrefer0 = eatingFormObj.prefersSweet;
      _eatingForm.eatingPrefer1 = eatingFormObj.prefersFRY;
      _eatingForm.eatingPrefer2 = eatingFormObj.prefersSodas;

      // 饮食习惯
      _eatingForm.eatingHabits0 = eatingFormObj.withoutBreakfast;
      _eatingForm.eatingHabits1 = eatingFormObj.ateAndPlayed;
      _eatingForm.eatingHabits2 = eatingFormObj.irregularDiet;
    },

    /**
     * @function: 获取数据
     * @author: White
     * @date: 19 - 04 - 11
     * */
    getEatingFormData (eatingUserParam, times) {
      this.axios.get('http://localhost:8082/dietarySurvey/search', {
        params: {
          guardian_phone: eatingUserParam,
          inspectOrder: times
        }
      }).then((response) => {
        // 控制台打印请求数据
        console.log(response)
        if (response.code = '200') {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          if (response.msg = '请求成功') {
            let eatingFormData = response.data;
            // 将请求数据传入处理函数
            this.dealEatingFormData(eatingFormData.data);
          }
        }
      })
    },

    /**
     * @function: 提交表单数据
     * @author: White
     * @date: 19 - 04 - 11
     * */
    eatingSubmit() {
      // console.log('submit!');
      // console.log(this.eatingForm)
      // console.log('食物偏好：' + this.eatingForm.eatingPrefer)
      // console.log('饮食习惯：' + this.eatingForm.eatingHabits)

      let that = this;
      // 表单数据序列化
      let eatingFormData = new FormData();
      // 拼接 key 与 value
      // 获取当前用户 ID
      let eatingCheckId = this.$store.getters.getId;
      const times = this.$store.getters.getMeasuresTimes;

      eatingFormData.append('guardian_phone', eatingCheckId);
      eatingFormData.append('inspectOrder', times);

      eatingFormData.append('stapleFood', that.eatingForm.staple);
      eatingFormData.append('vegetables', that.eatingForm.vegetable);
      eatingFormData.append('marineProducts', that.eatingForm.marine);
      eatingFormData.append('egg', that.eatingForm.egg);
      eatingFormData.append('fruits', that.eatingForm.fruit);
      // 缺少肉类，已加
      eatingFormData.append('poultryMeat', that.eatingForm.meat);
      eatingFormData.append('milk', that.eatingForm.milk);
      eatingFormData.append('nut', that.eatingForm.nut);

      // 饮食偏好
      eatingFormData.append('prefersSweet', that.eatingForm.eatingPrefer0);
      eatingFormData.append('prefersFRY', that.eatingForm.eatingPrefer1);
      eatingFormData.append('prefersSodas', that.eatingForm.eatingPrefer2);
      // 饮食习惯
      eatingFormData.append('withoutBreakfast', that.eatingForm.eatingHabits0);
      eatingFormData.append('ateAndPlayed', that.eatingForm.eatingHabits1);
      eatingFormData.append('irregularDiet', that.eatingForm.eatingHabits2);

      // 提交
      this.axios.post('http://localhost:8082/dietarySurvey', eatingFormData, {
        // 定义表头
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        // 控制台打印返回数据
        if (response.code = '200') {
          this.$message({ message: '提交成功，进入下一项', type: 'success' });
          // 成功则进入下一项
          this.$router.push('/sportsExamine')
        } else {
          this.$message({ message: response.msg, type: 'success' });
        }
      },err => {
        // 打印错误信息
        console.log("错误信息：" + err);
      }).catch(
        // 异常处理 ...
      )
    },

    /**
     *  @function: 返回主页
     *  @author: White
     * */
    eatingBackToHome () {
      this.$router.push('/Home')
    }
  }
}
</script>

<style scoped>
.region {
  width: 90%;
  height: 460px;
  display: flex;
  align-items: center;
}
.region-0 {
  height: 410px;
  flex: 0 0 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px 0 15px;
  border-radius: 20px;
  padding-top: 20px;
  /*overflow-y: scroll;*/
}
.region-1 {
  height: 410px;
  flex: 0 0 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px 0 15px;
  border-radius: 20px;
  padding-top: 20px;
  /*overflow-y: scroll;*/
}
.eating-habits {
  width: 90%;
  display: flex;
  align-items: center;
}
.eatingHabits0 {
  flex: 0 0 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 10px 20px 0 15px;
  border-radius: 20px;
  padding-top: 20px;
}
.submit-button {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
