<!--suppress ALL -->
<template>
  <div class="app-container">

    <!-- 查询栏 - 查询条件 -->
    <!-- 过滤器待开发 -->
    <!-- @date: 19 - 05 - 30 -->
    <!-- @description: 服务只写了姓名，编号 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <!--<el-form-item>-->
          <!--<el-select v-model="value" clearable placeholder="性别">-->
            <!--<el-option-->
              <!--v-for="item in status"-->
              <!--:key="item.statusId"-->
              <!--:label="item.label"-->
              <!--:value="item.statusId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-input placeholder="姓名" v-model="searchName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="档案号" v-model="searchPhone" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>查询</el-button>

          <!-- store测试按钮 -->
          <!--<el-button type="warning" @click="testCreateStore()">生成</el-button>-->
          <!--<el-button type="warning" @click="testCheckStore()">查看</el-button>-->
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" >新增</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </el-col>

    <!-- 列表 -->
    <el-table :data="tableList"
              v-loading="listLoading"
              height="570"
              border
              stripe
              element-loading-text="拼命加载中"
              style="width: 93%;">
      <!-- prop 用于向父组件传值 -->
      <el-table-column label="序号" type="index" width="50">
      </el-table-column>
      <el-table-column prop="guardian_phone" label="用户编号" width="150">
      </el-table-column>
      <el-table-column prop="inspectOrder" label="检测次数" width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="130">
      </el-table-column>
      <el-table-column prop="height" min-width="20px" label="身高">
      </el-table-column>
      <el-table-column prop="sex" label="性别"  width="95">
      </el-table-column>
      <el-table-column prop="birth" label="出生日期" width="150px">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180px">
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180px">
      </el-table-column>
      <!--<el-table-column  label="状态" width="120" >-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag size="small" :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 1">启动</el-tag>-->
          <!--<el-tag size="small" :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 2">禁用</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!-- 操作栏 -->
      <!-- 得添加新建检测 -->
      <el-table-column prop="operation" label="操作 ">
        <template slot-scope="scope" >
          <el-button size="small" type="primary"  @click="handleUpdate(scope.row)">查看</el-button>
          <el-button size="small" type="success" @click="handleModifyStatus(scope.row,'2')">新建检测
          </el-button>
          <!--<el-button v-if="scope.row.status!='1'" size="small" @click="handleModifyStatus(scope.row,'1')">查看-->
          <!--</el-button>-->
          <el-button size="small" type="danger" @click="modifyCurrentUsersInfor(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 信息查看弹框 -->
    <!-- 使用输入框，则不能修改 -->
    <el-dialog title="查看个人基本信息" :visible.sync="isShowEditVisible" width="500px">
      <el-form label-width="80px" :model="temp" ref="dataForm">
        <el-form-item label="用户编号" prop="id">
          <el-input v-model="temp.guardian_phone" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-input v-model="temp.birth" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="temp.height" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="性别" v-model="temp.status">
          <el-select v-model="temp.sex" placeholder="启用状态" disabled=true>
            <el-option v-for="item in status"
                       :label="item.label"
                       :value="item.statusId"
                       :key="item.statusId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false" type="success" round>好的</el-button>
        <!--<el-button type="primary" :loading="listLoading" @click="updateData" class="title1">确定</el-button>-->
      </div>
    </el-dialog>


    <!-- 分页器 -->
    <!-- 调用子组件方式 -->
    <!--<pagination v-show="true" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getList" />-->
    <el-pagination layout="total, prev, pager, next, jumper"
                   background
                   :current-page="page"
                   :page-size="pageSize"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   style="margin-top: 12px">
    </el-pagination>

  </div>
</template>

