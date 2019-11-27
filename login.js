import axios from './http';
import {BASE} from './config';
const  user = {
    login(params){
        const {username,password} = params;
        return axios.post(`${BASE}/login?username=${username}&password=${password}`);
    }
}

export default user;