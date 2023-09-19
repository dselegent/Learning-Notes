# 05 【动静分离和URLRewrite】

## 1.动静分离介绍

为了提高网站的响应速度，减轻程序服务器（Tomcat，Jboss等）的负载，对于静态资源，如图片、js、css等文件，可以在反向代理服务器中进行缓存，这样浏览器在请求一个静态资源时，代理服务器就可以直接处理，而不用将请求转发给后端服务器。对于用户请求的动态文件，如servlet、jsp，则转发给Tomcat，Jboss服务器处理，这就是动静分离。即动态文件与静态文件的分离。

![image-20220824142500093](https://i0.hdslb.com/bfs/album/167fbf56a59aca4f13e68def389887eeb0bd8e6e.png)

动静分离可通过location对请求url进行匹配，将网站静态资源（HTML，JavaScript，CSS，img等文件）与后台应用分开部署，提高用户访问静态代码的速度，降低对后台应用访问。通常将静态资源放到nginx中，动态资源转发到tomcat服务器中。

## 2.Nginx动静分离配置

动静分离是让动态网站里的动态网页根据一定规则把不变的资源和经常变的资源区分开来，动静资源做好了拆分以后，我们就可以根据静态资源的特点将其做缓存操作，这就是网站静态化处理的核心思路; 

在102这台服务器中的nginx的html目录中放入这样的资源

![image-20220824153311942](https://i0.hdslb.com/bfs/album/8b18138dc7651795656fb9678a4c39b76de3bf7e.png)

其中路径引入的方式需要以根路径的方式引入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/css/index.css" />
    <script src="/js/index.js"></script>
  </head>
  <body>
    <img src="/img/ds.jpg" />
    <p>我是ds</p>
  </body>
</html>
```

访问：http://192.168.8.102是可以正常看到页面的

![image-20220824153541909](https://i0.hdslb.com/bfs/album/ceed5dd68b85950afa563ee33e270700994510aa.png)

我们的101服务器是使用了nginx的，每次访问这些资源都被代理了一次，但其实这些资源是不需要被改变的，这样很浪费性能，所以我们把这些静态资源放在nginx服务器上。

先删除102服务器的静态资源，然后把这些静态资源文件夹移到101的nginx的html目录中

修改101服务器的`nginx.conf`配置文件

````bash
   server {
        listen 80;
        server_name  localhost;
        location / {
            proxy_pass http://192.168.8.101:8080;
        }
        # 所有静态请求都由nginx处理，存放目录为nginx中的html
  					      location ~ .(gif|jpg|jpeg|png|bmp|swf|css|js)$ {
            root html;
        }
    }
````

`location ~ .(gif|jpg|jpeg|png|bmp|swf|css|js)${root html;} `这行的意思是匹配到这些后缀名的文件，就把资源引入的地址指向html目录中，将html文件夹作为这些资源引入的根目录。

- 例1：`/css/index.css`的这个`/`就是相对于html目录中来说的。
- 例2：当我们后缀为gif的时候，Nginx默认会从html中获取到当前请求的动态图文件返回，当然这里的静态文件跟Nginx是同一台服务器，我们也可以在另外一台服务器，然后通过反向代理和负载均衡配置过去就好了，只要搞清楚了最基本的流程，很多配置就很简单了

## 3.location匹配顺序

**常见的Nginx正则表达式**

```bash
^ ：匹配输入字符串的起始位置
$ ：匹配输入字符串的结束位置
* ：匹配前面的字符零次或多次。如“ol*”能匹配“o”及“ol”、“oll”
+ ：匹配前面的字符一次或多次。如“ol+”能匹配“ol”及“oll”、“olll”，但不能匹配“o”
? ：匹配前面的字符零次或一次，例如“do(es)?”能匹配“do”或者“does”，”?”等效于”{0,1}”
. ：匹配除“\n”之外的任何单个字符，若要匹配包括“\n”在内的任意字符，请使用诸如“[.\n]”之类的模式
\ ：将后面接着的字符标记为一个特殊字符或一个原义字符或一个向后引用。如“\n”匹配一个换行符，而“\$”则匹配“$”
\d ：匹配纯数字
{n} ：重复 n 次
{n,} ：重复 n 次或更多次
{n,m} ：重复 n 到 m 次
[] ：定义匹配的字符范围
[c] ：匹配单个字符 c
[a-z] ：匹配 a-z 小写字母的任意一个
[a-zA-Z0-9] ：匹配所有大小写字母或数字
() ：表达式的开始和结束位置
| ：或运算符  //例(js|img|css)
```

**location正则：**

```js
//location大致可以分为三类
精准匹配：location = /{}
一般匹配：location /{}
正则匹配：location ~/{}
//location常用的匹配规则：
= ：进行普通字符精确匹配，也就是完全匹配。
^~ ：表示前缀字符串匹配（不是正则匹配，需要使用字符串），如果匹配成功，则不再匹配其它 location。
~ ：区分大小写的匹配（需要使用正则表达式）。
~* ：不区分大小写的匹配（需要使用正则表达式）。
!~ ：区分大小写的匹配取非（需要使用正则表达式）。
!~* ：不区分大小写的匹配取非（需要使用正则表达式）。
//优先级
首先精确匹配 =
其次前缀匹配 ^~
其次是按文件中顺序的正则匹配 ~或~*
然后匹配不带任何修饰的前缀匹配
最后是交给 / 通用匹配
```

**注意：**

- 精确匹配： `=` ， 后面的表达式中写的是纯字符串
- 字符串匹配： `^~` 和 `无符号匹配` ， 后面的表达式中写的是纯字符串
- 正则匹配： `~` 和 `~*` 和 `!~` 和 `!~*` ， 后面的表达式中写的是正则表达式

**location的说明**

```bash
 (1）location = / {}
=为精确匹配 / ，主机名后面不能带任何字符串，比如访问 / 和 /data，则 / 匹配，/data 不匹配
再比如 location = /abc，则只匹配/abc ，/abc/或 /abcd不匹配。若 location  /abc，则即匹配/abc 、/abcd/ 同时也匹配 /abc/。

（2）location / {}
因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求 比如访问 / 和 /data, 则 / 匹配， /data 也匹配，
但若后面是正则表达式会和最长字符串优先匹配（最长匹配）

（3）location /documents/ {}
匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索其它 location
只有其它 location后面的正则表达式没有匹配到时，才会采用这一条

（4）location /documents/abc {}
匹配任何以 /documents/abc 开头的地址，匹配符合以后，还要继续往下搜索其它 location
只有其它 location后面的正则表达式没有匹配到时，才会采用这一条

（5）location ^~ /images/ {}
匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条

（6）location ~* \.(gif|jpg|jpeg)$ {}
匹配所有以 gif、jpg或jpeg 结尾的请求
然而，所有请求 /images/ 下的图片会被 location ^~ /images/ 处理，因为 ^~ 的优先级更高，所以到达不了这一条正则

（7）location /images/abc {}
最长字符匹配到 /images/abc，优先级最低，继续往下搜索其它 location，会发现 ^~ 和 ~ 存在

（8）location ~ /images/abc {}
匹配以/images/abc 开头的，优先级次之，只有去掉 location ^~ /images/ 才会采用这一条

（9）location /images/abc/1.html {}
匹配/images/abc/1.html 文件，如果和正则 ~ /images/abc/1.html 相比，正则优先级更高

优先级总结：
(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~* 正则顺序) > (location 部分起始路径) > (location /)
```

 **location匹配顺序** 

- 多个正则location直接按书写顺序匹配，成功后就不会继续往后面匹配 
- 普通（非正则）location会一直往下，直到找到匹配度最高的（最大前缀匹配） 
- 当普通location与正则location同时存在，如果正则匹配成功,则不会再执行普通匹配 
- 所有类型location存在时，“=”匹配 > “^~”匹配 > 正则匹配 > 普通（最大前缀匹配）  

实际网站使用中，至少有三个匹配规则定义:

- 第一个必选规则

直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，比如说官网。这里是直接转发给后端应用服务器了，也可以是一个静态首页

```js
location = / {
    proxy_pass http://127.0.0.1:8080/; 
}
```

- 第二个必选规则

处理静态文件请求，这是nginx作为http服务器的强项,有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用

```js
location ^~ /static/ {
    root /www/www/static;
}

location ~* \.(html|gif|jpg|jpeg|png|css|js|ico)$ {
    root /www/www/;
}
```

- 第三个规则

通用规则，用来转发动态请求到后端应用服务器

```js
location /api/ {
    proxy_pass http://127.0.0.1:3000/
}
```

## 4.URLRewrite  

优点：掩藏真实的url以及url中可能暴露的参数，以及隐藏web使用的编程语言，提高安全性便于搜索引擎收录

缺点：降低效率，影响性能。如果项目是内网使用，比如公司内部软件，则没有必要配置。

```tex
rewrite是实现URL重写的关键指令，根据regex(正则表达式)部分内容，重定向到repacement，结尾是flag标记。

rewrite 	<regex> 	<replacement> 	[flag];
关键字 		正则 				替代内容 			flag标记

```

> 关键字：其中关键字error_log不能改变
>
> 正则：perl兼容正则表达式语句进行规则匹配 
>
> 替代内容：将正则匹配的内容替换成replacement 
>
> flag标记：rewrite支持的flag标记 

> rewrite参数的标签段位置： server,location,if 

> flag标记说明： 
>
> last			#本条规则匹配完成后，继续向下匹配新的location URI规则 
>
> break 		#本条规则匹配完成即终止，不再匹配后面的任何规则 
>
> redirect 		#返回302临时重定向，浏览器地址会显示跳转后的URL地址   (防爬虫)
>
> permanent 	#返回301永久重定向，浏览器地址栏会显示跳转后的URL地址  

配置nginx.conf

![image-20220824161112740](https://i0.hdslb.com/bfs/album/9128e33ba1717612604f3017018f9bbb352808b5.png)

这个意思是如果路径是`/index.html?testParms=3`就重写成`/test.html`

![image-20220824161242718](https://i0.hdslb.com/bfs/album/8b69321e6e75e5492045ba8c4e2bf4f1f50b5c19.png)

也可以用正则表达式的形式：

```bash
rewrite ^/[0-9]+.html$ /index.html?testParam=$1 break; 
//$1表示第一个匹配的字符串 
```

这是访问`/index.html?testParam=2`

![image-20220824161403358](https://i0.hdslb.com/bfs/album/8818cd614c9b4158998d2868391b2aa3cc73e631.png)

## 5.负载均衡+URLRewrite

![image-20220824161655068](https://i0.hdslb.com/bfs/album/ab02a910c8c53544dd664c28c4fbf5ba5d26c460.png)



上面的操作都是在101服务器上使用反向代理到102服务器展示出来的，如果直接访问102服务器也能访问到，这种事是不应该的，所以要配置一下。

**以下命令都是在102服务器操作**

1. 开启102的防火墙

```
systemctl start firewalld
```

2. 重载规则

```tex
firewall-cmd --reload
```

3. 添加指定端口和ip访问(添加之后记得重新启动防火墙)

```
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.8.101" port protocol="tcp" port="8080" accept"
```

4. 移除规则

```tex
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.8.101" port protocol="tcp" port="8080" accept"
```

5. 查看已配置规则  

```
firewall-cmd --list-all
```

6. 重启防火墙

```
firewall-cmd --reload
```

这个时候只有一台服务器102，如果102服务器崩了，那么将无法访问，所以要配置负载均衡。

这时也要用防火墙配置103服务器的规则

```bash
...
http {

#定义一组服务器
upstream httpds{
    server 192.168.8.101:8080 weight=8 down;
    server 192.168.8.103:8080 weight=2 backup;
}
...
 #虚拟主机的配置
    server {
    #监听端口
        listen       80;
        #域名，可以有多个，用空格隔开
        server_name  localhost;

	#配置根目录以及默认页面
        location / {
            proxy_pass http://httpds;
        }
        
    }
}
```

测试：

现在直接访问http://192.168.8.102/就访问不了了

访问http://192.168.8.101/可以正常访问

访问http://192.168.8.103/可以正常访问

