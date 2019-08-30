<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
      <div class="content">
      <!-- 必填内容 -->
      <div class="content-must">
        <!-- 标签 -->
        <div class="label" style="width: 120px;
        font-size: 20px;
        border-radius: 0 20px 20px 0;
        background-color: rgba(25,132,198,0.6);
        margin-bottom: 27px;
        color: rgb(255,255,255);
        padding-left: 10px">必填信息</div>
        <!--<el-form-item label="用户编号" prop="userId" style="width: 480px">-->
          <!--<el-input v-model="ruleForm.userId"></el-input>-->
        <!--</el-form-item>-->

        <!-- @Date: 19 - 07 - 04 -->
        <!-- @Description: 所有的调查组件表单不再使用 label 作为每一项的类目名，替换使用 el-aside 标签来放大字号 -->

        <!-- 用户 ID -->
        <el-form-item label="" prop="guardian_phone" style="width: 520px">
          <!-- slot for large font size: date, 19 - 07 - 03 -->
          <el-aside style="font-size: 18px;font-weight: 900">* 监护人手机号：</el-aside>
          <el-input :disabled="isEdited" v-model="ruleForm.guardian_phone"></el-input>
        </el-form-item>

        <!-- 姓名 -->
        <el-form-item label="" prop="name" style="width: 520px">
          <!-- slot for large font size: date, 19 - 07 - 03 -->
          <el-aside style="font-size: 18px;font-weight: 900">* 姓名：</el-aside>
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <!-- 性别 -->
        <!-- 传入服务端的实际值是 1/2 -->
        <el-form-item label="" prop="sex">
          <!-- slot for large font size: date, 19 - 07 - 03 -->
          <el-aside style="font-size: 18px;font-weight: 900">* 性别：</el-aside>
          <el-select v-model="ruleForm.sex" placeholder="请选择您的性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>

        <!-- 身高 -->
        <el-form-item label="" prop="height" style="width: 480px">
          <!-- slot for large font size: date, 19 - 07 - 03 -->
          <el-aside style="font-size: 18px;font-weight: 900">* 身高：</el-aside>
          <el-input v-model="ruleForm.height">
            <!-- 单位插槽 -->
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>

        <!--
      <el-form-item label="体重" prop="weight" style="width: 480px">
        <el-input v-model="ruleForm.weight">
          <template slot="append">k g</template>
        </el-input>
      </el-form-item>
        -->

        <!-- 出生日期 -->
        <el-form-item label="" required>
          <!-- slot for large font size: date, 19 - 07 - 03 -->
          <el-aside style="font-size: 18px;font-weight: 900">* 出生日期：</el-aside>
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker :disabled="isEdited" type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>-->
        </el-form-item>

        <!-- 是否增加辅食 -->
        <el-form-item label="是否增加辅食" prop="resource" v-if="showOtherFood">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--个人状态，暂未定
      <el-form-item label="状态" prop="">
        <el-select v-model="ruleForm.region" placeholder="">
          <el-option label="" value=""></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item> -->
      </div>

      <!-- 选填内容 -->
      <div class="chosen-content">
        <!-- 标签 -->
        <div class="label" style="width: 120px;
        font-size: 20px;
        margin-bottom: 27px;
        border-radius: 0 20px 20px 0;
        background-color: rgba(25,132,198,0.6);
        color: rgb(255,255,255);
        padding-left: 10px">选填信息</div>

        <!-- 民族 - 回显后转换的数据类型需修改 -->
        <el-form-item label="" prop="nation">
          <el-aside style="font-size: 18px;font-weight: 900">民族：</el-aside>
          <el-select v-model="ruleForm.nation" placeholder="请选择您的民族">
            <el-option label="汉族" value="1"></el-option>
            <el-option label="壮族" value="2"></el-option>
            <el-option label="满族" value="3"></el-option>
            <el-option label="回族" value="4"></el-option>
            <el-option label="苗族" value="5"></el-option>
            <el-option label="维吾尔族" value="6"></el-option>
            <el-option label="土家族" value="7"></el-option>
            <el-option label="彝族" value="8"></el-option>
            <el-option label="蒙古族" value="9"></el-option>
            <el-option label="藏族" value="10"></el-option>
            <el-option label="布依族" value="11"></el-option>
            <el-option label="侗族" value="12"></el-option>
            <el-option label="瑶族" value="13"></el-option>
            <el-option label="其它" value="14"></el-option>
          </el-select>
        </el-form-item>

        <!-- 血型 - 回显后转换的数据类型需修改 -->
        <el-form-item label="" prop="blood">
          <el-aside style="font-size: 18px;font-weight: 900">血型：</el-aside>
          <el-select v-model="ruleForm.blood" placeholder="请选择您的血型">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
            <el-option label="AB" value="3"></el-option>
            <el-option label="O" value="4"></el-option>
            <el-option label="ABO" value="5"></el-option>
            <el-option label="Rh" value="6"></el-option>
          </el-select>
        </el-form-item>

        <!-- 监护人姓名 -->
        <el-form-item label="" prop="guardian" style="width: 480px">
          <el-aside style="font-size: 18px;font-weight: 900">监护人：</el-aside>
          <el-input v-model="ruleForm.guardian"></el-input>
        </el-form-item>


        <!-- 家长受教育程度 - 回显后转换的数据类型需修改 -->
        <el-form-item label="" prop="educationalOfParents">
          <el-aside style="font-size: 18px;font-weight: 900">家长受教育程序：</el-aside>
          <el-select v-model="ruleForm.educationalOfParents" placeholder="请选择您的家长受教育程度">
            <el-option label="博士" value="1"></el-option>
            <el-option label="硕士" value="2"></el-option>
            <el-option label="本科" value="3"></el-option>
            <el-option label="高中" value="4"></el-option>
            <el-option label="初中及以下" value="5"></el-option>
          </el-select>
        </el-form-item>

        <!-- 备注内容 -->
        <el-form-item label="" prop="remark" style="width: 530px">
          <el-aside style="font-size: 18px;font-weight: 900">备注：</el-aside>
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>

      </div>
      </div>

      <!--<el-form-item label="" prop="">
        <el-switch v-model=""></el-switch>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox-group v-model="">
          <el-checkbox label="" name=""></el-checkbox>
          <el-checkbox label="" name=""></el-checkbox>
          <el-checkbox label="" name=""></el-checkbox>
          <el-checkbox label="" name=""></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-radio-group v-model="">
          <el-radio label=""></el-radio>
          <el-radio label=""></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="desc">
        <el-input type="" v-model=""></el-input>
      </el-form-item> -->

      <div class="submit-button">
      <el-form-item>
        <!-- 新建按钮，仅在新建时显示 -->
        <el-button type="primary" @click="submitForm('ruleForm')" v-if="isCreateNewUser">立即创建</el-button>
        <!-- 修改按钮，仅在修改时显示 -->
        <el-button type="primary" @click="editSubmit('ruleForm')" v-if="isModifyUser">修改</el-button>
        <!-- 新增检测的按钮 -->
        <el-button type="success" @click="newMeasuresSave()" v-if="isNewMeasures">保存</el-button>
        <el-button @click="resetForm('ruleForm')" v-show="showReset">重置</el-button>
        <el-button type="warning" @click="backToHome()">返回</el-button>
      </el-form-item>
      </div>

    </el-form>
