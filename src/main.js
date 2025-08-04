import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import request from "@/utils/request";

axios.defaults.withCredentials = true;// 允许跨域携带cookie


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

// 挂载路由导航守卫
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 是个函数，表示放行 next() 放行  next('/login') 强制跳转

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        sessionStorage.removeItem('loginUserInfo')
        next()
    } else {
        let token = sessionStorage.getItem('loginUserInfo')
        //  判断是否存在Token
        if (token) {
            next()
        } else {
            //  更改path，送回登录页
            next({
                path: '/login'
            })
        }
    }
});
