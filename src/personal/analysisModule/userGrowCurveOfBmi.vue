<template>
  <div
    style="width: 95%;
    height: 670px;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 10px">
    
    <!-- button for choose this module -->
    <div class="chooseModuleButton"
         style="margin: 0 0 0 10px;padding-top: 5px;">
      <el-button @click="checkCurrentCanvas" :type="isChosen" v-model="moduleChooseStatus">{{ moduleChooseStatus }}</el-button>
    </div>
    
    <div id="myChartOfBmi"
         :style="{
         width: '100%',
         height: '630px',
         padding: '10px 0 0 10px'
         }"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 初始化性别，方便调用
        currentUsersParamOfSex: '',
        // 是否选择
        isChosen: 'primary',
        moduleChooseStatus: '选择'
      }
    },

    /**
     * @hook: mounted()
     * */
    mounted () {
      // 获取当前用户编号，检测次数
      const _currentUserIdForSex = this.$store.getters.getId;
      const _times = this.$store.getters.getMeasuresTimes;
      // 获取当前用户数据
      this.getCurrentUsersSex(_currentUserIdForSex, _times);

      // 在请求到当前用户信息中处理
      // this.drawCurveOfBmi();
    },

    // 计算属性
/*    computed () {

    },*/

    methods: {

      /**
       * @function: deal the format of users age
       * @param: formatUsersAgeParam
       * @return: formattedUsersAge
       * @author: White
       * @date: 19 - 06 - 19
       * */
      formatTheCurrentUsersAgeInBmi (formatUsersAgeParam) {
        let ageSplitArrayContainer = [];
        ageSplitArrayContainer = formatUsersAgeParam.split('岁')
        let ageSplitArrayForMonth = ageSplitArrayContainer[1].split('个月')
        let formattedUsersAge = parseInt(formatUsersAgeParam) + parseInt(ageSplitArrayContainer[1])/12 + parseInt(ageSplitArrayForMonth[1])/360;
        return formattedUsersAge;
      },

      /**
       * @function: base64 To File()
       * @param: dataUrl, filename
       * @return: new File()
       * @author: White
       * @date: 19 - 06 - 03
       * @description: 转换成 File 对象，用于上传
       * */
      dataUrlToFile (dataUrl, filename) {
        let arr = dataUrl.split(','),  // 分割
          base64Code = arr[0].match(/:(.*?);/)[1],  // 查询匹配的字符
          base64Decode = atob(arr[1]),  // 解码 base64
          n = base64Decode.length,
          // 8 位无符号整数值类型化数组
          u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = base64Decode.charCodeAt(n);
        }
        // 返回生成的 File 对象
        return new File([u8arr], filename, {
          type: base64Code
        });
      },

      /**
       * @function: 测试图片转换
       * @description: 此方法需手动下载，需通过文件流处理
       * @description1: 这样的交互方式还是不行
       *
       * @return: 增加了 base64 转换成 File() 对象
       * @date: 19 - 06 - 03
       * @author: White
       * @description: 不需要使用 img 标签，直接获取 base64 编码
       * @exception: 在转换 base64 编码时，需在 File() 对象中加上格式名，否则上传文件无格式
       * */
      checkCurrentCanvas () {

        // 将 base64 转换方法放在此方法内！！
        // due to Vue component 的生命周期
        /**
         * @function: convert base64 to file(image/png)
         * */
        const convertBase64 = function (dataUrl, filename) {
          let arr = dataUrl.split(','),  // 分割
            base64Code = arr[0].match(/:(.*?);/)[1],  // 查询匹配的字符
            base64Decode = atob(arr[1]),  // 解码 base64
            n = base64Decode.length,
            // 8 位无符号整数值类型化数组
            u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = base64Decode.charCodeAt(n);
          }
          // 返回生成的 File 对象
          return new File([u8arr], filename, {
            type: base64Code
          });
        }

        // 获取当前 canvas 元素
        let canvasContainer = document.getElementById('myChartOfBmi').getElementsByTagName('canvas');
        console.log(canvasContainer[0]);

        // 生成一个 a 元素，用于手动下载测试
        // 不再使用
        let elementOfA = document.createElement('a');

        /**
         * @function: test canvas to png
         * */
        const baseContainer = canvasContainer[0].toDataURL("image/png");

        // 转换成 File()
        const newPictureFile = convertBase64(baseContainer, this.$store.getters.getId + '_Bmi.png');
        // 发起请求
        this.uploadTheChartFile(newPictureFile);
        // this.uploadTheChartFile(this.base64ToBlob(baseContainer));

        // 创建一个单击事件
        // 下载
