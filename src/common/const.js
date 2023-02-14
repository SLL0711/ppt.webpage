
const appConfig = {
    //TODO：启动守卫功能
    'enableGuardRoute': false,
    'maintain': false
}

const axiosConfig = {
    // 实际生产
    baseUrl: 'http://10.119.100.146:5002/api',
    staticResourceUrl: 'http://10.119.100.146:5002/StaticFiles/',

    // // 测试
    // // baseUrl: 'http://localhost:5000/api',
    // baseUrl: 'http://10.119.112.129:5001/api',
    // // baseUrl: 'http://10.119.112.111:5001/api',
    // staticResourceUrl: 'http://10.119.112.129:5001/StaticFiles/',
    timeout: 30 * 1000

}


export {
    axiosConfig, appConfig
}

