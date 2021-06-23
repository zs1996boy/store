import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showoverlay: false,
    loginInfo:null,
    token:null
  },
  getters:{
    tokens(state){
      let s=state.token;
      if(!s){//判断vuex里面state里面有没有token
        s=sessionStorage.getItem('token');
        if(!s){
          s=document.cookie.substr(6);//截取cookie数据取出token
        }
      }
      return s;
    },
    //获取登录用户的数据信息
    loginUser(state){
      let u=state.loginInfo;
      if(!u){
        let a=sessionStorage.getItem('loginfos');
        u=JSON.parse(a);
      }
      return u
    }
  },
  mutations: {
    //函数是否正在加载
    changeoverlay(state,payload){
      state.showoverlay=payload;
    },
    //存token
    saveToken(state,payload){
      state.token=payload;
      document.cookie="token="+payload;
      sessionStorage.setItem('token',payload);
    },
    //保存登录用户信息
    saveLoginInfo(state,payload){
      state.loginInfo=payload;
      let loginfo=JSON.stringify(payload);
      document.cookie+=loginfo;
      sessionStorage.setItem('loginfos',loginfo);
    },
    //退出登录
    LoginOut(state){
      document.cookie='token=';
      sessionStorage.removeItem('loginfos');
      sessionStorage.removeItem('token');
      state.token=null;
      state.loginInfo=null;
    }
  },
  // actions: {
  //   //异步
  //   getLoginInfo(context,payload){
  //     console.log(payload)
  //     //axios获取登录数据
  //       axios.get('api/user',{
  //         // params:{
  //         //   token:payload
  //         // }
  //         headers:{
  //           'Authori-zation':'Bearer '+payload
  //         }
  //       }).then(d=>{
  //         console.log(d)
  //       })
  //   }
  // },
  actions: {
    //登录成功的token,用户信息
    getLoginInfo(context,payload){
      console.log(payload)
       //ajax获取登录数据 并保存在vuex
       axios.get('api/user',{
         headers:{
           'Authori-zation':'Bearer '+payload
         }
       }).then(d=>{
         //登录数据获取成功存储vuex或 sesstionStorage
           context.commit('saveLoginInfo',d.data.data);
          // console.log(d)
       })
    }
 },
  modules: {
  }
})
