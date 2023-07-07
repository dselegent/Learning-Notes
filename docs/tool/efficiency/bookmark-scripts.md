---
description: '收录一些实用的书签脚本，没想到书签还能这么玩'
---

# 书签脚本

## 回到顶部

只支持窗口滚动，不支持内联滚动

```js
javascript: void (function () {
  document.scrollingElement.scrollIntoView({ behavior: 'smooth' })
})()
```

<a href="javascript:void(function(){document.scrollingElement.scrollIntoView({behavior:'smooth'})})()">回到顶部</a>

## 显示密码

```js
javascript: void (function () {
  document.querySelectorAll('input[type=password]').forEach(function (dom) {
    dom.setAttribute('type', 'text')
  })
})()
```

<a href="javascript:void(function(){document.querySelectorAll('input[type=password]').forEach(function(dom){dom.setAttribute('type','text')})})()">显示密码</a>
