import { Message } from 'element-ui';
import router from '../router'
export function Response(response) {
    console.log('response')
    console.log(response)
    console.log(typeof response)
    if (response == undefined || response == null) {
        return false;
    }

    if (typeof response == 'object' && 'code' in response) {
        if (response.code === 200) {
            if (response.msg != null && response.msg != '') {
                Message.success(response.msg);
            }
            return true;
        } else if (response.code === 600) {
            Message.warning(response.msg);
            return false;
        } else if (response.code === 500) {
            Message.error(response.msg);
            return false;
        } else if (response.code === 403) {
            console.log('2112132')
            Message.warning(response.msg);
            router.push({path:'/login'});
            return false;
        }
    }
    return false;
}