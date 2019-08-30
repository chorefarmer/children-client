import Vue from 'vue'
import Vuex from 'vuex'

// 将 Vuex 设置为全局变量
Vue.use(Vuex);

// 设置全局访问对象
const state = {
  id: '', // 用以获取用户ID
  userName: '',  // 用以获取用户姓名
  user: {},  // 获取一个用户的数据对象，用于修改
  birth: '',
  // 实验室检测上传测试
  laboratoryFormData: {},
  userAge: 0,  // 全局用户年龄
  chartsImg: [],  // 全局 echarts 对象
  // 检测次数
  measureTimes: 1,
  // 当前状态
  currentStatus: 0 // 0、新建；1、修改；2、新增检测
}

// 监听、获取 state
const getters = {
  getId: () => {
    return state.id;
  },
  getUserName: () => {
    return state.userName;
  },
  getUser: () => {
    return state.user;
  },
  getBirth: () => {
    return state.birth;
  },
  // 获取实验室检测当前图片对象
  getLaboratoryFormData: () => {
    return state.laboratoryFormData;
  },
  // 获取当前用户全局状态年龄
  getCurrentUserAge: () => {
    return state.userAge;
  },
  // 获取转换后的 base64 echarts 图片
  getChartsImg () {
    return state.chartsImg;
  },
  // 获取检测次数
  getMeasuresTimes () {
    return state.measureTimes;
  },
  getCurrentStatus () {
    return state.currentStatus;
  }
}

// 改变状态
const mutations = {
  changeId (state,componentParam) {
    state.id = componentParam;
  },
  // 全局改变用户姓名
  changeUserName (state,paramName) {
    state.userName = paramName;
  },
  // 获取全局使用的单个用户数据对象
  changeUser (state,paramUser) {
    state.user = paramUser;
  },
  // 暂时取消出生日期的修改
  changeBirth (state,birthParams) {
    state.birth = birthParams;
  },
  // 实验室检测，用于获取当前图片对象
  changeLaboratoryFormData (state,laboratoryParam) {
    state.laboratoryFormData = laboratoryParam;
  },
  // 改变当前用户年龄
  changeCurrentUserAge (state,userAgeParam) {
    state.userAge = userAgeParam
  },
  // 存入转换后的 echarts 图片
  changeChartsImage (state,chartsImageParam) {
    state.chartsImg = chartsImageParam;
  },
  // 新增检测 - 检测次数 + 1
  newMeasures (state, timesParam) {
    state.measureTimes = timesParam;
  },
  measureTimesPlus (state) {
    state.measureTimes++;
  },

  changeStatus (state, currentStatus) {
    state.currentStatus = currentStatus;
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
