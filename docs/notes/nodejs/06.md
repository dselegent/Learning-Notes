# 06 【nodejs内置模块（中）】

## 1.路劲处理模块 path

### 1.1 模块概览

在nodejs中，path是个使用频率很高，但却让人又爱又恨的模块。部分因为文档说的不够清晰，部分因为接口的平台差异性。

将path的接口按照用途归类，仔细琢磨琢磨，也就没那么费解了。

### 1.2 获取路径/文件名/扩展名

- 获取路径：path.dirname(filepath)
- 获取文件名：path.basename(filepath)
- 获取扩展名：path.extname(filepath)

#### 1.2.1 获取所在路径

例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：/tmp/demo/js
console.log( path.dirname(filepath) );
```

#### 1.2.2 获取文件名

严格意义上来说，path.basename(filepath) 只是输出路径的最后一部分，并不会判断是否文件名。

但大部分时候，我们可以用它来作为简易的“获取文件名“的方法。

```javascript
var path = require('path');

// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );
```

如果只想获取文件名，单不包括文件扩展呢？可以用上第二个参数。

```javascript
// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );
```

#### 1.2.3 获取文件扩展名

简单的例子如下：

```javascript
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：.js
console.log( path.extname(filepath) );
```

更详细的规则是如下：（假设 path.basename(filepath) === B ）

- 从B的最后一个`.`开始截取，直到最后一个字符。
- 如果B中不存在`.`，或者B的第一个字符就是`.`，那么返回空字符串。

直接看[官方文档](https://nodejs.org/api/path.html#path_path_extname_path)的例子

```javascript
path.extname('index.html')
// returns '.html'

path.extname('index.coffee.md')
// returns '.md'

path.extname('index.')
// returns '.'

path.extname('index')
// returns ''

path.extname('.index')
// returns ''
```

### 1.3 路径组合

- path.join([...paths])
- path.resolve([...paths])

#### 1.3.1 path.resolve() 生成完成的绝对路径

语法格式：

```js
path.resolve([...myPaths])
```

解释：

- 将路径或路径片段的序列解析为绝对路径。
- 返回的路径是**从右往左**处理，后面的每个 myPath 被依次解析，直到构造出一个完整的绝对路径。

> 你可以想象现在你在shell下面，从左到右运行一遍`cd path`命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果了。

代码举例：

```js
const path = require('path');

let arr1 = ['/foo1/foo2', 'dselegent', 'foo3'];
let result1 = path.resolve(...arr1);
console.log(result1); // 打印结果：/foo1/foo2/dselegent/foo3

let arr2 = ['/foo1/foo2', '/dselegent', 'foo3'];
let result2 = path.resolve(...arr2);
console.log(result2); // 打印结果：/dselegent/foo3

```

```javascript
const path = require('path');

// 假设当前工作路径是 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('') )

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path
console.log( path.resolve('.') )

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz') );

// 输出 /foo/bar/baz
console.log( path.resolve('/foo/bar', './baz/') );

// 输出 /tmp/file
console.log( path.resolve('/foo/bar', '/tmp/file/') );

// 输出 /Users/a/Documents/git-code/nodejs-learning-guide/examples/2016.11.08-node-path/www/js/mod.js
console.log( path.resolve('www', 'js/upload', '../mod.js') );
```

#### 1.3.2 path.join() 将多个路径进行拼接

如果是我们手动拼接路径，容易出错。这个时候，可以利用 path.join() 方法将路径进行拼接。

语法格式：

```js
path.join([...paths]);
```

解释：使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

代码举例：

```js
const path = require('path');

const result1 = path.join(__dirname, './app.js');
console.log(result1); // 返回：/Users/smyhvae/dselegent/app.js

const result2 = path.join('/foo1', 'foo2', './foo3');
console.log(result2); // 返回：/foo1/foo2/foo3

const result3 = path.join('/foo1', 'foo2', '/foo3');
console.log(result3); // 返回：/foo1/foo2/foo3
```

#### 1.3.3 path.resolve 和 path.join 区别

path.resolve 和 path.join 都是属于 path 核心模块下的方法，用来拼接路径。

都可以拼接成一个完整路径.

```js
const path = require("path");

