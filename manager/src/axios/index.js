import Modal from 'antd/lib/modal/Modal'
import axios from 'axios'
import {message} from 'antd'

export default class Axios {
    static ajxa(options){
        const baseApi = 'https://www.easy-mock.com/mock/5fab5dfc5d1197774d6ab195/mockapi'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status === 200){
                    let res = response.data
                    if(res.code === 200){
                        resolve(res)
                    }else{
                        message.error(res.msg);
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}