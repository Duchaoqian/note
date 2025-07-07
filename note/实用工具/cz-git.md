# cz-git 使用指南


## 介绍

`cz-git` 是一个用于帮助规范化提交消息的工具，它结合了 Commitizen 和 Commitlint 的功能，旨在提供一种更加一致和易于阅读的提交消息风格。通过使用规范的提交消息，可以更轻松地跟踪和理解代码库的变更历史。

cz-git: 强大的 commitizen 的适配器

commitlint : git commit 时对于 commit message 进行规范检查的工具，保证团队的一致性。

commitizen : 基于Node.js的 git commit 命令行工具，辅助生成标准化规范化的 commit message。


## 为什么使用 cz-git

使用 `cz-git` 的好处有：

1. **规范化的提交消息格式**：`cz-git` 强制使用特定的提交消息格式，如 "feat: 添加新功能" 或 "fix: 修复错误"，使得提交历史更加清晰和易于理解。

2. **更好的版本控制**：清晰的提交历史有助于更好地管理版本，追踪错误和了解每个提交的用途。

3. **协作更轻松**：团队成员能够更容易地理解彼此的工作，因为每个提交消息都遵循相同的规则和结构。

## 如何使用 cz-git

遵循以下步骤来使用 `cz-git`：

### 1. 安装 cz-git

首先，使用以下命令全局安装 `cz-git`：

```
npm install -D cz-git commitizen
```

### 2. 修改 package.json 添加 config 指定使用的适配器
```json
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```
### 3. 初始化配置

在项目根目录中创建一个 `.commitlint.config.js` 文件，配置提交类型、作用域等信息。示例配置如下：

```js
// .commitlint.config.js
export default {
  rules: {},
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨  新增功能 | A new feature',
        emoji: ':sparkles:',
      },
      {
        value: 'fix',
        name: 'fix:      🐛  修复缺陷 | A bug fix',
        emoji: ':bug:',
      },
      {
        value: 'docs',
        name: 'docs:     📝  文档更新 | Documentation only changes',
        emoji: ':memo:',
      },
      {
        value: 'style',
        name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  性能提升 | A code change that improves performance',
        emoji: ':zap:',
      },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️   构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:',
      },
      {
        value: 'chore',
        name: "chore:    🔨  构建/工程依赖/工具 | Other changes that don't modify src or test files",
        emoji: ':hammer:',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  回退代码 | Reverts a previous commit',
        emoji: ':rewind:',
      },
      {
        value: 'config',
        name: 'config:   🔧  配置修改 | Reverts a previous commit',
        emoji: ':wrench:',
      },
    ],
    useEmoji: true,
    emojiAlign: 'center',
  },
}

```

更多配置请查看官网 [cz-git](https://cz-git.qbb.sh/zh/config/)

### 4. 进行提交

使用以下命令来提交代码：

```
npx cz
```

按照提示选择提交类型、作用域和消息，然后 `cz-git` 会生成适当格式的提交消息。

### 5. 查看提交历史

现在，你的提交历史将会变得更加清晰有序，每个提交都遵循相同的格式。


## 注意

- **选择适当的提交类型**：在选择提交类型时，要清楚地描述你的变更。例如，使用 "feat" 表示新功能，使用 "fix" 表示修复错误。

- **遵循规范**：严格遵循提交消息的格式，包括提交类型、作用域和消息内容。这有助于保持提交历史的一致性。

- **写明清晰的消息**：提交消息应该简洁但清晰地描述你所做的变更。避免使用模糊或不明确的语言。

- **及时提交**：尽量保持提交的频率，不要等到很多变更都堆积在一起再提交。


## 提交验证
经过上述的操作，你已经实现了`git commit` 规范提交。但是提交的代码并没有经过验证，这将造成我们提交的代码可能是错误的。
因此我们需要配置提交验证，确保代码提交无误

### 1. 安装 commitlint

```
npm install -D @commitlint/config-conventional @commitlint/cli husky lint-staged
```
### 2. 初始化配置
在 `commitlint.config.js` 文件，配置 commitlint 规则：

```js
export default {
    extends: ['@commitlint/config-conventional']    
};
```

### 3. 修改 package.json 加入以下代码

```json
{
    "scripts": {
        "prepare": "husky install" // 当执行完npm i 之后会自动执行这个命令
      },
    // 用来指定代码验证 
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
          "prettier --write",
          "eslint  --fix"
        ],
        "*.{css,less}": [
          "prettier --write",
          "stylelint --fix"
        ]
    }
}
```

### 4. 初始化 husky 方法
提交代码验证 配置

```
npx husky add .husky/pre-commit 'npx lint-staged --allow-empty'
```
提交信息验证 配置
```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

### 5. 提交代码
```
npx cz
```

在每次提交后，commitlint 会自动验证提交消息是否符合规范。如果提交消息不符合规范，将会显示错误消息并阻止提交。