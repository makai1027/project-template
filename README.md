# project-template

## 启动

```shell
  yarn dev
```

## 按需引用

```shell

  yarn add unplugin-vue-components -D
  yarn add ant-design-vue@next
```

> 实际操作
> [unplugin-vue-components 详细信息]('https://github.com/antfu/unplugin-vue-components#installation')

```typescript
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    /* ... */
    Components({
      resolvers: [
        // 自动引入ant的组件和样式
        // 可以直接使用 DropMenu Table 不需要引用
        AntDesignVueResolver()
      ],
      // 使用ts建议设置为types/auto-import.d.ts， 主要是方便设置tsconfig
      dts: 'types/auto-import/index.d.ts'
    })
  ]
}

// main.ts
import 'ant-design-vue/dist/antd.css'
```

## 自动引入

[unplugin-auto-import 详细信息]("https://github.com/antfu/unplugin-auto-import#install")

```shell
  yarn add  unplugin-auto-import -D
```

### 示例

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

### 配置

```ts
import AutoImport from 'unplugin-auto-import/vite'

export const configAutoImport = () => {
  return AutoImport({
    imports: ['vue', 'vue-router', '@vueuse/core'],
    dts: 'types/auto-imports.d.ts'
  })
}
```

## eslint prettier

> 需要执行安装以下依赖

```shell
  yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

- eslint: ESLint 的核心代码
- prettier：prettier 插件的核心代码
- eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
- eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用
- eslint-plugin-vue：包含常用的 vue 规范
- @typescript-eslint/parser：ESLint 的解析器，用于解析 typescript，从而检查和规范 Typescript 代码
- @typescript-eslint/eslint-plugin：包含了各类定义好的检测 Typescript 代码的规范

### 配置 prettier

```json
// .prettier
{
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "proseWrap": "preserve",
  "tabWidth": 2,
  "jsxSingleQuote": false
}
```

### eslint

> 根目录下 .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 'off',

    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          * void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off'
  }
}
```

### 新增.vscode 配置 使用保存时自动格式化

```json
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
```

### vscode 插件 - [volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

> `volar` 对 vue3 的支持度更高，建议使用 `volar` 插件代替 `vetur` 。

注意：安装 volar 后需禁用 vetur 重启 vscode 才能生效

## husky 和 lint-staged 构建代码工作流

```shell

yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D

npx huskyinit

# 修改 ./husky/pre-commit 钩子
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# 配置package 命令
yarn lint:lint-staged
# or
npx lint-staged



# 修改 ./husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --config .commitlintrc.js --edit $1



# package.json 配置
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx,vue,md}": "eslint --config .eslintrc.js",
  "*.{ts,tsx,js,json,html,yml,css,less,md}": "prettier --write"
},

```

### 根目录创建 .commitlint.config.js

```js
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  }
}
```

## css 原子化 使用 windiCss

教程：https://cn.windicss.org/integrations/vite.html

## 新增功能

- 新增字体图标按需引用
- 新增字体图标自动引用
- 替换 UI
- 替换 loader
- 调整 layout 配置
