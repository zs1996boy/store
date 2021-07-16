"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:"http://music.kele8.cn",//全局服务器地址
  // baseURL:"http://localhost:3000"
  // baseURL: process.env.baseURL || process.env.apiUrl || ""  //请求的服务器地址
  // timeout: 60 * 1000, // Timeout  服务器的超市时间
  // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);
//前置请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
//响应拦截器
// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // return response.data.result;
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  //Object.defineProperty(obj,'aaa',{get(){}set(){}});
  // Vue.prototype.abc=function(){}
  // Object.defineProperty(Vue.prototype,'axios',{get(){}});
  // 在组件内部 this.$axios  this.axios
  Object.defineProperties(Vue.prototype, {
    axios: {//往Vue.prototype原型对象添加axios属性
      get() {
        return _axios;
      }
    },
    $axios: {//往Vue.prototype原型对象添加$axios属性
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
