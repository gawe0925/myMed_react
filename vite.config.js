import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // 如果是 npm run build 打包狀態，就用倉庫路徑；如果是本地開發，就用根路徑 '/'
    base: command === 'build' ? '/myMed_react/' : '/',
  }
})