/*        const event = new MouseEvent('click')
        // 下载文件名
        elementOfA.download = '下载名称';
        elementOfA.href = canvasContainer[0].toDataURL("image/png");
        //
        elementOfA.dispatchEvent(event);*/
      },
      
      /**
       * @function: 图表
       * @param: val
       * @param: ageParamForDraw
       * @param: usersValueOfBmi
       * @date: 19 - 05 - 29
       * @author: White
       * @exception: 女孩儿图表出现波动大的拐点，数据正确
       * @exceptionResolve: 调整了数据，不是真实值，not sure if there will be bug.
       * */
      drawCurveOfBmi (val, ageParamForDraw, usersValueOfBmi) {

        // 存储用户数据 - 年龄、BMI
        let currentUsersDataOfAgeAndBmi = [];
        // format - [ageOfUser, valueOfUser]
        // currentUsersDataOfAgeAndBmi.unshift(this.formatTheCurrentUsersAgeInBmi(ageParamForDraw), usersValueOfBmi)
        currentUsersDataOfAgeAndBmi.unshift(ageParamForDraw, usersValueOfBmi)

        /**
         * @variation: 参考曲线数据 - 男
         * */
        // P3
        const referenceBMICurveDataOfBoysP3 = [
            [2, 14.26], [2.5, 13.99], [3, 13.74], [3.5, 13.55], [4, 13.4], [4.5, 13.28], [5, 13.21], [5.5, 13.16], [6, 13.12], [6.5, 13.09], [7, 13.1], [7.5, 13.12],
            [8, 13.17], [8.5, 13.24], [9, 13.33], [9.5, 13.45], [10, 13.59], [10.5, 13.74], [11, 13.92], [11.5, 14.1], [12, 14.28], [12.5, 14.46], [13, 14.65], [13.5, 14.84],
            [14, 15.02], [14.5, 15.2], [15, 15.37], [15.5, 15.53], [16, 15.69], [16.5, 15.85], [17, 15.99], [17.5, 16.14], [18, 16.27]
          ]

        // P5
        const referenceBMICurveDataOfBoysP5 = [
          [2, 14.49], [2.5, 14.21], [3, 13.95], [3.5, 13.76], [4, 13.61], [4.5, 13.5], [5, 13.43], [5.5, 13.39], [6, 13.36], [6.5, 13.35], [7, 13.36], [7.5, 13.4],
          [8, 13.46], [8.5, 13.55], [9, 13.65], [9.5, 13.78], [10, 13.93], [10.5, 14.1], [11, 14.29], [11.5, 14.48], [12, 14.67], [12.5, 14.87], [13, 15.06], [13.5, 15.26],
          [14, 15.45], [14.5, 15.63], [15, 15.81], [15.5, 15.98], [16, 16.14], [16.5, 16.3], [17, 16.45], [17.5, 16.6], [18, 16.74]
        ]

        // P10
        const referenceBMICurveDataOfBoysP10 = [
          [2, 14.86], [2.5, 14.56], [3, 14.3], [3.5, 14.1], [4, 13.96], [4.5, 13.84], [5, 13.78], [5.5, 13.76], [6, 13.75], [6.5, 13.76], [7, 13.8], [7.5, 13.86],
          [8, 13.94], [8.5, 14.05], [9, 14.18], [9.5, 14.33], [10, 14.51], [10.5, 14.7], [11, 14.9], [11.5, 15.11], [12, 15.32], [12.5, 15.53], [13, 15.74], [13.5, 15.95],
          [14, 16.15], [14.5, 16.34], [15, 16.53], [15.5, 16.71], [16, 16.88], [16.5, 17.05], [17, 17.21], [17.5, 17.36], [18, 17.51]
        ]

        // P15
        const referenceBMICurveDataOfBoysP15 = [
          [2, 15.13], [2.5, 14.81], [3, 14.54], [3.5, 14.34], [4, 14.2], [4.5, 14.09], [5, 14.03], [5.5, 14.02], [6, 14.03], [6.5, 14.05], [7, 14.1], [7.5, 14.19],
          [8, 14.29], [8.5, 14.41], [9, 14.56], [9.5, 14.73], [10, 14.92], [10.5, 15.12], [11, 15.34], [11.5, 15.56], [12, 15.78], [12.5, 16.01], [13, 16.23], [13.5, 16.45],
          [14, 16.66], [14.5, 16.86], [15, 17.05], [15.5, 17.24], [16, 17.42], [16.5, 17.59], [17, 17.76], [17.5, 17.92], [18, 18.07]
        ]

        // P50
        const referenceBMICurveDataOfBoysP50 = [
          [2, 16.33], [2.5, 15.97], [3, 15.66], [3.5, 15.45], [4, 15.32], [4.5, 15.23], [5, 15.22], [5.5, 15.27], [6, 15.35], [6.5, 15.45], [7, 15.59], [7.5, 15.77],
          [8, 15.96], [8.5, 16.18], [9, 16.42], [9.5, 16.68], [10, 16.96], [10.5, 17.24], [11, 17.54], [11.5, 17.83], [12, 18.11], [12.5, 18.39], [13, 18.67], [13.5, 18.93],
          [14, 19.19], [14.5, 19.43], [15, 19.66], [15.5, 19.88], [16, 20.09], [16.5, 20.29], [17, 20.48], [17.5, 20.67], [18, 20.84]
        ]

        // P85
        const referenceBMICurveDataOfBoysP85 = [
          [2, 17.71], [2.5, 17.3], [3, 16.97], [3.5, 16.76], [4, 16.65], [4.5, 16.6], [5, 16.66], [5.5, 16.79], [6, 16.97], [6.5, 17.2], [7, 17.47], [7.5, 17.78],
          [8, 18.12], [8.5, 18.48], [9, 18.86], [9.5, 19.25], [10, 19.65], [10.5, 20.05], [11, 20.45], [11.5, 20.84], [12, 21.22], [12.5, 21.58], [13, 21.93], [13.5, 22.26],
          [14, 22.57], [14.5, 22.86], [15, 23.14], [15.5, 23.4], [16, 23.64], [16.5, 23.88], [17, 24.1], [17.5, 24.31], [18, 24.51]
        ]

        // P90
        const referenceBMICurveDataOfBoysP90 = [
          [2, 18.07], [2.5, 17.65], [3, 17.31], [3.5, 17.11], [4, 17], [4.5, 16.97], [5, 17.04], [5.5, 17.2], [6, 17.41], [6.5, 17.67], [7, 17.99], [7.5, 18.34],
          [8, 18.72], [8.5, 19.12], [9, 19.54], [9.5, 19.98], [10, 20.41], [10.5, 20.85], [11, 21.29], [11.5, 21.71], [12, 22.11], [12.5, 22.5], [13, 22.86], [13.5, 23.21],
          [14, 23.54], [14.5, 23.85], [15, 24.14], [15.5, 24.41], [16, 24.66], [16.5, 24.9], [17, 25.13], [17.5, 25.35], [18, 25.56]
        ]

        // P95
        const referenceBMICurveDataOfBoysP95 = [
          [2, 18.63], [2.5, 18.19], [3, 17.85], [3.5, 17.65], [4, 17.55], [4.5, 17.54], [5, 17.64], [5.5, 17.85], [6, 18.12], [6.5, 18.44], [7, 18.82], [7.5, 19.24],
          [8, 19.7], [8.5, 20.17], [9, 20.66], [9.5, 21.17], [10, 21.67], [10.5, 22.17], [11, 22.66], [11.5, 23.13], [12, 23.57], [12.5, 24], [13, 24.4], [13.5, 24.78],
          [14, 25.13], [14.5, 25.46], [15, 25.77], [15.5, 26.06], [16, 26.33], [16.5, 26.58], [17, 26.82], [17.5, 27.06], [18, 27.28]
        ]

        // P97
        const referenceBMICurveDataOfBoysP97 = [
          [2, 19.01], [2.5, 18.56], [3, 18.22], [3.5, 18.02], [4, 17.93], [4.5, 17.93], [5, 18.06], [5.5, 18.3], [6, 18.61], [6.5, 18.97], [7, 19.4], [7.5, 19.88],
          [8, 20.39], [8.5, 20.92], [9, 21.47], [9.5, 22.02], [10, 22.57], [10.5, 23.11], [11, 23.64], [11.5, 24.15], [12, 24.63], [12.5, 25.08], [13, 25.51], [13.5, 25.91],
          [14, 26.28], [14.5, 26.63], [15, 26.95], [15.5, 27.25], [16, 27.53], [16.5, 27.79], [17, 28.04], [17.5, 28.28], [18, 28.51]
        ]

        /**
         * @variation: 参考曲线数据 - 女
         * */
        // P3
        const referenceBMICurveDataOfGirlsP3 = [
            [2, 13.91], [2.5, 13.64], [3, 13.45], [3.5, 13.31], [4, 13.17], [4.5, 13.04], [5, 12.92], [5.5, 12.84], [6, 12.77], [6.5, 12.72], [7, 12.68], [7.5, 12.67],
            [8, 12.69], [8.5, 12.75], [9, 12.83], [9.5, 12.96], [10, 13.12], [10.5, 13.31], [11, 13.53], [11.5, 13.77], [12, 14.02], [12.5, 14.29], [13, 14.54], [13.5, 14.8],
            [14, 15.03], [14.5, 15.25], [15, 15.44], [15.5, 15.62], [16, 15.77], [16.5, 15.91], [17, 16.04], [17.5, 16.15], [18, 16.26]
          ]

        // P5
        const referenceBMICurveDataOfGirlsP5 = [
          [2, 14.14], [2.5, 13.87], [3, 13.67], [3.5, 13.53], [4, 13.39], [4.5, 13.27], [5, 13.15], [5.5, 13.07], [6, 13.01], [6.5, 12.96], [7, 12.93], [7.5, 12.93],
          [8, 12.96], [8.5, 13.02], [9, 13.12], [9.5, 13.26], [10, 13.43], [10.5, 13.63], [11, 13.86], [11.5, 14.11], [12, 14.38], [12.5, 14.65], [13, 14.91], [13.5, 15.17],
          [14, 15.42], [14.5, 15.64], [15, 15.84], [15.5, 16.02], [16, 16.18], [16.5, 16.32], [17, 16.45], [17.5, 16.57], [18, 16.68]
        ]

        // P10
        const referenceBMICurveDataOfGirlsP10 = [
          [2, 14.5], [2.5, 14.22], [3, 14.02], [3.5, 13.88], [4, 13.74], [4.5, 13.62], [5, 13.52], [5.5, 13.44], [6, 13.39], [6.5, 13.35], [7, 13.34], [7.5, 13.35],
          [8, 13.4], [8.5, 13.48], [9, 13.59], [9.5, 13.75], [10, 13.93], [10.5, 14.15], [11, 14.4], [11.5, 14.67], [12, 14.96], [12.5, 15.24], [13, 15.52], [13.5, 15.79],
          [14, 16.05], [14.5, 16.28], [15, 16.49], [15.5, 16.68], [16, 16.84], [16.5, 16.99], [17, 17.12], [17.5, 17.25], [18, 17.36]
        ]

        // P15
        const referenceBMICurveDataOfGirlsP15 = [
          [2, 14.76], [2.5, 14.48], [3, 14.27], [3.5, 14.12], [4, 13.99], [4.5, 13.88], [5, 13.78], [5.5, 13.71], [6, 13.67], [6.5, 13.63], [7, 13.63], [7.5, 13.65],
          [8, 13.71], [8.5, 13.8], [9, 13.93], [9.5, 14.1], [10, 14.3], [10.5, 14.53], [11, 14.8], [11.5, 15.08], [12, 15.37], [12.5, 15.67], [13, 15.96], [13.5, 16.24],
          [14, 16.51], [14.5, 16.75], [15, 16.96], [15.5, 17.16], [16, 17.33], [16.5, 17.48], [17, 17.61], [17.5, 17.74], [18, 17.86]
        ]

        // P50
        const referenceBMICurveDataOfGirlsP50 = [
          [2, 15.95], [2.5, 15.64], [3, 15.42], [3.5, 15.27], [4, 15.15], [4.5, 15.06], [5, 14.99], [5.5, 14.96], [6, 14.96], [6.5, 14.97], [7, 15.02], [7.5, 15.1],
          [8, 15.21], [8.5, 15.37], [9, 15.57], [9.5, 15.82], [10, 16.09], [10.5, 16.4], [11, 16.74], [11.5, 17.09], [12, 17.45], [12.5, 17.8], [13, 18.15], [13.5, 18.48],
          [14, 18.78], [14.5, 19.06], [15, 19.31], [15.5, 19.53], [16, 19.72], [16.5, 19.89], [17, 20.04], [17.5, 20.18], [18, 20.32]
        ]

        // P85
        const referenceBMICurveDataOfGirlsP85 = [
          [2, 17.32], [2.5, 16.99], [3, 16.76], [3.5, 16.61], [4, 16.53], [4.5, 16.48], [5, 16.45], [5.5, 16.48], [6, 16.53], [6.5, 16.61], [7, 16.73], [7.5, 16.89],
          [8, 17.1], [8.5, 17.37], [9, 17.68], [9.5, 18.03], [10, 18.42], [10.5, 18.84], [11, 19.29], [11.5, 19.74], [12, 20.19], [12.5, 20.63], [13, 21.05], [13.5, 21.45],
          [14, 21.81], [14.5, 22.14], [15, 22.43], [15.5, 22.68], [16, 22.9], [16.5, 23.1], [17, 23.27], [17.5, 23.43], [18, 23.59]
        ]

        // P90
        const referenceBMICurveDataOfGirlsP90 = [
          [2, 17.68], [2.5, 17.34], [3, 17.11], [3.5, 16.97], [4, 16.89], [4.5, 16.85], [5, 16.84], [5.5, 16.88], [6, 16.96], [6.5, 17.05], [7, 17.19], [7.5, 17.38],
          [8, 17.62], [8.5, 17.92], [9, 18.26], [9.5, 18.65], [10, 19.08], [10.5, 19.53], [11, 20.01], [11.5, 20.49], [12, 20.97], [12.5, 21.44], [13, 21.88], [13.5, 22.3],
          [14, 22.68], [14.5, 23.02], [15, 23.32], [15.5, 23.59], [16, 23.82], [16.5, 24.02], [17, 24.2], [17.5, 24.37], [18, 24.52]
        ]

        // P95
        const referenceBMICurveDataOfGirlsP95 = [
          [2, 18.23], [2.5, 17.89], [3, 17.65], [3.5, 17.52], [4, 17.46], [4.5, 17.44], [5, 17.45], [5.5, 17.52], [6, 17.63], [6.5, 17.76], [7, 17.94], [7.5, 18.17],
          [8, 18.46], [8.5, 18.81], [9, 19.21], [9.5, 19.66], [10, 20.15], [10.5, 20.66], [11, 21.19], [11.5, 21.73], [12, 22.25], [12.5, 22.76], [13, 23.25], [13.5, 23.69],
          [14, 24.1], [14.5, 24.47], [15, 24.79], [15.5, 25.07], [16, 25.32], [16.5, 25.51], [17, 25.72], [17.5, 25.9], [18, 26.06]
        ]

        // P97
        const referenceBMICurveDataOfGirlsP97 = [
          [2, 18.61], [2.5, 18.27], [3, 18.03], [3.5, 17.9], [4, 17.84], [4.5, 17.84], [5, 17.88], [5.5, 17.96], [6, 18.09], [6.5, 18.25], [7, 18.45], [7.5, 18.72],
          [8, 19.05], [8.5, 19.43], [9, 19.88], [9.5, 20.37], [10, 20.91], [10.5, 21.47], [11, 22.04], [11.5, 22.61], [12, 23.20], [12.5, 23.72], [13, 24.23], [13.5, 24.7],
          [14, 25.13], [14.5, 25.52], [15, 25.85], [15.5, 26.15], [16, 26.4], [16.5, 26.62], [17, 26.82], [17.5, 27], [18, 27.17]
        ]


        // 初始化 echarts 实例
        let chartsOfUsersBmi = this.$echarts.init(document.getElementById('myChartOfBmi'));

        // 配置 - 女
        const optionOfUsersBmiInGirl = {
          // 图表标题
          title: {
            text: 'BMI百分位（女）'
          },
          // 类别显示
          legend: {},
          grid: {},

          // X 轴
          xAxis: {
            // 数据类型
            type: 'value',
            // X 轴坐标标签
            name: '年龄（岁）',
            // 标签位置
            nameLocation: 'middle',
            // 标题跟坐标轴的距离
            nameGap: 25,
            boundaryGap: false,
            /*            min: 0,
                        max: 150,*/
/*            axisTick: {
              alignWithLabel: true
            },*/
            /*            splitArea: {
                          show: true
                        },*/
            splitLine: {
              lineStyle: {
                color: ['#aaa']
              }
            },
            nameTextStyle: {
              fontWeight: 'bold',
              fontSize: 16,
            },
            // 坐标轴分割段数
            splitNumber: 26,
            // data: ['2.0岁', '2.5岁', '3.0岁', '3.5岁', '4.0岁', '4.5岁', '5.0岁', '5.5岁', '6.0岁', '6.5岁', '7.0岁', '7.5岁', '8.0岁', '8.5岁', '9.0岁', '9.5岁', '10.0岁', '10.5岁', '11.0岁', '11.5岁', '12.0岁', '12.5岁', '13.0岁', '13.5岁', '14.0岁', '14.5岁', '15.0岁', '15.5岁', '16.0岁', '16.5岁', '17.0岁', '17.5岁', '18.0岁']
          },
          yAxis: [
            {
              type: 'value',
              name: 'BMI百分位数值（kg/m2）',
              nameLocation: 'middle',
              nameGap: 25,
              min: 10,
              max: 30,
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 16
              }
            },
            {
              type: 'value',
              // name: 'test',
              min: 10,
              max: 30
            }
          ],
          series: [
            // 线条一
            {
              name: 'P3',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP3
              // data: [13.91, 13.64, 13.45, 13.31, 13.17, 13.04, 12.92, 12.84, 12.77, 12.72, 12.68, 12.67, 12.69, 12.75, 12.83, 12.96, 13.12, 13.31, 13.53, 13.77, 14.02, 14.29, 14.54, 14.8, 15.03, 15.25, 15.44, 15.62, 15.77, 15.91, 16.04, 16.15, 16.26]
              // data: [14.26, 13.99, 13.74, 13.55, 13.4, 13.28, 13.21, 13.16, 13.12, 13.09, 13.1, 13.12, 13.17, 13.24, 13.33, 13.45, 13.59, 13.74, 13.92, 14.1, 14.28, 14.46, 14.65, 14.84, 15.02, 15.2, 15.37, 15.53, 15.69, 15.85, 15.99, 16.14, 16.27]
            },
            // 线条二
            {
              name: 'P5',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP5
              // data: [14.14, 13.87, 13.67, 13.53, 13.39, 13.27, 13.15, 13.07, 13.01, 12.96, 12.93, 12.93, 12.96, 13.02, 13.12, 13.26, 13.43, 13.63, 13.86, 14.11, 14.38, 14.65, 14.91, 15.17, 15.42, 15.64, 15.84, 16.02, 16.18, 16.32, 16.45, 16.57, 16.68]
              // data: [14.49, 14.21, 13.95, 13.76, 13.61, 13.5, 13.43, 13.39, 13.36, 13.35, 13.36, 13.4, 13.46, 13.55, 13.65, 13.78, 13.93, 14.1, 14.29, 14.48, 14.67, 14.87, 15.06, 15.26, 15.45, 15.63, 15.81, 15.98, 16.14, 16.3, 16.45, 16.6, 16.74]
            },
            // 线条三
            {
              name: 'P10',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP10
              // data: [14.5, 14.22, 14.02, 13.88, 13.74, 13.62, 13.52, 13.44, 13.39, 13.35, 13.34, 13.35, 13.4, 13.48, 13.59, 13.75, 13.93, 14.15, 14.4, 14.67, 14.96, 15.24, 15.52, 15.79, 16.05, 16.28, 16.49, 16.68, 16.84, 16.99, 17.12, 17.25, 17.36]
              // data: [14.86, 14.56, 14.3, 14.1, 13.96, 13.84, 13.78, 13.76, 13.75, 13.76, 13.8, 13.86, 13.94, 14.05, 14.18, 14.33, 14.51, 14.7, 14.9, 15.11, 15.32, 15.53, 15.74, 15.95, 16.15, 16.34, 16.53, 16.71, 16.88, 17.05, 17.21, 17.36, 17.51]
            },
            // 线条四
            {
              name: 'P15',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP15
              // data: [14.76, 14.48, 14.27, 14.12, 13.99, 13.88, 13.78, 13.71, 13.67, 13.63, 13.63, 13.65, 13.71, 13.8, 13.93, 14.1, 14.3, 14.53, 14.8, 15.08, 15.37, 15.67, 15.96, 16.24, 16.51, 16.75, 16.96, 17.16, 17.33, 17.48, 17.61, 17.74, 17.86]
              // data: [15.13, 14.81, 14.54, 14.34, 14.2, 14.09, 14.03, 14.02, 14.03, 14.05, 14.1, 14.19, 14.29, 14.41, 14.56, 14.73, 14.92, 15.12, 15.34, 15.56, 15.78, 16.01, 16.23, 16.45, 16.66, 16.86, 17.05, 17.24, 17.42, 17.59, 17.76, 17.92, 18.07]
            },
            // 线条五
            {
              name: 'P50',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP50
              // data: [15.95, 15.64, 15.42, 15.27, 15.15, 15.06, 14.99, 14.96, 14.96, 14.97, 15.02, 15.1, 15.21, 15.37, 15.57, 15.82, 16.09, 16.4, 16.74, 17.09, 17.45, 17.8, 18.15, 18.48, 18.78, 19.06, 19.31, 19.53, 19.72, 19.89, 20.04, 20.18, 20.32]
              // data: [16.33, 15.97, 15.66, 15.45, 15.32, 15.23, 15.22, 15.27, 15.35, 15.45, 15.59, 15.77, 15.96, 16.18, 16.42, 16.68, 16.96, 17.24, 17.54, 17.83, 18.11, 18.39, 18.67, 18.93, 19.19, 19.43, 19.66, 19.88, 20.09, 20.29, 20.48, 20.67, 20.84]
            },
            // 线条六
            {
              name: 'P85',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP85
              // data: [17.32, 16.99, 16.76, 16.61, 16.53, 16.48, 16.45, 16.48, 16.53, 16.61, 16.73, 16.89, 17.1, 17.37, 17.68, 18.03, 18.42, 18.84, 19.29, 19.74, 20.19, 20.63, 21.05, 21.45, 21.81, 22.14, 22.43, 22.68, 22.9, 23.1, 23.27, 23.43, 23.59]
              // data: [17.71, 17.3, 16.97, 16.76, 16.65, 16.6, 16.66, 16.79, 16.97, 17.2, 17.47, 17.78, 18.12, 18.48, 18.86, 19.25, 19.65, 20.05, 20.45, 20.84, 21.22, 21.58, 21.93, 22.26, 22.57, 22.86, 23.14, 23.4, 23.64, 23.88, 24.1, 24.31, 24.51]
            },
            // 线条七
            {
              name: 'P90',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP90
              // data: [17.68, 17.34, 17.11, 16.97, 16.89, 16.85, 16.84, 16.88, 16.96, 17.05, 17.19, 17.38, 17.62, 17.92, 18.26, 18.65, 19.08, 19.53, 20.01, 20.49, 20.97, 21.44, 21.88, 22.3, 22.68, 23.02, 23.32, 23.59, 23.82, 24.02, 24.2, 24.37, 24.52]
              // data: [18.07, 17.65, 17.31, 17.11, 17, 16.97, 17.04, 17.2, 17.41, 17.67, 17.99, 18.34, 18.72, 19.12, 19.54, 19.98, 20.41, 20.85, 21.29, 21.71, 22.11, 22.5, 22.86, 23.21, 23.54, 23.85, 24.14, 24.41, 24.66, 24.9, 25.13, 25.35, 25.56]
            },
            // 线条八
            {
              name: 'P95',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP95
              // data: [18.23, 17.89, 17.65, 17.52, 17.46, 17.44, 17.45, 17.52, 17.63, 17.76, 17.94, 18.17, 18.46, 18.81, 19.21, 19.66, 20.15, 20.66, 21.19, 21.73, 22.25, 22.76, 23.25, 23.69, 24.1, 24.47, 24.79, 25.07, 25.32, 25.52, 25.72, 25.9, 26.06]
              // data: [18.63, 18.19, 17.85, 17.65, 17.55, 17.54, 17.64, 17.85, 18.12, 18.44, 18.82, 19.24, 19.7, 20.17, 20.66, 21.17, 21.67, 22.17, 22.66, 23.13, 23.57, 24, 24.4, 24.78, 25.13, 25.46, 25.77, 26.06, 26.33, 26.58, 26.82, 27.06, 27.28]
            },
            // 线条九
            {
              name: 'P97',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfGirlsP97
              // data: [18.61, 18.27, 18.03, 17.9, 17.84, 17.84, 17.88, 17.96, 18.09, 18.25, 18.45, 18.72, 19.05, 19.43, 19.88, 20.37, 20.91, 21.47, 22.04, 22.61, 23.21, 23.72, 24.23, 24.7, 25.13, 25.52, 25.85, 26.15, 26.4, 26.62, 26.82, 27, 27.17]
              // data: [19.01, 18.56, 18.22, 18.02, 17.93, 17.93, 18.06, 18.3, 18.61, 18.97, 19.4, 19.88, 20.39, 20.92, 21.47, 22.02, 22.57, 23.11, 23.64, 24.15, 24.63, 25.08, 25.51, 25.91, 26.28, 26.63, 26.95, 27.25, 27.53, 27.79, 28.04, 28.28, 28.51]
            },
            // 用户数据显示
            {
              name: '用户',
              type: 'line',
              color: 'black',
              symbol: 'circle',
              symbolSize: 10,
              data: [currentUsersDataOfAgeAndBmi]
            }
          ]

        }

        // 配置 - 男
        const optionOfUsersBmi = {
          // 图表标题
          title: {
            text: 'BMI百分位（男）'
          },
          // 类别显示
          legend: {},
          grid: {},

          // X 轴
          xAxis: {
            // 数据类型
            type: 'value',
            // X 轴坐标标签
            name: '年龄（岁）',
            // 标签位置
            nameLocation: 'middle',
            // 标题跟坐标轴的距离
            nameGap: 25,
            // boundaryGap: false,
            /*            min: 0,
                        max: 150,*/
            axisTick: {
              alignWithLabel: true
            },
            /*            splitArea: {
                          show: true
                        },*/
            splitLine: {
              lineStyle: {
                color: ['#aaa']
              }
            },
            nameTextStyle: {
              fontWeight: 'bold',
              fontSize: 16,
            },
            // 坐标轴分割段数
            splitNumber: 26,
            // data: ['2.0岁', '2.5岁', '3.0岁', '3.5岁', '4.0岁', '4.5岁', '5.0岁', '5.5岁', '6.0岁', '6.5岁', '7.0岁', '7.5岁', '8.0岁', '8.5岁', '9.0岁', '9.5岁', '10.0岁', '10.5岁', '11.0岁', '11.5岁', '12.0岁', '12.5岁', '13.0岁', '13.5岁', '14.0岁', '14.5岁', '15.0岁', '15.5岁', '16.0岁', '16.5岁', '17.0岁', '17.5岁', '18.0岁']
          },
          yAxis: [
            {
              type: 'value',
              name: 'BMI百分位数值（kg/m2）',
              nameLocation: 'middle',
              nameGap: 25,
              min: 10,
              max: 30,
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 16
              }
            },
            {
              type: 'value',
              min: 10,
              max: 30
            }
          ],
          series: [
            // 线条一
            {
              name: 'P3',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP3
              // data: [14.26, 13.99, 13.74, 13.55, 13.4, 13.28, 13.21, 13.16, 13.12, 13.09, 13.1, 13.12, 13.17, 13.24, 13.33, 13.45, 13.59, 13.74, 13.92, 14.1, 14.28, 14.46, 14.65, 14.84, 15.02, 15.2, 15.37, 15.53, 15.69, 15.85, 15.99, 16.14, 16.27]
            },
            // 线条二
            {
              name: 'P5',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP5
              // data: [14.49, 14.21, 13.95, 13.76, 13.61, 13.5, 13.43, 13.39, 13.36, 13.35, 13.36, 13.4, 13.46, 13.55, 13.65, 13.78, 13.93, 14.1, 14.29, 14.48, 14.67, 14.87, 15.06, 15.26, 15.45, 15.63, 15.81, 15.98, 16.14, 16.3, 16.45, 16.6, 16.74]
            },
            // 线条三
            {
              name: 'P10',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP10
              // data: [14.86, 14.56, 14.3, 14.1, 13.96, 13.84, 13.78, 13.76, 13.75, 13.76, 13.8, 13.86, 13.94, 14.05, 14.18, 14.33, 14.51, 14.7, 14.9, 15.11, 15.32, 15.53, 15.74, 15.95, 16.15, 16.34, 16.53, 16.71, 16.88, 17.05, 17.21, 17.36, 17.51]
            },
            // 线条四
            {
              name: 'P15',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP15
              // data: [15.13, 14.81, 14.54, 14.34, 14.2, 14.09, 14.03, 14.02, 14.03, 14.05, 14.1, 14.19, 14.29, 14.41, 14.56, 14.73, 14.92, 15.12, 15.34, 15.56, 15.78, 16.01, 16.23, 16.45, 16.66, 16.86, 17.05, 17.24, 17.42, 17.59, 17.76, 17.92, 18.07]
            },
            // 线条五
            {
              name: 'P50',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP50
              // data: [16.33, 15.97, 15.66, 15.45, 15.32, 15.23, 15.22, 15.27, 15.35, 15.45, 15.59, 15.77, 15.96, 16.18, 16.42, 16.68, 16.96, 17.24, 17.54, 17.83, 18.11, 18.39, 18.67, 18.93, 19.19, 19.43, 19.66, 19.88, 20.09, 20.29, 20.48, 20.67, 20.84]
            },
            // 线条六
            {
              name: 'P85',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP85
              // data: [17.71, 17.3, 16.97, 16.76, 16.65, 16.6, 16.66, 16.79, 16.97, 17.2, 17.47, 17.78, 18.12, 18.48, 18.86, 19.25, 19.65, 20.05, 20.45, 20.84, 21.22, 21.58, 21.93, 22.26, 22.57, 22.86, 23.14, 23.4, 23.64, 23.88, 24.1, 24.31, 24.51]
            },
            // 线条七
            {
              name: 'P90',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP90
              // data: [18.07, 17.65, 17.31, 17.11, 17, 16.97, 17.04, 17.2, 17.41, 17.67, 17.99, 18.34, 18.72, 19.12, 19.54, 19.98, 20.41, 20.85, 21.29, 21.71, 22.11, 22.5, 22.86, 23.21, 23.54, 23.85, 24.14, 24.41, 24.66, 24.9, 25.13, 25.35, 25.56]
            },
            // 线条八
            {
              name: 'P95',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP95
              // data: [18.63, 18.19, 17.85, 17.65, 17.55, 17.54, 17.64, 17.85, 18.12, 18.44, 18.82, 19.24, 19.7, 20.17, 20.66, 21.17, 21.67, 22.17, 22.66, 23.13, 23.57, 24, 24.4, 24.78, 25.13, 25.46, 25.77, 26.06, 26.33, 26.58, 26.82, 27.06, 27.28]
            },
            // 线条九
            {
              name: 'P97',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceBMICurveDataOfBoysP97
              // data: [19.01, 18.56, 18.22, 18.02, 17.93, 17.93, 18.06, 18.3, 18.61, 18.97, 19.4, 19.88, 20.39, 20.92, 21.47, 22.02, 22.57, 23.11, 23.64, 24.15, 24.63, 25.08, 25.51, 25.91, 26.28, 26.63, 26.95, 27.25, 27.53, 27.79, 28.04, 28.28, 28.51]
            },
            // 用户数据显示
            {
              name: '用户',
              type: 'line',
              color: 'black',
              symbol: 'circle',
              symbolSize: 10,
              data: [currentUsersDataOfAgeAndBmi]
            }
          ]
        }

        try {
          // judge the sex of user
          if (val.sex === 1) {
            // 使用配置 - 男
            chartsOfUsersBmi.setOption(optionOfUsersBmi);
          } else {
            // 使用配置 - 女
            chartsOfUsersBmi.setOption(optionOfUsersBmiInGirl);
          }
          // transfer the format of charts
          // this.checkCurrentCanvas()
        } catch (e) {
          this.$message({
            message: '发生了一些错误：' + e,
            type: 'warning'
          })
        }
      },

      /**
       * @function: 请求当前用户基本信息，判断性别
       * @param: currentUserIdForSexParam
       * @return: null
       * @author: White
       * @date: 19 - 05 - 27
       *
       * @exception: 需要并发请求两个 API 得到 sex, age, weight
       * @date: 19 - 06 - 20
       * */
      getCurrentUsersSex (currentUserIdForSexParam, times) {
/*        try {
          that.axios.get('http://localhost:8082/information' + '/' + currentUserIdForSexParam)
            .then((response) => {
              console.log(response)
              console.log(response.data.data.information)
              // 获取当前用户的信息
              const currentUserParamsOfSex = response.data.data.information;
              const currentUserParamOfAge = response.data.data.age;
              // 作图
              this.drawCurveOfBmi(currentUserParamsOfSex, currentUserParamOfAge);
            },err => {
              // console.log('发生了一点错误：' + err)
            })
            .catch(
              // 异常处理
            )
        } catch (e) {
          this.$alert('服务器开小差了：' + e, '错误！', {
            confirmButtonText: '确定',
            callback: action => {
              // 回调信息
              console.log("确认信息：" + action);
            }
          })
        }*/

        // 并发请求
        try {
          this.axios.all([
            this.axios.get('http://localhost:8082/information/search', {
              params: {
                guardian_phone: currentUserIdForSexParam,
                inspectOrder: times
              }
            }),
            this.axios.get('http://localhost:8082/bodyCompositionTest/search', {
              params: {
                guardian_phone: currentUserIdForSexParam,
                inspectOrder: times
              }
            })
          ])
            .then(this.axios.spread((paramForUsersAgeAndSex, paramForUsersValueOfBmi) => {
              console.log('the first param:')
              console.log(paramForUsersAgeAndSex);
              console.log('the 2rd param:')
              console.log(paramForUsersValueOfBmi);

              /**
               * @variation: get users basic data
               * */
              // 基本信息
              const currentUserParamsOfSex = paramForUsersAgeAndSex.data.data;
              // 年龄
              const currentUserParamOfAge = paramForUsersAgeAndSex.data.data.age;
              // 体成分测量数据
              const requestDataForBmi = paramForUsersValueOfBmi.data.data.weightIndexBMI;
              // Drawing the chart
              this.drawCurveOfBmi(currentUserParamsOfSex, currentUserParamOfAge, requestDataForBmi);
            }))
            .catch(
              // ...
            )
        } catch (e) {
          this.$alert('服务器开小差了：' + e, '错误！', {
            confirmButtonText: '确定',
            callback: action => {
              // 回调信息
              console.log("确认信息：" + action);
            }
          })
        }
      },

      /**
       * @function: 请求上传 echarts 图片的 API
       * @param: newPictureFileParam
       * @return: null
       * @author: White
       * @date: 19 - 06 - 03
       * */
      uploadTheChartFile (newPictureFileParam) {
        try {
          // 打印参数
          console.log('当前图表文件：')
          console.log(newPictureFileParam)
          const times = this.$store.getters.getMeasuresTimes;
          // 数据序列化
          let currentUsersChartsDataOfBmi = new FormData();
          // 拼接 key 与 value
          // 用户 ID
          currentUsersChartsDataOfBmi.append('guardian_phone', this.$store.getters.getId);
          currentUsersChartsDataOfBmi.append('inspectOrder', times);
          // 当前图表文件
          currentUsersChartsDataOfBmi.append('file', newPictureFileParam, newPictureFileParam.name)
          this.axios.post('http://localhost:8082/systemImgUpload/uploadSystemImg', currentUsersChartsDataOfBmi, {
            // 定义表头
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((response) => {
              console.log(response)
              // 判断是否上传成功
              if (response.status === 200){
                this.$message({
                  message: '选择成功',
                  type: 'success'
                })
                // 改变选中按钮的状态
                this.isChosen = 'success';
                this.moduleChooseStatus = '已选择';
              } else {
                this.$alert('服务器未响应：' + response.status, '错误！', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // 回调信息
                    console.log("确认信息：" + action)
                  }
                })
              }
            },err => {
              console.log('some mistakes has happened:' + err)
            })
            .catch(
              // 异常处理
            )
        } catch (e) {
          throw new DOMException(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