</template>

<script>
  // 引入 queryString ，暂时不使用
  import qs from 'qs'
export default {

    // 初始化状态
  data() {
    return {
      // 是否增加辅食
      showOtherFood: false,
      // 是否显示新建按钮
      isCreateNewUser: true,
      // 是否显示修改按钮
      isModifyUser: false,
      // 修改时用户编号，出生日期不可更改
      isEdited: false,
      // 重置按钮，修改时关闭
      showReset: true,
      isNewMeasures: false,

      // 信息表单
      ruleForm: {
        // userId: '',
        guardian_phone: '',
        name: '',
        sex: '',
        height: '',
        birth: '',
        nation: '',
        blood: '',
        guardian: '',
        educationalOfParents: '',
        remark: ''
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '请输入个人姓名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        guardian_phone: [
          { required: true, message: '此手机号作为您的唯一ID', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入 11 位的手机号', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' },
          // { min: 1, max: 1, message: '请选择您的性别', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入个人身高', trigger: 'blur' },
          { min: 2, max: 3, message: '身高至少三位数哦！', trigger: 'blur' }
        ],
        // weight: [
        //   { required: true, message: '请输入个人体重', trigger: 'blur' },
        //   { min: 2, max: 3, message: '体重请输入两位哦！', trigger: 'blur' }
        // ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        birth: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    };
  },

  /**
   * @attribute: watch
   * @description: used for age limited under 18
   * @author: White
   * @date: 19 - 07 - 02
   * @notice: 此时计算取的农历
   * */
  watch: {
    ruleForm: {
      /**
       * @description: function handler just use one param
       * */
      handler (value, newValue) {
        const that = this;
        // 输入出生日期
        const currentUsersBirthDate = value.birth;
        // 获取用户出生年、月、日
        let usersBirthYear = currentUsersBirthDate.getFullYear();
        let usersBirthMonth = currentUsersBirthDate.getMonth();
        let usersBirthDay = currentUsersBirthDate.getDay();
        console.log('用户出生年：' + usersBirthYear, '用户出生月：' + usersBirthMonth, '用户出生日：' + usersBirthDay);
        // get current date
        const currentDate = new Date()
        // 获取当前年月日
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDay();
        // 判断是否为 0 岁或者用户输入了比当前时间大的数值
        if (currentYear <= usersBirthYear && currentMonth <= usersBirthMonth && currentDay <= usersBirthDay) {
          this.$alert('出生日期大于当前日期', '错误！', {
            confirmButtonText: '确定',
            callback: action => {
              // 回调信息
              console.log("确认信息：" + action)
              that.ruleForm.birth = '';
            }
          })
        } else {
          // 从天数开始计算
          if (currentDay < usersBirthDay) {
            currentDay += 30;
            currentMonth -= 1;
          }

          // 天数相减 - 得到相差的天数
          let diffDays = currentDay - usersBirthDay;

          // 判断月份
          if (currentMonth < usersBirthMonth) {
            currentMonth += 12;
            currentYear -= 1;
          }

          let diffMonth = currentMonth - usersBirthMonth;
          let diffYears = currentYear - usersBirthYear;

          const diffTotalDays = diffYears * 360 + diffMonth * 30 + diffDays;
          console.log('计算后的天数：' + diffTotalDays)
          // 得到年龄
          const computedAge = diffTotalDays/360;
          if (computedAge > 18) {
            this.$alert('年龄不能大于18岁', '错误！', {
              confirmButtonText: '确定',
              callback: action => {
                // 回调信息
                console.log("确认信息：" + action)
                that.ruleForm.birth = '';
              }
            })
          }

          this.showOtherFood = computedAge <= 1;
        }
      },
      // 开启深层监听
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
    console.log('当前状态：' + this.$store.getters.getCurrentStatus);
    // 获取当前用户档案号
    let checkId = this.$store.getters.getId;
    const checkMeaTime = this.$store.getters.getCurrentStatus;
    // 判断当前是否有档案号
    if (checkId === '' && checkMeaTime === 0) {
      // 可创建新档案
      this.isCreateNewUser = true;
      // 关闭编号与出生日期的禁用
      this.isEdited = false;
      // 新建信息组件可不用弹窗提示
/*      this.$alert('请填写您的基本信息', '提示！', {
        confirmButtonText: '确定',
        callback: action => {
          // 回调信息
          console.log("确认信息：" + action)
        }
      })*/
    } else if (checkId !== '' && checkMeaTime === 1) {
      // 请求当前 ID 的数据
      this.getTableData();
      // 开启修改按钮
      this.isModifyUser = true;
      // 关闭新建按钮
      this.isCreateNewUser = false;
      // 开启编号与出生日期的禁用
      this.isEdited = true;
      this.showReset = false;
    } else if (checkId !== '' && checkMeaTime === 2) {
      // 新增检测保存按钮
      this.isNewMeasures = true;
      this.isCreateNewUser = false;
      this.isModifyUser = false;
      this.showReset = false;
      this.getTableData();
    }

    // Vuex 全局状态的值，测试用
    const _testValue = this.$store.getters.getId;
    console.log('组件 - 2 全局 state 的值：' + _testValue)
  },

  // 计算属性，不使用
  competed: {
    // changeToString (serverData) {
    //   if (typeof serverData === number){
    //     serverData.toString();
    //   } else {
    //     return
    //   }
    // }
  },

  methods: {
    /**
     * @param: 下拉框，多选，单选只需将请求参数转换为 string 类型就可正确显示
     * */
    // @date: 19 - 04 - 24
    // 已更改为正确的显示方式
    // // 血型 - 数据转换
    // changeBloodType (value) {
    //   if ( value === 1 ) {
    //     return "A";
    //   } else if ( value === 2 ) {
    //     return "B";
    //   } else if ( value === 3 ){
    //     return "AB";
    //   } else if ( value === 4) {
    //     return "O";
    //   } else {
    //     return '';
    //   }
    // },
    // // 家长教育程度 - 数据转换
    // changeParentsEducationType (value) {
    //   if ( value === 1 ) {
    //     return "博士";
    //   } else if ( value === 2 ) {
    //     return "硕士";
    //   } else if ( value === 3 ) {
    //     return "本科";
    //   } else if ( value === 4 ) {
    //     return "高中";
    //   } else if ( value === 5 ) {
    //     return "初中及以下";
    //   } else {
    //     return '';
    //   }
    // },
    // // 民族 - 数据转换
    // changeNationType (value) {
    //   if ( value === 1 ) {
    //     return "汉族";
    //   } else if ( value === 2) {
    //     return "少数民族";
    //   } else {
    //     return '';
    //   }
    // },

    /**
     * @function: 处理数据
     * @author: White
     * @date: 19 - 04 - 11
     * @amend: 19 - 04 - 22
     * @amendContent: Unix 时间戳的转换
     * */
    dealTableData(obj, userAgeParam) {

      // console.log("传入对象的键名：" + Object.keys(obj))
      // console.log(typeof Object.keys(obj))
      // console.log(Object.keys(obj))
      // console.log(Object.keys(obj)[0])
      // console.log("传入的属性值：")
      // console.log(Object.values(obj))
      // console.log(Object.values(obj)[0])
      // console.log(Object.keys(this.ruleForm))

      let i = Object.values(obj)[1];
      // console.log("测试单个值：" + i);

      const that = this;
      let _copyFormData = Object.assign({},obj)
      // Object.assign(that.ruleForm,obj)
      // console.log("拷贝对象：")
      // console.log(_copyFormData)

      let formData = this.ruleForm;
      let _formKeys = [];

      // 存入当前用户的年龄
      // @date: 19 - 04 - 30
      // @author: White
      // 此组件不使用
      const _currentUserAgeParam = userAgeParam;
      // console.log("当前用户年龄：" + _currentUserAgeParam)
      // 放入全局状态，以便调用，单独在运动调查里修改
      // this.$store.commit('changeCurrentUserAge', _currentUserAgeParam)
      // console.log("当前用户年龄：" + that.$store.getters.getCurrentUserAge)

      // 保证所有项均被执行
      try {
        let _formData = this.ruleForm;

        // 将从后台拿取到的 data 赋值给 ruleForm
        _formData.guardian_phone = obj.guardian_phone.toString();  // 监护人联系方式
        _formData.name = obj.name;  // 姓名

        // 后台 integer 转换 string
        _formData.height = obj.height.toString();  // 身高

        // 出生日期格式的预处理
        // @date: 19 - 04 - 22
        let translateDate = new Date(obj.birth);
        console.log('转换后的日期格式translateDate:' + translateDate)

        // 使用 store 测试
        // 将转换后的日期放入全局状态，方便调用
        this.$store.commit('changeBirth',translateDate);
        _formData.birth = translateDate;
        // _formData.birth = obj.birth;  // 出生日期
        // 设置出生日期的全局状态，用于设为不可修改
        // this.$store.commit('changeBirth', obj.birth);

        // 监护人
        // 当联系人未填写时
        if (obj.guardian === null) {
          _formData.guardian = ''
        } else {
          _formData.guardian = obj.guardian.toString();
        }

        // 备注与其他项直接获取 value 就行
        _formData.remark = obj.remark;  // 备注

        // 显示日期类型
        // console.log("日期类型：" + typeof _formData.birth)

        // 增加性别
        // @amendDate: 19 - 04 - 24
        /**
         *  @amendContent: 同多选框、单选框，只需将返回参数转换为 string 类型，即可显示对应的值
         *  @date: 19 - 04 - 24
         *  @2rdAmendContent: 处理了返回值为 null 抛出异常的情况，每个返回参数增加一个判断
         * */
        _formData.sex = obj.sex.toString();

        // 下拉框返回值有问题
        // 已修正
        // 血型
        if (obj.blood === null) {
          _formData.blood = ''
        } else {
          _formData.blood = obj.blood.toString();
        }

        // 测试数据
        // console.log('下拉框的值：' + _formData.blood);

        // 民族
        if (obj.nation === null) {
          _formData.nation = ''
        } else {
          _formData.nation = obj.nation.toString();
        }

        // 监护人受教育背景
        if (obj.educationalOfParents === null) {
          _formData.educationalOfParents = ''
        } else {
          _formData.educationalOfParents = obj.educationalOfParents.toString();
        }

      } catch (e) {
        this.$message({
          message: "发生了一些错误：" + e,
          type: 'warning'
        })
      }

      // //创建表头名称
      //   this.tableData.table.header = {
      //   "name": "姓名", "sex": "性别", "age": "年龄",
      // };
      // //搜索条件的key
      // this.tableData.search = [
      //   {name: "姓名", id: "name", value: ""},
      //   {name: "年龄", id: "age", value: ""}
      //   ];
    },

    /**
     * @function: 请求获取数据
     * @param: msg(unused)
     * @author: White
     * @date: 19 - 04 - 11
     * */
    getTableData(msg) {
      // 增加一个主键
      const _checkTimes = this.$store.getters.getMeasuresTimes;
      const _checkId = this.$store.getters.getId;
      const requestData = new FormData();
      requestData.append('guardian_phone', _checkId);
      requestData.append('inspectOrder', _checkTimes);
      this.axios.get('http://localhost:8082/information/search', {
        params: {
          guardian_phone: _checkId,
          inspectOrder: _checkTimes
        }
      }).then((response) => {
        // console.log(msg)
        // 判断请求数据的状态码
        if (response.code = '200') {
          if (response.msg = "请求成功") {
            this.$message({ message: response.msg, type: 'success' });
            console.log(response)
            console.log(response.data.data);
            const tableData = response.data.data;
            // 用户年龄，此组件不使用
            const userAgeParam = response.data.data.age;
            // 将数据传入处理方法
            this.dealTableData(tableData, userAgeParam);
            // 将数据传入修改方法
            // this.editSubmit(tableData);
            // 将获取到的单个用户数据设为全局状态
            this.$store.commit('changeUser', tableData);
            console.log("传入的对象：")
            console.log(this.$store.getters.getUser)
            return
          }
        } else {
          this.$message({ message: response.msg, type: 'warning' });
        }
      }, err => {
        console.log(err);
      }).catch(
        // 异常处理 ...
      );
    },

    /**
     *  @function: 修改个人信息
     *  @param:
     *  @return:
     *  @author: White
     *  @date: 2019 - 04 - 17
     *  @amend: 19 - 04 - 22
     *  @amendContent: 转换后的 Unix 时间戳使用 Vuex 来调用
     * */
    editSubmit (editForm) {
      // 控制台输出传入的参数
      console.log(this.ruleForm);
      let that = this;

      /**
       *  @param: 转换后台数据类型
       *  @author: White
       *  @date: 2019 - 04 - 19
       * */
      // console.log("从后台取到的guardian_phone的值：" + typeof this.ruleForm.guardian_phone);
      // const serverBlood = toString(that.ruleForm.blood);
      // console.log("serverBlood的值：" + serverBlood)

      // const testChangeValue = this.$store.getters.getUser;
      // const changeValue = qs.stringify(testChangeValue)
      // console.log(changeValue)

      /**
       * @param: 测试用数据
       * @author: White
       * @date: 19 - 04 - 18
       * */
      // 表单数据序列化
      let editFormData = new FormData();
      // 拼接 key 与 value
      editFormData.append('inspectOrder', this.$store.getters.getMeasuresTimes);
      editFormData.append('name', this.ruleForm.name);
      editFormData.append('height', this.ruleForm.height);
      editFormData.append('birth', this.ruleForm.birth);
      // editFormData.append('nation', that.ruleForm.nation);
      // editFormData.append('blood', that.ruleForm.blood);
      editFormData.append('guardian', this.ruleForm.guardian);
      editFormData.append('guardian_phone', this.ruleForm.guardian_phone);
      // editFormData.append('educationalOfParents', that.ruleForm.educationalOfParents);
      editFormData.append('remark', this.ruleForm.remark);
      console.log('editFormData.name 添加的值：' + editFormData.get('name'));
      console.log('editFormData.guardian_phone 添加的值：' + editFormData.get('guardian_phone'));

      const testObj = this.$store.getters.getUser;
      const testObjId = testObj.guardian_phone;

      // this.axios({
      //   method: 'post',
      //   url: 'http://localhost:8082/information/modify',
      //   data: {
      //     guardian_phone: testObjId
      //   }
      // }).then((response) => {
      //   if (response.code === 1) {
      //     this.$message({ message: response.msg, type: 'success' })
      //   }
      // })

      /**
       * @param: 修改实际使用数据
       * @author: White
       * @date: 19 - 04 - 18
       * @content: 未加选填信息
       * */
      // 数据序列化
      let _testChangeValue = new FormData();
      // 拼接 key 与 value
      _testChangeValue.append('inspectOrder', that.$store.getters.getMeasuresTimes);
      _testChangeValue.append('guardian_phone', that.ruleForm.guardian_phone);
      _testChangeValue.append('name', that.ruleForm.name);
      _testChangeValue.append('sex', that.ruleForm.sex);

      // 获取传回 store 中的出生日期
      const enableChangedBirth = this.$store.getters.getBirth;
      console.log('enableChangedBirth：' + enableChangedBirth)
      _testChangeValue.append('birth', enableChangedBirth);

      // 有问题的数据
      // 身高 int 型转成 string 类型
      // @date: 19 - 04 - 24
      // @amendContent: 数据类型问题已解决
      _testChangeValue.append('height', that.ruleForm.height);
      _testChangeValue.append('nation', that.ruleForm.nation);
      _testChangeValue.append('blood', that.ruleForm.blood);
      _testChangeValue.append('guardian', that.ruleForm.guardian);
      _testChangeValue.append('educationalOfParents', that.ruleForm.educationalOfParents);
      _testChangeValue.append('remark', that.ruleForm.remark);

      // 发起请求
      this.axios.post('http://localhost:8082/information/modify', _testChangeValue, {
        // 表头没问题
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.data.code === 200) {
          this.$message({ message: '修改成功', type: 'success' });
        } else {
          // 请求失败的提醒
          this.$alert('出现了一些错误：' + response, '错误！', {
            confirmButtonText: '确定',
            callback: action => {
              console.log("确认信息：" + action)
            }
          })
        }
      },err => {
        // 打印错误信息
        console.log('发生错误：' + err)
      }).catch(
        // 异常处理 ...
      )
    },

    /**
     * @function: 提交表单数据
     * @author: White
     * @date: 19 - 04 - 11
     * */
    submitForm(formName) {
      // let formData = this.ruleForm;
      // console.log(formName);
      // 检查用户编号的数据类型
      // console.log("用户编号的数据类型：" + typeof this.ruleForm.guardian_phone);
      let that = this;
      // 表单数据序列化
      let informationData = new FormData();
      // 拼接 key 与 value
      /**
       * @mark: 提交时字段名按服务实体类 entity 命名，请求时浏览器会转换大小写，所以按返回参数大小写命名，其他组件类似
       * @author: White
       * @date: 19 - 05 - 09
       *
       * @modify: 新增检测 - 增加一个联合主键 inspectOrder (检测次数)
       * */
      let measureTimes = this.$store.getters.getMeasuresTimes;
      informationData.append('inspectOrder', measureTimes);
      informationData.append('name', that.ruleForm.name);
      informationData.append('height', that.ruleForm.height);
      informationData.append('birth', that.ruleForm.birth);
      informationData.append('sex', that.ruleForm.sex);
      informationData.append('nation', that.ruleForm.nation);
      informationData.append('blood', that.ruleForm.blood);
      informationData.append('guardian', that.ruleForm.guardian);
      informationData.append('guardian_phone', that.ruleForm.guardian_phone);
      informationData.append('educationalOfParents', that.ruleForm.educationalOfParents);
      informationData.append('remark', that.ruleForm.remark);

      // 控制台测试
      // console.log("取到的 ruleForm.name 的值：" + that.ruleForm.name);
      // console.log("params.name添加的值：" + informationData.get("name"));
      // console.log("输入日期数据类型：" + typeof informationData.get("birth"))
      // console.log("输入的日期：" + informationData.get("birth"))
      // console.log(informationData);


      // 将封装好的数据提交，不带校验的
      // this.axios.post('http://localhost:8082/information', informationData ,{
      //   // 定义表头
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then((response) => {  // 请求成功的回调函数
      //   if (response.code = '200') {
      //     this.$message({ message: '提交成功', type: 'success' });
      //     if (response.msg = '请求成功') {
      //       // 填写完成则跳转到下一项
      //       this.$router.push('/symptom');
      //     }
      //   } else {
      //     this.$message({ message: '提交失败', type: 'warning' });
      //   }
      // }).catch(
      //
      // )

      /**
       *  @function: 表单验证提示
       *  @author: White
       *  @date: 2019 - 04 - 17
       * */
      // 校验表单格式是否正确，数据是否为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('http://localhost:8082/information', informationData, {
            // 定义表头
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            // 查看提交后的返回数据
            console.log('返回数据：')
            console.log(response)
            if (response.data.code === 1) {
              // 提示该档案号已经注册
              this.$message({ message: response.data.msg , type: 'warning' });
              // 请求成功后将弹窗关闭
              // this.tableData.dialogTableVisible = false;
              // this.getTableData("noMsg");
            } else {
              // Vuex 获取当前用户 ID 与姓名
              let newCreateId = response.data.data.guardian_phone;
              let newCreateName = response.data.data.name;
              this.$store.commit('changeId', newCreateId);
              this.$store.commit('changeUserName', newCreateName);
              // 成功则跳转到下一项
              this.$router.push('/bodyComposition');
            }
          }, err => {
            console.log(err);
          });
          // alert('submit!');
          // 提交成功则跳转到下一个页面
          // this.$router.push('/symptom');
        } else {
          console.log('error submit!!');
          this.$message({ message: '请检查您的信息是否完整', type: 'warning' });
          return false;
        }
      });
    },

    /**
     * @function: 重置数据
     * @author: White
     * @date: 19 - 04 - 11
     * */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    backToHome () {
      this.$router.push('/Home');
    },

    /**
     * @function: 保存新增检测的数据
     * @author: xu
     * @date: 19 - 08 - 29
     * @description: 使用当前数据保存新建，测量次数 ++
     */
    newMeasuresSave() {
      this.$store.commit('measureTimesPlus');
      // 获取当前的检测次数
      let measureTimes = this.$store.getters.getMeasuresTimes;
      console.log('改变完成的检测次数：' + measureTimes);
      let newMeasuresForm = new FormData();
      newMeasuresForm.append('guardian_phone', this.ruleForm.guardian_phone);
      newMeasuresForm.append('inspectOrder', measureTimes);
      newMeasuresForm.append('name', this.ruleForm.name);
      newMeasuresForm.append('sex', this.ruleForm.sex);
      newMeasuresForm.append('height', this.ruleForm.height);
      newMeasuresForm.append('birth', this.ruleForm.birth);
      newMeasuresForm.append('nation', this.ruleForm.nation);
      newMeasuresForm.append('blood', this.ruleForm.blood);
      newMeasuresForm.append('guardian', this.ruleForm.guardian);
      newMeasuresForm.append('educationalOfParents', this.ruleForm.educationalOfParents);
      newMeasuresForm.append('remark', this.ruleForm.remark);
      try {
        this.axios.post('http://localhost:8082/information/addInspect', newMeasuresForm, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.code === 200) {
              this.$router.push('/bodyComposition');
            }
          }
        }, err => {
          console.log('there are some mistakes:' + err);
        }).catch(
        )
      } catch (e) {
        this.$message({
          message: '发生一点错误',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style>
  .content {
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 620px;
  }
  .content .content-must {
    flex: 0 0 50%;
    background-color: #ffffff;
    border-radius: 20px;
    padding-top: 20px;
    margin-right: 20px;
  }
  .content .chosen-content {
    flex: 0 0 50%;
    background-color: #ffffff;
    border-radius: 20px;
    padding-top: 20px;
  }
  .submit-button {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
</style>
