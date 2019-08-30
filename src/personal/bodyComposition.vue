<template>
  <div class="compositionArea">

    <!-- 开始测量 - 发送数据待开发 -->
    <div class="measureButton"
         style="padding: 10px 0 0 12px">
      <el-button @click="sendCurrentUserData()" type="danger" round>开始体成分测量</el-button>

      <!-- 解析 XML 测试 button -->
      <!--<el-button @click="XMLtoJsonTest()" type="warning" round>XML test...🐎</el-button>-->

    </div>
    <!-- 测量数据表 -->
    <div class="measureTableArea"
         style="margin: 0 10px 0 15px;padding-top: 15px">
      <el-table
        :data="compositionDataTable"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="number"
          label="编号"
          width="180">
        </el-table-column>

        <!-- 测试日期待定 -->
<!--        <el-table-column
          prop="date"
          label="测试日期"
          width="120">
        </el-table-column>-->
        <el-table-column
          prop="fat"
          label="脂肪"
          width="120">
        </el-table-column>
        <el-table-column
          prop="min"
          label="骨质"
          width="120">
        </el-table-column>
        <el-table-column
          prop="pro"
          label="蛋白质"
          width="120">
        </el-table-column>

        <!-- 总体水- 待定 -->
<!--        <el-table-column
          prop="tbw"
          label="总体水"
          width="120">
        </el-table-column>-->

        <el-table-column
          prop="icf"
          label="细胞内液"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ecf"
          label="细胞外液"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mus"
          label="肌肉"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ffm"
          label="瘦体重"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hei"
          label="身高"
          width="120">
        </el-table-column>
        <el-table-column
          prop="wei"
          label="体重"
          width="120">
        </el-table-column>
        <el-table-column
          prop="pbf"
          label="体脂百分比"
          width="120">
        </el-table-column>
        <!--<el-table-column
          prop="smm"
          label="骨骼肌"
          width="120">
        </el-table-column>-->
        <el-table-column
          prop="bmi"
          label="BMI"
          width="120">
        </el-table-column>
        <el-table-column
          prop="whr"
          label="腰臀比"
          width="120">
        </el-table-column>
        <el-table-column
          prop="bmr"
          label="基础代谢率"
          width="120">
        </el-table-column>
        <!--<el-table-column
          prop="vfa"
          label="内脏脂肪"
          width="120">
        </el-table-column>-->
        <!--<el-table-column
          prop="score"
          label="分数"
          width="120">
        </el-table-column>-->
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <!--<el-button type="text" size="small">编辑</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>

    <!-- 保存测量数据按钮，待开发 -->
    <div class="save-button">
      <el-button size="medium" type="info" icon="el-icon-arrow-left" @click="backToHomeInCom">返回</el-button>
      <el-button size="medium" type="primary" @click="submitDataOfComposition">保存并继续<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>

    <!-- 测量状态弹窗 -->
    <!-- 中止测量，待开发 -->
    <el-dialog :title="tipsOnMeasures" :visible.sync="isShowMeasureStatusVisible" width="500px">
      <!-- 进度条 -->
      <el-progress :text-inside="true" :stroke-width="24" :percentage="percentageOfProgress" status="success"></el-progress>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stopMeasures" type="warning" round>中止测量</el-button>
        <!--<el-button type="primary" :loading="listLoading" @click="updateData" class="title1">确定</el-button>-->
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    // 初始化状态
    data () {
      return {
        // 停止弹窗进度条的加载
        stopBit: '',
        // 进度条百分比
        percentageOfProgress: 0,
        // 测量窗口的提示
        tipsOnMeasures: '',
        // 是否发送完成
        isSendDataComplete: false,
        // 体成分数据列表
        compositionDataTable: [],
        // 显示测量状态弹框
        isShowMeasureStatusVisible: false,
        // server url
        path: "ws://127.0.0.1:9000/",
        // new WebSocket
        socket: ''
      }
    },

    /**
     * @hook: created()
     * */
    created () {
      this.initSocket();
    },

    /**
     * @hook: mounted()
     * */
    mounted () {
      // 当前用户 ID
      let currentUserIdParamForComposition = this.$store.getters.getId;
      const usersMeasureTime = this.$store.getters.getMeasuresTimes;
      if (currentUserIdParamForComposition === '') {
        this.$alert('请先填写您的基本信息', '提示！', {
          confirmButtonText: '确定',
          callback: action => {
            // 回调信息
            console.log("确认信息：" + action)
          }
        })
      } else {
        // 请求当前用户数据表
        this.getCurrentUsersDataOfComposition(currentUserIdParamForComposition, usersMeasureTime);
      }
    },

    /**
     * @hook: destroyed()
     * */
    destroyed () {
      this.socket.onclose()
    },

    /**
     * @hook: beforeUpdate()
     * */
    // beforeUpdate () {
    //   this.initSocket();
    // },

    methods: {

      /**
       * @function: XML to JSON test
       * @author: White
       * @date: 19 - 06 - 17
       * @description: just for test
       * */
      XMLtoJsonTest () {
        this.axios.get('http://localhost:8082/xml2Json')
          .then((response) => {
            console.log(response)
            // console.log(response.data.data.Result.item)
            let currentObjectContainer = {};
            // 当前用户 ID
            currentObjectContainer.number = this.$store.getters.getId;
            // XML to JSON
            const XMLToJsonContainer = response.data.data.Result.item;
            // 遍历各项
            XMLToJsonContainer.forEach((value, index) => {
              console.log('index, object')
              // console.log(index, value)
              // console.log(index, value.content, value.Name)
              // get value.content
              if (value.Name === 'date') {
                currentObjectContainer.date = value.content; // 检测日期
              } else if (value.Name === 'fat') {
                currentObjectContainer.fat = value.content; // 脂肪
              } else if (value.Name === 'min') {
                currentObjectContainer.min = value.content; // 骨矿物质
              } else if (value.Name === 'pro') {
                currentObjectContainer.pro = value.content; // 蛋白质
              } else if (value.Name === 'tbw') {
                currentObjectContainer.tbw = value.content; // 总体水
              } else if (value.Name === 'icf') {
                currentObjectContainer.icf = value.content; // 细胞内液
              } else if (value.Name === 'ecf') {
                currentObjectContainer.ecf = value.content; // 细胞外液
              } else if (value.Name === 'mus') {
                currentObjectContainer.mus = value.content; // 肌肉
              } else if (value.Name === 'ffm') {
                currentObjectContainer.ffm = value.content; // 瘦体重
              } else if (value.Name === 'hei') {
                currentObjectContainer.hei = value.content; // 身高
              } else if (value.Name === 'wei') {
                currentObjectContainer.wei = value.content; // 体重
              } else if (value.Name === 'pbf') {
                currentObjectContainer.pbf = value.content; // 体脂百分比
              } else if (value.Name === 'smm') {
                currentObjectContainer.smm = value.content; // 骨骼肌
              } else if (value.Name === 'bmi') {
                currentObjectContainer.bmi = value.content; // BMI
              } else if (value.Name === 'whr') {
                currentObjectContainer.whr = value.content; // 腰臀比
              } else if (value.Name === 'bmr') {
                currentObjectContainer.bmr = value.content; // 基础代谢率
              } else if (value.Name === 'vfa') {
                currentObjectContainer.vfa = value.content; // 内脏脂肪
              } else if (value.Name === 'score') {
                currentObjectContainer.score = value.content; // 分数
              }
            })
            // 解构赋值后的 Object
            console.log(currentObjectContainer)
            // 填充列表
            this.compositionDataTable.push(currentObjectContainer)
          })
      },

      /**
       * @function: connected to server
       * @param: null
       * @return: null
       * @description: not used
       * */
      connectWithServer () {
        // 清楚停止加载的标志位
        this.stopBit = ''
        // 开启测量状态窗口
        this.isShowMeasureStatusVisible = true;
        // 进度条开始加载
        let percentageContainer = 0;
        let progressBar = setInterval(() => {
          percentageContainer++;
          if (percentageContainer>100) {
            percentageContainer = 0;
          }

          if (this.stopBit !== '') {
            clearInterval(progressBar)
          }
          this.percentageOfProgress = percentageContainer;
        },500)
        // 发送用户信息
        this.sendCurrentUserData()
      },

      /**
       * @function: init communication of socket
       * @param: null
       * @return: null
       * @author: White
       * @date: 19 - 06 - 12
       * @exception: could not use Methods but in this method
       * @resolve: 在此方法内定义打开、响应参数、关闭的回调
       * */
      initSocket () {
        // use request and other API in this.socket callback()
        const that = this;
        // 判断当前浏览器是否支持 WebSocket
        if (typeof(WebSocket) === "undefined") {
          alert("您的浏览器不支持socket")
        } else {
          // 测试 webSocket 在当前浏览器是否支持
          console.log('WebSocket' in window)
          // 实例化 socket
          // let socketCase = this.socket;
          this.socket = new WebSocket(this.path)

          // 监听 socket 连接
          /*this.socket.onopen = this.openOfSocket()*/
          this.socket.onopen = function () {
            console.log('socket 连接已打开！')
          }

          // 监听 socket 错误信息
          // this.socket.onerror = this.errorOnSocket()

          /**
           * @function: socket.onMessage
           * @param: msg
           * @return: msg.data
           * @author: White
           * @date: 19 - 06 - 17
           * @exception: can not use other method instead of this function,the same as others.
           * */
          /*this.socket.onmessage = this.returnDataOnSocket()*/
          this.socket.onmessage = function (msg) {
            console.log('返回参数：')
            console.log(msg)

            // 检查是否是否收到返回参数
            if (typeof msg.data === 'string') {
              // XML 'licmsg' 位置的值，用于检验系统是否已授权
              if (msg.data.indexOf('licmsg:') !== -1) {
                // 判断是否已注册
              } else if (msg.data === 'sendPara\0') {
                // 数据发送完成指令
                that.$notify({
                  title: '完成！',
                  message: '发送信息完成，等待返回测量结果',
                  type: 'success'
                })
              } else if (msg.data === 'BreakTest\0') {
                // 下位机测量中断指令
                that.$notify({
                  title: '提示！',
                  message: '测试被中断，请测试人员注意测试要领',
                  type: 'warning'
                })
                // 关闭测量状态弹框
                that.isShowMeasureStatusVisible = false;
                // 标志位置非空
                that.stopBit = 'shutDown';
              } else {
                // request for kangping-child server on XML resolve
                that.axios.get('http://localhost:8082/xml2Json')
                  .then((response) => {
                    console.log(response)
                    // console.log(response.data.data.Result.item)
                    let currentObjectContainer = {};
                    // 当前用户 ID
                    currentObjectContainer.number = that.$store.getters.getId;
                    // XML to JSON
                    const XMLToJsonContainer = response.data.data.Result.item;
                    // 遍历 list
                    XMLToJsonContainer.forEach((value, index) => {
                      console.log('index, object')
                      // console.log(index, value)
                      // console.log(index, value.content, value.Name)
                      // get value.content
                      if (value.Name === 'date') {
                        // currentObjectContainer.date = value.content; // 检测日期
                      } else if (value.Name === 'fat') {
                        currentObjectContainer.fat = value.content; // 脂肪
                      } else if (value.Name === 'min') {
                        currentObjectContainer.min = value.content; // 骨矿物质
                      } else if (value.Name === 'pro') {
                        currentObjectContainer.pro = value.content; // 蛋白质

                        // 总体水 - 待定
                      } else if (value.Name === 'tbw') {
                        // currentObjectContainer.tbw = value.content; // 总体水
                      } else if (value.Name === 'icf') {
                        currentObjectContainer.icf = value.content; // 细胞内液
                      } else if (value.Name === 'ecf') {
                        currentObjectContainer.ecf = value.content; // 细胞外液
                      } else if (value.Name === 'mus') {
                        currentObjectContainer.mus = value.content; // 肌肉
                      } else if (value.Name === 'ffm') {
                        currentObjectContainer.ffm = value.content; // 瘦体重
                      } else if (value.Name === 'hei') {
                        currentObjectContainer.hei = value.content; // 身高
                      } else if (value.Name === 'wei') {
                        currentObjectContainer.wei = value.content; // 体重
                      } else if (value.Name === 'pbf') {
                        currentObjectContainer.pbf = value.content; // 体脂百分比
                      } else if (value.Name === 'smm') {
                        currentObjectContainer.smm = value.content; // 骨骼肌
                      } else if (value.Name === 'bmi') {
                        currentObjectContainer.bmi = value.content; // BMI
                      } else if (value.Name === 'whr') {
                        currentObjectContainer.whr = value.content; // 腰臀比
                      } else if (value.Name === 'bmr') {
                        currentObjectContainer.bmr = value.content; // 基础代谢率
                      } else if (value.Name === 'vfa') {
                        currentObjectContainer.vfa = value.content; // 内脏脂肪
                      } else if (value.Name === 'score') {
                        currentObjectContainer.score = value.content; // 分数
                      }
                    })
                    // 解构赋值后的 Object
                    console.log(currentObjectContainer)
                    // 填充列表
                    that.compositionDataTable.splice(0, 1, currentObjectContainer)
                    // 关闭测量进度条的弹窗
                    that.isShowMeasureStatusVisible = false;
                    // 标志位置非空
                    that.stopBit = 'shutDown';
                    // notify measures completed
                    that.$notify({
                      title: '完成！',
                      message: '测量完成，谢谢您的配合！',
                      type: 'success'
                    })
                  })
              }
            }
          }

          /**
           * @function: socket.onclose
           * */
          this.socket.onclose = function () {
            console.log('socket 连接已关闭！')
          }
        }
      },

      // Socket 通信成功时的回调
      openOfSocket () {
        console.log("socket连接成功")
      },

      /**
       * @function: socket on err
       * @param: null
       * @return: null
       * */
      errorOnSocket (param) {
        console.log("连接错误：")
        console.log(param)
        // 连接发生错误的提示
        this.$alert('连接发生错误', 'err！', {
          confirmButtonText: '确定',
          callback: action => {
            console.log("确认信息：" + action)
          }
        })
      },

      /**
       * @function: 获取 server 传回的参数
       * @param: msg
       * @return: null
       * @author: White
       * @date: 19 - 06 - 11
       * */
      returnDataOnSocket (msg) {
        console.log(msg)
      },

      /**
       * @function: send information of current user
       * @param: phone, sex, birth, height
       * @return: null
       * @author: White
       * @date: 19 - 06 - 12
       * */
      sendCurrentUserData () {
        // this.socket.send(params)

        // check out this socket
        console.log('this socket：')
        console.log(this.socket)
        let timeSet = 500
        // 清除停止加载的标志位
        this.stopBit = ''
        // 开启测量状态弹窗
        this.isShowMeasureStatusVisible = true;
        // 进度条开始加载
        let percentageContainer = 0;
        let isCompleteSend = this.isSendDataComplete;
        // measure status - 0
        this.tipsOnMeasures = '开始连接，等待设备应答...'
        let progressBar = setInterval(() => {
          console.log(isCompleteSend)
          // 进度条增加
          this.percentageOfProgress += 1;
          if (this.percentageOfProgress>100) {
            this.percentageOfProgress = 0;
          }

          if (this.stopBit !== '') {
            clearInterval(progressBar)
            this.percentageOfProgress = 0
          }

          // 开始发送用户数据
          if (this.percentageOfProgress >= 10) {
            this.tipsOnMeasures = '开始传输数据，请等待测量...';
            // 获取用户基本信息 - 手机号、身高、出生日期
            if (!isCompleteSend) {
              // 使用当前 ID 获取手机号、身高、年龄
              let currentUserIdForData = this.$store.getters.getId;
              let measuresTime = this.$store.getters.getMeasuresTimes;
              console.log(currentUserIdForData)
              this.axios.get('http://localhost:8082/information/search', {
                params: {
                  guardian_phone: currentUserIdForData,
                  inspectOrder: measuresTime
                }
              })
                .then((response) => {
                  console.log(response)
                  // 获取电话、性别、年龄、身高
                  const ageOfCurrentUser = parseInt(response.data.data.age);
                  const sexOfCurrentUser = response.data.data.sex.toString();
                  const numberOfCurrentUser = response.data.data.guardian_phone.toString();
                  const heightOfCurrentUser = response.data.data.height;
                  // console.log("发送参数：" + ageOfCurrentUser, numberOfCurrentUser, heightOfCurrentUser)
                  // console.log('手机号数据类型：' + typeof numberOfCurrentUser)
                  // console.log('身高类型：' + typeof heightOfCurrentUser)
                  // console.log('年龄类型：' + typeof ageOfCurrentUser)
                  // 封装通信参数 - 手机号、性别、年龄、身高
                  const socketParam = numberOfCurrentUser + "|" + sexOfCurrentUser + "|" + ageOfCurrentUser + "|" + heightOfCurrentUser + '\0';
                  // 开始传输数据
                  this.socket.send(socketParam)
                  isCompleteSend = true;
                })
            }
          }
          // this.percentageOfProgress = percentageContainer;
        },timeSet)
      },

      /**
       * @function: 连接关闭
       * @param: null
       * @return: null
       * @author: White
       * @date: 19 - 06 - 11
       *  */
      closeOfSocket () {
        // 通道关闭的提示
        console.log("socket通信已经关闭");
      },

      /**
       * @function: 中止测量
       * @param: null
       * @return: null
       * @author: White
       * @date: 19 - 06 - 18
       * @description: distinct between cancel and determine
       *  */
      stopMeasures () {
        // 提示是否停止测量
        this.$confirm('是否终止测量', '注意！', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            // 关闭测量进度条的弹窗
            this.isShowMeasureStatusVisible = false;
            // 标志位置非空，归零进度条
            this.stopBit = 'shutDown';
            // 发送中止检测的指令
            const cancelMeasureCommand = "init|init|init|init" + '\0';
            this.socket.send(cancelMeasureCommand)
          })
          .catch(action => {
            // console
            console.log('取消确认信息：' + action === 'cancel' ? '选择了关闭。' : '选择了取消。')
          });
      },

      /**
       * @function: save current composition data
       * @param: null
       * @return: null
       * @author: White
       * @date: 19 - 06 - 17
       * */
      submitDataOfComposition () {
        // 保存请求
        try {
          // 获取列表数据
          let tableListDataOfComposition = this.compositionDataTable[0];
          console.log(tableListDataOfComposition)
          // 表单序列化
          const measureTimes = this.$store.getters.getMeasuresTimes;
          let formDataOfComposition = new FormData();
          // 拼接 key 与 value
          /**
           * 增加一个主键 - 检测次数
           */
          formDataOfComposition.append('guardian_phone', tableListDataOfComposition.number) // 手机号
          formDataOfComposition.append('inspectOrder', measureTimes);
          // formDataOfComposition.append('CheckDate', tableListDataOfComposition.date) // 检测日期
          formDataOfComposition.append('Fat', tableListDataOfComposition.fat) // 脂肪
          formDataOfComposition.append('Sclerotin', tableListDataOfComposition.min) // 骨矿物质
          formDataOfComposition.append('Protein', tableListDataOfComposition.pro) // 蛋白质

          // 细胞内/外液 - 待定
          formDataOfComposition.append('IntracellularFluid', tableListDataOfComposition.icf)
          formDataOfComposition.append('ExtracellularFluid', tableListDataOfComposition.ecf)

          formDataOfComposition.append('Muscle', tableListDataOfComposition.mus) // 肌肉
          formDataOfComposition.append('FatfreeBodyWeight', tableListDataOfComposition.ffm) // 瘦体重
          formDataOfComposition.append('Height', tableListDataOfComposition.hei) // 身高
          formDataOfComposition.append('Weight', tableListDataOfComposition.wei) // 体重
          formDataOfComposition.append('BodyFatPercent', tableListDataOfComposition.pbf) // 体脂百分比
          // formDataOfComposition.append('SkeletalMuscle', tableListDataOfComposition.smm) // 骨骼肌
          formDataOfComposition.append('WeightIndexBMI', tableListDataOfComposition.bmi) // BMI
          formDataOfComposition.append('WaistToHipratio', tableListDataOfComposition.whr) // 腰臀比
          formDataOfComposition.append('MetabolicRate', tableListDataOfComposition.bmr) // 基础代谢
          // formDataOfComposition.append('VisceralFat', tableListDataOfComposition.vfa) // 内脏脂肪
          // formDataOfComposition.append('score', tableListDataOfComposition.score) // 分数

          // 总体水 - 待定
          // formDataOfComposition.append('CheckDate', tableListDataOfComposition.date)

          this.axios.post('http://localhost:8082/bodyCompositionTest', formDataOfComposition, {
            // 定义表头
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((response) => {
              // 服务响应参数
              console.log(response)
              if (response.status === 200) {
                if (response.data.code === 200) {
                  this.$message({
                    message: '保存成功，进入下一项',
                    type: 'success'
                  });
                  // 跳转到下一项
                  this.$router.push('/symptom')
                }
              }
            },err => {
              console.log('server has error' + err)
            })
            .catch(

            )
        } catch (e) {
          // 异常处理
          console.log('some error has happened:' + e)
        }
      },

      /**
       * @function: check out if current user has data of composition
       * @param: currentUserIdForComposition - usersId
       * @param: times - the times of current users measure
       * @return:
       * @author: White
       * @date: 19 - 06 - 18
       * @description: differ from new measures,directly using PUSH method to fill table
       * */
      getCurrentUsersDataOfComposition (currentUserIdForComposition, times) {
        // 当前列表
        let currentTableListIsDataOn = this.compositionDataTable;
        // if this table had data
        try {
          // 查询当前用户是否进行过体成分检测
          this.axios.get('http://localhost:8082/bodyCompositionTest/search', {
            params: {
              guardian_phone: currentUserIdForComposition,
              inspectOrder: times
            }
          })
            .then((response) => {
              // request 返回数据
              console.log(response)
              // 判断是否请求成功
              if (response.status === 200) {
                if (response.data.code === 200) {
                  // 当前用户体成分数据
                  const currentUserTableDataForComposition = response.data.data;
                  // prop 对应的字段名不同，重新使用一个对象用于填充
                  let objectContainerForUsersComposition = {};
                  objectContainerForUsersComposition.number = currentUserTableDataForComposition.guardian_phone; // 编号
                  objectContainerForUsersComposition.fat = currentUserTableDataForComposition.fat; // 脂肪
                  objectContainerForUsersComposition.min = currentUserTableDataForComposition.sclerotin; // 骨矿物质
                  objectContainerForUsersComposition.pro = currentUserTableDataForComposition.protein; // 蛋白质
                  objectContainerForUsersComposition.mus = currentUserTableDataForComposition.muscle; // 肌肉
                  objectContainerForUsersComposition.ffm = currentUserTableDataForComposition.fatfreeBodyWeight; // 瘦体重
                  objectContainerForUsersComposition.hei = currentUserTableDataForComposition.height; // 身高
                  objectContainerForUsersComposition.wei = currentUserTableDataForComposition.weight; // 体重
                  objectContainerForUsersComposition.pbf = currentUserTableDataForComposition.bodyFatPercent; // 体脂百分比
                  // 细胞内/外液
                  objectContainerForUsersComposition.icf = currentUserTableDataForComposition.intracellularFluid;
                  objectContainerForUsersComposition.ecf = currentUserTableDataForComposition.extracellularFluid;
                  // objectContainerForUsersComposition.smm = currentUserTableDataForComposition.skeletalMuscle; // 骨骼肌
                  objectContainerForUsersComposition.bmi = currentUserTableDataForComposition.weightIndexBMI; // BMI
                  objectContainerForUsersComposition.whr = currentUserTableDataForComposition.waistToHipratio; // 腰臀比
                  objectContainerForUsersComposition.bmr = currentUserTableDataForComposition.metabolicRate; // 基础代谢
                  // objectContainerForUsersComposition.vfa = currentUserTableDataForComposition.visceralFat; // 内脏脂肪
                  // objectContainerForUsersComposition.score = currentUserTableDataForComposition.score; // 分数

                  // console
                  console.log('解构赋值后的 object：')
                  console.log(objectContainerForUsersComposition)
                  // 填充表格
                  currentTableListIsDataOn.push(objectContainerForUsersComposition)
                }
              } else {
                // 请求错误信息
                this.$alert('请填写您的基本信息', '提示！', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // 回调信息
                    console.log("确认信息：" + action)
                  }
                })
              }
            },err => {
              // exception in code
              console.log('there are some error:' + err)
            })
            .catch(
              // solve the exception that may happen
            )
        } catch (e) {
          // exception in server
          this.$notify({
            title: 'err！',
            message: '发生了一些错误：' + e,
            type: 'warning'
          })
        }
      },

      backToHomeInCom () {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
.compositionArea {
  width: 90%;
  height: 660px;
  background: #ffffff;
  border-radius: 10px;
}
.save-button {
  position: absolute;
  bottom: 24px;
  right: 20px;
}
</style>
