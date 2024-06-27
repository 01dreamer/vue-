import axios from 'axios'
import router from '@/router';
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';
const http = axios.create({
    baseURL:"http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:5000
})
// axios请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(config =>{
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},e => Promise.reject(e))

// axios响应式拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use(res => res , e => {
    const cartStore = useCartStore()
    // 统一错误提示
    ElMessage({ type: 'error', message: e.response?.data.message })
    //401token失效处理
    const userStore = useUserStore();
    if(e.response?.status === 401){
        userStore.clearUserInfo()
        cartStore.clearCart()
        router.push('/login')
    }else{
        console.log(e);
    }
    return Promise.reject(e)
})

export default http