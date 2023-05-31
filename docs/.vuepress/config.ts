import { defineUserConfig } from 'vuepress'
// import { webpackBundler } from "@vuepress/bundler-webpack";
// import { defineUserConfig } from "@vuepress/cli";
// import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { sitemapPlugin } from 'vuepress-plugin-sitemap2'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { path } from '@vuepress/utils'
import theme from './theme'

export default defineUserConfig({
  // 网站语言，默认为中文
  lang: 'zh-CN',
  // 网站标题
  title: 'dselegent-blog',
  // 网站描述
  description: '开源工具、效率方法的自我提升笔记，记录并输出一切能让自己提升的知识。',

  // 网站路径默认为主域名。如果网站部署在子路径下，比如 xxx.com/yyy，那么 base 应该被设置为 "/yyy/"
  base: '/',
  head: [['meta', { name: 'referrer', content: 'no-referrer' }]],
  theme,
  // 是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: false,

  // 修改页面模板，https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/theme/templates/index.build.html
  // 配置参考：https://vuepress.github.io/zh/reference/theme-api.html#templatebuild
  templateBuild: path.resolve(__dirname, 'templateBuild.html'),

  // 禁止文件夹生成静态文件，参考 [VuePress 文档]（https://v2.vuepress.vuejs.org/zh/guide/page.html#routing）
  pagePatterns: ['**/*.md', '!_temp', '!reading', '!.vuepress', '!node_modules'],

  plugins: [
    // algolia 全文搜索：没设置爬虫的话，需删除 docsearchPlugin 区块以使用节点搜索
    // docsearchPlugin({
    //   indexName: 'newzone',
    //   appId: 'M4EXXEZIEG',
    //   apiKey: 'fd8891a9c4cc21e0ef4f11bf44f7a11e',
    // }),
    docsearchPlugin({
      appId: 'B1SZXOAN50',
      apiKey: '3068368ebb2ca88821ae37fa2b2813a0',
      indexName: 'dselegent',
      placeholder: '搜索文档',
      translations: { button: { buttonText: '搜索文档' } },
    }),
    sitemapPlugin({
      hostname: 'https://blog.dselegent.icu',
    }),
    // 本地搜索，删除上方 docsearchPlugin 区块后生效
    // searchProPlugin({
    //   indexContent: true,
    //   hotReload: true,
    //   customFields: [
    //     {
    //       getter: ({ frontmatter }) => frontmatter.tag as string[],
    //       formatter: `Tag: $content`,
    //     },
    //   ],
    // }),
    // 谷歌分析 ID
    googleAnalyticsPlugin({
      id: 'G-RWKZTY2P9R',
    }),
  ],
})
