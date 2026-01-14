import request from "@/utils/request";

/** 用户管理 */

// 用户  查询
export function getUser(data) {
    return request({
        url: '/system/sysUser/getUser',
        method: 'post',
        data: data
    });
}


// 用户  新增
export function add(data) {
    return request({
        url: '/system/sysUser/add',
        method: 'post',
        data: data
    });
}

// 用户  修改
export function upd(data) {
    return request({
        url: '/system/sysUser/upd',
        method: 'post',
        data: data
    });
}

// 用户 删除
export function del(data) {
    return request({
        url: '/system/sysUser/del',
        method: "delete",
        data: data,
    });
}

// 用户  修改密码
export function updatePassword(data) {
    return request({
        url: '/system/sysUser/updatePassword',
        method: 'post',
        data: data
    });
}
