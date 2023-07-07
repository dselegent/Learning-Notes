import { sidebar } from 'vuepress-theme-hope'

// 精选图标：https://theme-hope.vuejs.press/zh/guide/interface/icon.html#iconfont-%E7%B2%BE%E9%80%89%E5%9B%BE%E6%A0%87
export default sidebar({
  '/web/': [
    {
      text: '🌐 页面开发',
      children: 'structure',
    },
  ],
  '/apps/': [
    {
      text: '🧰 应用手册',
      children: 'structure',
    },
  ],
  '/professional_knowledge/': [
    {
      text: '计算机网络',
      icon: 'network',
      prefix: 'computer_network/',
      // collapsible: true,
      children: 'structure',
    },
    {
      text: '软件工程',
      icon: 'repair',
      prefix: 'software_engineer/',
      // collapsible: true,
      children: 'structure',
    },
  ],
  '/front_end/': [
    {
      text: '基础三剑客',
      icon: '',
      prefix: 'front_end_base/',
      link: '',
      children: [
        {
          text: 'html_css',
          icon: 'html',
          prefix: 'html_css/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'javascript',
          icon: 'javascript',
          prefix: 'javascript/',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
    {
      text: 'css提高',
      icon: '',
      prefix: 'css_advanced/',
      link: '',
      children: [
        {
          text: 'less',
          icon: 'css',
          prefix: 'less/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'scss',
          icon: 'css',
          prefix: 'scss/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'tailwind',
          icon: 'css',
          prefix: 'tailwind/',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
    {
      text: 'js提高',
      icon: '',
      prefix: 'js_advanced/',
      link: '',
      children: [
        {
          text: 'es6',
          icon: 'es6',
          prefix: 'es6/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'ajax',
          icon: 'ajax',
          prefix: 'ajax/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'echarts',
          icon: 'javascript',
          prefix: 'echarts/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'webpack',
          icon: 'javascript',
          prefix: 'webpack/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'typescript',
          icon: 'typescript',
          prefix: 'typescript/',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
    {
      text: '框架',
      icon: '',
      prefix: 'front_end_framework/',
      link: '',
      children: [
        {
          text: 'vue2',
          icon: 'vue',
          prefix: 'vue2/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'vue3',
          icon: 'vue',
          prefix: 'vue3/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'uniapp',
          icon: 'wechat',
          prefix: 'uniapp/',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'react',
          icon: 'react',
          prefix: 'react/',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
    {
      text: '其它',
      icon: '',
      prefix: 'other/',
      link: '',
      children: [
        {
          text: 'electron',
          icon: 'javascript',
          prefix: 'electron/',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
  ],
  '/back_end/': [
    {
      text: 'nodeJs',
      icon: 'nodeJS',
      prefix: 'nodeJs/',
      link: '',
      collapsible: true,
      children: 'structure',
    },
    {
      text: 'linux',
      icon: 'linux',
      prefix: 'linux/',
      link: '',
      collapsible: true,
      children: 'structure',
    },
    {
      text: '数据库',
      icon: '',
      prefix: 'database/',
      link: '',
      children: [
        {
          text: 'mysql',
          icon: 'mysql',
          prefix: 'mysql/',
          link: '',
          collapsible: true,
          children: 'structure',
        },
        {
          text: 'mongodb',
          icon: 'mysql',
          prefix: 'mongodb/',
          link: '',
          collapsible: true,
          children: 'structure',
        },
      ],
    },
  ],
  '/tool/': [
    {
      text: 'git',
      icon: 'git',
      prefix: 'git/',
      collapsible: true,
      children: 'structure',
    },
    {
      text: '前端代码规范化',
      icon: '',
      prefix: 'lint/',
      link: '',
      children: [
        {
          text: 'JS 代码规范',
          icon: 'javascript',
          link: '01.html',
        },
        {
          text: 'CSS 代码规范',
          icon: 'css',
          link: '02.html',
        },
        {
          text: 'Git 规范化',
          icon: 'git',
          link: '03.html',
        },
      ],
    },
    {
      text: '软件推荐与配置',
      prefix: 'efficiency/',
      children: [
        {
          text: '多平台软件',
          link: 'software/cross-platform.html',
        },
        {
          text: 'windows',
          link: 'software/windows.html',
        },
        {
          text: 'browser',
          link: 'software/browser.html',
        },
        {
          text: 'vscode',
          link: 'software/vscode.html',
        },
        {
          text: 'webstorm',
          link: 'software/webstorm.html',
        },
        {
          text: '在线工具',
          link: 'online-tools.html',
        },
        {
          text: '书签脚本',
          link: 'bookmark-scripts.html',
        },
      ],
    },
  ],
})
