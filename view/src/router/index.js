import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/register.vue'
import logon from '../views/logon.vue'
import userInfo from '../views/userInfo.vue'
import main from '../views/main.vue'
import { showToast } from 'vant'
import edit from '../views/edit.vue'
import home from '../components/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        istoken:true
      }
    },
    {
      path:'/',
      name:'logon',
      component: logon,
      meta:{
        istoken:true
      }
    },
    {
      path:'/main',
      name:'main',
      component: main,
      children:[
        {
          path:'userInfo',
          name:'userInfo',
          component: userInfo
        },
        {
          path:'',
          name:'home',
          component: home
        },
      ],
    },{
      path:'/edit',
      name:edit,
      component:edit
    }
    
  ]
})


router.beforeEach((to,from,next) => {
  if((localStorage.getItem('user')||to.meta.istoken == true)){
    next()
  }else{
     router.push('/')
     showToast("请重新登录")
     return
  }
})

export default router