var dirname = '/User/Desktop';
var basename = 'abc.txt';

path.join(dirname, basename);  // /User/Desktop/abc.txt

path.resolve(dirname, basename);  // /User/Desktop/abc.txt
```

如果 dirname 是以 ./ 、../、不加 / 开头的话，那么 resolve 会找到磁盘下的根目录

```javascript
const path = require("path");
 
var dirname = '../User/Desktop';
var basename = 'abc.txt';
 
path.join(dirname, basename);  // ../User/Desktop/abc.txt
 
path.resolve(dirname, basename);  // /Users/Desktop/node/User/Desktop/abc.txt
```

如果 basename 是以 / 开头的，那么 resolve 就会直接返回 basename 

```javascript
const path = require("path");
 
var dirname = '/User/Desktop';
var basename = '/abc.txt';
 
path.join(dirname, basename);  // /User/Desktop/abc.txt
 
path.resolve(dirname, basename);  // /abc.txt
```

### 1.4 几个常见路径

- `__dirname`：这是一个常量，表示：当前执行文件所在**完整目录**。
- `__filename`：这是一个常量。表示：当前执行文件的**完整目录 + 文件名**。
- `process.cwd`：获取当前执行 Node命令 时的目录名。

代码举例：

```js
console.log(__dirname);

console.log(__filename);

console.log(process.cwd());
```

运行结果：

```bash
$ node app.js

/Users/smyhvae/dselegent
/Users/smyhvae/dselegent/app.js
/Users/smyhvae/dselegent
```

## 2.本地文件操作模块 fs

> ### Node.js 中的同步和异步的区别
>
> fs模块对文件的几乎所有操作都有同步和异步两种形式。例如：readFile() 和 readFileSync()。
>
> 区别：
>
> - 同步调用会阻塞代码的执行，异步则不会。
> - 异步调用会将 读取任务 下达到任务队列，直到任务执行完成才会回调。
> - 异常处理方面：同步必须使用 try catch 方式，异步可以通过回调函数的第一个参数。【重要】

### 2.1 文件读取

**同步读取**

```javascript
var fs = require('fs');
var data;

try{
    data = fs.readFileSync('./fileForRead.txt', 'utf8');
    console.log('文件内容: ' + data);
}catch(err){
    console.error('读取文件出错: ' + err.message);
}
```

输出如下：

```bash
/usr/local/bin/node readFileSync.js
文件内容: hello world
```

**异步读取**

```javascript
var fs = require('fs');

fs.readFile('./fileForRead.txt', 'utf8', function(err, data){
    if(err){
        return console.error('读取文件出错: ' + err.message);
    }
    console.log('文件内容: ' + data);
});
```

输出如下

```bash
/usr/local/bin/node readFile.js
文件内容: hello world
```

> **fs/promises 从 Node.js 14 开始可用**
> 从 Node.js 14 开始，fs 模块提供了两种使用基于 promises 的文件系统的方法。这些 promises 可以通过 `require('fs').promises` 或 `require('fs/promises') `获得。

```js
import { readFile } from 'fs/promises';

