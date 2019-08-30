<template>
  <div class="clinical"
       style="width: 90%;
       height: 600px;
       margin-top: 10px;
       border-radius: 10px;
       background: #ffffff;">

    <!-- 临床表现症状 -->
    <div class="clinical-content"
         style="border: black solid 1px;">
      <el-collapse v-model="activeName" accordion>

        <!-- 含有症状展示 - 头发 -->
        <el-collapse-item title="头发" name="1">
          <div v-model="conditionList.hairCondition">
            <li v-for="item_0 in conditionList.hairCondition">
              {{ item_0 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 含有症状展示 - 眼睛 -->
        <el-collapse-item title="眼睛" name="2">
          <div v-model="conditionList.eyeCondition">
            <li v-for="item_1 in conditionList.eyeCondition">
              {{ item_1 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 含有症状展示 - 皮肤 -->
        <el-collapse-item title="皮肤" name="3">
          <div v-model="conditionList.skinCondition">
            <li v-for="item_2 in conditionList.skinCondition">
              {{ item_2 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 含有症状展示 - 口腔 -->
        <el-collapse-item title="口腔" name="4">
          <div v-model="conditionList.mouthCondition">
            <li v-for="item_3 in conditionList.mouthCondition">
              {{ item_3 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 含有症状展示 - 牙齿 -->
        <el-collapse-item title="牙齿" name="5">
          <div v-for="item_4 in conditionList.toothCondition">
            <li>
              {{ item_4 }}
            </li>
          </div>
        </el-collapse-item>
        <!--<el-collapse-item title="一致性 Consistency" name="6">-->
          <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
        <!--</el-collapse-item>-->
      </el-collapse>
    </div>

    <!-- 元素缺乏 -->
    <div class="substance-lack"
         style="border: black solid 1px;">

      <!-- 元素缺乏 - 头发 -->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="头发" name="1">
          <div v-for="item_00 in lackCircumstance.lackOfHair">
            <li>
              {{ item_00 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 元素缺乏 - 眼睛 -->
        <el-collapse-item title="眼睛" name="2">
          <div v-for="item_01 in lackCircumstance.lackOfEyes">
            <li>
              {{ item_01 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 元素缺乏 - 皮肤 -->
        <el-collapse-item title="皮肤" name="3">
          <div v-for="item_02 in lackCircumstance.lackOfSkin">
            <li>
              {{ item_02 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 元素缺乏 - 口腔 -->
        <el-collapse-item title="口腔" name="4">
          <div v-for="item_03 in lackCircumstance.lackOfMouth">
            <li>
              {{ item_03 }}
            </li>
          </div>
        </el-collapse-item>

        <!-- 元素缺乏 - 牙齿 -->
        <el-collapse-item title="牙齿" name="5">
          <div v-for="item_04 in lackCircumstance.lackOfTooth">
            <li>
              {{ item_04 }}
            </li>
          </div>
        </el-collapse-item>
        <!--<el-collapse-item title="一致性 Consistency" name="6">-->
        <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
        <!--</el-collapse-item>-->
      </el-collapse>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 用户情况
        conditionList: {
          hairCondition: [],
          eyeCondition: [],
          skinCondition: [],
          mouthCondition: [],
          toothCondition: []
        },
        // 相应维生素的缺乏
        lackCircumstance: {
          lackOfHair: [],
          lackOfEyes: [],
          lackOfSkin: [],
          lackOfMouth: [],
          lackOfTooth: []
        },
        // 起始栏 - 默认 头发
        activeName: '1'
      }
    },

    mounted () {
      // 获取当前用户 ID
      let _checkCurrentUserSymptomId = this.$store.getters.getId;
      const _checkTimes = this.$store.getters.getMeasuresTimes;
      // 判断是否存在用户
      if (_checkCurrentUserSymptomId !== '') {
        this.getUserSymptomData(_checkCurrentUserSymptomId, _checkTimes);
      } else {
        return false;
      }
    },

    methods: {
      /**
       * @function: 处理请求返回的数据
       * @author: White
       * @date: 19 - 04 - 30
       * @amendDate: 19 - 05 - 06
       * @amendContent: 每一项的信息展示
       * @2rdDate: 19 - 05 - 07
       * @addContent: 没有任何填写时的显示
       * */
      dealCurrentUserSymptomData (currentUserSymptomDataParam) {
        console.log("当前用户信息对象：")
        console.log(currentUserSymptomDataParam)

        let currentUserSymptomMessage = [];
        let currentUserSymptomAboutHair = this.conditionList.hairCondition;
        let currentUserSymptomAboutEyes = this.conditionList.eyeCondition;
        let currentUserSymptomAboutSkin = this.conditionList.skinCondition;
        let currentUserSymptomAboutMouth = this.conditionList.mouthCondition;
        let currentUserSymptomAboutTooth = this.conditionList.toothCondition;

        let currentUserSymptomLackOfHair = this.lackCircumstance.lackOfHair;
        let currentUserSymptomLackOfEyes = this.lackCircumstance.lackOfEyes;
        let currentUserSymptomLackOfSkin = this.lackCircumstance.lackOfSkin;
        let currentUserSymptomLackOfMouth = this.lackCircumstance.lackOfMouth;
        let currentUserSymptomLackOfTooth = this.lackCircumstance.lackOfTooth;

        // 获取对象键名
        let newKeys = Object.keys(currentUserSymptomDataParam).sort()
        // console.log("排序后的键名：")
        // console.log(newKeys)

        try {
          // 判断某一项是否被选
          // 临床表现 - 头发
          if (Object.values(currentUserSymptomDataParam)[15] === 'true') {
            currentUserSymptomAboutHair.push('细软')
            currentUserSymptomLackOfHair.push('蛋白质缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[16] === 'true') {
            currentUserSymptomAboutHair.push('稀少')
            currentUserSymptomLackOfHair.push('蛋白质缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[17] === 'true') {
            currentUserSymptomAboutHair.push('变色')
            currentUserSymptomLackOfHair.push('蛋白质缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[18] === 'true') {
            currentUserSymptomAboutHair.push('变脆')
            currentUserSymptomLackOfHair.push('蛋白质缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[19] === 'true') {
            currentUserSymptomAboutHair.push('易脱落')
            currentUserSymptomLackOfHair.push('维生素A缺乏、铁缺乏者')
          }
          if (Object.values(currentUserSymptomDataParam)[20] === 'true') {
            currentUserSymptomAboutHair.push('环形脱发')
            currentUserSymptomLackOfHair.push('维生素D缺乏者')
          }
          if (Object.values(currentUserSymptomDataParam)[21] === 'true') {
            currentUserSymptomAboutHair.push('干燥')
            currentUserSymptomLackOfHair.push('维生素A缺乏、铁缺乏者')
          }
          if (Object.values(currentUserSymptomDataParam)[22] === 'true') {
            currentUserSymptomAboutHair.push('枕秃')
            currentUserSymptomLackOfHair.push('维生素D缺乏者')
          }
          // 头发 - 没有填写
          if (Object.values(currentUserSymptomDataParam)[15] === 'false'
            && Object.values(currentUserSymptomDataParam)[16] === 'false'
            && Object.values(currentUserSymptomDataParam)[17] === 'false'
            && Object.values(currentUserSymptomDataParam)[18] === 'false'
            && Object.values(currentUserSymptomDataParam)[19] === 'false'
            && Object.values(currentUserSymptomDataParam)[20] === 'false'
            && Object.values(currentUserSymptomDataParam)[21] === 'false'
            && Object.values(currentUserSymptomDataParam)[22] === 'false') {
            currentUserSymptomAboutHair.push('无')
            currentUserSymptomLackOfHair.push('无')
          }

          // 临床表现 - 眼睛
          if (Object.values(currentUserSymptomDataParam)[23] === 'true') {
            currentUserSymptomAboutEyes.push('干眼症')
            currentUserSymptomLackOfEyes.push('维生素A缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[24] === 'true') {
            currentUserSymptomAboutEyes.push('角膜软化')
            currentUserSymptomLackOfEyes.push('维生素A缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[25] === 'true') {
            currentUserSymptomAboutEyes.push('角膜溃疡')
            currentUserSymptomLackOfEyes.push('维生素A缺乏')
          }
          // 眼睛 - 没有填写
          if (Object.values(currentUserSymptomDataParam)[23] === 'false'
            && Object.values(currentUserSymptomDataParam)[24] === 'false'
            && Object.values(currentUserSymptomDataParam)[25] === 'false') {
            currentUserSymptomAboutEyes.push('无')
            currentUserSymptomLackOfEyes.push('无')
          }

          // 临床表现 - 皮肤
          if (Object.values(currentUserSymptomDataParam)[26] === 'true') {
            currentUserSymptomAboutSkin.push('干燥起皮')
            currentUserSymptomLackOfSkin.push('维生素A缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[27] === 'true') {
            currentUserSymptomAboutSkin.push('脱屑')
            currentUserSymptomLackOfSkin.push('维生素A缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[28] === 'true') {
            currentUserSymptomAboutSkin.push('毛囊角化性丘疹')
            currentUserSymptomLackOfSkin.push('维生素A缺乏')
          }
          // 皮肤 - 没有填写
          if (Object.values(currentUserSymptomDataParam)[26] === 'false'
            && Object.values(currentUserSymptomDataParam)[27] === 'false'
            && Object.values(currentUserSymptomDataParam)[28] === 'false') {
            currentUserSymptomAboutSkin.push('无')
            currentUserSymptomLackOfSkin.push('无')
          }

          // 临床表现 - 口腔
          if (Object.values(currentUserSymptomDataParam)[29] === 'true') {
            currentUserSymptomAboutMouth.push('地图舌')
            currentUserSymptomLackOfMouth.push('锌缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[30] === 'true') {
            currentUserSymptomAboutMouth.push('反复口腔溃疡')
            currentUserSymptomLackOfMouth.push('锌缺乏')
          }
          // 口腔 - 没有填写
          if (Object.values(currentUserSymptomDataParam)[29] === 'false'
            && Object.values(currentUserSymptomDataParam)[30] === 'false') {
            currentUserSymptomAboutMouth.push('无')
            currentUserSymptomLackOfMouth.push('无')
          }

          // 临床表现 - 牙齿
          if (Object.values(currentUserSymptomDataParam)[31] === 'true') {
            currentUserSymptomAboutTooth.push('牙釉质脱落')
            currentUserSymptomLackOfTooth.push('维生素A缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[32] === 'true') {
            currentUserSymptomAboutTooth.push('易发生龋齿')
            currentUserSymptomLackOfTooth.push('维生素A缺乏、维生素D缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[33] === 'true') {
            currentUserSymptomAboutTooth.push('婴儿出牙晚')
            currentUserSymptomLackOfTooth.push('维生素D缺乏')
          }
          if (Object.values(currentUserSymptomDataParam)[34] === 'true') {
            currentUserSymptomAboutTooth.push('牙龈出血')
            // currentUserSymptomLackOfTooth.push('')
          }
          // 头发 - 没有填写
          if (Object.values(currentUserSymptomDataParam)[31] === 'false'
            && Object.values(currentUserSymptomDataParam)[32] === 'false'
            && Object.values(currentUserSymptomDataParam)[33] === 'false'
            && Object.values(currentUserSymptomDataParam)[34] === 'false') {
            currentUserSymptomAboutTooth.push('无')
            currentUserSymptomLackOfTooth.push('无')
          }
        } catch (e) {
          this.$message({
            message: '发生了一些错误：' + e,
            type: 'warning'
          })
        }
        
        // this.conditionList.hairCondition.push(Object.keys(currentUserSymptomDataParam)[1]);
        // this.conditionList.hairCondition.push(Object.keys(currentUserSymptomDataParam)[4]);
      },

      /**
       * @function: 请求用于填充手风琴的数据
       * @author: White
       * @date: 19 - 04 - 30
       * */
      getUserSymptomData (checkCurrentUserId, times) {
        // 发起请求
        this.axios.get('http://localhost:8082/pastMedicalHistory', {
          params: {
            guardian_phone: checkCurrentUserId,
            inspectOrder: times
          }
        })
          .then((response) => {
            let currentUserSymptomData = response.data.data;
            // console.log(currentUserSymptomData)
            // 将返回参数传入处理函数
            this.dealCurrentUserSymptomData(currentUserSymptomData);
          },err => {
            // 错误信息
            console.log("发生了一些错误：" + err)
          }).catch(
            // 异常处理 ...
        )
      }
    }
  }
</script>

<style scoped>
.clinical {
  display: flex;
  /*flex-direction: column;*/
}
  .clinical-content {
    flex: 40%;
    margin: 20px 10px 20px 20px;
    padding: 20px 30px 10px 20px;
  }
  .substance-lack {
    flex: 40%;
    margin: 20px 20px 20px 10px;
    padding: 20px 30px 10px 20px;
  }
</style>
