import {API} from "../constants/url";

const BASE_URL = "http://localhost:8080"

export const request = async (api: API, params?: any) => {
    let url = new URL(BASE_URL + api.path)
    if (api.method === 'GET' && params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    }

    console.log("正在通过" + api.method + ",向url:" + url + "发送请求,参数为" + JSON.stringify(params))

    const response = await fetch(url, {
        method: api.method,
        [api.method === 'GET' ? '' : 'body']: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const result = await response.json()

    console.log("请求完成,返回结果为" + JSON.stringify(result))

    return result
}