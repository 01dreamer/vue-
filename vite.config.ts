import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM 环境中没有 __dirname 和 __filename，需要手动定义
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173, // 端口
  },
  plugins: [
    //配置插件
    AutoImport({
      imports:["vue","vue-router","pinia"],
      dts: 'src/auto-imports.d.ts',
      resolvers:[ElementPlusResolver()],
    }),
    Components({
      resolvers:[
        // 1. 配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass" }),
      ],
      dts: 'src/components.d.ts',
    }),
    vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;    
          @use "@/styles/var.scss" as *;     
        `,
      }
    }
  }
})
