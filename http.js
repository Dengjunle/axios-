import axios from 'axios';
import {Response} from './response';

axios.defaults.timeout = 5000;
axios.defaults.baseUrl = '';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = store.state.token;
        // token&&(config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        let success = Response(response.data);
        if(success){
            return Promise.resolve(response.data);
        }else{
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log('error',error)
        if(error.response.data.code){
            Response(error.response.data);
        }
        return Promise.reject(error.response.data);
    }
);

export default axios;