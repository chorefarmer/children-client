<template>

  <!-- 表头更改 -->
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <div class="operate">
        <el-form-item label="联系人电话" prop="contactPhone">
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱">
          <el-input v-model="form.contactsEmail"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts"></el-input>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-input v-model="form.hospitalName"></el-input>
        </el-form-item>
        <el-form-item label="科室名称">
          <el-input v-model="form.departmentName"></el-input>
        </el-form-item>
      </div>

      <div class="submit-button">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      </div>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        hospitalName: '', // 医院名称
        departmentName: '', // 科室名称
        contacts: '', // 联系人
        contactsEmail: '', // 联系人邮箱
        contactPhone: '' // 联系人电话
      },

      // 手机号为必填
      rules: {
        contactPhone: [
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');


      let _reportTable = this.form;
      // 表单序列化
      let reportHeadersTable = new FormData();

      reportHeadersTable.append('hospitalName', _reportTable.hospitalName);
      reportHeadersTable.append('officeName', _reportTable.departmentName);
      reportHeadersTable.append('contacts', _reportTable.contacts);
      reportHeadersTable.append('email', _reportTable.contactsEmail);
      reportHeadersTable.append('hospotialPhone', _reportTable.contactPhone);

      // 发起请求
      this.axios.post('http://localhost:8082/hospital', reportHeadersTable, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        // 返回参数
        console.log("返回参数：")
        console.log(response)

        // 状态码为 200 则为成功
        if (response.data.code === 200) {
          this.$alert('修改成功！', 'OK！', {
            confirmButtonText: '确定',
            callback: action => {
              console.log("确认信息：" + action)
              // 成功的回调

              // 跳转到主页面
              this.$router.push('/home')
            }
          })
        }
      },err => {
        // 提交失败
        this.$message({
          message: '发生了一些错误' + err,
          type: 'warning'
        })
      }).catch(
        // 异常处理
      )
    }
  }
}
</script>

<style>
  .operate {
    width: 340px;
    height: 320px;
    background-color: rgb(255,255,255);
    border-radius: 10px;
    margin: 10px 0 0 10px;
    padding: 20px 30px 15px 20px;
  }
  .submit-button {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
</style>
