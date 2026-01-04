// 获取登录账户可用权限
let authorities = null;

const permissionDirective = {
    mounted(el, binding) {
        const { value } = binding // 获取指令绑定的值，如 v-permission="'add_user'"

        // 检查权限的函数
        function checkPermission(perm) {
            if (!authorities){
                authorities = JSON.parse(sessionStorage.getItem('loginUserInfo')).authorities || []
            }
            return authorities.some(item => item.authority === perm);
        }

        // 如果没有权限，则移除元素
        if (value && !checkPermission(value)) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    }
}

export default {
    install(app) {
        app.directive('permission', permissionDirective)
    }
}
