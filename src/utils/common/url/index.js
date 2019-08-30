/**
 * 导出全局 url 配置
 * @author: White
 * @date: 2019 - 04 - 08
 *
 * */

// 引入配置文件
const url = require('./utils/common/url/urlConfig');

module.exports = {
  serverUrl: "http://" + url.apiIP, // 后台接口 IP
  interfaceUrl: "http://" + url.apiIP + ":" + url.apiPORT + url.apiPrefix, // 个人基本信息
}
