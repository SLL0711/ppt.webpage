import instance from './interceptor'

// axios get 请求
let get = (url, config = {}) => {
    return instance({
        url,
        method: 'get',
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

// axios post 请求
let post = (url, data, config = { method: 'post' }) => {
    return instance({
        url,
        method: 'post',
        data,
        // headers: { 'content-type': 'application/json' },
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

let postUrlencode = (url, data, config = { method: 'post' }) => {
    return instance({
        url,
        method: 'post',
        data,
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

//Form表单数据提交
//<params>
//  keyValues:{"name":"kevin","type":1}
//  files:Array
//</params>
let formDataUpload = (url, keyValues, files, config = { method: 'post' }) => {

    let form = new FormData();

    for (const key in keyValues) {
        if (Object.hasOwnProperty.call(keyValues, key)) {
            const val = keyValues[key];
            form.append(key, val);
        }
    }

    Array.from(files).forEach(file => {
        form.append('files', file)
    });

    return instance({
        url,
        method: 'post',
        data: form,
        // headers: { 'content-type': 'application/json' },
        ...config
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export default {
    get, post, postUrlencode, formDataUpload
}