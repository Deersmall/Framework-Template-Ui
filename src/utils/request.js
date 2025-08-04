import axios from 'axios'
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
request.interceptors.response.use(response => {
        const code = response.data.code || 200;
        const msg = response.data.message

        if (code === 401) {
            this.$alert('登录状态已过期,请重新登录', '登录已过期', {
                confirmButtonText: '确定',
            }).then(() => {
                this.$router.push("/login");// 重定向
            }).catch(() => {});
        }else if (code !== 200) {
            this.$message.error(msg);
            return Promise.reject('error')
        } else {
            return response.data;
        }

        // let res = response.data;
        // // 如果是返回的文件
        // if (response.config.responseType === 'blob') {
        //     return res
        // }
        // // 兼容服务端返回的字符串数据
        // if (typeof res === 'string') {
        //     res = res ? JSON.parse(res) : res
        // }
        // return res;
    },
    error => {
        console.log('err' + error) // for debug
        let { message } = error;
        this.$message.error(message);
        return Promise.reject(error)
    }
)


export default request

