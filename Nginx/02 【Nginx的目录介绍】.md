# 02 【Nginx的目录介绍】

## 1.Nginx目录结构

![image-20220823111154881](https://i0.hdslb.com/bfs/album/57cc40457d8c213875d6583111e2109257b28772.png)

```css
[root@localhost ~]# tree /usr/local/nginx
/usr/local/nginx
├── client_body_temp                 # POST 大文件暂存目录
├── conf                             # Nginx所有配置文件的目录
│   ├── fastcgi.conf                 # fastcgi相关参数的配置文件
│   ├── fastcgi.conf.default         # fastcgi.conf的原始备份文件
│   ├── fastcgi_params               # fastcgi的参数文件
│   ├── fastcgi_params.default       
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types                   # 媒体类型
│   ├── mime.types.default
│   ├── nginx.conf                   #这是Nginx默认的主配置文件，日常使用和修改的文件
│   ├── nginx.conf.default
│   ├── scgi_params                  # scgi相关参数文件
│   ├── scgi_params.default  
│   ├── uwsgi_params                 # uwsgi相关参数文件
│   ├── uwsgi_params.default
│   └── win-utf
├── fastcgi_temp                     # fastcgi临时数据目录
├── html                             # Nginx默认站点目录
│   ├── 50x.html                     # 错误页面优雅替代显示文件，例如出现502错误时会调用此页面
│   └── index.html                   # 默认的首页文件
├── logs                             # Nginx日志目录
│   ├── access.log                   # 访问日志文件
│   ├── error.log                    # 错误日志文件
│   └── nginx.pid                    # pid文件，Nginx进程启动后，会把所有进程的ID号写到此文件
├── proxy_temp                       # 临时目录
├── sbin                             # Nginx 可执行文件目录
│   └── nginx                        # Nginx 二进制可执行程序
├── scgi_temp                        # 临时目录
└── uwsgi_temp                       # 临时目录
```

 其中这几个文件夹在刚安装后是没有的，主要用来存放运行过程中的临时文件  

 client_body_temp fastcgi_temp proxy_temp scgi_temp  

主要的目录是conf,html,log及sbin。

- conf目录放的是核心配置文件

- html目录放的是静态页面：

  ![image-20220823111330446](https://i0.hdslb.com/bfs/album/ec5e50565454a22fc3936d686c8db9e6b3614c6a.png)

50x.html是发生错误展示的页面，index.html是默认的访问页面。可以在该目录下新建html，然后在浏览器中访问，例如在该目录下新建hello.html，内容是hello，然后访问：http://192.168.2.100/hello.html，结果如下：

![image-20220823111448251](https://i0.hdslb.com/bfs/album/072441b83c05b441c6e65ea9ea6cc30558046b38.png)

- logs文件夹用于存放日志信息：

  ![image-20220823111537888](https://i0.hdslb.com/bfs/album/4ec467aa9577640d45e6984a8ddf48acfa144f01.png)error.log存放出错的信息，nginx.pid存放的是当前nginx的pid。

- sbin存放的是可执行文件，可以用 ./nginx启动nginx：
  ![image-20220823111610620](https://i0.hdslb.com/bfs/album/f1cd96779b4385b914546be89e536760af268bb7.png)

## 2.Nginx基本运行原理

![image-20220823111631721](https://i0.hdslb.com/bfs/album/f671dc8a00f96433f9fe6f5cd114bdffb308dd0a.png)

Nginx的进程是使用经典的「Master-Worker」模型,Nginx在启动后，会有一个master进程和多个worker进程。master进程主要用来管理worker进程，包含：接收来自外界的信号，向各worker进程发送信号，监控worker进程的运行状态，当worker进程退出后(异常情况下)，会自动重新启动新的worker进程。worker进程主要处理基本的网络事件，多个worker进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。一个请求，只可能在一个worker进程中处理，一个worker进程，不可能处理其它进程的请求。worker进程的个数是可以设置的，一般会设置与机器cpu核数一致，这里面的原因与nginx的进程模型以及事件处理模型是分不开的。

## 3.Nginx的基本配置文件

Nginx的默认配置文件是nginx.conf

![image-20220823111744359](https://i0.hdslb.com/bfs/album/85b68ea2b37b92714f7da30e775b809492776c25.png)

> 有一个文件是`nginx.conf.default`，那个就是`nginx.conf`初始内容，出了问题可以对照着找问题。

`nginx.cong`去掉注释的简单版如下：

```php
worker_processes  1; #允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个

events {
    #单个进程最大连接数（最大连接数=连接数*进程数）
    #根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。
    worker_connections  1024;
}


http {
    #文件扩展名与文件类型映射表(是conf目录下的一个文件)
    include       mime.types;
    #默认文件类型，如果mime.types预先定义的类型没匹配上，默认使用二进制流的方式传输
    default_type  application/octet-stream;

    #sendfile指令指定nginx是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度。
    sendfile        on;
    
     #长连接超时时间，单位是秒
    keepalive_timeout  65;

 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  localhost;

	#配置根目录以及默认页面
        location / { 
            # 文件根目录(这里是以nginx文件夹为根目录)
            root   html;
            #默认页名称
            index  index.html index.htm;
        }

	#出错页面配置
        error_page   500 502 503 504  /50x.html;
        #/50x.html文件所在位置
        location = /50x.html {
            root   html;
        }
        
    }

}
```

- **worker_processes** 

worker_processes 1; 默认为1，表示开启一个业务进程 

- **worker_connections** 

worker_connections 1024; 单个业务进程可接受连接数 

- **include mime.types;**

 include mime.types; 引入http mime类型 

- **default_type application/octet-stream;** 

default_type application/octet-stream; 如果mime类型没匹配上，默认使用二进制流的方式传输。 

- **sendfile on;** 

sendfile on; 使用linux的 sendfile(socket, file, len) 高效网络传输，也就是数据0拷贝。
未开启sendfile  

![image-20220823112052472](https://i0.hdslb.com/bfs/album/274b7fd11c8a1c8575db88bb5a6abfa9c64a4033.png)

开启后

![image-20220823112108345](https://i0.hdslb.com/bfs/album/77dc6e6b39146a41451d078ecc49d8868c636c5b.png)

- **keepalive_timeout 65;** 

keepalive_timeout 65;  ，保持连接，超时时间。

-  **server**  

![image-20220823112140071](https://i0.hdslb.com/bfs/album/963758ee4a7f1a66285342f481dbd5dd429a4193.png)