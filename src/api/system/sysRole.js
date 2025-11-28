import request from "@/utils/request";

// 角色  查询
export function getList(data) {
    return request({
        url: '/system/sysRole/getList',
        method: 'post',
        data: data
    });
}
