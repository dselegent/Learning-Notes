---
article: false
title: 域名 DNS 托管
icon: sitemap
order: 5
---

国内访问为主的话，域名建议备案后托管在国内厂商。之前试过 Cloudflare，光域名解析就用了 500 ms，换回阿里云后速度稳定许多。

- DNS 迁移是在域名管理商处修改。比如我的域名是在阿里云购买，试过 DNS 迁移到 Cloudflare，之后再次迁移 DNS，需要回到阿里云操作。
- 如果阿里云的安全验证一直被卡住，可以换个浏览器，比如 Firefox。
- 子域名可以使用 [NS 记录](https://help.aliyun.com/document_detail/29725.html?#h2-ns-7)，托管到其他域名服务商。但 Cloudflare 不支持单独子域名托管。

域名 DNS 服务器修改（阿里云）：<https://help.aliyun.com/document_detail/121648.html>
