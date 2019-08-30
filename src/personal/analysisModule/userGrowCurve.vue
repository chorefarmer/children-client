<template>
  <!-- 男/女 身高百分位数值 -->
  <div class="growCurveClassName"
       style="width: 95%;
       height: 670px;
       background: #ffffff;
       border-radius: 10px;
       margin-top: 10px">

    <!-- button for choose this module -->
    <div class="chooseModuleButton"
         style="margin: 0 0 0 10px;padding-top: 5px;">
      <el-button @click="chooseTheChartOfHeight" :type="isChosen" v-model="moduleChooseStatus">{{ moduleChooseStatus }}</el-button>
    </div>

    <div id="myChart"
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
        // 当前模块是否被选中
        isChosen: 'primary',
        moduleChooseStatus: '选择'
      }
    },

    /**
     * @hook: mounted()
     * */
    mounted () {
      // 获取当前用户 ID
      const currentUserIdForGrowCurve = this.$store.getters.getId;
      const times = this.$store.getters.getMeasuresTimes;
      // 请求当前用户基本信息，获取身高
      this.getLineData(currentUserIdForGrowCurve, times);

      // 请求当前用户数据完成后再作图
      // this.draw();
    },

    methods: {

      /**
       * @function: upload
       * @param: chartParamOfHeight
       * @return: null
       * @author: White
       * */
      uploadTheChartFileOfHeight (chartParamOfHeight) {
        try {
          const times = this.$store.getters.getMeasuresTimes;
          // 数据序列化
          let currentUsersChartsDataOfHeight = new FormData();
          // 拼接 key 与 value
          // 用户 ID
          currentUsersChartsDataOfHeight.append('guardian_phone', this.$store.getters.getId)
          currentUsersChartsDataOfHeight.append('inspectOrder', times);
          // 当前图表文件
          currentUsersChartsDataOfHeight.append('file', chartParamOfHeight, chartParamOfHeight.name)
          this.axios.post('http://localhost:8082/systemImgUpload/uploadSystemImg', currentUsersChartsDataOfHeight, {
            // 定义表头
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((response) => {
              console.log(response)
              // 判断是否上传成功
              if (response.status === 200) {
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
          // 抛出一个异常
          throw new DOMException(e)
        }
      },

      /**
       * @function: choose this chart to upload to server
       * @param: null
       * @return: null
       * @author: White
       * @date: 19 - 06 - 27
       * */
      chooseTheChartOfHeight () {
        // 将 base64 转换方法放在此方法内！！
        // due to Vue component
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
        let canvasContainer = document.getElementById('myChart').getElementsByTagName('canvas');
        console.log(canvasContainer[0]);

        /**
         * @function: test canvas to png for base64
         * */
        const baseContainer = canvasContainer[0].toDataURL("image/png");

        // 转换成 File()，并使用
        const newPictureFile = convertBase64(baseContainer, this.$store.getters.getId + '_Height.png');
        // 发起请求
        this.uploadTheChartFileOfHeight(newPictureFile);
      },

      /**
       * @function: deal the format of users age
       * @param: formatUsersAgeParam
       * @return: formattedUsersAge
       * @author: White
       * @date: 19 - 06 - 19
       * */
      formatTheCurrentUsersAge (formatUsersAgeParam) {
        let ageSplitArrayContainer = [];
        ageSplitArrayContainer = formatUsersAgeParam.split('岁')
        let ageSplitArrayForMonth = ageSplitArrayContainer[1].split('个月')
        let formattedUsersAge = parseInt(formatUsersAgeParam) + parseInt(ageSplitArrayContainer[1])/12 + parseInt(ageSplitArrayForMonth[1])/360;
        return formattedUsersAge;
      },

      /**
       * @function: 初始化 echarts 图表
       * @param: sexParamOfCurrentUser
       * @param: heightParamOfCurrentUser
       * @param: ageParamOfCurrentUser
       * @return: null
       * @author: White
       * @date: 19 - 05 - 08
       * */
      draw: function (sexParamOfCurrentUser, heightParamOfCurrentUser, ageParamOfCurrentUser) {

        // print param - height, age
        console.log('当前用户身高：' + heightParamOfCurrentUser, '当前用户年龄：' + ageParamOfCurrentUser)
        let currentUsersDataForDot = [];
        // currentUsersDataForDot.unshift(this.formatTheCurrentUsersAge(ageParamOfCurrentUser), parseInt(heightParamOfCurrentUser))
        currentUsersDataForDot.unshift(ageParamOfCurrentUser, parseInt(heightParamOfCurrentUser));
        console.log(currentUsersDataForDot)
        /**
         * @variation: 图表参考曲线数据 - 男童
         * */
        // P3
        const referenceCurveDataOfBoysP3 = [
          [0, 47.1], [0.5, 64], [1, 71.5], [1.5, 76.9], [2, 82.1], [2.5, 86.4], [3, 90.4], [3.5, 93.4], [4, 96.7], [4.5, 100],
          [5, 103.3], [5.5, 106.4], [6, 109.1], [6.5, 111.7], [7, 114.6], [7.5, 117.4], [8, 119.9], [8.5, 122.3], [9, 124.6], [9.5, 126.7],
          [10, 128.7], [10.5, 130.7], [11, 132.9], [11.5, 135.3], [12, 138.1], [12.5, 141.1], [13, 145], [13.5, 148.8], [14, 152.3], [14.5, 155.3],
          [15, 157.5], [15.5, 159.1], [16, 159.9], [16.5, 160.5], [17, 160.9], [18, 161.3]
        ]

        // P10
        const referenceCurveDataOfBoysP10 = [
          [0, 48.1], [0.5, 65.4], [1, 73.1], [1.5, 78.7], [2, 84.1], [2.5, 88.6], [3, 92.6], [3.5, 95.7], [4, 99.1], [4.5, 102.4],
          [5, 105.8], [5.5, 109], [6, 111.8], [6.5, 114.5], [7, 117.6], [7.5, 120.5], [8, 123.1], [8.5, 125.6], [9, 128], [9.5, 130.3],
          [10, 132.3], [10.5, 134.5], [11, 136.8], [11.5, 139.5], [12, 142.5], [12.5, 145.7], [13, 149.6], [13.5, 153.3], [14, 156.7], [14.5, 159.4],
          [15, 161.4], [15.5, 162.9], [16, 163.6], [16.5, 164.2], [17, 164.5], [18, 164.9]
        ]

        // P25
        const referenceCurveDataOfBoysP25 = [
          [0, 49.2], [0.5, 66.8], [1, 74.7], [1.5, 80.6], [2, 86.2], [2.5, 90.8], [3, 94.9], [3.5, 98], [4, 101.4], [4.5, 104.9],
          [5, 108.4], [5.5, 111.7], [6, 114.6], [6.5, 117.4], [7, 120.6], [7.5, 123.6], [8, 126.3], [8.5, 129], [9, 131.4], [9.5, 133.9],
          [10, 136], [10.5, 138.3], [11, 140.8], [11.5, 143.7], [12, 147], [12.5, 150.4], [13, 154.3], [13.5, 157.9], [14, 161], [14.5, 163.6],
          [15, 165.4], [15.5, 166.7], [16, 167.4], [16.5, 167.9], [17, 168.2], [18, 168.6]
        ]

        // P50
        const referenceCurveDataOfBoysP50 = [
          [0, 50.4], [0.5, 68.4], [1, 76.5], [1.5, 82.7], [2, 88.5], [2.5, 93.3], [3, 97.5], [3.5, 100.6], [4, 104.1], [4.5, 107.7],
          [5, 110.9], [5.5, 114.7], [6, 117.7], [6.5, 120.7], [7, 124], [7.5, 127.1], [8, 130], [8.5, 132.7], [9, 135.4], [9.5, 137.9],
          [10, 140.2], [10.5, 142.6], [11, 145.3], [11.5, 148.4], [12, 151.9], [12.5, 155.6], [13, 159.5], [13.5, 163], [14, 165.9], [14.5, 168.2],
          [15, 169.8], [15.5, 171], [16, 171.6], [16.5, 172.1], [17, 172.3], [18, 172.7]
        ]

        // P75
        const referenceCurveDataOfBoysP75 = [
          [0, 51.6], [0.5, 70], [1, 78.4], [1.5, 84.8], [2, 90.9], [2.5, 95.9], [3, 100.1], [3.5, 103.2], [4, 106.9], [4.5, 110.5],
          [5, 114.2], [5.5, 117.7], [6, 120.9], [6.5, 123.9], [7, 127.4], [7.5, 130.7], [8, 133.7], [8.5, 136.6], [9, 139.3], [9.5, 142],
          [10, 144.4], [10.5, 147], [11, 149.9], [11.5, 153.1], [12, 157], [12.5, 160.8], [13, 164.8], [13.5, 168.1], [14, 170.7], [14.5, 172.8],
          [15, 174.2], [15.5, 175.2], [16, 175.8], [16.5, 176.2], [17, 176.4], [18, 176.7]
        ]

        // P90
        const referenceCurveDataOfBoysP90 = [
          [0, 52.7], [0.5, 71.5], [1, 80.1], [1.5, 86.7], [2, 93.1], [2.5, 98.2], [3, 102.5], [3.5, 105.7], [4, 109.3], [4.5, 113.1],
          [5, 116.9], [5.5, 120.5], [6, 123.7], [6.5, 126.9], [7, 130.5], [7.5, 133.9], [8, 137.1], [8.5, 140.1], [9, 142.9], [9.5, 145.7],
          [10, 148.2], [10.5, 150.9], [11, 154], [11.5, 157.4], [12, 161.5], [12.5, 165.5], [13, 169.5], [13.5, 172.7], [14, 175.1], [14.5, 176.9],
          [15, 178.2], [15.5, 179.1], [16, 179.5], [16.5, 179.9], [17, 180.1], [18, 180.4]
        ]

        // P97
        const referenceCurveDataOfBoysP97 = [
          [0, 53.8], [0.5, 73], [1, 81.8], [1.5, 88.7], [2, 95.3], [2.5, 100.5], [3, 104.8], [3.5, 108.1], [4, 111.8], [4.5, 115.7],
          [5, 119.6], [5.5, 123.3], [6, 126.6], [6.5, 129.9], [7, 133.7], [7.5, 137.2], [8, 140.4], [8.5, 143.6], [9, 146.5], [9.5, 149.4],
          [10, 152], [10.5, 154.9], [11, 158.1], [11.5, 161.7], [12, 166], [12.5, 170.2], [13, 174.2], [13.5, 177.2], [14, 179.4], [14.5, 181],
          [15, 182], [15.5, 182.8], [16, 183.2], [16.5, 183.5], [17, 183.7], [18, 183.9]
        ]

        /**
         * @variation: 图表参考曲线数据 - 女童
         * */
        // P3
        const referenceCurveDataOfGirlsP3 = [
          [0, 46.6], [0.5, 62.5], [1, 70], [1.5, 76], [2, 80.9], [2.5, 85.2], [3, 89.3], [3.5, 92.4], [4, 95.8], [4.5, 99.2],
          [5, 102.3], [5.5, 105.4], [6, 108.1], [6.5, 110.6], [7, 113.3], [7.5, 116], [8, 118.5], [8.5, 121], [9, 123.3], [9.5, 125.7],
          [10, 128.3], [10.5, 131.1], [11, 134.2], [11.5, 137.2], [12, 140.2], [12.5, 142.9], [13, 145], [13.5, 146.7], [14, 147.9], [14.5, 148.9],
          [15, 149.5], [15.5, 149.9], [16, 149.8], [16.5, 149.9], [17, 150.1], [18, 150.4]
        ]

        // P10
        const referenceCurveDataOfGirlsP10 = [
          [0, 47.5], [0.5, 63.9], [1, 71.6], [1.5, 77.7], [2, 82.9], [2.5, 87.4], [3, 91.5], [3.5, 94.6], [4, 98.1], [4.5, 101.5],
          [5, 104.8], [5.5, 108], [6, 110.8], [6.5, 113.4], [7, 116.2], [7.5, 119], [8, 121.6], [8.5, 124.2], [9, 126.7], [9.5, 129.3],
          [10, 132.1], [10.5, 135], [11, 138.2], [11.5, 141.2], [12, 144.1], [12.5, 146.6], [13, 148.6], [13.5, 150.2], [14, 151.3], [14.5, 152.2],
          [15, 152.8], [15.5, 153.1], [16, 153.1], [16.5, 153.2], [17, 153.4], [18, 153.7]
        ]

        // P25
        const referenceCurveDataOfGirlsP25 = [
          [0, 48.6], [0.5, 65.2], [1, 73.2], [1.5, 79.5], [2, 84.9], [2.5, 89.6], [3, 93.8], [3.5, 96.8], [4, 100.4], [4.5, 104],
          [5, 107.3], [5.5, 110.6], [6, 113.5], [6.5, 116.2], [7, 119.2], [7.5, 122.1], [8, 124.9], [8.5, 127.6], [9, 130.2], [9.5, 132.9],
          [10, 135.9], [10.5, 138.9], [11, 142.2], [11.5, 145.2], [12, 148], [12.5, 150.4], [13, 152.2], [13.5, 153.7], [14, 154.8], [14.5, 155.6],
          [15, 156.1], [15.5, 156.5], [16, 156.4], [16.5, 156.5], [17, 156.7], [18, 157]
        ]

        // P50
        const referenceCurveDataOfGirlsP50 = [
          [0, 49.7], [0.5, 66.8], [1, 75], [1.5, 81.5], [2, 87.2], [2.5, 92.1], [3, 96.3], [3.5, 99.4], [4, 103.1], [4.5, 106.7],
          [5, 110.2], [5.5, 113.5], [6, 116.6], [6.5, 119.4], [7, 122.5], [7.5, 125.6], [8, 128.5], [8.5, 131.3], [9, 134.1], [9.5, 137],
          [10, 140.1], [10.5, 143.3], [11, 146.6], [11.5, 149.7], [12, 152.4], [12.5, 154.6], [13, 156.3], [13.5, 157.6], [14, 158.6], [14.5, 159.4],
          [15, 159.8], [15.5, 160.1], [16, 160.1], [16.5, 160.2], [17, 160.3], [18, 160.6]
        ]

        // P75
        const referenceCurveDataOfGirlsP75 = [
          [0, 50.9], [0.5, 68.4], [1, 76.8], [1.5, 83.6], [2, 89.6], [2.5, 94.6], [3, 98.9], [3.5, 102], [4, 105.7], [4.5, 109.5],
          [5, 113.1], [5.5, 116.5], [6, 119.7], [6.5, 122.7], [7, 125.9], [7.5, 129.1], [8, 132.1], [8.5, 135.1], [9, 138], [9.5, 141.1],
          [10, 144.4], [10.5, 147.7], [11, 151.1], [11.5, 154.1], [12, 156.7], [12.5, 158.8], [13, 160.3], [13.5, 161.6], [14, 162.4], [14.5, 163.1],
          [15, 163.5], [15.5, 163.8], [16, 163.8], [16.5, 163.8], [17, 164], [18, 164.2]
        ]

        // P90
        const referenceCurveDataOfGirlsP90 = [
          [0, 51.9], [0.5, 69.8], [1, 78.5], [1.5, 85.5], [2, 91.7], [2.5, 97], [3, 101.2], [3.5, 104.4], [4, 108.2], [4.5, 112.1],
          [5, 115.7], [5.5, 119.3], [6, 122.5], [6.5, 125.6], [7, 129], [7.5, 132.3], [8, 135.4], [8.5, 138.5], [9, 141.6], [9.5, 144.8],
          [10, 148.2], [10.5, 151.6], [11, 155.2], [11.5, 158.2], [12, 160.7], [12.5, 162.6], [13, 164], [13.5, 165.1], [14, 165.9], [14.5, 166.5],
          [15, 166.8], [15.5, 167.1], [16, 167.1], [16.5, 167.1], [17, 167.3], [18, 167.5]
        ]

        // P97
        const referenceCurveDataOfGirlsP97 = [
          [0, 53], [0.5, 71.2], [1, 80.2], [1.5, 87.4], [2, 93.9], [2.5, 99.3], [3, 103.6], [3.5, 106.8], [4, 110.6], [4.5, 114.7],
          [5, 118.4], [5.5, 122], [6, 125.4], [6.5, 128.6], [7, 132.1], [7.5, 135.5], [8, 138.7], [8.5, 141.9], [9, 145.1], [9.5, 148.5],
          [10, 152], [10.5, 155.6], [11, 159.2], [11.5, 162.1], [12, 164.5], [12.5, 166.3], [13, 167.6], [13.5, 168.6], [14, 169.3], [14.5, 169.8],
          [15, 170.1], [15.5, 170.3], [16, 170.3], [16.5, 170.4], [17, 170.5], [18, 170.7]
        ]


        // 使用已初始化的 DOM ，初始化 echarts 实例
        // 默认使用 canvas 渲染
        // 等同于 let echartsTest = this.$echarts.init(document.getElementById('myChart'), { renderer:canvas });
        let echartsTest = this.$echarts.init(document.getElementById('myChart'));
        // 获取 canvas
        // 此时获取转换成 base 64 格式的图片

        // 获取当前 echarts 图标的图片
        // let img = this.$echarts;
        let imgTest = new Image();
        imgTest.src = echartsTest.getConnectedDataURL({
          pixelRatio: 2,
          backgroundColor: '#fff'
        });
        // 查看生成的图片
        console.log(imgTest);
        this.$store.commit('changeChartsImage',imgTest);


        /**
         * @update: not using 'category' instead of 'value' of xAxis
         * @description: it is convenient to get xAxis values
         * */
        // 指定图表的配置项和数据
        // 配置 - 男
        const optionTest = {
          // 图表标题
          title: {
            text: '身长百分位（男）'
          },
          // 类别显示
          legend: {},
          grid: {},

          // X 轴
          xAxis: {
            type: 'value',
            // X 轴坐标标签
            name: '年龄（岁）',
            // 标签位置
            nameLocation: 'middle',
            // 标题距离坐标轴
            nameGap: 25,
            // boundaryGap: false,
/*            min: 0,
            max: 20,*/
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
            splitNumber: 30,
            // data: ['0月', '2月', '4月', '6月', '9月', '12月', '15月', '18月', '21月', '2岁', '2.5岁', '3岁', '3.5岁', '4岁', '4.5岁', '5岁', '5.5岁', '6.0岁', '6.5岁', '7.0岁', '7.5岁', '8.0岁', '8.5岁', '9.0岁', '9.5岁', '10.0岁', '10.5岁', '11.0岁', '11.5岁', '12.0岁', '12.5岁', '13.0岁', '13.5岁', '14.0岁', '14.5岁', '15.0岁', '15.5岁', '16.0岁', '16.5岁', '17.0岁', '18.0岁']
          },
          yAxis: [
            {
              type: 'value',
              name: '身高百分位数值（cm）',
              nameLocation: 'middle',
              nameGap: 25,
              min: 40,
              max: 190,
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 16
              }
            },
            {
              type: 'value',
              min: 40,
              max: 190
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
              data: referenceCurveDataOfBoysP3
              // data: [47.1, 54.6, 60.3, 64, 67.9, 71.5, 74.4, 76.9, 79.5, 82.1, 86.4, 90.4, 93.4, 96.7, 100, 103.3, 106.4, 109.1, 111.7, 114.6, 117.4, 119.9, 122.3, 124.6, 126.7, 128.7, 130.7, 132.9, 135.3, 138.1, 141.1, 145, 148.8, 152.3, 155.3, 157.5, 159.1, 159.9, 160.5, 160.9, 161.3]
            },
            // 线条二
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
              data: referenceCurveDataOfBoysP10
              // data: [48.1, 55.9, 61.7, 65.4, 69.4, 73.1, 76.1, 78.7, 81.4, 84.1, 88.6, 92.6, 95.7, 99.1, 102.4, 105.8, 109, 111.8, 114.5, 117.6, 120.5, 123.1, 125.6, 128, 130.3, 132.3, 134.5, 136.8, 139.5, 142.5, 145.7, 149.6, 153.3, 156.7, 159.4, 161.4, 162.9, 163.6, 164.2, 164.5, 164.9]
            },
            // 线条三
            {
              name: 'P25',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceCurveDataOfBoysP25
              // data: [49.2, 57.2, 63, 66.8, 70.9, 74.7, 77.8, 80.6, 83.4, 86.2, 90.8, 94.9, 98, 101.4, 104.9, 108.4, 111.7, 114.6, 117.4, 120.6, 123.6, 126.3, 129, 131.4, 133.9, 136, 138.3, 140.8, 143.7, 147, 150.4, 154.3, 157.9, 161, 163.6, 165.4, 166.7, 167.4, 167.9, 168.2, 168.6]
            },
            // 线条四
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
              data: referenceCurveDataOfBoysP50
              // data: [50.4, 58.7, 64.6, 68.4, 72.6, 76.5, 79.8, 82.7, 85.6, 88.5, 93.3, 97.5, 100.6, 104.1, 107.7, 111.3, 114.7, 117.7, 120.7, 124, 127.1, 130, 132.7, 135.4, 137.9, 140.2, 142.6, 145.3, 148.4, 151.9, 155.6, 159.5, 163, 165.9, 168.2, 169.8, 171, 171.6, 172.1, 172.3, 172.7]
            },
            // 线条五
            {
              name: 'P75',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceCurveDataOfBoysP75
              // data: [51.6, 60.3, 66.2, 70, 74.4, 78.4, 81.8, 84.8, 87.9, 90.9, 95.9, 100.1, 103.2, 106.9, 110.5, 114.2, 117.7, 120.9, 123.9, 127.4, 130.7, 133.7, 136.6, 139.3, 142, 144.4, 147, 149.9, 153.1, 157, 160.8, 164.8, 168.1, 170.7, 172.8, 174.2, 175.2, 175.8, 176.2, 176.4, 176.7]
            },
            // 线条六
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
              data: referenceCurveDataOfBoysP90
              // data: [52.7, 61.7, 67.6, 71.5, 75.9, 80.1, 83.6, 86.7, 90, 93.1, 98.2, 102.5, 105.7, 109.3, 113.1, 116.9, 120.5, 123.7, 126.9, 130.5, 133.9, 137.1, 140.1, 142.9, 145.7, 148.2, 150.9, 154, 157.4, 161.5, 165.5, 169.5, 172.7, 175.1, 176.9, 178.2, 179.1, 179.5, 179.9, 180.1, 180.4]
            },
            // 线条七
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
              data: referenceCurveDataOfBoysP97
              // data: [53.8, 63, 69, 73, 77.5, 81.8, 85.4, 88.7, 92, 95.3, 100.5, 104.8, 108.1, 111.8, 115.7, 119.6, 123.3, 126.6, 129.9, 133.7, 137.2, 140.4, 143.6, 146.5, 149.4, 152, 154.9, 158.1, 161.7, 166, 170.2, 174.2, 177.2, 179.4, 181, 182, 182.8, 183.2, 183.5, 183.7, 183.9]
            },
            {
              name: '用户',
              type: 'line',
              // xAxisIndex: 7,
              data: [currentUsersDataForDot],
              color: 'black',
              symbol: 'circle',
              symbolSize: 10
            }
          ],

        };

        // 配置数据 - 女
        const optionTestOfGirl = {
          // 图表标题
          title: {
            text: '身长百分位（女）'
          },
          // 类别显示
          legend: {},
          grid: {},

          // 颜色 - 分别对应每条曲线
          // 使用默认颜色
          // color: [
          //   '#FF3333',    //
          //   '#53FF53',    //
          //   '#B15BFF',    //
          //   '#68CFE8',    //
          //   '#FFDC35'    //
          // ],

          // 暂不使用
          // dataset: {
          //   source: [
          //     ['product', 'P3', 'P10', 'P25', 'P50', 'P75', 'P90', 'P97'],
          //     ['0月', 47.1, 48.1, 49.2, 50.4, 51.6, 52.7, 53.8],
          //     ['2月', 54.6, 55.9, 57.2, 58.7, 60.3, 61.7, 63],
          //     ['4月', 60.3, 61.7, 63, 64.6, 66.2, 67.6, 69],
          //     ['6月', 64, 65.4, 66.8, 68.4, 70, 71.5, 73],
          //     ['9月', 67.9, 69.4, 70.9, 72.6, 74.4, 75.9, 77.5],
          //     ['12月', 71.5, 73.1, 74.7, 76.5, 78.4, 80.1, 81.8],
          //     ['15月', 74.4, 76.1, 77.8, 79.8, 81.8, 83.6, 85.4],
          //     ['18月', 76.9, 78.7, 80.6, 82.7, 84.8, 86.7, 88.7],
          //     ['21月', 79.5, 81.4, 83.4, 85.6, 87.9, 90, 92],
          //     ['2岁', 82.1, 84.1, 86.2, 88.5, 90.9, 93.1, 95.3],
          //     ['2.5岁', 86.4, 88.6, 90.8, 93.3, 95.9, 98.2, 100.5],
          //     ['3岁', 90.4, 92.6, 94.9, 97.5, 100.1, 102.5, 104.8],
          //     ['3.5岁', 93.4, 95.7, 98, 100.6, 103.2, 105.7, 108.1],
          //     ['4岁', 96.7, 99.1, 101.4, 104.1, 106.9, 109.3, 111.8],
          //     ['4.5岁', 100, 102.4, 104.9, 107.7, 110.5, 113.1, 115.7],
          //     ['5岁', 103.3, 105.8, 108.4, 111.3, 114.2, 116.9, 119.6],
          //     ['5.5岁', 106.4, 109, 111.7, 114.7, 117.7, 120.5, 123.3],
          //     ['6岁', 109.1, 111.8, 114.6, 117.7, 120.9, 123.7, 126.6],
          //     ['6.5岁', 111.7, 114.5, 117.4, 120.7, 123.9, 126.9, 129.9],
          //     ['7岁', 114.6, 117.6, 120.6, 124, 127.4, 130.5, 133.7]
          //   ]
          // },

          // X 轴
          xAxis: {
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
            splitNumber: 30,
            // data: ['0月', '2月', '4月', '6月', '9月', '12月', '15月', '18月', '21月', '2岁', '2.5岁', '3岁', '3.5岁', '4岁', '4.5岁', '5岁', '5.5岁', '6.0岁', '6.5岁', '7.0岁', '7.5岁', '8.0岁', '8.5岁', '9.0岁', '9.5岁', '10.0岁', '10.5岁', '11.0岁', '11.5岁', '12.0岁', '12.5岁', '13.0岁', '13.5岁', '14.0岁', '14.5岁', '15.0岁', '15.5岁', '16.0岁', '16.5岁', '17.0岁', '18.0岁']
          },
          yAxis: [
            {
              type: 'value',
              name: '身高百分位数值（cm）',
              nameLocation: 'middle',
              nameGap: 25,
              min: 40,
              max: 180,
              nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 16
              }
            },
            {
              type: 'value',
              min: 40,
              max: 180
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
              data: referenceCurveDataOfGirlsP3
              // data: [46.6, 53.4, 59.1, 62.5, 66.4, 70, 73.2, 76, 78.5, 80.9, 85.2, 89.3, 92.4, 95.8, 99.2, 102.3, 105.4, 108.1, 110.6, 113.3, 116, 118.5, 121, 123.3, 125.7, 128.3, 131.1, 134.2, 137.2, 140.2, 142.9, 145, 146.7, 147.9, 148.9, 149.5, 149.9, 149.8, 149.9, 150.1, 150.4]
            },
            // 线条二
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
              data: referenceCurveDataOfGirlsP10
              // data: [47.5, 54.7, 60.3, 63.9, 67.8, 71.6, 74.9, 77.7, 80.4, 82.9, 87.4, 91.5, 94.6, 98.1, 101.5, 104.8, 108, 110.8, 113.4, 116.2, 119, 121.6, 124.2, 126.7, 129.3, 132.1, 135, 138.2, 141.2, 144.1, 146.6, 148.6, 150.2, 151.3, 152.2, 152.8, 153.1, 153.1, 153.2, 153.4, 153.7]
              // data: [48.1, 55.9, 61.7, 65.4, 69.4, 73.1, 76.1, 78.7, 81.4, 84.1, 88.6, 92.6, 95.7, 99.1, 102.4, 105.8, 109, 111.8, 114.5, 117.6, 120.5, 123.1, 125.6, 128, 130.3, 132.3, 134.5, 136.8, 139.5, 142.5, 145.7, 149.6, 153.3, 156.7, 159.4, 161.4, 162.9, 163.6, 164.2, 164.5, 164.9]
            },
            // 线条三
            {
              name: 'P25',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceCurveDataOfGirlsP25
              // data: [48.6, 56, 61.7, 65.2, 69.3, 73.2, 76.6, 79.5, 82.3, 84.9, 89.6, 93.8, 96.8, 100.4, 104, 107.3, 110.6, 113.5, 116.2, 119.2, 122.1, 124.9, 127.6, 130.2, 132.9, 135.9, 138.9, 142.2, 145.2, 148, 150.4, 152.2, 153.7, 154.8, 155.6, 156.1, 156.5, 156.4, 156.5, 156.7, 157]
              // data: [49.2, 57.2, 63, 66.8, 70.9, 74.7, 77.8, 80.6, 83.4, 86.2, 90.8, 94.9, 98, 101.4, 104.9, 108.4, 111.7, 114.6, 117.4, 120.6, 123.6, 126.3, 129, 131.4, 133.9, 136, 138.3, 140.8, 143.7, 147, 150.4, 154.3, 157.9, 161, 163.6, 165.4, 166.7, 167.4, 167.9, 168.2, 168.6]
            },
            // 线条四
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
              data: referenceCurveDataOfGirlsP50
              // data: [49.7, 57.4, 63.1, 66.8, 71, 75, 78.5, 81.5, 84.4, 87.2, 92.1, 96.3, 99.4, 103.1, 106.7, 110.2, 113.5, 116.6, 119.4, 122.5, 125.6, 128.5, 131.3, 134.1, 137, 140.1, 143.3, 146.6, 149.7, 152.4, 154.6, 156.3, 157.6, 158.6, 159.4, 159.8, 160.1, 160.1, 160.2, 160.3, 160.6]
              // data: [50.4, 58.7, 64.6, 68.4, 72.6, 76.5, 79.8, 82.7, 85.6, 88.5, 93.3, 97.5, 100.6, 104.1, 107.7, 111.3, 114.7, 117.7, 120.7, 124, 127.1, 130, 132.7, 135.4, 137.9, 140.2, 142.6, 145.3, 148.4, 151.9, 155.6, 159.5, 163, 165.9, 168.2, 169.8, 171, 171.6, 172.1, 172.3, 172.7]
            },
            // 线条五
            {
              name: 'P75',
              // 折线类型
              type: 'line',
              // 是否光滑
              smooth: true,
              // 拐点类型
              symbol: 'none',
              // 拐点大小
              symbolSize: 7,
              data: referenceCurveDataOfGirlsP75
              // data: [50.9, 58.9, 64.6, 68.4, 72.8, 76.8, 80.4, 83.6, 86.6, 89.6, 94.6, 98.9, 102, 105.7, 109.5, 113.1, 116.5, 119.7, 122.7, 125.9, 129.1, 132.1, 135.1, 138, 141.1, 144.4, 147.7, 151.1, 154.1, 156.7, 158.8, 160.3, 161.6, 162.4, 163.1, 163.5, 163.8, 163.8, 163.8, 164, 164.2]
              // data: [51.6, 60.3, 66.2, 70, 74.4, 78.4, 81.8, 84.8, 87.9, 90.9, 95.9, 100.1, 103.2, 106.9, 110.5, 114.2, 117.7, 120.9, 123.9, 127.4, 130.7, 133.7, 136.6, 139.3, 142, 144.4, 147, 149.9, 153.1, 157, 160.8, 164.8, 168.1, 170.7, 172.8, 174.2, 175.2, 175.8, 176.2, 176.4, 176.7]
            },
            // 线条六
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
              data: referenceCurveDataOfGirlsP90
              // data: [51.9, 60.2, 66, 69.8, 74.3, 78.5, 82.2, 85.5, 88.6, 91.7, 97, 101.2, 104.4, 108.2, 112.1, 115.7, 119.3, 122.5, 125.6, 129, 132.3, 135.4, 138.5, 141.6, 144.8, 148.2, 151.6, 155.2, 158.2, 160.7, 162.6, 164, 165.1, 165.9, 166.5, 166.8, 167.1, 167.1, 167.1, 167.3, 167.5]
              // data: [52.7, 61.7, 67.6, 71.5, 75.9, 80.1, 83.6, 86.7, 90, 93.1, 98.2, 102.5, 105.7, 109.3, 113.1, 116.9, 120.5, 123.7, 126.9, 130.5, 133.9, 137.1, 140.1, 142.9, 145.7, 148.2, 150.9, 154, 157.4, 161.5, 165.5, 169.5, 172.7, 175.1, 176.9, 178.2, 179.1, 179.5, 179.9, 180.1, 180.4]
            },
            // 线条七
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
              data: referenceCurveDataOfGirlsP97
              // data: [53, 61.6, 67.4, 71.2, 75.9, 80.2, 84, 87.4, 90.7, 93.9, 99.3, 103.6, 106.8, 110.6, 114.7, 118.4, 122, 125.4, 128.6, 132.1, 135.5, 138.7, 141.9, 145.1, 148.5, 152, 155.6, 159.2, 162.1, 164.5, 166.3, 167.6, 168.6, 169.3, 169.8, 170.1, 170.3, 170.3, 170.4, 170.5, 170.7]
              // data: [53.8, 63, 69, 73, 77.5, 81.8, 85.4, 88.7, 92, 95.3, 100.5, 104.8, 108.1, 111.8, 115.7, 119.6, 123.3, 126.6, 129.9, 133.7, 137.2, 140.4, 143.6, 146.5, 149.4, 152, 154.9, 158.1, 161.7, 166, 170.2, 174.2, 177.2, 179.4, 181, 182, 182.8, 183.2, 183.5, 183.7, 183.9]
            },
            {
              name: '用户',
              type: 'line',
              // xAxisIndex: 7,
              data: [currentUsersDataForDot],
              color: 'black',
              symbol: 'circle',
              symbolSize: 10
            }
          ],

        };

        // test option, not use
        const chartsOption = {
          title : { //标题
            x : 'center',
            y : 5,
            text : '数量和占比图'    //换行用 \n
          },
          legend : { //图标
            show : true,
            x : 'center',
            y : 30,
            itemGap : 10,
            itemWidth : 30,
            itemHeight : 10,
            data : ['one','three']
          },
          color: ['#3398DB'],//  柱状图颜色

          tooltip : { //鼠标悬停提示内容
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: { //布局   控制图的大小，调整下面这些值就可以
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
            //y2 : 40
            // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
          xAxis : [ //X轴
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [ //两个y轴
            {
              type : 'value',
              axisLabel : {
                show : true,
                interval : 'auto',
                formatter : '{value} '
              },
              splitNumber : 10,
              splitLine : {
                show : true,
                lineStyle : {
                  type : 'dashed'
                }
              },
              splitArea : {
                show : false
              }
            } ,
            {
              type : 'value',
              axisLabel : {
                show : true,
                interval : 'auto',
                formatter : '{value} %'
              },
              splitNumber : 10,
              splitLine : {
                show : true,
                lineStyle : {
                  type : 'dashed'
                }
              },
              splitArea : {
                show : false
              }
            }
          ],
          series : [ //用于指定图标显示类型

            {
              name : 'one',
              type : 'bar',
              barMaxWidth:100,
              yAxisIndex : '0',//使用第一个y轴
              itemStyle : {
                normal : {
                  color : 'rgba(139,26,26,1)',  //柱子颜色
                  borderType : 'dashed',

                  label : { //设置柱子上面的内容
                    show : false, //数据是否显示在柱子上
                    position : 'inside',
                    offset : [ 0, 0 ],
                    formatter : '{c}',  //如果是百分比：formatter : '{c}%',
                    textStyle : {//字体内容设置
                      color : '#000000',
                      fontStyle : 'normal',
                      fontWeight : 'normal',
                      fontFamily : 'sans-serif',
                      fontSize : 6
                    }
                  }
                }
              },
              data : [10, 52, 200, 334, 390, 330, 220]
            },
            {
              name : '比例',
              type : 'line',
              symbol : 'emptyCircle',
              showAllSymbol : true, //动画效果
              symbolSize : 12,
              smooth : true, //光滑的曲线
              yAxisIndex : '1',
              itemStyle : {
                normal : {
                  color : 'rgba(139,26,26,1)',
                  label : {
                    show : true,
                    formatter : '{c}%',
                    textStyle : {
                      color : '#000000'
                    }
                  }
                }
              },
              data : [1, 5, 20, 33, 39, 33, 22]

            },
          ]
        }

        if (sexParamOfCurrentUser === 1) {
          // 使用配置 - 男
          echartsTest.setOption(optionTest);
        } else {
          // 使用配置 - 女
          echartsTest.setOption(optionTestOfGirl);
        }

      },

      /**
       * @function: 获取后台数据，使用当前用户的性别、身高
       * @param: currentUsersId => currentUsersHeightParam
       * @author: White
       * @date: 19 - 04 - 28
       * */
      getLineData (currentUsersHeightParam, times) {
        // 发起请求
        this.axios.get('http://localhost:8082/information/search', {
          params: {
            guardian_phone: currentUsersHeightParam,
            inspectOrder: times
          }
        })
          .then((response) => {
            // 控制台打印返回参数
            console.log(response)
            console.log(response.data.data)
            //
            try {
              if (response.status === 200) {
                // 获取当前用户的性别
                const currentUserSexParam = response.data.data.sex;
                const currentUserHeightParam = response.data.data.height;
                const currentUserAgeParam = response.data.data.age;
                // 使用当前参数画图
                this.draw(currentUserSexParam, currentUserHeightParam, currentUserAgeParam)
              }
            } catch (e) {
              this.$alert('服务器开小差了：' + e, '错误！', {
                confirmButtonText: '确定',
                callback: action => {
                  // 回调信息
                  console.log("确认信息：" + action)
                }
              })
            }
        },err => {
          // 打印错误信息
          console.log("发生了一些错误：" + err)
        }).catch(
          // 异常处理
        )
      }
    }
  }
</script>

<style scoped>

</style>
