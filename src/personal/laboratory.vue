<template>
<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="50px" class="demo-ruleForm">
  <div class="laboratory-content">
    <div class="content-0">
      <!-- 血清视黄醇浓度 -->
      <el-form-item
        label=""
        prop="data0"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">血清视黄醇浓度：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data0" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>

      <!-- 血清25-(OHD)水平 -->
      <el-form-item
        label=""
        prop="data1"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">血清25-(OHD)水平：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data1" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>

      <!-- 血清锌 -->
      <el-form-item
        label=""
        prop="data2"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">血清锌：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data2" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>

      <!-- 葡萄糖耐量2小时血糖 -->
      <el-form-item
        label=""
        prop="data3"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">葡萄糖耐量2小时血糖：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data3" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>

      <!-- 糖化血红蛋白 -->
      <el-form-item
        label=""
        prop="data4"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">糖化血红蛋白：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data4" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>

      <!-- 脂肪肝 -->
      <el-form-item
        label=""
        prop="data5"
        :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
      >
        <el-aside style="font-size: 16px;font-weight: 600">脂肪肝：</el-aside>
        <el-input type="number" step="0.01" v-model.number="numberValidateForm.data5" autocomplete="off" placeholder="0.33"></el-input>
      </el-form-item>
    </div>

    <div class="content-1">
      <!-- 血浆视黄醇结合蛋白 -->
    <el-form-item
      label=""
      prop="data6"
      :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
    >
      <el-aside style="font-size: 16px;font-weight: 600">血浆视黄醇结合蛋白：</el-aside>
      <el-input type="number" step="0.01" v-model.number="numberValidateForm.data6" autocomplete="off" placeholder="0.33"></el-input>
    </el-form-item>

      <!-- 血红蛋白 -->
    <el-form-item
      label=""
      prop="data7"
      :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
    >
      <el-aside style="font-size: 16px;font-weight: 600">血红蛋白：</el-aside>
      <el-input type="number" step="0.01" v-model.number="numberValidateForm.data7" autocomplete="off" placeholder="0.33"></el-input>
    </el-form-item>

      <!-- 空腹血糖 -->
    <el-form-item
      label=""
      prop="data8"
      :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
    >
      <el-aside style="font-size: 16px;font-weight: 600">空腹血糖：</el-aside>
      <el-input type="number" step="0.01" v-model.number="numberValidateForm.data8" autocomplete="off" placeholder="0.33"></el-input>
    </el-form-item>

      <!-- 随机血糖 -->
    <el-form-item
      label=""
      prop="data9"
      :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
    >
      <el-aside style="font-size: 16px;font-weight: 600">随机血糖：</el-aside>
      <el-input type="number" step="0.01" v-model.number="numberValidateForm.data9" autocomplete="off" placeholder="0.33"></el-input>
    </el-form-item>

      <!-- 血脂 -->
    <el-form-item
      label=""
      prop="data10"
      :rules="[
      // { required: false, message: '必须带上小数点哦', type: 'float'}
    ]"
    >
      <el-aside style="font-size: 16px;font-weight: 600">血脂：</el-aside>
      <el-input type="number" step="0.01" v-model.number="numberValidateForm.data10" autocomplete="off" placeholder="0.33"></el-input>
    </el-form-item>
    </div>
    <div class="submit-button">
      <el-form-item>
        <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="labBackTo()">返回</el-button>
        <el-button size="medium" type="primary" @click="submitLabForm('numberValidateForm')">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-form-item>
    </div>
  </div>

  <!-- upload picture -->
  <!-- exitedException：提交表单时，文件字段需添加一个 File 类型 -->

  <div class="uploadContent">
    <el-form-item>
      <span style="font-size: 20px;
      padding-right: 50px;
      font-weight: bold">- 请上传您的检查报告 -</span>
      <el-upload
        action=""
        list-type="picture-card"
        :data="uploadPictureObject"
        :multiple="true"
        :file-list="fileListContainer"
        :auto-upload="false"
        :http-request="submitLabForm"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :on-change="handlePictureIncrease"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" width="35%">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
  </div>
</el-form>
</template>

