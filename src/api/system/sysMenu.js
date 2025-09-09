import request from "@/utils/request";

// 菜单/权限  查询
export function getMenuTree() {
    return request({
        url: '/system/sysMenu/getMenuTree',
        method: 'post',
    });
}

// 菜单/权限  添加
export function addMenu(data) {
    return request({
        url: '/system/sysMenu/addMenu',
        method: 'post',
        data: data
    });
}

// 菜单/权限  修改
export function updateById(data) {
    return request({
        url: '/system/sysMenu/updateById',
        method: 'post',
        data: data
    });
}

export function removeMenu(id) {
    return request({
        url: '/system/sysMenu/' + id,
        method: 'delete'
    })
}

// export function updateById(data) {
//     return request({
//         url: '/system/sysMenu/updateById',
//         method: 'post',
//         params: data
//     });
// }
