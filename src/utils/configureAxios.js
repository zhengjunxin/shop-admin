import axios from 'axios'
import { message } from 'antd'

axios.interceptors.response.use(response => {
    return response
}, error => {
    message.error('服务器发生错误')
    return Promise.reject(error)
})
