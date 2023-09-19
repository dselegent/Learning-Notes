# 04 【Nginx反向代理和负载均衡】

## 1.反向代理和正向代理

### 1.1 反向代理

描述:反向代理是指以代理服务器来接受连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器,而且整个过程对于客户端而言是透明的。 

![image-20220823114417662](https://i0.hdslb.com/bfs/album/c960d7a924ce20ef449e4a480f40039a5dc3470a.png)

### 1.2 正向代理

描述:正向代理意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后由代理向原始服务器转交请求并将获得的内容返回给客户端。

简单的说类似于采用VPN来访问google: 

![image-20220823114523751](https://i0.hdslb.com/bfs/album/35c72461d0838b70010f3d9c31fe78ee73684540.png)

区别正向代理、反向

都是站在客户端的角度，看代理服务器是帮客户端代理，还是帮服务端代理

## 2. 使用proyx_pass进行代理配置

浏览器访问`虚拟机ip(比如：http://test1.dselegent.icu/)`就会跳转到 http://www.bilibili.com，同时域名没有变化（不支持https）

```bash
    server {
        listen 80;
        server_name test1.dselegent.icu;
        location / 
        {
          proxy_pass http://www.bilibili.com;
        }
      }
```

## 3.负载均衡

描述：负载均衡也是Nginx常用的一个功能。简单而言就是当有2台或以上服务器时，根据规则随机的将请求分发到指定的服务器上处理，负载均衡配置一般都需要同时配置反向代理，通过反向代理跳转到负载均衡。 

而Nginx目前支持自带3种负载均衡策略还有2种常用的第三方策略。

![image-20220824135958921](https://i0.hdslb.com/bfs/album/f4b9b827c7a66b7bd319dc24efd72d5d0346f730.png)

## 4.基于反向代理的负载均衡器

克隆两个centos，ip分别设为192.168.8.102，192.168.8.103（网段要用自己的电脑对应）

修改静态ip
![image-20220824140153742](https://i0.hdslb.com/bfs/album/b074f86a0c33f16da00936356ae2dd314e15b3f3.png)

![image-20220824140209449](https://i0.hdslb.com/bfs/album/30e432cc5e27ece10e1319b24def17438f4f1026.png)

重启网络服务：

![image-20220824140220392](https://i0.hdslb.com/bfs/album/22294ca6230dab49a07ec4cff5b3b39d4ce7e0a8.png)

另一个虚拟机的配置也是一样。配置好虚拟机之后,配置nginx.conf

102的nginx.cfg

```bash
worker_processes  1;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```

102的nginx在html目录下的index.html文件

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>I am from 192.168.8.102</h1>
</body>
</html>
```

103的nginx.cfg

```bash
worker_processes  1;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```

103的nginx在html目录下的index.html文件

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>I am from 192.168.8.103</h1>
</body>
</html>
```

测试：

访问http://192.168.8.102/

![image-20220824140501399](https://i0.hdslb.com/bfs/album/3bc27ac96469708c2cd33362c45f53c8cc8329f1.png)

访问http://192.168.8.103/

![image-20220824140511723](https://i0.hdslb.com/bfs/album/847e3e7f919a7c51622554de72ece6d4f2af705f.png)

将101代理到102

101的nginx.conf

```bash
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
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://192.168.8.102;
            # root   /www/test80;
            # index  index.html index.htm;
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

测试，访问192.168.8.101

![image-20220824140622198](https://i0.hdslb.com/bfs/album/cf7cd82487140f336cc196885849d86f7c64a57b.png)

配置101的负载均衡（轮询模式）

![image-20220824140640967](https://i0.hdslb.com/bfs/album/5693aef31d3a7ea62affdecc85435a07f7dbfbc4.png)

```bash
...
http {

#定义一组服务器
upstream httpds{
    server 192.168.8.102:80;
    server 192.168.8.103:80;
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

测试：

多次访问http://192.168.8.101/发现102和103被交替访问

![image-20220824140744772](https://i0.hdslb.com/bfs/album/2b97db7b7aacff421dbc7684fe8d77481d2ca614.png)

![image-20220824140751527](https://i0.hdslb.com/bfs/album/73c8d4dafe303213d5e90285e8a9ef9c757e6379.png)

## 5.负载均衡策略和调度算法

**负载均衡策略**

- weight：权重

- down : 当前server暂不参与负载均衡
- backup : 预留的备份服务器； 其它所有的非backup机器down或者忙的时候，请求backup机器。  
- max_fails : 请求失败次数限制
- fail_timeout : 经过max_fails后服务暂停时间
- max_conns : 限制最大的连接数 

**负载均衡调度算法**

- 轮询:默认算法按时间顺序逐一分配到不同的后端服务器;
- 加权轮询:Weight值越大，分配到访问几率越高;

**其他负载调度算法（不常用）**

- ip_hash
  根据客户端的ip地址转发同一台服务器，可以保持会话，但是很少用这种方式去保持会话，例如我们当前正在使用wifi访问，当切换成手机信号访问时，会话就不保持了。
- least_conn
  最少连接访问，优先访问连接最少的那一台服务器，这种方式也很少使用，因为连接少，可能是由于该服务器配置较低，刚开始赋予的权重较低。
- url_hash（需要第三方插件）
  根据用户访问的url定向转发请求，不同的url转发到不同的服务器进行处理（定向流量转发）。
- fair（需要第三方插件）
  根据后端服务器响应时间转发请求，这种方式也很少使用，因为容易造成流量倾斜，给某一台服务器压垮。

方式1: 轮询

RR（默认轮询）每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉能自动剔除。

```bash

http {

#定义一组服务器
upstream httpds{
    server 192.168.8.102 weight=10;
    server 192.168.8.103 weight=1;
    # server 192.168.8.102 weight=10 down; #down表示不参与负载均衡
    # server 192.168.8.102 weight=10 backup; #backup表示是备用服务器，没有服务器可用的时候使用
}

 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
            # root   /www/test80;
            # index  index.html index.htm;
        }
        
    }
    
}
```

测试：

多次访问http://192.168.8.101/发现102访问的次数多余103访问的次数。

方式2：权重

权重指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。 例如

```bash
...
http {

#定义一组服务器
upstream httpds{
    server 192.168.8.102:80 weight=1;
    server 192.168.8.103:80 weight=9;  #那么10次一般只会有1次会访问到8081，而有9次会访问到8080
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

方式3: ip_hash

ip_hash 会话粘连, 上面的2种方式都有一个问题，那就是下一个请求来的时候请求可能分发到另外一个服务器，当我们的程序不是无状态的时候（采用了session保存数据），这时候就有一个很大的很问题了，比如把登录信息保存到了session中，那么跳转到另外一台服务器的时候就需要重新登录了，所以很多时候我们需要一个客户只访问一个服务器，那么就需要用iphash了，iphash的每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。 

```bash
...
http {

#定义一组服务器
upstream httpds{
 	ip_hash;
    server 192.168.8.102:80;
    server 192.168.8.103:80;
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

**根据客户端的ip地址转发同一台服务器，可以保持会话，但是很少用这种方式去保持会话，例如我们当前正在使用wifi访问，当切换成手机信号访问时，会话就不保持了。**

方式4：fair

fair（需要第三方插件）按后端服务器 的响应时间来分配请求，响应时间短的优先分配。 

```bash
...
http {

#定义一组服务器
upstream httpds{
 	fail;
    server 192.168.8.102:80;
    server 192.168.8.103:80;
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

**根据后端服务器响应时间转发请求，这种方式也很少使用，因为容易造成流量倾斜，给某一台服务器压垮。**

方式5：least_conn

描述: 将请求分配到连接数最少的服务上。 

```bash
...
http {

#定义一组服务器
upstream httpds{
 	least_conn;
    server 192.168.8.102:80;
    server 192.168.8.103:80;
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  test80.xzj520520.cn;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

**最少连接访问，优先访问连接最少的那一台服务器，这种方式也很少使用，因为连接少，可能是由于该服务器配置较低，刚开始赋予的权重较低。**

可以根据实际情况选择使用哪种策略模式,不过fair和url_hash需要安装第三方模块才能使用. 

