# 07 【nodejs内置模块（下）】

## 1.stream 模块

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

### 1.1 读取流

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('hello.txt', 'utf-8');

rs.on('open', function () {
  console.log('读取的文件已打开');
}).on('close', function () {
  console.log('读取流结束');
}).on('error', err => {
  console.log(err);
}).on('data', function (chunk) {
  //每一批数据流入完成
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});
```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

**读取视频**

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  console.log(chunk);
});
```

![](https://tva1.sinaimg.cn/large/0074UQWJgy1h3eigfl898j31750iztjs.jpg)

### 1.2 写入流

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```javascript
const fs = require('fs');

//创建写入流
let ws = fs.createWriteStream('hello.txt', 'utf-8');

//监听文件打开事件
ws.on('open', function () {
  console.log('文件打开');
});

//监听文件关闭事件
ws.on('close', function () {
  console.log('文件写入完成，关闭');
});

//文件流式写入
ws.write('helloworld1!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容1流入完成');
  }
});
ws.write('helloworld2!', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('内容2流入完成');
  }
});

//文件写入完成
ws.end(function () {
  console.log('文件写入关闭');
});
```

`pipe` 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  console.log('读取流结束');
});

rs.pipe(ws);
```

**pipe原理**

```javascript
const fs = require('fs');

//创建读取流
let rs = fs.createReadStream('video.mp4');
let ws = fs.createWriteStream('b.mp4');

rs.on('close', function () {
  ws.end();
  console.log('读取流结束');
});

//每一批数据流入完成
rs.on('data', function (chunk) {
  console.log('单批数据流入:' + chunk.length);
  ws.write(chunk, () => {
    console.log('单批输入流入完成');
  });
});
```

## 2.资源压缩模块 zib

### 2.1 概览

做过web性能优化的同学，对性能优化大杀器**gzip**应该不陌生。浏览器向服务器发起资源请求，比如下载一个js文件，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

浏览器通过HTTP请求头部里加上**Accept-Encoding**，告诉服务器，“你可以用gzip，或者defalte算法压缩资源”。

> Accept-Encoding:gzip, deflate

那么，在nodejs里，是如何对资源进行压缩的呢？答案就是**Zlib**模块。=

### 2.2 压缩的例子

非常简单的几行代码，就完成了本地文件的gzip压缩。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();

var readstream = fs.createReadStream('./extra/fileForCompress.txt');
var writestream = fs.createWriteStream('./extra/fileForCompress.txt.gz');

readstream.pipe(gzip).pipe(writestream);
```

### 2.3 解压的例子

同样非常简单，就是个反向操作。

```javascript
var fs = require('fs');
var zlib = require('zlib');

var gunzip = zlib.createGunzip();

var readstream  = fs.createReadStream('./extra/fileForCompress.txt.gz');
var writestream  = fs.createWriteStream('./extra/fileForCompress1.txt');

readstream.pipe(gunzip).pipe(writestream);
```

### 2.4 服务端gzip压缩

首先判断 是否包含 **accept-encoding** 首部，且值为**gzip**。

- 否：返回未压缩的文件。
- 是：返回gzip压缩后的文件。

```js
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './extra/fileForGzip.html';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    var gzip;
    
    if(acceptEncoding.indexOf('gzip')!=-1){ // 判断是否需要gzip压缩
        
        gzip = zlib.createGzip();
        
        // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    
    }else{

        fs.createReadStream(filepath).pipe(res);
    }

});

server.listen('3000');

```

**将js大文件返回**

```javascript
const fs = require('fs');
const zlib = require('zlib');//这两个要写在fs模块后面
const gzip = zlib.createGzip();
const http = require('http');

http
  .createServer((req, res) => {
    let rs = fs.createReadStream('hello.js');
    res.writeHead(200, {
      'Content-Type': 'application/x-javascript;charset=utf-8',
      'Content-Encoding': 'gzip',
    });
    rs.pipe(gzip).pipe(res);
  })
  .listen(3000, () => {
    console.log('server start');
  });
```

### 2.5 服务端字符串gzip压缩

代码跟前面例子大同小异。这里采用了 **zlib.gzipSync(str)** 对字符串进行gzip压缩。

```javascript
var http = require('http');
var zlib = require('zlib');

var responseText = 'hello world';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    if(acceptEncoding.indexOf('gzip')!=-1){
        res.writeHead(200, {
            'content-encoding': 'gzip'
        });
        res.end(zlib.gzipSync(responseText) );
    }else{
        res.end(responseText);
    }

});

server.listen('3000');
```

## 3.数据加密模块 crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

### 3.1 hash例子

hash.digest([encoding])：计算摘要。encoding可以是`hex`、`latin1`或者`base64`。如果声明了encoding，那么返回字符串。否则，返回Buffer实例。注意，调用hash.digest()后，hash对象就作废了，再次调用就会出错。

hash.update(data[, input_encoding])：input_encoding可以是`utf8`、`ascii`或者`latin1`。如果data是字符串，且没有指定 input_encoding，则默认是`utf8`。注意，hash.update()方法可以调用多次。

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);

output = hash.digest('hex'); 

console.log(output);
// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

也可以这样：

