<template id="contact">
  <div>
    <div class="userInfo-selection">
      <!-- 个人信息 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: #F56C6C;
           display: flex;">
        <!-- 指向路由 -->
        <router-link to="/baseInfo">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/child.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>个人信息</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 体成分检测 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(101,155,255,0.82);
           display: flex;
           ">
        <!-- 指定路由 -->
        <router-link to="/bodyComposition">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/ingredient.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>体成分检测</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 主诉与症状 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(25,24,183,0.73);
           display: flex;">
        <!-- 指向路由 -->
        <router-link to="/symptom">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/symptom.png"
                 style="height: 145px;width: 155px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>主诉与症状</a>
            </el-aside>
          </div>
        </router-link>
      </div>

    </div>


    <div class="userInfo-selection">
      <!-- 实验室检测 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(255,187,98,0.75);
           display: flex;">
        <!-- 指定路由 -->
        <router-link to="/laboratory">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/laboratory_0.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>实验室检测</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 食物过敏 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(255,131,25,0.78);
           display: flex;">
        <!-- 指定路由 -->
        <router-link to="/foodAvoid">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/foodAvoid.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>食物过敏</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 膳食调查 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(0,209,55,0.84);
           display: flex;
           ">
        <!-- 指定路由 -->
        <router-link to="/eating">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/foodMeasure.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>膳食调查</a>
            </el-aside>
          </div>
        </router-link>
      </div>
    </div>

    <div class="userInfo-selection">
      <!-- 基因检测，暂时没定
      <div class="userInfo-menu" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <router-link to="/gene">
          <div><i class="el-icon-setting"></i>基因检测</div>
        </router-link>
      </div> -->

      <!-- 运动调查 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(155,72,255,0.89);
           display: flex;
           ">
        <!-- 指定路由 -->
        <router-link to="/sportsExamine">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/sportsMeasure.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>运动调查</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 系统分析 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(222,6,163,0.87);
           display: flex;
           ">
        <!-- 指定路由 -->
        <router-link to="/analysis">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/system.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>系统分析</a>
            </el-aside>
          </div>
        </router-link>
      </div>

      <!-- 体成分检测改成基因检测 -->
      <div class="userInfo-menu"
           style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);
           border-radius: 20px;
           background-color: rgba(220,154,255,0.8);
           display: flex;
           ">
        <!-- 指定路由 -->
        <router-link to="/geneMeasures">
          <div style="color: rgb(255,255,255);display: flex;flex-direction: row">
            <img src="../assets/gene.png"
                 style="height: 145px;width: 145px"/>
            <el-aside style="font-size: 25px;padding: 55px 0 0 23px" width="100">
              <a>基因检测</a>
            </el-aside>
          </div>
        </router-link>
      </div>

    </div>

    <!-- 基因检测 -->
    <!--<div class="otherModule">-->
    <!--<div class=""-->
         <!--style="box-shadow: 0 10px 12px 0 rgba(31,31,86,0.4);-->
           <!--border-radius: 50%;-->
           <!--background-color: rgba(220,154,255,0.51);-->
           <!--display: flex;-->
           <!--align-items: center">-->
      <!--&lt;!&ndash; 指定路由 &ndash;&gt;-->
      <!--<router-link to="/">-->
        <!--<div style="color: rgb(255,255,255)">-->
          <!--<img src="../assets/ingredient.png"-->
               <!--style="height: 100px;width: 100px"/>-->
          <!--<a style="padding-left: 12px">基因检测</a></div>-->
      <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  /*@import "../assets/css/global.home.css";*/

  .userInfo-selection {
    display: flex;
    margin-bottom: 20px;
  }
  .userInfo-selection div {
    flex: 0 25%;
    height: 195px;
    width: 100px;
    margin: 22px 0 5px 60px;
    font-size: large;
  }
  .userInfo-menu {
    flex-direction: column;
    /*border-radius: 10px;*/
  }
  .userInfo-menu div {
    font-size: 15px;
  }
</style>