try {
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

### 2.2 文件写入

备注：以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；

**异步写入**

```javascript
var fs = require('fs');

fs.writeFile('./fileForWrite.txt', 'hello world', 'utf8', function(err){
    if(err) throw err;
    console.log('文件写入成功');
});
```

**同步写入**

```javascript
var fs = require('fs');

try{
    fs.writeFileSync('./fileForWrite1.txt', 'hello world', 'utf8');
    console.log('文件写入成功');
}catch(err){
    throw err;
}
```

**promises**

```js
import { writeFile } from 'fs/promises';

try {
  const contents = await writeFile('message.txt', 'hello world', { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

### 2.3 文件是否存在

`fs.exists()`已经是`deprecated`状态，现在可以通过下面代码判断文件是否存在。

**异步本**

```js
const fs = require('fs')

//检查文件是否存在于当前目录中
fs.access('package.json', fs.constants.F_OK, err => {
    if(err) {
        console.log('package.json不存在于当前目录中')
        return
    }
    console.log('package.json存在于当前目录中')
})

fs.access('index.js', fs.constants.F_OK, err => {
    if(err) {
        console.log('index.js不存在于当前目录中')
        return
    }
    console.log('index.js存在于当前目录中')
})
```

`fs.access()`除了判断文件是否存在（默认模式），还可以用来判断文件的权限。

备忘：`fs.constants.F_OK`等常量无法获取（node v6.1，mac 10.11.4下，`fs.constants`是`undefined`）

**同步**

````js
import { accessSync, constants } from 'fs';

try {
  accessSync('etc/passwd', constants.R_OK );
  console.log('can read');
} catch (err) {
  console.error('no access!');
}
````

**promises**

```js
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
```

### 2.4 删除文件

**异步版本**

```javascript
var fs = require('fs');

fs.unlink('./fileForUnlink.txt', function(err){
    if(err) throw err;
    console.log('文件删除成功');
});
```

**同步版本**

```js
import { unlinkSync } from 'fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

**promises**

```js
import { unlink } from 'fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

### 2.5 创建目录

**异步版本**（如果目录已存在，会报错）

```javascript
// fs.mkdir(path[, mode], callback)
var fs = require('fs');

fs.mkdir('sub', function(err){
    if(err) throw err;
    console.log('创建目录成功');
});
```

**同步版本**

```javascript
// fs.mkdirSync(path[, mode])
var fs = require('fs');

try{
    fs.mkdirSync('hello');
    console.log('创建目录成功');
}catch(e){
    throw e;
}
```

**promises**

```js
import { mkdir } from 'fs/promises';

try {
  const createDir = await mkdir(projectFolder, { recursive: true });
  console.log(`created ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

### 2.6 遍历目录

同步版本，注意：`fs.readdirSync()`只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。

```js
// fs.readdirSync(path[, options])

var fs = require('fs');
var path = require('path');

var getFilesInDir = function(dir){

    var results = [ path.resolve(dir) ];
    var files = fs.readdirSync(dir, 'utf8');

    files.forEach(function(file){

        file = path.resolve(dir, file);

        var stats = fs.statSync(file);

        if(stats.isFile()){
            results.push(file);
        }else if(stats.isDirectory()){
            results = results.concat( getFilesInDir(file) );
        }
    });

    return results;
};

var files = getFilesInDir('../');
console.log(files);
```

### 2.7 读取目录

```js
import { readdir } from 'fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}
```

### 2.8 删除目录

```js
// 删除目录(前提没有文件在里面)
fs.rmdir('./avatar', err => {
  if (err && err.code === 'ENOENT') {
    console.log('目录不存在');
  }
});
```

### 2.9 删除整个目录

```js
//1
const fs = require("fs")
fs.("./avatar",(err,data)=>{
    // console.log(data)
    data.forEach(item=>{
        fs.unlinkSync(`./avatar/${item}`)
    })

    fs.rmdir("./avatar",(err)=>{
        console.log(err)
    })
})

//2
const fs = require('fs')
fs.readdir("./avatar").then(async (data)=>{
    let arr = []
    data.forEach(item=>{
        arr.push(fs.unlink(`./avatar/${item}`))
    })
    await Promise.all(arr)
    fs.rmdir("./avatar")
})

//3
const fs = require('fs').promises;
fs.readdir('./image2').then(async data => {
  await Promise.all(data.map(item => fs.unlink(`./image2/${item}`)));
  await fs.rmdir('./image2');
});
```

### 2.10 文件重命名

**异步版本**

```javascript
// fs.rename(oldPath, newPath, callback)
var fs = require('fs');

fs.rename('./hello', './world', function(err){
    if(err) throw err;
    console.log('重命名成功');
});
```

**同步版本**

````js
// fs.renameSync(oldPath, newPath)
var fs = require('fs');

fs.renameSync('./world', './hello');
````

**promises**

```js
import { rename } from 'fs/promises';

try {
  await rename('./world', './hello');
  console.log(`rename`);
} catch (err) {
  console.error(err.message);
}
```

### 2.11 获取文件状态

1.异步：fs.stat(path,callback):
  path是一个表示路径的字符串,callback接收两个参数(err,stats),其中stats就是fs.stats的一个实例；

2.同步：fs.statSync(path)
  只接收一个path变量，fs.statSync(path)其实是一个fs.stats的一个实例；

方法

- stats.isFile() -- 是否文件
- stats.isDirectory() -- 是否目录

```js
// Node.js program to demonstrate the 
// fs.statSync() method 
  
// Import the filesystem module 
const fs = require('fs'); 
  
// Getting information for a file 
statsObj = fs.statSync("test_file.txt"); 
  
console.log(statsObj);  
console.log("Path is file:", statsObj.isFile()); 
console.log("Path is directory:", statsObj.isDirectory()); 
  
// Getting information for a directory 
statsObj = fs.statSync("test_directory"); 
  
console.log(statsObj); 
console.log("Path is file:", statsObj.isFile()); 
console.log("Path is directory:", statsObj.isDirectory());
```

输出：

```js
Stats {
  dev:3229478529,
  mode:33206,
  nlink:1,
  uid:0,
  gid:0,
  rdev:0,
  blksize:4096,
  ino:1970324837039946,
  size:0,
  blocks:0,
  atimeMs:1582306776282,
  mtimeMs:1582482953967,
  ctimeMs:1582482953968.2532,
  birthtimeMs:1582306776282.142,
  atime:2020-02-21T17:39:36.282Z,
  mtime:2020-02-23T18:35:53.967Z,
  ctime:2020-02-23T18:35:53.968Z,
  birthtime:2020-02-21T17:39:36.282Z
}
Path is file:true
Path is directory:false
Stats {
  dev:3229478529,
  mode:16822,
  nlink:1,
  uid:0,
  gid:0,
  rdev:0,
  blksize:4096,
  ino:562949953486669,
  size:0,
  blocks:0,
  atimeMs:1582482965037.8445,
  mtimeMs:1581074249467.7114,
  ctimeMs:1582482964979.8303,
  birthtimeMs:1582306776288.1958,
  atime:2020-02-23T18:36:05.038Z,
  mtime:2020-02-07T11:17:29.468Z,
  ctime:2020-02-23T18:36:04.980Z,
  birthtime:2020-02-21T17:39:36.288Z
}
Path is file:false
Path is directory:true
```

### 2.12 追加文件内容

> fs.appendFile(file, data[, options], callback)

- file：可以是文件路径，也可以是文件句柄。（还可以是buffer？）
- data：要追加的内容。string或者buffer。
- options
  - encoding：编码，默认是`utf8`
  - mode：默认是`0o666`
  - flag：默认是`a`

注意：如果`file`是文件句柄，那么

- 开始追加数据前，file需要已经打开。
- file需要手动关闭。

```javascript
var fs = require('fs');

fs.appendFile('./extra/fileForAppend.txt', 'hello', 'utf8', function(err){
    if(err) throw err;
    console.log('append成功');
});
```

## 3.事件机制模块 events

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```javascript
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
```

以下程序绑定事件处理程序：

```javascript
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
```

我们可以通过程序触发事件：

```javascript
// 触发事件
eventEmitter.emit('eventName');
```

`EventEmitter `的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，`EventEmitter `支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

让我们以下面的例子解释这个过程：

```javascript
// 引入 events 模块
var EventEmitter = require('events');
// 创建 eventEmitter 对象
var event = new EventEmitter();
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
event.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
event.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

执行以上代码，运行的结果如下：

```bash
$ node event.js 
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

以上例子中，event 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是`EventEmitter`最简单的用法。

`EventEmitter `提供了多个属性，如 **on** 和 **emit**。**on** 函数用于绑定事件函数，**emit** 属性用于触发一个事件