```js
var crypto = require('crypto');
var fs = require('fs');

var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');

hash.setEncoding('hex');

input.pipe(hash).pipe(process.stdout)

// 输出内容为：
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

hash.digest()后，再次调用digest()或者update()

```js
var crypto = require('crypto');
var fs = require('fs');

var content = fs.readFileSync('./test.txt', {encoding: 'utf8'});
var hash = crypto.createHash('sha256');
var output;

hash.update(content);
hash.digest('hex'); 

// 报错：Error: Digest already called
hash.update(content);

// 报错：Error: Digest already called
hash.digest('hex');
```

### 3.2 HMAC例子

HMAC的全称是Hash-based Message Authentication Code，也即在hash的加盐运算。

具体到使用的话，跟hash模块差不多，选定hash算法，指定“盐”即可。

例子1：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.readFileSync('./test.txt', {encoding: 'utf8'});

hmac.update(input);

console.log( hmac.digest('hex') );
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

例子2：

```js
var crypto = require('crypto');
var fs = require('fs');

var secret = 'secret';
var hmac = crypto.createHmac('sha256', secret);
var input = fs.createReadStream('./test.txt', {encoding: 'utf8'});

hmac.setEncoding('hex');

input.pipe(hmac).pipe(process.stdout)
// 输出：
// 734cc62f32841568f45715aeb9f4d7891324e6d948e4c6c60c0621cdac48623a
```

### 3.3 MD5例子

MD5（Message-Digest Algorithm）是计算机安全领域广泛使用的散列函数（又称哈希算法、摘要算法），主要用来确保消息的完整和一致性。常见的应用场景有密码保护、下载文件校验等。

**特点**

1. 运算速度快：对`jquery.js`求md5值，57254个字符，耗时1.907ms
2. 输出长度固定：输入长度不固定，输出长度固定（128位）。
3. 运算不可逆：已知运算结果的情况下，无法通过通过逆运算得到原始字符串。
4. 高度离散：输入的微小变化，可导致运算结果差异巨大。
5. 弱碰撞性：不同输入的散列值可能相同。

**应用场景**

1. 文件完整性校验：比如从网上下载一个软件，一般网站都会将软件的md5值附在网页上，用户下载完软件后，可对下载到本地的软件进行md5运算，然后跟网站上的md5值进行对比，确保下载的软件是完整的（或正确的）
2. 密码保护：将md5后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后，明文密码外泄。
3. 防篡改：比如数字证书的防篡改，就用到了摘要算法。（当然还要结合数字签名等手段）

```javascript
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var result = md5.update('a').digest('hex');

// 输出：0cc175b9c0f1b6a831c399e269772661
console.log(result);
```

### 3.4 例子：密码保护

前面提到，将明文密码保存到数据库是很不安全的，最不济也要进行md5后进行保存。比如用户密码是`123456`，md5运行后，得到`输出：e10adc3949ba59abbe56e057f20f883e`。

这样至少有两个好处：

1. 防内部攻击：网站主人也不知道用户的明文密码，避免网站主人拿着用户明文密码干坏事。
2. 防外部攻击：如网站被黑客入侵，黑客也只能拿到md5后的密码，而不是用户的明文密码。

示例代码如下：

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';
var cryptedPassword = cryptPwd(password);

console.log(cryptedPassword);
// 输出：e10adc3949ba59abbe56e057f20f883e
```

**单纯对密码进行md5不安全**

前面提到，通过对用户密码进行md5运算来提高安全性。但实际上，这样的安全性是很差的，为什么呢？

稍微修改下上面的例子，可能你就明白了。相同的明文密码，md5值也是相同的。

```javascript
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var password = '123456';

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e

console.log( cryptPwd(password) );
// 输出：e10adc3949ba59abbe56e057f20f883e
```

也就是说，当攻击者知道算法是md5，且数据库里存储的密码值为`e10adc3949ba59abbe56e057f20f883e`时，理论上可以可以猜到，用户的明文密码就是`123456`。

事实上，彩虹表就是这么进行暴力破解的：事先将常见明文密码的md5值运算好存起来，然后跟网站数据库里存储的密码进行匹配，就能够快速找到用户的明文密码。（这里不探究具体细节）

那么，有什么办法可以进一步提升安全性呢？答案是：密码加盐。

**密码加盐**

“加盐”这个词看上去很玄乎，其实原理很简单，就是在密码特定位置插入特定字符串后，再对修改后的字符串进行md5运算。

例子如下。同样的密码，当“盐”值不一样时，md5值的差异非常大。通过密码加盐，可以防止最初级的暴力破解，如果攻击者事先不知道”盐“值，破解的难度就会非常大。

```javascript
var crypto = require('crypto');

function cryptPwd(password, salt) {
    // 密码“加盐”
    var saltPassword = password + ':' + salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var result = md5.update(saltPassword).digest('hex');
    console.log('加盐密码的md5值：%s', result);
}

cryptPwd('123456', 'abc');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:abc
// 加盐密码的md5值：51011af1892f59e74baf61f3d4389092

cryptPwd('123456', 'bcd');
// 输出：
// 原始密码：123456
// 加盐后的密码：123456:bcd
// 加盐密码的md5值：55a95bcb6bfbaef6906dbbd264ab4531
```
