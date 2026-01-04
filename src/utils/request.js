import axios from 'axios'
import {ElMessage, ElMessageBox} from "element-plus";
import router from '@/router'
import { markRaw } from 'vue'
import { Delete } from '@element-plus/icons-vue'
axios.defaults.withCredentials = true;// 允许跨域携带cookie


export let isRelogin = { show: false };


const request = axios.create({
    /** 注意  这里是全局统一加上了 baseURL 前缀，然后由vue.config proxy拦截做代理转发
        如果只有一个后台微服务可在 baseURL 上加上拦截关键字拦截做代理转发，（后续请求  /auth/login）
        多微服务建议在发送请求时手动加入端口的拦截关键字 （后续请求  /端口拦截关键字/auth/login）    */
    baseURL: '',
    // 超时，单位秒
    timeout: 1000 * 300
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"));
    if (loginUserInfo){
        config.headers['Authorization'] = loginUserInfo.token;
    }

    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        const code = response.data.code || 200;
        const msg = response.data.message;

        // if (code === 401) {
        //     this.$alert('登录状态已过期,请重新登录', '登录已过期', {
        //         confirmButtonText: '确定',
        //     }).then(() => {
        //         this.$router.push("/login");// 重定向
        //     }).catch(() => {});
        // }else

        if (code !== 200) {
            ElMessage.error(msg)
            return Promise.reject(msg)
        } else {
            return response.data;
        }
    },
        error => {
        if (error.response){
            const { status , data } = error.response

            switch (status) {
                case 400:
                    ElMessage.error(data.message || '请求错误')
                    break
                case 401:
                    ElMessageBox.confirm('登录状态已过期,请重新登录', '登录已过期',
                        {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            icon: markRaw(Delete),
                        }
                    ).then(() => {
                        // 用户确认操作
                        router.push("/login");// 重定向
                    }).catch(() => {
                        // 用户取消操作
                    });
                    break
                case 403:
                    ElMessage.error(`没有权限访问该资源 ${status}`)
                    break
                case 404:
                    ElMessage.error(`请求的资源不存在 ${status}`)
                    break
                case 500:
                    ElMessage.error(data.message || `服务器内部错误 ${status}`)
                    break
                default:
                    ElMessage.error(data.message || `连接错误 ${status}`)
            }
        }else if (error.request){
            // 请求已经发出，但没有收到响应
            ElMessage.error('请求已发出，未收到响应，请检查忘了~~~')

        }else {
            // 发送请求时出了点问题
            ElMessage.error('请求发送失败')
        }

        return Promise.reject(error)
    }
)


export default request

