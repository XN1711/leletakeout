import 'whatwg-fetch'
import 'es6-promise'

// 发送 post 请求
export function post(url, paramsObj) {
    var result = fetch(url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        },
    });

    return result;
}