<script>
  export default {
    data () {
      return {
        numberValidateForm: {
          // 数据初始化
          data0: '',  // 血清视黄醇浓度
          data1: '',  // 血清25-(OHD)水平
          data2: '',  // 血清锌
          data3: '',  // 葡萄糖耐量2小时血糖
          data4: '',  // 糖化血红蛋白
          data5: '',  // 脂肪肝
          data6: '',  // 血浆视黄醇结合蛋白
          data7: '',  // 血红蛋白
          data8: '',  // 空腹血糖
          data9: '',  // 随机血糖
          data10: '',  // 血脂
        },
        // 图片上传，请求 500
        dialogImageUrl: '',
        dialogVisible: false,

        // 上传图片列表
        fileListContainer: [],
        // 请求参数，涉及一个图片上传，这里特殊处理
        // numberValidateFormData: {},
        uploadPictureObject: {
          type: File
        }
      };
    },

    // 组件渲染时调用钩子
    mounted () {
      // var _labFormData = this.$store.getters.getLaboratoryFormData;
      // _labFormData = new FormData();

      // File 对象测试
      let fileTestObject = new File(["foo"], "test", {
        type: "text/plain",
      });
      // console.log(" ----- new File:");
      // console.log(fileTestObject);

      let that = this
      // 查看当前是否上传报告
      // console.log(" ----- 当前文件上传：")
      // console.log(that.$store.getters.getLaboratoryFormData)
      // console.log(that.fileListContainer)

      // 表单数据序列化
      // this.numberValidateFormData = new FormData();
      // 获取全局的 ID
      const _labCheckId = this.$store.getters.getId;
      const _labTimes = this.$store.getters.getMeasuresTimes;
      if (_labCheckId !== '') {
        // 请求个人数据
        this.getNumberValidateFormData(_labCheckId, _labTimes);
/*        this.$message({
          message: '请求成功',
          type: 'success'
        })*/
      } else {
        this.$alert('请先填写您的基本信息', '提示！', {
          confirmButtonText: '确定',
          callback: action => {
            console.log("确认信息：" + action)
          }
        })
      }
    },
    methods: {
      /**
       *  @function: 处理表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      dealNumberValidateFormData (numberValidateFormObj) {
        const _numberValidateFormData = this.numberValidateForm;

        // 已上传的图片展示
        this.dialogImageUrl = numberValidateFormObj.path;

        // 每个选项赋予对应 ID 的数据，还需开发
        _numberValidateFormData.data0 = numberValidateFormObj.flavol;
        _numberValidateFormData.data1 = numberValidateFormObj.serum25;
        _numberValidateFormData.data2 = numberValidateFormObj.serumZinc;
        _numberValidateFormData.data3 = numberValidateFormObj.glucoseTolerance;
        _numberValidateFormData.data4 = numberValidateFormObj.glycatedHemoglobin;
        // 脂肪肝，后台少了一个字段，已加
        _numberValidateFormData.data5 = numberValidateFormObj.fattyiverL;
        _numberValidateFormData.data6 = numberValidateFormObj.bindingProtein;
        _numberValidateFormData.data7 = numberValidateFormObj.oxyphorase;
        _numberValidateFormData.data8 = numberValidateFormObj.fbg;
        _numberValidateFormData.data9 = numberValidateFormObj.rbg;
        _numberValidateFormData.data10 = numberValidateFormObj.bloodFat;
      },

      /**
       *  @function: 请求表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       *  @description: post 提交时按实体类字段名，get 请求时使用控制台字段名
       * */
      getNumberValidateFormData (labCheckId, labCheckTimes) {
        this.axios.get('http://localhost:8082/laboratoryDetection/search', {
          params: {
            guardian_phone: labCheckId,
            inspectOrder: labCheckTimes
          }
        }).then((response) => {
          if (response.code = '200') {
            if (response.msg = '请求成功') {
              // 声明一个变量为返回参数
              const numberRequestData = response.data.data;
              console.log('请求返回数据：')
              console.log(numberRequestData)
              this.$message({ message: '请求成功', type: 'success' });
              // 将请求数据传入处理函数
              this.dealNumberValidateFormData(numberRequestData);
              // 判断是否上传过图片
              this.dialogVisible = numberRequestData.path !== null;
            }
          } else {
            this.$message({ message: '请求失败', type: 'warning' });
          }
        },err => {
          // 打印错误信息
          console.log("错误信息：" + err)
        }).catch(
          // 异常处理
        )
      },

      /**
       *  @function: 提交表单数据
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      submitLabForm(formName) {
        // console.log(formName);
        let that = this;
        // 获取当前全局的图片对象
        let globalFileData = this.$store.getters.getLaboratoryFormData;
        const _checkId = this.$store.getters.getId;
        const _checkTimes = this.$store.getters.getMeasuresTimes;

        // 表单数据序列化
        let numberValidateFormData = new FormData();

        // 将 key 与 value 进行拼接
        // 附带用户编号 ID
        numberValidateFormData.append('guardian_phone', _checkId);
        numberValidateFormData.append('inspectOrder', _checkTimes);

        // 添加图片
        /**
         *  @param: file.raw  file.name
         *  @author: White
         *  @date: 19 - 04 - 24
         *  @content: 在参数中添加 file.raw  file.name
         *  @errorReason: 未修改默认上传方式，需将 http-request 绑定到该提交方法下
         * */

        /**
         * @exception: 当未上传文件时，需添加一个空的字段 file
         * @resolve: 使用之前的缓存作为 File，不添加文件名
         *
         * @exception1: 在系统启动后若没有上传过图片，由于没有缓存的 File，此时不能不带文件直接提交
         * @resolve: 创建一个 File() 对象，可以用于提交，但是不能修改
         * */
        if (that.fileListContainer.length === 0) {
          // 创建一个 File 对象
          // new 一个 File 对象
          let fileTestObject = new File(["foo"], "test", {
            type: "text/plain",
          });

          numberValidateFormData.append('file', fileTestObject, '');
        }

        if (that.fileListContainer.length !== 0) {
          numberValidateFormData.append('file', globalFileData.raw, globalFileData.name);
        }

        // numberValidateFormData.append('file', globalFileData.raw, globalFileData.name);

        numberValidateFormData.append('flavol', that.numberValidateForm.data0);
        numberValidateFormData.append('serum25', that.numberValidateForm.data1);
        numberValidateFormData.append('serumZinc', that.numberValidateForm.data2);
        numberValidateFormData.append('glucoseTolerance', that.numberValidateForm.data3);
        numberValidateFormData.append('GlycatedHemoglobin', that.numberValidateForm.data4);
        // 脂肪肝
        numberValidateFormData.append('fattyiverL', that.numberValidateForm.data5);
        numberValidateFormData.append('bindingProtein', that.numberValidateForm.data6);
        numberValidateFormData.append('oxyphorase', that.numberValidateForm.data7);
        numberValidateFormData.append('FBG', that.numberValidateForm.data8);
        numberValidateFormData.append('RBG', that.numberValidateForm.data9);
        numberValidateFormData.append('bloodFat', that.numberValidateForm.data10);

        // 校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(that.numberValidateForm);
            // alert('submit!');
            // 发起请求
            this.axios.post('http://localhost:8082/laboratoryDetection/uploadAll', numberValidateFormData ,{
              // 定义表头
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((response) => {
              console.log(response);
              if (response.status === 200) {

                // 测试 fileList
                // console.log("提交后的 fileList：")
                // console.log(that.fileList)
                // 提交后的返回参数
                console.log(response)

                this.$message({ message: '提交成功，进入下一步', type: 'success' });
                if (response.msg = '请求成功') {
                  // 完成则进入下一项
                  this.$router.push('/foodAvoid')
                }
              } else {
                this.$message({ message: '请检查您的信息是否正确', type: 'warning' });
              }
            }).catch(
              // 异常处理 ...
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        /**
         * 未加校验的提交方式
         **/
        // let that = this;
        // // 表单数据的序列化
        // let numberValidateFormData = new FormData();
        // // 将 key 与 value 进行拼接
        // numberValidateFormData.append('', that.numberValidateForm.data_0);
        // // 提交请求
        // this.axios.post('' , numberValidateFormData , {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'  // 定义表头
        //   }
        // }).then((response) => {
        //   if (response.code = '200') {
        //     this.$message({ message: '提交成功，进入下一步', type: 'success' });
        //     // 填写完成则跳转到下一项
        //     this.$router.push('');
        //   } else {
        //     this.$message({ message: '提交失败,请检查您的信息', type: 'warning' });
        //   }
        // }).catch(
        //
        // )
      },

      /**
       *  @function: 返回主页面
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      labBackTo () {
        this.$router.push('/Home');
      },

      /**
       *  @function: 图片上传处理
       *  @author: White
       *  @date: 19 - 04 - 11
       * */
      // 删除
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      // 预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 添加
      handlePictureIncrease(file, fileList) {
        // this.numberValidateFormData = new FormData();
        // this.numberValidateFormData.append('file', file);
        this.$store.commit('changeLaboratoryFormData',file);
        this.fileListContainer = fileList
        console.log(file)
        console.log(fileList)
        // 当前状态的 _fileList
        // console.log(" ----- 上传后的 fileListContainer:")
        console.log(this.fileListContainer)

        console.log(this.$store.getters.getLaboratoryFormData);
        console.log("添加图片名字：" + file.name)
      },
      // 覆盖默认上传方式，更换为表单提交函数
      // changeRequestMethod () {
      //   this.uploadPictureObject = this.$store.getters.getLaboratoryFormData;
      //   console.log("uploadPictureObject：")
      //   console.log(this.uploadPictureObject);
      // },
      // 上传成功的钩子
      handleUploadSuccess (response, file, fileList) {
        console.log("上传成功：")
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      // 上传失败的钩子
      handleUploadError (err, file, fileList) {
        console.log("上传失败：")
        console.log(err)
        console.log(file)
        console.log(fileList)
      }
    }
  }
</script>

<style>
  .laboratory-content {
    display: flex;
    width: 90%;
    height: 390px;
  }
  .content-0 {
    flex: 0 0 50%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding-top: 20px;
    overflow-y: scroll;
  }
  .content-1 {
    flex: 0 0 50%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px 0 15px;
/*    border-radius: 20px;*/
    padding-top: 20px;
    overflow-y: scroll;
  }
  .submit-button {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
  .uploadContent {
    width: 713px;
    height: 220px;
    background: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-top: 18px;
    border-radius: 20px;
    overflow-y: scroll;
  }
</style>
