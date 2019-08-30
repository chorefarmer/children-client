// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入外部 axios
import axios from 'axios'
// Vue http-ajax，使用了axios
import VueResource from 'vue-resource'
import promise from 'es6-promise'
// 引入 element-ui
import ElementUI from 'element-ui'
// 引入 element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入封装的 post, get, put, delete 方法，没使用
// import { post, get, put, Delete } from './utils/request'
// 引入 Vuex 配置文件
import store from './store/store'
// 引入 echarts
import echarts from 'echarts'
// 引入打印插件 print
import Print from './utils/plugs/print'

// 引入封装好的 axios 方法
// const request = require('@/utils/request')
// 引入url配置文件
// const globalUrl = require('@/utils/common/url/urlConfig')
// 引入api配置文件
// const api = require('@/utils/common/api/apiConfig')

promise.polyfill();
Vue.config.productionTip = false;
Vue.prototype.axios = axios;

/**
 * @description: 封装的请求方式，使用原型了
 * */
// Vue.prototype.$commonUtil = request;

// 使用 echarts 作为 Vue 的原型，全局配置
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
// 注册 Vue-http-ajax ，暂不使用
Vue.use(VueResource)
// 全局注册 print 插件，暂不需要
Vue.use(Print)

// 使用封装好的 post get put delete 方法作为 Vue 的原型，全局配置
// Vue.prototype.$post = post;  // 录入数据
// Vue.prototype.$get = get;  // 查询数据
// Vue.prototype.$put = put;  // 修改信息
// Vue.prototype.$Delete = Delete;  //  删除数据，本项目用不上

// 配置 Vue 原型，用于实际环境中的 webpack 域名
// 等实际上线再使用，暂时不使用
// Vue.prototype.globalUrl = globalUrl
// Vue.prototype.globalApi = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components : { App },
  template: '<App/>'
})
