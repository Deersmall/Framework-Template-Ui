import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// 用户权限
import permission from './utils/permission'



import axios from 'axios'
import request from "@/utils/request";



// 字体配置
import '@/style/font/myFont.css'
import '@/style/font/useFont.css'



// PrimeVue
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import AnimateOnScroll from 'primevue/animateonscroll';
// 主题配置
import Noir from './presets/Noir.js';
import AppState from './plugins/appState.js';



// PrimeVue 样式
import 'primeicons/primeicons.css'      // 导入图标样式
import "@/style/style.css";



// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



// 自定义组件
import DeerView from './components/DeerView';
import DeerTable from './components/DeerTable';
import DeerForm from './components/DeerForm';
import DeerFileUpload from './components/DeerFileUpload';



axios.defaults.withCredentials = true;// 允许跨域携带cookie



// 忽略 ResizeObserver 错误
if (process.env.NODE_ENV === 'development') {
    const ignoreWarnings = [
        'ResizeObserver loop completed with undelivered notifications',
        'ResizeObserver loop limit exceeded'
    ];

    const originalError = console.error;
    console.error = (...args) => {
        if (ignoreWarnings.some(warning => args[0]?.includes?.(warning))) {
            return;
        }
        originalError.apply(console, args);
    };
}



createApp(App)
    .use(store)
    .use(router)
    .use(permission)
    .use(ElementPlus)
    .use(PrimeVue, {
        theme: {
            preset: Noir,
            options: {
                prefix: 'p',
                darkModeSelector: '.p-dark',
                cssLayer: false,
            }
        }
    })
    .use(AppState)
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .directive('animateonscroll', AnimateOnScroll)
    .component("DeerView", DeerView)    // 组件挂载
    .component("DeerTable", DeerTable)  // 组件挂载
    .component("DeerForm", DeerForm)    // 组件挂载
    .component("DeerFileUpload", DeerFileUpload)    // 组件挂载
    .mount('#app')



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
