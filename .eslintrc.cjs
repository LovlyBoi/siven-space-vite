module.exports = {
  // 设置环境，让 eslint 知道我们有哪些全局变量
  env: {
    browser: true, // 浏览器全局变量
    es2021: true, // ES2021 的全局变量
    node: true, // Node 全局变量
  },
  // 扩展 config
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // eslint-config-prettier，解决 eslint 和 prettier 冲突
    'prettier',
  ],
  overrides: [],
  // 解析器，解析 Vue 文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // 解析 ts
    parser: '@typescript-eslint/parser',
  },
  // 插件
  plugins: ['vue', '@typescript-eslint'],
  // 规则
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off',
  },
}
