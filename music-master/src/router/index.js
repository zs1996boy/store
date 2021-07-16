import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/recommend"
  },
  {
    path:"/recommend",
    name:"Recommend",
    component:Recommend
  },
  {
    path:"/hot",
    name:"Hot",
    meta:{
      hideNav:false
    },
    component:()=>import('@/views/Hot'),
    children:[
      {
        path:'/hot',
        component:()=>import('@/views/Songbook')
      },
      {
        path:'/hot/singerbook',
        component:()=>import('@/views/Singerbook')
      },
      {
        path:'/hot/mvbook',
        component:()=>import('@/views/Mvbook')
      },
    ]
  },
  {
    path:"/search",
    name:"Search",
    meta:{
      hideNav:false
    },
    component:()=>import('@/views/Search')
  },
  {
    path:"/musichall/:musicid",
    name:"Musichall",
    props:true,
    meta:{
      hideNav:true
    },
    // keepAlive: false,
    component:()=>import('@/views/Musichall')
  },
  {
    path:"/Mvall/:Mvid",
    name:"Mvall",
    props:true,
    meta:{
      hideNav:true
    },
    // keepAlive: false,
    component:()=>import('@/views/Mvall')
  },
  {
    path:"/mvplay/",
    name:"Mvplay",
    props:true,
    meta:{
      hideNav:true
    },
    // keepAlive: false,
    component:()=>import('@/views/Mvplay')
  },
  {
    path:"/singersong/:id",
    name:"SingerSong",
    props:true,
    meta:{
      hideNav:true
    },
    // keepAlive: false,
    component:()=>import('@/views/SingerSong')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
