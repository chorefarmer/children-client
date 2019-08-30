<template>
  <div style="background-color: #EAEAEA;min-height:800px">
    <div style="width:100%;background-color: rgba(25,132,198,0.61); overflow: hidden">

            <span class="demonstration" style="padding-top:5px;color:white;margin-left:1%;font-size: 22px">
              <img src="../assets/logoSys.png" style="width: 53px;height: 53px;padding-top: 3px"/>
                儿童个体营养监测管理系统
            </span>

      <!-- 删除输入框 -->
<!--      <span class="demonstration" style="float:left;padding:5px;color:white;margin-left:2%;width:15%">
                <el-input
                  placeholder="请输入"
                  icon="search"
                  v-model="searchCriteria"
                  :on-icon-click="handleIconClick">
                </el-input>
            </span>-->

      <!-- 准备用于显示当前测试用户 ID -->
      <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="hover" @command="handleCommand">
                  <span class="el-dropdown-link" style="color:white;font-size: 26px">
                    <!-- 用于其他项创建、查询（需使用个人编号，后台修改每张表的自增主键） -->
                    <!-- @author: White -->
                    <!-- @date: 19 - 04 - 18 -->
                    {{ this.$store.getters.getUserName }}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a" style="font-size: 17px">个人信息</el-dropdown-item>
                    <el-dropdown-item command="b" style="font-size: 17px" divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10" class="backSetting">

        <!-- 导航栏 -->
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:800px" @select="handleSelect">
              <el-menu-item index="1" style="font-size: 25px">
                <img src="../assets/newUser.png"
                     style="width: 40px;height: 40px;margin: 0 30px 0 30px"/>
                新建档案
              </el-menu-item>
              <el-menu-item index="2" style="font-size: 25px">
                <img src="../assets/searchUser.png"
                     style="width: 40px;height: 40px;margin: 0 30px 0 30px"/>
                检测管理
              </el-menu-item>
              <el-menu-item index="3" style="font-size: 25px">
                <img src="../assets/backup.png"
                     style="width: 40px;height: 40px;margin: 0 30px 0 30px"/>
                备份归档
              </el-menu-item>
              <el-menu-item index="4" style="font-size: 25px">
                <img src="../assets/setting.png"
                     style="width: 40px;height: 40px;margin: 0 30px 0 30px"/>
                系统管理
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">

          <!-- 面包屑，需做一个窗口跳转 -->
          <div>
            <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/Home' }" style="font-size: 17px">主页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in breadcrumbItems" style="font-size: 17px">{{ item }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>

          <!-- 组件渲染出口 -->
          <div style="margin-top:10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 底部 -->
    <div class="home-bottom" style="border-top: 1px solid rgba(69,69,69,0.6)">
      <div style="font-size: 12px;font-family: 'Arial Narrow'">© KANG PING 康萍科技有限公司 版权所有</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      // 数据初始化
      searchCriteria: '',
      nameOfUser: '',
      breadcrumbItems: []
    }
  },
  /**
   *  调用钩子
   *  @author: White
   *  @date: 2019 - 04 - 16
   * */
  mounted () {
    // const checkUserName = this.$store.getters.getUserName;
    // if (checkUserName == '') {
    //   this.nameOfUser = 'admin'
    // } else {
    //   this.nameOfUser = checkUserName;
    // }
  },
  methods: {

    /**
     * @function: handle the drop items
     * @param: command
     * @return: null
     * @author: White
     * @date: 19 - 07 - 05
     * */
    handleCommand (command) {
      console.log('click the items:' + command)
      // 判断选项
      if (command === 'a') {
        const isUsersId = this.$store.getters.getId;
        if (isUsersId === ''){
          this.$alert('您还没有录入您的信息', '提示！', {
            confirmButtonText: '确定',
            callback: action => {
              // 回调信息
              console.log("确认信息：" + action)
            }
          })
        } else {
          this.$router.push('/baseInfo')
        }
      } else {
        try {
          this.$confirm('是否退出当前登陆', '提示！', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.$router.push('Home');
              this.$store.commit('changeId', '');
              this.$store.commit('changeUserName', '');
            })
            .catch(action => {
              // console
              console.log('取消确认信息：' + action === 'cancel' ? '选择了关闭。' : '选择了取消。')
            });
        } catch (e) {
          throw new DOMException(e)
        }
      }
    },

    handleIconClick(ev) {
      console.log(ev)
    },

    // 导航跳转
    handleSelect(key) {
      switch(key){
        case '1':
          this.$router.push('/Home');
          this.breadcrumbItems  = ['新建档案']
          this.$store.commit('changeId','')
          this.$store.commit('newMeasures', 1)
          break;
        case '2':
          this.$router.push('/About')
          this.breadcrumbItems  = ['检测管理']
          break;
        case '3':
          this.$router.push('/Contact')
          this.breadcrumbItems  = ['备份归档']
          break;
        case '4':
          this.$router.push('/Files')
          this.breadcrumbItems = ['系统管理']
          break;
      }
    }
  }
}
</script>

<style>
.home-bottom {
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(25,132,198,0.61);
  border-radius: 10px;
}
  .backSetting {
    /*background-image: url('../assets/back_5_5.jpg');*/
    background-position: bottom right;
    background-repeat: repeat-x;
  }
</style>
