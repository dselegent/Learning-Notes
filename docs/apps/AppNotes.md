---
article: false
title: 工具笔记
icon: plugin
order: 4
---

## 小工具

> 收集稀奇古怪的小工具

- [Animated Drawings – 自动将绘画转换为动画](https://www.appinn.com/animated-drawings/)

## Power Automate

[Power Automate](https://sspai.com/series/273/list) 自动化应用，分为桌面流和[云端流](https://make.powerautomate.com/)，上手比 Quikcer 复杂，网页自动化弱于 UI. Vision RPA，适合在 Window 不同应用间切换的自动化流。**对于免费用户来说，Power Automate 都得手动执行流，个人账户与组织账户无明显区别。**

**桌面流**本身并没有触发器，因此只能手动执行。付费的组织账户可以自动执行桌面流，比如：云端流调用桌面流，[通过 URL 运行桌面流](https://docs.microsoft.com/zh-cn/power-automate/desktop-flows/run-pad-flow#run-desktop-flows-via-url)。Power Automate 安装有商店版和 [exe 应用](https://learn.microsoft.com/en-us/power-automate/desktop-flows/install)两种方式，各自有些 Bug。

**云端流**可以自动、即时或通过计划触发自动化。登录云端流时，一开始要求用工作账户登录，但后来我开通了 [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)，就可以用个人账户，暂不清楚是否有因果关系。^[[注册免费 Teams 经典](https://support.microsoft.com/zh-cn/office/%E6%B3%A8%E5%86%8C%E5%85%8D%E8%B4%B9teams%E7%BB%8F%E5%85%B8-70aaf044-b872-4c32-ac47-362ab29ebbb1)]

与个人账户相比，组织账户仅仅多了一些按钮和试用提示，并没有明显区别。简单来说，组织账户有付费的权利，其他功能都相同。

### 使用技巧

- 遇到捕获了元素但执行时却报错的情况，可以尝试自带的记录器。它比手动选择元素要死板，钉死了要点击的元素，但能确保执行成功率。

- 使用「循环」和「等待」实现半自动执行工作流。如果某些条件并不清晰，可通过第三方网页来设置条件，如特殊网页设置的特殊文本。^[[Power Automate Desktop 免费 RPA 实现定时启动或按照频率运行自动化流的三种办法](https://www.bilibili.com/video/BV1ki4y1S7AZ/?vd_source=9ab57d83a938c90a4fc9691b299cb2af)]

### 报错重置

如果遇到程序自身的报错，点击「设置」>「应用」>「应用和功能」中找到 Power Automate Desktop 应用，并点击「重置」后试试看。

### 创建 Microsoft 组织账户

微软的众多服务都需要组织账户，个人账号经常被拒绝登录。而创建微软组织账户最简单的方法是注册为[微软合作伙伴](https://partner.microsoft.com/zh-cn/)。

1. [加入 Microsoft 合作伙伴网络](https://partner.microsoft.com/zh-cn/membership)。
2. 进入后会问「你希望如何与 Microsoft 合作」，安全起见我选择「合作伙伴」，进入下一页后点「创作工作账户」。
3. 账户信息除手机和备用邮件外可以随便填，通过手机验证码后，点「继续」，然后等几分钟，就会收到注册成功通知，你也成为有组织的人了。

如果你有 Azure 账户，可以直接在 Azure 中[为组织创建新的租户](https://docs.microsoft.com/zh-cn/azure/active-directory/fundamentals/active-directory-access-create-new-tenant#create-a-new-tenant-for-your-organization)。

### 管理组织用户

若要给其他人多添加几个账号，则可以通过 [Azure](https://portal.azure.com/) 来管理。

进入「管理 Azure Active Directory」>「用户」，添加和管理组织用户。

## 阿里云盘

阿里云盘不能用压缩包分享。更新文件夹时，可先上传新版文件夹，然后将内部文件移动覆盖，如此只会更新更改的文件，同时避免相同文件重命名。

## 双链笔记

@KurokoZ 个人认为双链笔记的核心不是一个单纯跳转的链接，而是在于“引用”和思路的延续性。举几个场景：
一、待办清单和随笔记
待办清单是一个时序化的任务 list，一个任务可能来自一次会议记录、老板临时的发言、一个产品调研 等等，每一个任务背后的原始文档可以很复杂，但任务本身可以记录的很简洁，特别是多线程的任务处理，这样的溯源非常有用，最近同时跟 4 个项目，深有体会；Obsidian 的 MD 语法支持很美观的待办清单，很舒服。
二、书籍之间的联系
很多书中，作者会推荐其他的书，那么就可以在记录读书笔记的时候，直接创建对这些推荐书的引用（得益于 obsidian 的基于引用自动创建文件，而不是只能引用现有文档），又或者一个作者有很多著作、有博客、有公众号，那么就可以给这个作者建一个单独的文档作为主页，其他著作的笔记、博客的摘录都是单独的文档，形成完整体系。
三、跨软件，非 URL 的场景
我的大量 PDF 文档管理在 DEVONThink，obsidian 的链接语法支持直接引用到 DEVONThink 中的文档，需要是可直接通过 OB 激活 DT 快速打开目标文档

## Logseq

与 Obsidian 相比，Logseq 罗列内容更方便。Logseq 将所有行都视为节点，因此非常轻松将所需的子节点整合在一个页面，实现关键信息聚合。

Logseq 的日记非常强大，也可以自动套用指定模板。^[[How to Set Up an Automated Daily Template in Logseq](https://thinkstack.club/how-to-set-up-an-automated-daily-template-in-logseq/)] 但其他笔记需要手动启用模板，修改 .env 的设置 `{:week "journals"}` 被报错。继续尝试设计周记、月报的模板。

Logseq 劣势，所有页面建立在 pages 下，但可以手动修改位置。双链笔记有个特点，只要名称不变，文档位置更改也不会影响引用。

Logseq 更改页面标题，会同步更改所有标签名。

我会把远期不安排的任务，往 later 清单中放，随时可以查看提醒，但又不需要每天重复调整时间。

主题：Dracula

### 快速使用

- `[[]]` 可快速新建页面，`All pages` 中可删除空页面
- 打开右上角的「侧边栏」，使用目录管理主页面
- 将页面中内容汇总起来，比如「心理学」标签页面显示所有心理学
- 任务时，使用 later 或 now，切换后改变状态，会记录任务持续时间。
  - 如果使用 `doing` 或者 `now` 命令，它会更显眼地出现在每天日志的下方（如红框所示），以防当天记录的东西过多，或者到了第二天生成了新的日志后被忽略。**直到你将它完成为止，它才会消失**，算是一种强提醒。
- PDF 文档的标注管理一直是个大难题，而用 Logseq 后方便许多，能将注释与标签、笔记、截图统合在一起。
- TOC Generator 插件生成目录：`{{renderer :tocgen}}`。
- `shift+左键` 将新页面打开在**右侧边栏**中。
- 忽略指定文件夹？

### query

[query](https://www.bilibili.com/video/BV1eq4y1N7Su) 能按条件精准地找到结果，并动态更新在页面中，公式参考[官方文档](https://docs.logseq.com/#/page/queries)。

首先，在文本后方添加 tag，比如

```jsx
idea 1 #idea
find #research
```

接着，使用 query 命令寻找对应结果

```jsx
* and 命令
{{query (and [[research]] [[idea]])}}
{{query (and (task now later done) [[page]])}}

* or 命令
{{query (or [[page 1]] [[page 2]])}}

* not 命令
{{query (not [[page 1]] [[page 2]])}}

* 罗列为 Later 的 task
{{query (task later)}}

* 一周内的日记，且包含关键词或标签
{{query(and (between -6d today)  "#幸福")}}
```

## Obisidian

- [Obsidian 新手系列之你不可不知的插件](https://sspai.com/post/67619)

- [每日笔记、日程管理、工作复盘——这是我钻研出的 Obsidian 八般武艺](https://sspai.com/post/72385)

暂时放弃 Obisidian，虽然能按条件罗列页面，但没有 Logseq 方便。**如果后续要继续用，则尝试将日记分为 3 份，然后用 Dataview 整合在一起，在上面进行修改**。

Obsidian 更习惯记录，日常 Task 由滴答管理，中期且不急的任务则由 Trello 管理。自带的看板功能需要建立笔记，不如 Trello 方便。

Day Planer 有 sm18 的 Plan 功能。

部分插件不能自动更新，需要手动下载插件文件，然后粘贴到 `.obsidian/plugins` 对应文件夹内。

### Dataview

[Dataview](https://blacksmithgu.github.io/obsidian-dataview/query/queries/) 功能更强大，不过用法也复杂许多。

```bash
# journals 文本下所有
dv.list(dv.pages('"journals"').file.lists.text)


# 指定区域不为空
.where(t => t!="")

# 包含指定文字
.where(t => t.includes("Logseq"))
```

### Obsidian Query Language

[Obsidian Query Language](https://github.com/jplattel/obsidian-query-language) 能使用 Query 语言，将符合条件的文件整合到一页。

但整合出的是链接，并非如 Logseq 一样显示文件内容。想想有没办法，显示文件内容。

下列代码会抓取，journals 文件夹中包含「今日工作」或「xxxxxxx」的文件。

```oql
name: 'OR combination list of results'
query: { $and: [{ "path": "'journals/"}, { $or: [{ "content": "'今日工作" }, { "content": "'xxxxxxx" }] }]}
template: "list"
badge: true
debug: true
sort: "title"
```

### Easy Typing

这是一个 Obsidian 的书写体验增强插件，自动格式化书写，比如自动在中英文之间添加空格，英文首字母大写，标点与文本间智能空格。

不过双拼容易出错，需要开启「行模式」。

## flomo

```bash
#日记
#输入/播客、电影和读书
#输出/工作、生活和好物
#选题
```

- Inbox（收件箱）：我会将所有临时性的，还未消化的内容放置于此，定期来进行归档、整理或者删除。可以当做大脑的缓存，避免记录的时候纠结放在哪里。
- Area（领域）：**日常你需要精进的「领域」**，比如健康就是一个领域，而跑步则是项目；写作是一个领域，而写一篇公众号文章则是一个项目。
- Project（项目）：是指一个将要发生的独立事件，并且这个事件不是一次性就能完成的，至少需要多个动作才能完成。比如要写一本书，需要整理资料，罗列提纲，撰写内容，联系出版社。类似生活中还有组织一次旅游，录制一期播客等。在执行项目的相关资料
- Resource（资源）：永久笔记，一般来说是兴趣、主题、资产等内容。注意是自己消化过的内容，而非机械的收藏。
- Marketplace 是最重要研究的领域
- Sheep、Books 是最重要的资源（Sheep 是指人物，即羔羊）
- 三醒吾身：日记

## TheBrain

TheBrain 可以把知识无限扩充，都连接在一起。但将工作流导图放入 TheBrain 后发现并不合适，比较适合更细化的内容？

- [善用佳软张玉新老师 · TheBrain ≠ 思维导图——运用 TheBrain 的三个阶段](https://www.bilibili.com/video/BV19a411578T)

## Zinc

[Zinc](https://github.com/zinclabs/zinc) 是一个进行全文索引的搜索引擎。它是 Elasticsearch 的轻量级替代品，运行在不到 100 MB 的 RAM 中。它使用 bluge 作为底层索引库。^[[搜索引擎漫谈以及 Zinc 简介](https://blog.csdn.net/zhangxin09/article/details/125080763)]

原本想对 Windows 本地盘进行搜索，但应该只支持 json 处理过后的索引库，不能对本地硬盘进行索引。

### Zinc 初次启动

1. 点击「系统属性」>「高级」>「环境变量」>「用户变量」，新建变量 `ZINC_FIRST_ADMIN_USER` 和 `ZINC_FIRST_ADMIN_PASSWORD`。这是后面要用到的账户密码，可自由设置，但密码需要包含大小写字母，

2. 在应用目录下打开终端，执行命令：

```shell
mkdir data
.\zinc.exe
```

成功执行后，打开 `http://localhost:4080/`，就能看到图形化界面了。

### 全文索引-Bluge

启动 Zinc，但需要有 Bluge 索引数据库，才能进行全文搜索。

[Bluge](https://github.com/blugelabs/bluge) 是基于 GO 的索引/搜索库，使用简单，有如基于磁盘和内存的索引功能。

如果启动过程中报错，`ZINC_FIRST_ADMIN_USER and ZINC_FIRST_ADMIN_PASSWORD must be set on first start. You should also change the credentials after first login.`，可能是没有配置好环境变量，或是没有以管理员身份运行终端（win+X，A）所导致的。
