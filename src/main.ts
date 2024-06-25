import { createApp } from 'vue'
import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'
// 引入element-plus
import ElementPlus from 'element-plus'
import { getCategoryAPI } from './apis/testApi'
// 创建Vue应用实例
const app = createApp(App)

app.use(ElementPlus)

// 使用router和pinia
app.use(router)
app.use(pinia)
getCategoryAPI().then(res=>{
    console.log(res);
})
// 挂载应用实例到DOM
app.mount('#app')


