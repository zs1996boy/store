import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;//拿到VueRouter的push函数
//重写调用push函数
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      login:true
    },
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/commodity/:id',
    name: 'Commodity',
    props:true,
    component: () => import('@/views/Commodity.vue')
  },
  {
    path: '/none',
    name: 'None',
    props:true,
    component: () => import('@/views/None.vue')
  },
  {
    path: '/addmanage',
    name: 'AddManage',
    props:true,
    component: () => import('@/views/AddManage.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    props:true,
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/orderdetail/:id',
    name: 'OrderDetail',
    props:true,
    component: () => import('@/views/OrderDetail.vue')
  },
  {
    path: '/order/:id',
    name: 'Order',
    props:true,
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/hotnewgoods/:num',
    name: 'Hotnewgoods',
    props:true,
    component: () => import('@/views/Hotnewgoods.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta:{
      login:true
    },
    component: () => import('@/views/My.vue')
  },
  {
    path: '/mydata',
    name: 'Mydata',
    meta:{
      login:true
    },
    component: () => import('@/views/Mydata.vue')
  },
  {
    path: '/changepassword',
    name: 'Changepassword',
    meta:{
      login:true
    },
    component: () => import('@/views/Changepassword.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.login && !store.getters.tokens){
    next('/login')
  }
  next();
})
export default router
