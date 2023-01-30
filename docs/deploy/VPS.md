---
article: false
title: 服务器 VPS
icon: IO
order: 2
---

## 环境部署

部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。

### 包管理安装

通过集成了 npm 的 [Node.js](https://nodejs.org/en/download/) 来安装 npm，然后执行 npm i 命令安装其他。

全局安装 yarn 是 `npm i yarn -g`，pnpm 是 `npm i pnpm -g`。如果不想全局安装，则去除 `-g`。

### 包管理源

包管理源的修改命令类似，将下方的 npm 替换 yarn 或 pnpm 即可修改包管理源。

```shell
#查看源
npm config get registry
#更换国内源
npm config set registry https://registry.npmmirror.com/
#换回默认源
npm config set registry https://registry.npmjs.org/
```

### 部署包

npm、yarn 和 pnpm 的包安装及管理命令。

```shell
#全局安装
npm i 包 -g
yarn global add 包
pnpm add 包 -g

#移除全局包
pnpm remove 包 --global
#更新全局包
pnpm upgrade 包 --global

#升级当前目录的依赖以确保你的项目只包含单个版本的相关包
#本方法能解决大部分的部署报错
npm i && npm update
yarn && yarn upgrade
pnpm i && pnpm up
```

### 本地测试

有些静态文件不支持直接打开，需要架构本地服务器来进行测试。

```shell
# 安装静态服务 anywhere
npm install anywhere -g
# 进入静态页面存放目录，执行 anywhere
anywhere -p 8081
```

## 网站字体

网站为了提高访问速度并保持设计的一致性，通常会选默认字体。这导致网站设计难以突出重点。针对这点，我通常会修改网站的导航栏字体，将其从默认字体改为 `思源黑体 - 粗`。

1. 进入 [iconfont‑webfont](https://www.iconfont.cn/webfont)，输入导航栏内所有文字，并设置所需字体。
2. 点击「生成字体」后，在选中字体的下方，点击「本地下载」。
3. 将字体包上传到服务器，修改新字体的位置参数。
4. 在导航栏的 `class` 属性中添加 `web-font`。

## 米拓

- 后台忘记密码，使用 [Metinfo 米拓重置工具](https://www.metinfo.cn/download/54.html)。
- metinfo 新版静态页会删除 index.html，后续都改用 index.php。

## 服务器 ECS

服务器系统为 Debian 11。

```shell
apt-get update   # 从数据源更新软件包的列表，运行产生软件包数据库
apt-get install wget && apt-get install sudo # 安装 wget 和 sudo

# 大版本升级必须先建立快照
apt-get upgrade  # 更新所有软件包（慎用，不要用！）之前 CentOS 系统错误就是使用了 upgrade 命令。

# 新建用户，非 root 权限
adduser xxx
# 为新用户设置密码
passwd xxx
```

### 网站重定向

更改 nginx 配置后，nginx 重载配置后实现网站重定向。`$1` 表示第一个 `()` 内的正则匹配内容，`$2` 为第二个。^[[Nginx rewrite 设置](https://www.w3cschool.cn/nginxsysc/nginxsysc-rewrite.html)]

[网站重定向](https://www.jb51.net/article/146957.htm)

```ini
#隐性链接跳转
location /xx1 {proxy_pass <https://xxx.com/;>}

#404 前，将旧文章链接格式转为新的，使用绝对路径
location ^~ /p{
    rewrite ^/p/(.*)$  https://newzone.top/posts/$1.html;
}

# huginn 设置中 location 添加 301 定向，兼容老路径链接
if ( $request_uri = "/users/1/web_requests/21/guoke.xml" ) {
rewrite ^ http://xxx.com/users/1/web_requests/19/guoke.xml permanent;
}

#只匹配主页，将主页跳转为其中一个子页面
location = / {
 rewrite https://xxx.com/ permanent;
}
```

### 全新安装服务器

1. 安装[宝塔面板](https://www.bt.cn/bbs/thread-19376-1-1.html)。
2. 删除阿里云主机监控。

   ```shell
   service aegis stop  #停止服务
   chkconfig --del aegis  # 删除服务
   ```

3. 配置[阿里云端口开放](https://www.bt.cn/bbs/thread-2897-1-1.html)，导入安全规则。
4. 宝塔上修改默认账号密码，并修改登录 22 的默认 SSH 端口。如果开通了 FTP，修改 FTP 端口。
5. 选择「网站」>「添加站点」，将站点根目录放在 /www/wwwroot/xxx，同时新建数据库。
6. 上传全站文件并解压，然后按照安装提示重新安装一次，最后导入备份数据库。
7. 404.html 起效，宝塔网站配置文件中，删除 `error_page 404 /404.html;` 中的 `#`。
8. SSL 证书设置，开启强制 HTTPS；PHP 版本；301 重定向；添加伪静态设置（metinfo 或其他网站后台有代码）。如果 301 设置失败，直接在「伪静态」配置中，放入跳转代码。
9. 服务器设置参考 [NginxConfig](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN) 适合新手配置高性能、安全、稳定的 NGINX 服务器的最简单方法。
10. [ECS 宝塔设置优化](https://www.bt.cn/bbs/forum.php?mod=viewthread&tid=3117)：

    - 添加计划任务，定期释放内存，建议设置每天释放一次，执行时机为半夜，如：04:00。
    - 打开 Linux 工具箱添加 Swap。Swap 推荐与物理内存相同。
    - 安装 PHP 缓存扩展，尽量使用更高的 PHP 版本，另外安装 opcache(脚本缓存)、redis(内容缓存)、imagemagick、fileinfo、exif。
    - Redis 优化，在/etc/sysctl.conf 中添加 `net.core.somaxconn = 2048`，然后终端运行 `sysctl -p`。

11. 防火墙白名单（自定义），如：添加 url 规则 `^/rss.php` 到防火墙 URL 白名单，防止 rss 服务被屏蔽。

### 服务器迁移

1. 购买按量付费服务器。
2. 用[服务器迁移中心 SMC](https://smc.console.aliyun.com/overview) 将旧服务器同步到临时服务器。
3. 将域名解析到临时系统，确定服务基本正常。
4. 对旧服务器先建立云盘快照，然后更换操作系统，进行全新部署。
5. 对比新旧服务器，确认配置正常。

## 常见问题

### CPU 100%

当服务器 CPU 或内存突然飙升 100% 时，依次排除当前运行进程，检查是否安装更新了插件、应用或服务。

如果找不到原因，可以临时设置定期任务。每隔 3 小时重启一次 nginx/apache。有时重启不正常，因此重启命令后 10 秒，再启动一次 nginx/apache。

```shell
/etc/init.d/nginx restart
sleep 10s
/etc/init.d/nginx start
```

### SSL 证书

如果 SSL 证书部署报错，可以按自动生成来部署。

```shell
#证书设置修改 /www/server/panel/vhost/nginx
if ($server_port !~ 443){
    rewrite ^(.*) <https://www.xxx.com$1> permanent;
}
#证书修改
/www/server/panel/vhost/cert/
#证书位置
/www/server/panel/vhost/ssl
```

### CORS 跨域

POST 表单等操作需要涉及第三方 API，需要添加扩域域名，避免 CORS 报错。

```bash
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Credentials "true";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
    add_header Access-Control-Expose-Headers "Content-Length,Content-Range";
```

### 数据库出错解决

1. mysql 配置中 `mysqld` 在一行添加 `innodb_force_recovery=4`，数值可以 0-6，数值越大对数据库损害越大。正常启动 mysql 后，备份所有数据库和管理密码，并下载到本地。
2. 在宝塔的「数据库」中删除所有数据库，卸载并重装 mysql。
3. 重新导入数据库。

### piwik 手动升级

Matomo/Piwik 是免费的统计服务。有时无法使用自动安装包，需要手动升级。

1. 下载最新版应用，并解压到服务器。
2. 将原目录中的 config/config.ini.php 粘贴到新版中，然后就可以更新数据库进行升级了。
3. 选择「设置」>「系统」>「地理位置」，拖到页面底部，按页面要求下载 DBIP 包，并重命名保存为 `/www/wwwroot/piwik/misc/DBIP-City.mmdb`。
