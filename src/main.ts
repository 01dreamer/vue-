import { createApp } from 'vue'
import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// 全局指令注册
import {lazyPlugin} from "@/directives";
// 引入element-plus
import ElementPlus from 'element-plus'
// 引入全局组件插件
import { componentPlugin } from '@/components'


// 创建Vue应用实例./apis/layout
const app = createApp(App)
app.use(lazyPlugin)
app.use(componentPlugin)

app.use(ElementPlus)

// 使用router和pinia
app.use(router)
app.use(pinia)
// 挂载应用实例到DOM
app.mount('#app')


