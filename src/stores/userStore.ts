import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import {useCartStore} from "@/stores/cartStore";
export const useUserStore = defineStore(
'user', 
    () => {

    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const cartStore = useCartStore();
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async (user:any) => {
        const res = await loginAPI(user)
        userInfo.value = res.data.result
        //合并购物车
        await mergeCartAPI(cartStore.cartList.map(item=>{
            return{
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }));
        await cartStore.updateLoginCartList()
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {
    userInfo.value = {}
    }

    // 3. 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
{
    persist: true,
}
)