import vue from '@vitejs/plugin-vue'
import { configDefaults, defineConfig } from 'vitest/config'

const nodeMajor = Number(process.versions.node.split('.')[0])

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    execArgv: nodeMajor >= 25 ? ['--no-experimental-webstorage'] : [],
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    coverage: {
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js', 'src/router/**'],
    },
  },
})