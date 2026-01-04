import request from "@/utils/request";

/** 角色管理 */

// 角色  查询
export function getPage(data) {
    return request({
        url: '/system/sysRole/getPage',
        method: 'post',
        data: data
    });
}

// 角色  新增
export function add(data) {
    return request({
        url: '/system/sysRole/add',
        method: 'post',
        data: data
    });
}

// 角色  修改
export function upd(data) {
    return request({
        url: '/system/sysRole/upd',
        method: 'post',
        data: data
    });
}

// 角色 删除
export function del(data) {
    return request({
        url: '/system/sysRole/del',
        method: "delete",
        data: data,
    });
}

// 获取角色已绑定用户
export function getRoleBoundUser(data) {
    return request({
        url: '/system/sysRole/getRoleBoundUser',
        method: 'post',
        data: data
    });
}

// 获取角色 菜单/权限
export function getRoleMenus(data) {
    return request({
        url: '/system/sysRole/getRoleMenus',
        method: 'post',
        data: data
    });
}

// 角色  分配菜单/权限
export function assignPermissions(data) {
    return request({
        url: '/system/sysRole/assignPermissions',
        method: 'post',
        data: data
    });
}

//  角色  绑定用户
export function bindUser(data) {
    return request({
        url: '/system/sysRole/bindUser',
        method: 'post',
        data: data
    });
}

//  角色  解绑用户
export function unBindUser(data) {
    return request({
        url: '/system/sysRole/unBindUser',
        method: 'post',
        data: data
    });
}
