
/** token */
export function getToken() {
    return JSON.parse(sessionStorage.getItem('loginUserInfo')).token;
}

/** 用户账号 */
export function getUserName() {
    return JSON.parse(sessionStorage.getItem('loginUserInfo')).username;
}

/** 账号权限 */
export function getAuthorities() {
    return JSON.parse(sessionStorage.getItem('loginUserInfo')).authorities;
}
