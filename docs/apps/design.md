---
article: false
title: 平面设计
icon: pic
order: 3
---

## 电子白板

在电子白板功能普及之前，我用 Figma 对海报、图片素材进行简单剪辑，制作流程图。但电子白板的美观与自由度远胜 Figma，我现在的流程图与示意图都通过 Excalidraw 与 canvas 来完成。

在电子白板功能普及之前，我使用 Figma 对海报、图片素材进行简单剪辑，制作流程图。但是，电子白板的美观和自由度远远超过 Figma，我现在的流程图和示意图都是通过 Excalidraw 和 Canvas 完成的。

### Excalidraw

[Excalidraw](https://github.com/excalidraw/excalidraw) 是一款开源免费的手绘风格画图应用，可以简单地制作美观漂亮的流程图、示意图和开发架构图等常用图片，也支持插入图片，是一款自由便捷的电子白板应用。Excalidraw 已被集成到各类白板应用中。

不过，Excalidraw 没有中文手写字体，需手动修改，比如 [Excalidraw 官方版添加中文手写字体](https://blog.csdn.net/qq_34802028/article/details/127927960)，[Obsidian 中文手写体设置](https://blog.csdn.net/qq_26176515/article/details/126005295)，[网页端中文手写字体配置](https://zhuanlan.zhihu.com/p/577420136)。

![](http://tc.seoipo.com/2023-01-23-20-53-36.png "手绘样例")

### Canvas

Canvas（画布）是所有 UI 组件的「容器」。一个场景中，可以允许多个 canvas 对象存在，也允许 canvas 之间进行「嵌套」使用。需要注意的是，场景中的任何一个 UI 对象，都必定是某个 canvas 对象的「子级」。我最常用的是 Obsidian 和秒笔的 Canvas 功能：

- Obsidian Canvas：可以将图片、视频、文本、网页、文件和 Excalidraw 聚合在一起，并建立连接线和分组。

  ![等后续替代本图](https://obsidian.md/images/canvas/canvas-hero.png "Obsidian canvas 样例")

- 秒笔白板：支持聚合图片、文本、表格、清单、看板和 Excalidraw，但根据作者回复，妙笔的连接线和分组功能会在 2023 的下半年才摆上开发计划。

## 获取页面 logo

一些页面图标路径是隐藏的，无法在前端获取，可以使用 [ImageAssistant](https://chrome.google.com/webstore/detail/imageassistant-batch-imag/dbjbempljhcmhlfpfacalomonjpalpko) 扩展提取页面所有图片，或者通过搜索引擎搜索，获取网站提交给搜索引擎的 logo 图片。

如果获取的图标较小，可以使用 [waifu2x](http://waifu2x.udp.jp/index.zh-CN.html) 进行最大降噪，然后多次放大 logo。其他放大算法会令 logo 变化，而 waifu2x 不会改变原图。

如果图标 svg 不符合要求，可以使用 [SVG-edit](https://svgedit.netlify.app/editor/index.html) 进行简单编辑。

## Eagle

Eagle 非常适合管理图片素材。其优势之一是去重，我的素材库有几十万个文件，无法一个个清理，但导入 Eagle 就可以去除重复素材。

Eagle 导入流程：搜索文件夹中的 ZIP/RAR 文件，确认全部解压。

## 字体

字体是海报的灵魂，海报主标题不要用纯黑色，建议 `#1F2937`。

以下是我常用的几种字体：

- [阿里巴巴普惠体 2.0](https://fonts.alibabagroup.com/#/font)：简称「Alibaba PuHuiTi 2.0」，免费可商用，覆盖中英文。
- [阿里妈妈数黑体](https://fonts.alibabagroup.com/#/more)：简称「Alimama ShuHeiTi」，数黑体为中文简体字库，适用于电商、广告、品牌形象、推广物料等场景。
- [思源字体](https://github.com/adobe-fonts/source-han-sans/)：简称「Source Han Sans」，这是比较规规矩矩的一款字体，谷歌出品。用在商务风 PPT，或者是用在正文中，阅读效果都很赞。
- [FOT-MatissePro](https://www.mianfeiziti.com/fonts-fotmatisseprom)：原本为 EVA 的常用日语字体，也支持大部分的繁体。
- [优设标题黑](https://www.fonts.net.cn/font-38213257557.html)：简称「YouSheBiaoTiHei-2」，以黑体字型为基础，整体字形沉稳，同时采用较大字面和粗壮的笔画来强化力量感。每个字体水平倾斜 8° 的设计，赋予了字体极强的速度感，为了让字体倾斜后也能保持稳固，设计师将整体字身设定宽扁。而起笔和弯钩上独具匠心的尖角设计，不仅突显了设计的几何感，而且方便后期修改。
- [优设好身体](https://www.fonts.net.cn/font-38877223362.html)：简称「YSHaoShenTi-2」，一款亲和力、现代感极强的专业美术标题字体。它以圆体字型为基础，通过瘦高的字面、偏向几何的曲线，让整宽字体富有亲和力和时尚感。在同样的面积里，更窄的字面就意味着能容纳更多的信息，所以这款字体非常适用在需要体现亲和力与时尚感的各类品牌宣传广告和产品包装设计的标题上。
- [851 手书体](https://www.100font.com/thread-114.htm)：851 手書き雑フォント，虽为日系字体但覆盖了大部分的中英文，是以硬笔为主的手写字型，我喜欢用在 Excalidraw。
- [濑户体](https://www.100font.com/thread-69.htm)：简称「SetoFont」，是一款偏可爱风的字体，支持简体中文、繁体中文、日文。
- [杨任东竹石体](https://www.fonts.net.cn/font-35850420097.html)：手写字体，简称为「YRDZST」。
- [得意黑字体](https://github.com/atelier-anchor/smiley-sans/releases)：非手写字体，但用在 Excalidraw 也不错。
- [锐字真言体](https://www.fonts.net.cn/font-35961736892.html)：简称「Zhenyan」，真言体笔触浑厚有力，笔画曲折有度，字形个性鲜明，刚柔并济，落笔简洁有序，给人以遒劲有力、端正凝练的感受。直角与圆角的错落搭配使得字体婉转有度，落落大方，具有自己独到的风格！这款字体特别适用于文字标题、竞技视觉、广告设计、个性品牌设计推广、企业宣传及时尚品牌的设计应用。

字体格式建议 OTC > OTF > TTC > TTF，如果只在 Windows 平台使用，TTC/TTF 体验更佳。如果您是一名设计师并进行大量的印刷设计，您可以使用 Adobe 软件进行大量工作。在这种情况下，建议使用 OTF 字体，因为 .otf 是 基于 postscript(类似于 PDF) 并由 Adobe 开发。OTF 格式还提供了更多风格的替代方案和字距调整选项，设计师可能会觉得这些 选项有用。如果您使用 MS Ofce 进行大量工作时，建议使用 TTF 字体，因为 .ttf 是由 Microsoft 和 Apple 开发的。例如：您只能将.ttf 字体嵌入到 MS Word 和 MS PowerPoint 中，而不能嵌入 .otf 字体。
