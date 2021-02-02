import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('@/views/index.vue')
const Information = () => import('@/views/informations/index.vue')
const Login = () => import('@/views/login/index.vue')
const Err404 = () => import('@/views/error/404.vue')
const Err401 = () => import('@/views/error/401.vue')

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/index",
        redirect: "information"
      },
      {
        path: 'information',
        name: 'information',
        component: Information,
        meta: {
          title: "首页"
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "admin登录"
    },
  },
  {
    path: '/err404',
    name: 'err404',
    component: Err404,
    meta: {
      title: "页面不存在"
    },
  },
  {
    path: '/err401',
    name: 'err401',
    component: Err401,
    meta: {
      title: "页面丢失"
    },
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
})

router.beforeEach(function(to, from, next) {
  document.title = to.meta.title
  if (to.matched.length === 0) {
    if(sessionStorage.getItem("state") == 1){
      document.title = "页面丢失"
      next('/adminIndex/err401')
    }else{
      next('/err404')
    }
    
  }
  
  next()
})


export default router
