// commitlint.config.ts
import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  prompt: {
    messages: {},
    questions: {
      type: {
        description: '选择一个你正在提交的类型:',
        enum: {
          feat: {
            description: '提交新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '修复了 bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '只修改了文档',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              '调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '代码重构，既没修复 bug 也没有添加新功能',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '性能优化，提高性能的代码更改',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加或修改代码测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              '对构建流程或辅助工具和依赖库的更改 （比如: gulp，broccoli，npm）',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              '对 CI 配置文件和脚本的更改（比如：Travis、Circle、BrowserStack、SauceLabs）',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '不修改 src 或测试文件的其他更改',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '恢复到之前的提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: '本次更改的范围是什么（比如组件或文件名）',
      },
      subject: {
        description: '写一个简短的消息来描述变化',
      },
      body: {
        description: '提供更详细的变化说明',
      },
      isBreaking: {
        description: '是否有破坏性更新？',
      },
      breakingBody: {
        description:
          '一次 BREAKING CHANGE 提交需要一个主体。 请输入对提交更长的描述',
      },
      breaking: {
        description: '描述本次的破坏性更新的部分',
      },
      isIssueAffected: {
        description: '本次修改是否会影响任何开放的 issues？',
      },
      issuesBody: {
        description:
          '如果 issues 已关闭，则提交需要一个主体。 请输入对提交本身的更长描述',
      },
      issues: {
        description: '添加 issue references (比如 "fix #123", "re #123".)',
      },
    },
  },
}

module.exports = Configuration
