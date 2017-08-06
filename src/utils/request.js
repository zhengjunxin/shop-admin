import axios from 'axios'
import { message } from 'antd'

const methods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch']
const exceptionHandler = err => {
    message.error('服务器发生错误')
    throw err
}

const request = (...args) => {
    return axios(...args)
        .catch(exceptionHandler)
}

methods.forEach(method => {
    request[method] = (...args) => {
        return axios[method](...args)
            .catch(exceptionHandler)
    }
})



export default request
