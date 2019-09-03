<template>
  <el-form ref="form" :model="symptomForm" label-width="60px">
    <div class="content">

      <!-- 既往病史 -->
      <div class="birth-information">
        <div class="label"
             style="width: 110px;
             font-size: 20px;
             margin-bottom: 27px;
             border-radius: 0 20px 20px 0;
             background-color: rgba(25,132,198,0.6);
             color: rgb(255,255,255);
             padding-left: 10px">妊娠概况</div>

        <!-- 测试按钮 -->
        <!--<el-button @click="testChecked">选中</el-button>-->

        <!-- 之前使用 checkbox-group 的写法，已替换 -->
      <!--<el-form-item label="出生情况：">-->
      <!--<el-checkbox-group v-model="form.birthStatus">-->
        <!--&lt;!&ndash;<el-checkbox v-for="items in form.birthStatusItems"&ndash;&gt;-->
                     <!--&lt;!&ndash;label="items.label"&ndash;&gt;-->
                     <!--&lt;!&ndash;:key="items.id"&ndash;&gt;-->
                     <!--&lt;!&ndash;@change="changeOption(items)"&ndash;&gt;-->
                     <!--&lt;!&ndash;value="birthStatus.value">{{ items.label }}</el-checkbox>&ndash;&gt;-->
        <!--<el-checkbox :label="1">早产儿</el-checkbox>-->
        <!--<el-checkbox :label="2">巨大儿</el-checkbox>-->
        <!--<el-checkbox :label="3">低体重儿</el-checkbox>-->
        <!--<el-checkbox :label="4">多胎/双胎</el-checkbox>-->
      <!--</el-checkbox-group>-->
    <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">1）出生情况：</el-aside>
          <el-checkbox v-model="symptomForm.data_00" :disabled="checkNormal">
            <div style="font-size: 16px">正常</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_0" :disabled="checkData_0">
            <div style="font-size: 16px">早产儿</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_1" :disabled="checkData_1">
            <div style="font-size: 16px">巨大儿</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_2" :disabled="checkData_2">
            <div style="font-size: 16px">低体重儿</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_3" :disabled="checkData_3">
            <div style="font-size: 16px">双胎/多胎</div>
          </el-checkbox>
        </el-form-item>

        <!-- 测试按钮 -->
        <!--<el-button @click="testChecked">选中</el-button>-->

        <!-- 被替换的 -->
        <!--<el-form-item label="母亲妊娠不良习惯：">-->
          <!--<el-checkbox-group v-model="form.worseHadit">-->
            <!--<el-checkbox :label="1">饮酒</el-checkbox>-->
            <!--<el-checkbox :label="2">吸烟</el-checkbox>-->
            <!--<el-checkbox :label="3">素食</el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">2）母亲妊娠不良习惯：</el-aside>
          <el-checkbox v-model="symptomForm.data_4">
            <div style="font-size: 16px">饮酒</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_5">
            <div style="font-size: 16px">吸烟</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_6">
            <div style="font-size: 16px">素食</div>
          </el-checkbox>
        </el-form-item>

        <!--&lt;!&ndash; 测试标签 ：每个新的 group 会自动换行 &ndash;&gt;-->
        <!--&lt;!&ndash; 新写法：不使用 checkbox-group &ndash;&gt;-->
        <!--<el-form-item>-->
          <!--<el-checkbox-group v-model="form.data_0">-->
          <!--<el-checkbox :label="1">吸烟</el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--&lt;!&ndash;<el-form-item v-model="form.data_1">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-checkbox label="1">素食</el-checkbox>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--<el-form-item label="test:">-->
          <!--<el-checkbox v-model="form.data_1">素食</el-checkbox>-->
          <!--<el-checkbox v-model="form.data_2">饮酒</el-checkbox>-->
        <!--</el-form-item>-->


        <!--<el-form-item label="母亲妊娠疾病情况：">-->
          <!--<el-checkbox-group v-model="form.gestationDiseaseStatus">-->
            <!--<el-checkbox label="妊娠期糖尿病" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="妊娠期高血压" name="type" value="2"></el-checkbox>-->
            <!--<el-checkbox label="缺钙" name="type" value="3"></el-checkbox>-->
            <!--<el-checkbox label="维生素D缺乏" name="type" value="4"></el-checkbox>-->
            <!--<el-checkbox label="维生素A缺乏" name="type" value="5"></el-checkbox>-->
            <!--<el-checkbox label="缺锌" name="type" value="6"></el-checkbox>-->
            <!--<el-checkbox label="缺铁性贫血" name="type" value="7"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">3）母亲妊娠疾病情况：</el-aside>
          <el-checkbox v-model="symptomForm.data_7">
            <div style="font-size: 16px">妊娠期糖尿病</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_8">
            <div style="font-size: 16px">妊娠期高血压</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_9">
            <div style="font-size: 16px">缺钙</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_10">
            <div style="font-size: 16px">维生素D缺乏</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_11">
            <div style="font-size: 16px">维生素A缺乏</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_12">
            <div style="font-size: 16px">缺锌</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_13">
            <div style="font-size: 16px">缺铁性贫血</div>
          </el-checkbox>
        </el-form-item>

      </div>

      <!-- 孩子临床表现 -->
      <div class="clinic">
        <div class="label"
             style="width: 205px;
             font-size: 20px;
             margin-bottom: 27px;
             border-radius: 0 20px 20px 0;
             background-color: rgba(25,132,198,0.6);
             color: rgb(255,255,255);padding-left: 10px">孩子临床表现情况</div>
        <!--<el-form-item label="头发：">-->
          <!--<el-checkbox-group v-model="form.hairStatus">-->
            <!--<el-checkbox label="细软" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="稀少" name="type" value="2"></el-checkbox>-->
            <!--<el-checkbox label="变色" name="type" value="3"></el-checkbox>-->
            <!--<el-checkbox label="变脆" name="type" value="4"></el-checkbox>-->
            <!--<el-checkbox label="易脱落" name="type" value="5"></el-checkbox>-->
            <!--<el-checkbox label="环形脱发" name="type" value="6"></el-checkbox>-->
            <!--<el-checkbox label="干燥" name="type" value="7"></el-checkbox>-->
            <!--<el-checkbox label="枕秃" name="type" value="8"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">1）头发：</el-aside>
          <el-checkbox v-model="symptomForm.data_14">
            <div style="font-size: 16px">细软</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_15">
            <div style="font-size: 16px">稀少</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_16">
            <div style="font-size: 16px">变色</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_17">
            <div style="font-size: 16px">变脆</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_18">
            <div style="font-size: 16px">易脱落</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_19">
            <div style="font-size: 16px">环形脱发</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_20">
            <div style="font-size: 16px">干燥</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_21">
            <div style="font-size: 16px">枕秃</div>
          </el-checkbox>
        </el-form-item>

        <!--<el-form-item label="眼睛：">-->
          <!--<el-checkbox-group v-model="form.eyesStatus">-->
            <!--<el-checkbox label="干眼症" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="角膜软化" name="type" value="2"></el-checkbox>-->
            <!--<el-checkbox label="角膜溃疡" name="type" value="3"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">2）眼睛：</el-aside>
          <el-checkbox v-model="symptomForm.data_22">
            <div style="font-size: 16px">干眼症</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_23">
            <div style="font-size: 16px">角膜软化</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_24">
            <div style="font-size: 16px">角膜溃疡</div>
          </el-checkbox>
        </el-form-item>

        <!--<el-form-item label="皮肤：">-->
          <!--<el-checkbox-group v-model="form.skinStatus">-->
            <!--<el-checkbox label="干燥起皮" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="脱屑" name="type" value="2"></el-checkbox>-->
            <!--<el-checkbox label="毛囊角化性丘疹" name="type" value="3"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">3）皮肤：</el-aside>
          <el-checkbox v-model="symptomForm.data_25">
            <div style="font-size: 16px">干燥起皮</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_26">
            <div style="font-size: 16px">脱屑</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_27">
            <div style="font-size: 16px">毛囊角化性丘疹</div>
          </el-checkbox>
        </el-form-item>

        <!--<el-form-item label="口腔：">-->
          <!--<el-checkbox-group v-model="form.mouthStatus">-->
            <!--<el-checkbox label="地图舌" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="反复口腔溃疡" name="type" value="2"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">4）口腔：</el-aside>
          <el-checkbox v-model="symptomForm.data_28">
            <div style="font-size: 16px">地图舌</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_29">
            <div style="font-size: 16px">反复口腔溃疡</div>
          </el-checkbox>
        </el-form-item>

        <!--<el-form-item label="牙齿：">-->
          <!--<el-checkbox-group v-model="form.toothStatus">-->
            <!--<el-checkbox label="牙釉质剥脱" name="type" value="1"></el-checkbox>-->
            <!--<el-checkbox label="易发生龋齿" name="type" value="2"></el-checkbox>-->
            <!--<el-checkbox label="婴儿出牙晚" name="type" value="3"></el-checkbox>-->
            <!--<el-checkbox label="牙龈出血" name="type" value="4"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->

        <!-- 每个选项对应一个字段 -->
        <el-form-item label="">
          <el-aside style="font-size: 18px;font-weight: 900">5）牙齿：</el-aside>
          <el-checkbox v-model="symptomForm.data_30">
            <div style="font-size: 16px">牙釉质剥脱</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_31">
            <div style="font-size: 16px">易发生龋齿</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_32">
            <div style="font-size: 16px">婴儿出牙晚</div>
          </el-checkbox>
          <el-checkbox v-model="symptomForm.data_33">
            <div style="font-size: 16px">牙龈出血</div>
          </el-checkbox>
        </el-form-item>

      </div>
    </div>

    <div class="submit-button">
      <el-form-item>
        <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="symBackTo()">返回</el-button>
        <el-button size="medium" type="primary" @click="onSubmit('form')">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        // 区分出生情况正常与其他
        checkNormal: false,
        checkData_0: false,
        checkData_1: false,
        checkData_2: false,
        checkData_3: false,
        // isOrNotChecked: false,
        symptomForm: {
          // 状态初始化，均设为未选
          // 出生情况
          data_00: false,  // 正常
          data_0: false,  // 早产儿
          data_1: false,  // 巨大儿
          data_2: false,  // 低体重儿
          data_3: false,  // 多胎
          // 母亲妊娠时期不良习惯
          data_4: false,  // 饮酒
          data_5: false,  // 吸烟
          data_6: false,  // 素食
          // 母亲妊娠时期疾病情况
          data_7: false,  // 妊娠期糖尿病
          data_8: false,  // 妊娠期高血压
          data_9: false,  // 缺钙
          data_10: false, // 维生素D缺乏
          data_11: false, // 维生素A缺乏
          data_12: false, // 缺锌
          data_13: false, // 缺铁性贫血
          // 孩子临床表现 - 头发
          data_14: false, // 细软
          data_15: false, // 稀少
          data_16: false, // 变色
          data_17: false, // 变脆
          data_18: false, // 易脱落
          data_19: false, // 环形脱发
          data_20: false, // 干燥
          data_21: false, // 枕秃
          // 孩子临床表现 - 眼睛
          data_22: false, // 干眼症
          data_23: false, // 角膜软化
          data_24: false, // 角膜溃疡
          // 孩子临床表现 - 皮肤
          data_25: false, // 干燥起皮
          data_26: false, // 脱屑
          data_27: false, // 毛囊角化性丘疹
          // 孩子临床表现 - 口腔
          data_28: false, // 地图舌
          data_29: false, // 反复口腔溃疡
          // 孩子临床表现 - 牙齿
          data_30: false, // 牙釉质脱落
          data_31: false, // 易发生智齿
          data_32: false, // 婴儿出牙晚
          data_33: false  // 牙龈出血
        }
      }
    },

    /**
     * @attribute: watch
     * @author: White
     * @date: 19 - 07 - 02
     * */
    watch: {
      symptomForm: {
        handler (val, newVal) {
          console.log('old value:' + val.data_00, 'new value:' + newVal.data_00);
          // 出生情况选择了正常，或是没选择正常
          if (val.data_00 === true) {
            this.checkData_0 = true;
            this.checkData_1 = true;
            this.checkData_2 = true;
            this.checkData_3 = true;
          } else if (val.data_1 === true) {
            this.checkNormal = true;
            this.checkData_2 = true;

            /**
             * @exception: 选择巨大儿不能关闭低体重儿
             * @resolve: 修改算法，已解决
             * */

          } else if (val.data_2 === true) {
            this.checkData_1 = true;
            this.checkNormal = true;
          } else {
            // 选择了不好的情况 - 任意一个则取消正常的选择
            // 实质只需将 早产儿、多胎 做或运算
            this.checkNormal = val.data_0 === true || val.data_1 === true || val.data_2 === true || val.data_3 === true;
            this.checkData_0 = false;
            this.checkData_1 = false;
            this.checkData_2 = false;
            this.checkData_3 = false;
          }
        },
        deep: true,
        immediate: true
      }
    },

    /**
     *  @attribute: 组件渲染时调用钩子
     *  @author: White
     *  @date: 19 - 04 - 12
     * */
    mounted () {
      // this.getFormData()
      // 获取全局状态 ID
      let _symptomCheckId = this.$store.getters.getId;
      const _symptomTimes = this.$store.getters.getMeasuresTimes;
      let that = this

      if (_symptomCheckId === '') {
        // this.$message({
        //   message: '请先填写个人基本信息',
        //   type: 'warning'
        // })
        this.$alert('请先填写您的基本信息', '提示！', {
          confirmButtonText: '确定',
          callback: action => {
            console.log("确认信息：" + action)
          }
        })
      } else {
        // 将当前用户 ID 传入请求当前用户已填写的数据的函数
        this.getFormData(_symptomCheckId, _symptomTimes)
        console.log('data_0的值：' + that.symptomForm.data_0)
        // this.changeChecked(that.symptomForm.data_00)
        // if (that.symptomForm.data_0 === true) {
        //   that.isOrNotChecked = true;
        // }
      }
    },

    methods: {
      /**
       * @function: 回显勾选
       * @author: White
       * @date: 19 - 04 - 22
       * */
      // changeChecked (checkedValue) {
      //   if (checkedValue === true) {
      //     this.isOrNotChecked = true
      //   }
      // },

      // 测试方法
      // testChecked () {
      //   // 查看 data_00
      //   console.log('data_00：' + this.symptomForm.data_00);
      // },

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
       * @function: 处理数据
       * @author: White
       * @date: 19 - 04 - 11
       * */
      dealFormData (symptomFormObj) {
        let _formData = this.symptomForm;
        // 每个选项赋予对应字段的数据，还需开发
        // _formData.data_00 = symptomformObj.normal;

        // 测试字段
        this.isOrNotChecked = symptomFormObj.normal;

        // 布尔转换测试
        // @date: 19 - 04 - 23
        // @amend: 后台传回的 string 类型，需转为 boolean
        // _formData.data_00 = Boolean(symptomFormObj.normal);

        console.log("normal的类型：" + typeof symptomFormObj.normal);

        // 查看值是否回传
        console.log("data_00的值：" + _formData.data_00);
        /**
         * @exception: 出现未选择既往病史，临床表现不能显示的 error
         * @resolve: 将 _formData 以 let 声明，而非 const
         * */
        _formData.data_00 = this.changeStringToBool(symptomFormObj.normal);
        _formData.data_0 = this.changeStringToBool(symptomFormObj.premature);
        _formData.data_1 = this.changeStringToBool(symptomFormObj.macrosomia);
        _formData.data_2 = this.changeStringToBool(symptomFormObj.lowBirthWeight);
        _formData.data_3 = this.changeStringToBool(symptomFormObj.polyembryony);
        _formData.data_4 = this.changeStringToBool(symptomFormObj.drink);
        _formData.data_5 = this.changeStringToBool(symptomFormObj.smoke);
        _formData.data_6 = this.changeStringToBool(symptomFormObj.vegetarian);
        _formData.data_7 = this.changeStringToBool(symptomFormObj.diabetes);
        _formData.data_8 = this.changeStringToBool(symptomFormObj.hypertension);
        _formData.data_9 = this.changeStringToBool(symptomFormObj.acalcerosis);
        _formData.data_10 = this.changeStringToBool(symptomFormObj.hypovitaminosisD);
        _formData.data_11 = this.changeStringToBool(symptomFormObj.hypovitaminosisA);
        _formData.data_12 = this.changeStringToBool(symptomFormObj.zincDeficiency);
        _formData.data_13 = this.changeStringToBool(symptomFormObj.anemia);
        _formData.data_14 = this.changeStringToBool(symptomFormObj.hairThin);
        _formData.data_15 = this.changeStringToBool(symptomFormObj.hairFew);
        _formData.data_16 = this.changeStringToBool(symptomFormObj.hairchangeColor);
        _formData.data_17 = this.changeStringToBool(symptomFormObj.hairEmbrittlement);
        _formData.data_18 = this.changeStringToBool(symptomFormObj.hairCaducous);
        _formData.data_19 = this.changeStringToBool(symptomFormObj.hairBaldness);
        _formData.data_20 = this.changeStringToBool(symptomFormObj.hairDry);
        _formData.data_21 = this.changeStringToBool(symptomFormObj.hairPressureAlopecia);
        _formData.data_22 = this.changeStringToBool(symptomFormObj.xerophthalmia);
        _formData.data_23 = this.changeStringToBool(symptomFormObj.keratomalacia);
        _formData.data_24 = this.changeStringToBool(symptomFormObj.keratohelcosis);
        _formData.data_25 = this.changeStringToBool(symptomFormObj.peeling);
        _formData.data_26 = this.changeStringToBool(symptomFormObj.furfur);
        _formData.data_27 = this.changeStringToBool(symptomFormObj.keratosisPilaris);
        _formData.data_28 = this.changeStringToBool(symptomFormObj.geographicTongue);
        _formData.data_29 = this.changeStringToBool(symptomFormObj.cankerSore);
        _formData.data_30 = this.changeStringToBool(symptomFormObj.enamel);
        _formData.data_31 = this.changeStringToBool(symptomFormObj.opsigenes);
        _formData.data_32 = this.changeStringToBool(symptomFormObj.odontiasis);
        _formData.data_33 = this.changeStringToBool(symptomFormObj.bleedingGums);



        // 将从后台拿取到的 data 赋值给 ruleForm
        // _formData.name = obj.name;
        // _formData.blood = this.changeBloodType(obj.blood);
        // _formData.educationalOfParents = this.changeParentsEducationType(obj.educationalOfParents);
        // _formData.guardian = obj.guardian;
        // _formData.height = obj.height;
        // _formData.birth = obj.birth;
        // _formData.nation = this.changeNationType(obj.nation);
        // _formData.remark = obj.remark;
        // _formData.guardian_phone = obj.guardian_phone;
      },

      /**
       * @function: 请求获取数据
       * @author: White
       * @date: 19 - 04 - 11
       * */
      getFormData (symptomId, symptomTimes) {
        // 获取全局状态 ID
        // const _symptomCheckId = this.$store.getters.getId;
        this.axios.get('http://localhost:8082/pastMedicalHistory/search', {
          params: {
            guardian_phone: symptomId,
            inspectOrder: symptomTimes
          }
        }).then((response) => {
          // 返回参数
          console.log('返回参数：')
          console.log(response)
          if (response.code = '200') {
            if (response.msg = "请求成功") {
              let symptomRequestData = response.data.data;
              this.$message({ message: response.msg, type: 'success' });
              // 返回参数的数据
              console.log('返回参数的数据：')
              console.log(symptomRequestData);
              // 将数据传入处理函数
              this.dealFormData(symptomRequestData);
              return
            }
          } else {
            this.$message({ message: response.msg, type: 'warning' });
          }
        }, err => {
          console.log(err);
        }).catch(
          // 异常处理
        );
      },

      /**
       * @function: 提交表单数据
       * @author: White
       * @date: 19 - 04 - 11
       * @amend: 19 - 04 - 17
       * */
      onSubmit(formName) {
        console.log('submit!');
        // console.log(formName.birthStatus);
        // console.log(formName.worseHadit);
        console.log(' data_0的值： ' + this.symptomForm.data_0);

        // 获取当前 ID
        let symptomCheckId = this.$store.getters.getId;
        const symptomTimes = this.$store.getters.getMeasuresTimes;
        let that = this;
        // 表单数据的序列化
        let information = new FormData();
        // 将 key 与 value 进行拼接
        // 附带当前用户 ID
        information.append('guardian_phone', symptomCheckId);
        /**
         * 增加一个主键 - 检测次数
         */
        information.append('inspectOrder', symptomTimes)

        information.append('normal', that.symptomForm.data_00);
        information.append('premature', that.symptomForm.data_0);
        information.append('Macrosomia', that.symptomForm.data_1);
        information.append('lowBirthWeight', that.symptomForm.data_2);
        information.append('polyembryony', that.symptomForm.data_3);
        information.append('drink', that.symptomForm.data_4);
        information.append('smoke', that.symptomForm.data_5);
        information.append('vegetarian', that.symptomForm.data_6);
        information.append('diabetes', that.symptomForm.data_7);
        information.append('hypertension', that.symptomForm.data_8);
        information.append('acalcerosis', that.symptomForm.data_9);
        information.append('hypovitaminosisD', that.symptomForm.data_10);
        information.append('hypovitaminosisA', that.symptomForm.data_11);
        information.append('zincDeficiency', that.symptomForm.data_12);
        information.append('anemia', that.symptomForm.data_13);
        information.append('hairThin', that.symptomForm.data_14);
        information.append('hairFew', that.symptomForm.data_15);
        information.append('hairchangeColor', that.symptomForm.data_16);
        information.append('hairEmbrittlement', that.symptomForm.data_17);
        information.append('hairCaducous', that.symptomForm.data_18);
        information.append('hairBaldness', that.symptomForm.data_19);
        information.append('hairDry', that.symptomForm.data_20);
        information.append('hairPressureAlopecia', that.symptomForm.data_21);
        information.append('xerophthalmia', that.symptomForm.data_22);
        information.append('keratomalacia', that.symptomForm.data_23);
        information.append('keratohelcosis', that.symptomForm.data_24);
        information.append('peeling', that.symptomForm.data_25);
        information.append('furfur', that.symptomForm.data_26);
        information.append('keratosisPilaris', that.symptomForm.data_27);
        information.append('geographicTongue', that.symptomForm.data_28);
        information.append('cankerSore', that.symptomForm.data_29);
        information.append('enamel', that.symptomForm.data_30);
        information.append('opsigenes', that.symptomForm.data_31);
        information.append('odontiasis', that.symptomForm.data_32);
        information.append('bleedingGums', that.symptomForm.data_33);

        // 校验表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://localhost:8082/pastMedicalHistory', information ,{
              // 定义表头
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
              // 判断返回值
              if (response.code = '200') {
                this.$message({ message: '提交成功，进入下一项', type: 'success' });
                // 提交成功则进入下一项 - 实验室检测
                this.$router.push('/laboratory')
              } else {
                this.$message({ message: '提交失败', type: 'warning' });
              }
            },err => {
              // 打印错误信息
              console.log('错误信息：' + err)
            }).catch(
              // 异常处理 ...
            )
          }
        })

        // 未加校验的提交方式
        // this.axios.post('' , information , {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }).then((response) => {
        //   if (response.code = '200') {
        //     this.$message({ message: '提交成功，进入下一步', type: 'success' });
        //     this.$router.push('');
        //   } else {
        //     this.$message({ message: '提交失败', type: 'warning' });
        //   }
        // }).catch(
        //
        // )
      },

      /**
       * @function: 返回主页面
       * @author: White
       * @date: 19 - 04 - 11
       * */
      symBackTo () {
        this.$router.push('/Home');
      }
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    width: 80%;
  }
  .content .birth-information {
    flex: 0 0 50%;
    background-color: rgb(255, 255, 255);
    margin: 0 20px 0 0;
    border-radius: 20px;
    padding: 20px 32px 0 0;
  }
  .content .clinic {
    flex: 0 0 50%;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    padding: 20px 32px 0 0;
  }
  .submit-button {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
</style>
