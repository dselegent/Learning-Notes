---
article: false
title: 评论插件
icon: comment
order: 3
---

LearnData 使用的是 Waline 评论插件，部署简单，有后端管理。评论插件推荐次序为 Waline > Valine > giscus > Gitalk > Gitter。

## 评论插件

- [Waline](https://waline.js.org/guide/get-started.html)：基于 Valine 衍生的简洁、安全的评论系统，部署到 Vercel，可匿名互动，导出评论内容，支持文章表情互动。
- [Valine](https://github.com/xCss/Valine)：快速、简洁且高效的无后端评论系统，可匿名互动。
- [giscus](https://github.com/giscus/giscus)：基于 github discussion，近似于论坛。查看 [配置方法](https://blog.csdn.net/duninet/article/details/125280107)。
- [Gitalk](https://github.com/gitalk/gitalk)：基于 github commit，需配置独立库用于存储评论。
- [Gitter](https://gitter.im/)：要登录的公共聊天室。样例如：[boardgame](https://boardgame.io/documentation/#/)，[regauge](https://itchef.github.io/regauge/#/)。

## Waline

Waline 支持 Akismet 反垃圾评论和免注册留言，不过匿名留言会带来安全隐患，建议开启评论通知，避免极端情况。Waline 的评论通知支持多种方式，包括 QQ、微信、邮件等，回复评论作者仅支持邮件通知。

Vercel 项目中选择「Overview」>「Settings」>「Environment Variables」，然后按照 [Waline 评论通知](https://waline.js.org/guide/server/notification.html)配置所需环境变量。如果需要 Webhook 等更多通知方式，则查看 [Waline 服务端配置](https://waline.js.org/reference/server.html)。配置成功后，选择「Overview」>「Deployments」，进行 Redeploy，重新部署后环境变量和评论通知方会生效。

目前 `*.vercel.app` 域名已经被 DNS 污染，会出现「无法加载评论」，国内使用建议绑定自定义域名，域名对备案暂无硬性要求。

## Gitalk

Gitalk 是轻量化的评论组件，用户必须登录 github 才能评论，适合项目类使用。

`https://github.com/settings/developers` 页面管理已建的应用，获取 Client ID 和 Client secrets，修改应用链接。^[[超 Nice 的评论组件 —— Gitalk](https://blog.csdn.net/qq_39052513/article/details/108291272)]

将以下代码放入 docsify 页面中，即可启动 Gitalk：

```HTML
<link rel="stylesheet" href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/gitalk/1.7.2/gitalk.min.css">

<script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/docsify/4.12.2/plugins/gitalk.min.js"></script>
<script src="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/gitalk/1.7.2/gitalk.min.js"></script>
<script>
    /* 使用下面的 Javascript 代码生成 gitalk 插件 */
    const gitalk = new Gitalk({
        clientID: '2f3da234d27ed9a7c290',
        clientSecret: 'd64c45594858477fff0c234c3ed3947a53b0a9ac',
        repo: 'docsifytalk',        //仓库名称 (GitHub repo)
        owner: 'rockbenben',        //仓库拥有者 (GitHub repo owner)
        admin: ['rockbenben'],      //仓库所有者和协作者。（对此存储库具有写访问权的用户）
        // id: location.pathname,   // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    })
</script>
```

Gitalk 缺点：

- 每次有新页面时，都需要登录 github 初始化评论区。
- 域名不能改变，Homepage URL 和 Authorization callback URL 需与你的 Gitalk 页面一致，否则页面会报错，提示初始化，无法登录 github。
