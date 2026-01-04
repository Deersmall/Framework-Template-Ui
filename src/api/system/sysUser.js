import request from "@/utils/request";

/** 用户管理 */

// 用户  查询
export function getAllUser(data) {
    return request({
        url: '/system/sysUser/getAllUser',
        method: 'post',
        data: data
    });
}