<script>
export default {
  // 引入子组件，无法渲染
  // components: {
  //   Pagination
  // },

  // 初始化状态
  data () {
    return {
      isShowEditVisible: false,
      // 列表
      tableList: [
        // 测试数据
        // {
        //   id: 1,
        //   name: 'test_0',
        //   title: '测试数据',
        //   number: '11111',
        // },
        // {
        //   id: 2,
        //   name: 'test_1',
        //   title: '测试数据',
        //   number: '22222',
        // }
      ],
      // 载入图标
      listLoading: false,
      // 初始化分页数据，会被覆盖
      TotalPage: 0, // 总页数，暂时没用到
      page: 1, // 当前页
      total: 0, // 数据总数
      pageSize: 5, // 每页容量

      // 性别
      status: [
        {
          statusId: 1,
          label: '男'
        }, {
          statusId: 0,
          label: '女'
        }
      ],
      // 选中当前行对象，拷贝
      temp: {
        id: '',
        name: '',
        birth: '',
        height: '',
        status: ''
      },

      value: '',  // 查询条件 - 性别
      searchName: '',  // 查询条件 - 姓名
      searchPhone: '',  // 查询条件 - 年龄

      // 初始化一个空对象，用于配置参数
      testParams: {}

      // 测试状态，不再使用
      // list: null,   //请求回来填充表格的数据
      // total: '',     //数据总条数
      // page: 1,    //默认显示第1页
      // limit: 5   //默认一次显示10条数据
    }
  },

  /**
   *  @attribute: 组件渲染时调用钩子
   *  @author: White
   *  @date: 19 - 04 - 12
   * */
  created () {
  },

  mounted () {
  },

  methods: {

    /**
     *  @function: 请求表格数据（页数，列表，数据数目，每页容量 ...）
     *  @author: White
     *  @date: 19 - 04 - 12
     *  @amend: 19 - 04 - 22
     *  @amendContent: 调用转换后的 Unix 时间戳
     *
     *  @date: 19 - 05 - 30
     *  @description: 增加了姓名、手机号的查询条件
     * */
    getData() {
      // 判断档案号是否填写，需做特殊处理
      /**
       * @exception: 能传到参数，请求有问题
       * @description: 出现空数据的原因，如当前页为 2 ，即是在第二页查找该姓名/档案号的用户数据，必然会返回空数据
       * @exceptionResolve: 每次重新查询不仅需要清空查询条件，还需返回第一页
       * */
      let searchNameParam = this.searchName;
      let searchPhoneParam = this.searchPhone;
      let params = this.testParams;

      // 服务端从 0 开始，客户端从 1 开始
      let start = this.page - 1;
      // 加载...
      this.listLoading = true

      // 判断当前查询条件，因服务 API 问题，在用档案号查询时必须单独以档案号作为请求参数
      if (searchNameParam === '' && searchPhoneParam === '') {
        // 无初始条件时，只带起始页
        params = {
          start,
          size: 10,
        }
      } else if (searchNameParam === '' && searchPhoneParam != '') {
        // 使用档案号查询，不能添加姓名
        params = {
          start,
          size: 10,
          guardian_phone: searchPhoneParam
        }
      } else {
        // 使用姓名查询，服务逻辑或，可加上档案号
        params = {
          // 初始页码
          // 缩写： 等同于 start: start
          start,
          // 每页容量，可根据 pageSizes 选项由客户端自定义
          size: 10,
          // 查询条件 - 姓名
          name: searchNameParam,
          // 查询条件 - 编号
          guardian_phone: searchPhoneParam
        }
      }

      // 发起请求
      this.axios.get('http://localhost:8082/information/findByPageAndParams',{
        // 请求参数
        params: params
      }).then(response => {

        // const limit = 10
        // const pageList = response.data.filter((item, index) => index < limit * this.Number && index >= limit * (this.Number - 1))
        // console.log(pageList)

        // 列表获取数据
        console.log('列表获取的数据：')
        console.log(response)

        // 请求状态码
        if (response.status === 200) {
          // this.Size = response.data.data.NumberOfElements;
          // 总数据量
          this.total = response.data.totalElements;
          // 后台当前页从 0 开始，分页器从 1 开始
          let currentPage = response.data.number;
          this.page = currentPage + 1;
          // 每页数据容量
          this.pageSize = response.data.Size;

          // 对应数据，需处理日期格式，所以暂时注释掉
          // 日期格式，性别显示已处理，所以不再直接填充列表
          // this.tableList = response.data.data.content;

          /**
           * @param: 调试时使用的对象，不再需要了
           * @date: 19 - 05 - 08
           * */
          // 用于存放后台传回的数据，方便调用
          // let tableListContainer = response.data.data.content;
          // console.log("tableListContainer：")
          // console.log(tableListContainer);

          /**
           * @reason: 存在一个问题，数组中的某个对象的属性不能改变
           * @circumstance: 已解决
           * */
          // 转换日期格式
          // @Date: 19 - 05 - 06
          // for (let i = 0;i<tableListContainer.length;) {
          //   // if (tableListContainer[i].birth !== null) {
          //   //   tableListContainer[i].birth.toLocaleDateString();
          //   // }
          //   console.log("每一条的出生日期：" + tableListContainer[i].birth)
          //   i++;
          // }


          /**
           * @exception: 日期显示为 Unix 时间戳，而性别显示为 int 类型
           * @resolveException: 重新以一个处理好数据类型的数组来赋值给 tableList
           *
           * @downDate: 19 - 05 - 08
           * @modifyMethod: 使用已声明的对象来获取请求参数中的每个对象，待处理好后再将数据存放于 tableList 中
           * @hinge: 需将事先声明的空数组添加当前数据条数的空对象，再深按拷贝对应的对象到数组的空对象中
           * */
          try {
            // 声明一个空数组
            let tableListContainer = [];
            // 声明一个空对象，用于存放转换好数据格式的单个对象
            // 需要显示哪条数据就事先声明哪个属性，可修改
            var objectOfListContainer = {
              guardian_phone: '',
              name: '',
              height: '',
              sex: '',
              birth: '',
              createTime: '',
              updateTime: ''
            };

            // 服务端的原始数据 - 数组
            let originTableList = response.data.content;

            for (let i = 0;i<originTableList.length;) {
              // 修改每个属性
              // 构建赋值
              objectOfListContainer.guardian_phone = originTableList[i].guardian_phone;
              /**
               * 新增检测次数
               * @date: 19 - 08 - 29
               * @author: xu
               */
              objectOfListContainer.inspectOrder = originTableList[i].inspectOrder;
              objectOfListContainer.name = originTableList[i].name;
              objectOfListContainer.height = originTableList[i].height;

              if (originTableList[i].sex === 1) {
                objectOfListContainer.sex = '男'
              }

              if (originTableList[i].sex === 0) {
                objectOfListContainer.sex = '女'
              }
              // objectOfListContainer.sex = originTableList[i].sex;

              // 日期的特殊处理
              // Unix 时间戳转换为 年/月/日 表示
              objectOfListContainer.birth = new Date(originTableList[i].birth).toLocaleDateString();
              objectOfListContainer.createTime = originTableList[i].createTime;
              objectOfListContainer.updateTime = originTableList[i].updateTime;

              // console.log("改变后的对象：")
              // console.log(objectOfListContainer)

              // 在堆中创建当前数据数目的空对象
              // i 位置，1 数目，{}
              tableListContainer.splice(i,1,{
                // empty object
              })
              // tableListContainer.splice(i,1,objectOfListContainer)
              // 从 0 开始，单个对象深拷贝
              Object.assign(tableListContainer[i],objectOfListContainer)

              i++;
            }

            // console 测试
            console.log(" -----------循环结束后：")
            console.log('存放值的对象：')
            console.log(objectOfListContainer)
            console.log('已声明的数组：')
            console.log(tableListContainer)

            // 将处理好的列表 list 放到表格中
            this.tableList = tableListContainer;

          } catch (e) {
            this.$alert('发生了一些错误：' + e, '错误！', {
              confirmButtonText: '确定',
              callback: action => {
                // 回调信息
                console.log("确认信息：" + action)
              }
            })
          }

          // 测试数据，不再使用了
          // this.limit = response.data.data.Size;
          // this.TotalPage = response.data.length
          // this.tableList = pageList

          // 关闭加载图标
          this.listLoading = false
        } else {
          // 请求失败时的异常
          this.$alert('未响应！！！', '服务器开小差了！', {
            confirmButtonText: '知道了',
            // 弹窗的回调
            callback: action => {
              console.log("发生异常后的信息：" + action)
            }
          })
        }
      },err => {
        // 打印错误信息
        console.log(err);
      }).catch(
        // ... 错误处理
      )
    },

    /**
     * @function: 过滤当前数据，根据条件筛选
     * @author: White
     * @date: 19 - 05 - 22
     * */
    filterCurrentPage: () => {

    },

    // 测试写法，不使用
    getList(){
      var start = (this.page - 1) * this.limit;
      var end   = this.page * this.limit;
      this.axios.get('http://localhost:8080/information/listInformation' + '?Size=' + start)
        .then(response => {
          console.log(response);
          // 测试数据
          this.total = response.data.data.NumberOfElements;
          this.tableList = response.data.data.content;
          this.page = response.data.data.Number;
          this.limit = response.data.data.Size;

          // this.list = response.data.items;
          // this.total = response.data.total;
          resolve();
        }).catch(err => {

      })
  },

    /**
     *  @function: 请求页面数据
     *  @author: White
     *  @date: 19 - 04 - 12
     * */
    doFilter() {
      try {
        // 每次查询都自动跳转到第一页
        this.page = 1;
        // 直接发起请求
        this.getData();
        // 因存在多次查询的情况，每次查询完成则清空查询条件
        this.searchName = '';
        this.searchPhone = '';
      } catch (e) {
        this.$alert('未响应！！！', '服务器开小差了！' + e, {
          confirmButtonText: '知道了',
          // 弹窗的回调
          callback: action => {
            console.log("发生异常后的信息：" + action)
          }
        })
      }

      console.log(this.searchName)


      /**
       *  @function: 条件过滤器 - 待后开发
       *  @author: White
       *  @date: 19 - 04 - 15
       *
       *  @description: 服务创建，增加了姓名，档案号
       *  @date: 19 - 05 - 31
       * */

      // 每次手动将数据置空,因为会出现多次点击搜索情况
      // this.filterTableDataEnd = []
      // 暂时不用
      // this.tableList.forEach((value, index) => {
      //   if (value.name) {
      //     if (value.name.indexOf(this.searchName) >= 0) {
      //       this.filterTableDataEnd.push(value)
      //       console.log(this.filterTableDataEnd)
      //     }
      //   }
      // })
      // 页面数据改变重新统计数据数量和当前页
      // this.Number = 1
      // this.TotalPage = this.filterTableDataEnd.length
      // 渲染表格,根据值
      // 暂时不用，
      // this.currentChangePage(this.filterTableDataEnd)
    },

    /**
     *  @function: 个人信息 - 查看
     *  @author: White
     *  @date: 19 - 04 - 12
     * */
    handleUpdate(row) {
      // 弹窗
      this.isShowEditVisible = true
      // 拷贝当前行的对象
      this.temp = Object.assign({}, row)

      // console.log("拷贝的对象：")
      // console.log(this.temp)
      // console.log(Object.values(this.temp)[4])

      // 将时间格式转换
      // this.temp.birth.toLocaleDateString();
      console.log(row)
    },

    /**
     *  @function: 新建检测，待开发
     *  @param: row, status
     *  @author: White
     *  @date: 19 - 04 - 12
     *  @description: 增加一个联合主键，服务新建一条信息
     *
     *  @modify: 增加了一个状态，来改变显示的按钮
     *  @date: 19 - 08 - 29
     * */
    handleModifyStatus(row, status) {
      // 改变状态
      this.$store.commit('changeStatus', 2);
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // });
      console.log(row);
      row.status = status;

      this.temp = Object.assign({
        // empty object
      }, row);
      // 用户 ID
      const _checkId = this.temp.guardian_phone;
      // 用户姓名
      const _checkUserName = this.temp.name;
      const _checkMeaTime = this.temp.inspectOrder;
      // 获取目标用户 ID
      this.$store.commit('changeId', _checkId);
      // 获取目标用户姓名
      this.$store.commit('changeUserName', _checkUserName);
      this.$store.commit('newMeasures', _checkMeaTime);
      this.$router.push('/Home');
    },

    /**
     *  @function: 页容量改变的回调函数
     *  @author: White
     *  @date: 19 - 04 - 12
     *  @description: 页容量此时是定死了的，所以不会发生改变，每次页容量发生改变时均会请求一次数据
     * */
    handleSizeChange (val) {
      this.pageSize = val
      console.log("当前数据总数" + this.pageSize)
      this.getData();
    },

    /**
     *  @function: 页码改变的回调函数
     *  @author: White
     *  @date: 19 - 04 - 12
     *  @description: 每当页码发生变化时均会按当前页码请求数据
     * */
    handleCurrentChange (val) {
      this.page = val
      console.log("当前页码：" + this.page)
      this.getData();
    },

    /**
     *  @function: store 测试 / 修改
     *  @author: White
     *  @date0: 19 - 04 - 16
     *  @date1: 19 - 05 - 08
     *  @description: 修改个人信息，实质是获取当前用户的ID
     * */
    modifyCurrentUsersInfor (row) {

      // 改变当前状态
      this.$store.commit('changeStatus', 1);

      // console.log("当前行：")
      // console.log(row)

      console.log(this.tableList);
      console.log(this.temp);

      // 从指定数据拷贝到 temp 对象中，用于获取目标 id
      this.temp = Object.assign({
        // empty object
      }, row);
      // 用户 ID
      const _checkId = this.temp.guardian_phone;
      // 用户姓名
      const _checkUserName = this.temp.name;
      const _checkMeaTime = this.temp.inspectOrder;
      // 获取目标用户 ID
      this.$store.commit('changeId', _checkId);
      // 获取目标用户姓名
      this.$store.commit('changeUserName', _checkUserName);
      this.$store.commit('newMeasures', _checkMeaTime);
      // 获取完成则跳转到主页面
      this.$router.push('/Home');
    },

    /**
     *  @function: store 测试按钮
     *  @author: White
     *  @date: 19 - 04 - 16
     *  @description: not used
     * */
    testCreateStore () {
      // store 测试按钮
      const paramValue = Math.random();
      const testValue = this.$store.getters.getId;
      this.$store.commit('changeId',paramValue);
      console.log('组件 - 1 全局 state 的值：' + testValue);
    },
    testCheckStore () {
      // let _testValue = this.$store.state.id;
      // console.log('组件 - 1 全局 state 的值：' + _testValue);

      const testValue_0 = 136;
      const testValue_1 = 'test'
      console.log('testValue_0的类型是：' + typeof testValue_0);
      console.log('testValue_1的类型是：' + typeof testValue_1);
    },

    /**
     *  @function: 改变页码，条件过滤
     *  @author: White
     *  @date: 19 - 04 - 12
     * */
    currentChangePage (list) {
      let from = (this.page - 1) * this.Size
      const to = this.page * this.Size
      this.tableList = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableList.push(list[from])
        }
      }
    },

    updateData () {
      this.isShowEditVisible = false;
    },

    /**
     *  @function: 点击上、下页的回调函数，不使用
     *  @param: null
     *  @return: null
     *  @author: White
     *  @date: 19 - 04 - 15
     * */
/*    handlePreviousPage (previousValue) {
      this.page = previousValue;
    },

    handleNextPage (nextValue) {
      this.page = nextValue;
    }*/
  }
}
</script>

<style scoped>

</style>
