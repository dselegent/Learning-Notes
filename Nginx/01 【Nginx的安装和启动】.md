# 01 【Nginx的安装和启动】

## 1.Nginx的介绍

Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了 IMAP/POP3/SMTP服务。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的 Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004 年10月4日。 

其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、简单的配 置文件和低系统资源的消耗而闻名。2011年6月1日，nginx 1.0.4发布。 Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3） 代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实 上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx网站 用户有：百度、京东、新浪、网易、腾讯、淘宝等。

## 2.版本区别  

 常用版本分为四大阵营 

[Nginx开源版](http://nginx.org/) 				http://nginx.org/ 

[Nginx plus 商业版](https://www.nginx.com) 			https://www.nginx.com 

[openresty](http://openresty.org/cn/) 				http://openresty.org/cn/ 

[Tengine ](http://tengine.taobao.org/)					http://tengine.taobao.org/  



## 3.Centos安装

链接: https://pan.baidu.com/s/15KT0845iAEiEz6-NTYUNiA?pwd=qn7d 提取码: qn7d 

**安装完后需要配置静态ip**

1. 修改配置网卡配置文件
   `vi /etc/sysconfig/network-scripts/ifcfg-ens33`
   ![image-20220815204909611](https://i0.hdslb.com/bfs/album/a414c7903674fcdaf58a3f3e8ab13725f9a4b2ae.png)
   ![image-20220815204852826](https://i0.hdslb.com/bfs/album/46b13351b7f4804b7dd921392fe0114aedd6685d.png)

   ​		一些公网DNS服务器

   ```tex
   #阿里
   223.5.5.5
   223.6.6.6
   #腾讯
   119.29.29.29
   182.254.118.118
   #百度
   180.76.76.76
   #114 DNS
   114.114.114.114
   114.114.115.115
   #谷歌
   8.8.8.8
   8.8.4.4
   ```

2. 重启网络服务

   ````bash
   三种方法
   1.service network restart
   2.systemctl restart network
   下面这时Centos8的方法
   3.nmcli c reload 
   nmcli c up ens160
   ````

3. 然后使用`ifconfig`或者`ip addr`来查看是否修改成功

## 4.Nginx开源版安装

将安装包`nginx-1.21.6.tar.gz`放到linux操作系统用户根目录下，使用tar zxvf安装，命令：`tar zxvf nginx-1.21.6.tar.gz`  。

**然后进入到nginx安装文件夹目录**

![image-20220823105625223](https://i0.hdslb.com/bfs/album/0cf632323f5aff6c2c9b24954b64470fcf62c2a0.png)

安装指令：

```css
 ./configure --prefix=/usr/local/nginx
```

安装到`usr/local/nginx`路径下

安装成功页面

![image-20220823105715862](https://i0.hdslb.com/bfs/album/fc186b1f589af06a28f218ce03d6fe77be8e0710.png)

**但遇到报错，需要安装以下环境**  

安装Nginx需要C语言编译器等。。

 安装 `gcc yum install -y gcc`

 安装perl库 `yum install -y pcre pcre-devel  `

 安装zlib库 `yum install -y zlib zlib-devel  `

 接下来依次执行 

```css
make
make install
```

**查看 /usr/local目录，确定安装成功**

![image-20220823105922400](https://i0.hdslb.com/bfs/album/f35e5c909f51bb8de5ee12e837f6dd9236510cdf.png)

## 5.启动Nginx

**放行Nginx，端口号：80**

```bash
 firewall-cmd --zone=public --add-port=80/tcp --permanent
```

**重启防火墙**

```bash
 firewall-cmd --reload  
```

> **CentOS 7.0默认使用的是firewall作为防火墙**
>
> 1. 查看防火墙状态
>
>    firewall-cmd --state
>
> 2. 停止firewall
>
>    systemctl stop firewalld.service
>
> 3. 禁止firewall开机启动
>
>    systemctl disable firewalld.service
>
> 4. 放行端口
>
>    firewall-cmd --zone=public --add-port=80/tcp --permanent
>
> 5. 重启防火墙
>
>    firewall-cmd --reload

 **然后进入安装好的目录 `/usr/local/nginx/sbin  `**

```bash
./nginx					    ## 启动
./nginx -s stop			 	#快速停止
./nginx -s quit 			#优雅关闭，在退出前完成已经接受的连接请求
./nginx -s reload 			#重新加载配置
```

**启动Nginx  `./nginx`**

**访问服务器ip**

![image-20220823110253824](https://i0.hdslb.com/bfs/album/51b9498b820979d41768cd430e6738d4a0bbdfab.png)

## 6.安装成系统服务，开机自启

在如下位置创建服务脚本nginx.service

`vi /usr/lib/systemd/system/nginx.service `

服务脚本内容如下(注意路径要对应，这里的路径是/usr/local/nginx/sbin)：

```css
[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

 重新加载系统服务 

```css
systemctl daemon-reload  
```

使用系统启动服务之前，建议先把之前启动的关闭，否则可能有冲突

在`/usr/local/nginx/sbin`目录下

```css
./nginx -s stop
```

 启动服务 

```css
systemctl start nginx.service  
```

![image-20220823110653960](https://i0.hdslb.com/bfs/album/60dc9a06c5f8c439ca2f8c8015300192c972571c.png)

重新启动nginx服务

```css
systemctl reload nginx
```

开机启动

```css
systemctl enable nginx.service
```

测试，访问http://192.168.2.100：