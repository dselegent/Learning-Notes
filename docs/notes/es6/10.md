# 10【Promise对象】

## 1.同步异步的介绍

Promise 是异步操作的一种解决方案。

> #### 异步的概念
>
> 异步（Asynchronous, async）是与同步（Synchronous, sync）相对的概念。
>
> 在我们学习的传统单线程编程中，程序的运行是同步的（同步不意味着所有步骤同时运行，而是指步骤在一个控制流序列中按顺序执行）。而异步的概念则是不保证同步的概念，也就是说，一个异步过程的执行将不再与原有的序列有顺序关系。
>
> 简单来理解就是：同步按你的代码顺序执行，异步不按照代码顺序执行，异步的执行效率更高。
>
> 以上是关于异步的概念的解释，接下来我们通俗地解释一下异步：异步就是从主线程发射一个子线程来完成任务。
>
> ![img](https://i0.hdslb.com/bfs/album/d1cc4d26fc4056acf3f704bddb4bfecdf3b3ddd0.png)
>
> #### 什么时候用异步编程
>
> 在前端编程中（甚至后端有时也是这样），我们在处理一些简短、快速的操作时，例如计算 1 + 1 的结果，往往在主线程中就可以完成。主线程作为一个线程，不能够同时接受多方面的请求。所以，当一个事件没有结束时，界面将无法处理其他请求。
>
> 现在有一个按钮，如果我们设置它的 onclick 事件为一个死循环，那么当这个按钮按下，整个网页将失去响应。
>
> 为了避免这种情况的发生，我们常常用子线程来完成一些可能消耗时间足够长以至于被用户察觉的事情（或者是一些需要等待某个时机在背后自动执行的任务，比如：事件监听），比如读取一个大文件或者发出一个网络请求。因为子线程独立于主线程，所以即使出现阻塞也不会影响主线程的运行。但是子线程有一个局限：一旦发射了以后就会与主线程失去同步，我们无法确定它的结束，如果结束之后需要处理一些事情，比如处理来自服务器的信息，我们是无法将它合并到主线程中去的。
>
> JavaScript 是单线程语言，为了解决多线程问题，JavaScript 中的异步操作函数往往通过**回调函数**来实现异步任务的结果处理。
>
> #### 回调函数（callback function）
>
> > 在 JavaScript 中，回调函数具体的定义为：函数A 作为参数（函数引用）传递到另一个 函数B 中，并且这个 函数B 执行函数A。我们就说 函数A 叫做回调函数。如果没有名称（函数表达式），就叫做匿名回调函数。
>
> 回调函数就是一个作为参数的函数，它是在我们启动一个异步任务的时候就告诉它：等你完成了这个任务之后要干什么。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。
>
> > 注意：回调和异步不是同一个东西，许多人误认为 js 中每个回调函数都是异步处理的，实际上并不是，可以同步回调，也可以异步回调。只不过说：**回调可以是同步也可以是异步，异步必须放在回调里执行，也就是对于一个异步任务只有回调函数里的才是异步的部分。**
> >
> > 回调同步的例子：
> >
> > ```javascript
> > const test = function (func) {
> >  func();
> > }
> > 
> > test(() => {
> >  console.log('func');
> > })
> > ```
> >
> > 回调异步的例子：
> >
> > ```javascript
> > setTimeout(()=>{
> >  console.log('one');
> > }, 3000);
> > console.log('two');
> > ```
>
> ### 实例
>
> `setInterval()` 和 `setTimeout()` 是两个异步语句。
>
> 异步（asynchronous）：不会阻塞 CPU 继续执行其他语句，当异步完成时（包含回调函数的主函数的正常语句完成时），会执行 “回调函数”（callback）。
>
> ```html
> <!DOCTYPE html>
> <html>
> 
> <head>
> <meta charset="utf-8">
> <title>菜鸟教程(runoob.com)</title>
> </head>
> 
> <body>
> 
> <p>回调函数等待 3 秒后执行。</p>
> <p id="demo"></p>
> <p>异步方式，不影响后续执行。</p>
> <script>
>   function print() {
>       document.getElementById("demo").innerHTML = "RUNOOB!";
>   }
>   setTimeout(print, 3000);
> </script>
> 
> </body>
> 
> </html>
> ```
>
> ![1](https://i0.hdslb.com/bfs/album/365c74378381a0e69761dfe542d2de267c1b3828.gif)
>
> 这段程序中的 setTimeout 就是一个消耗时间较长（3 秒）的过程，它的第一个参数是个回调函数，第二个参数是毫秒数，这个函数执行之后会产生一个子线程，子线程会等待 3 秒，然后执行回调函数 "print"，在命令行输出 "RUNOOB!"。
>
> 当然，JavaScript 语法十分友好，我们不必单独定义一个函数 print ，我们常常将上面的程序写成：
>
> ### 实例
>
> ```html
> <!DOCTYPE html>
> <html>
> 
> <head>
> <meta charset="utf-8">
> <title>菜鸟教程(runoob.com)</title>
> </head>
> 
> <body>
> 
> <p>回调函数等待 3 秒后执行。</p>
> <p id="demo"></p>
> <p>异步方式，不影响后续执行。</p>
> <script>
>   setTimeout(function () {
>       document.getElementById("demo").innerHTML = "RUNOOB!";
>   }, 3000);
>   /* ES6 箭头函数写法
>   setTimeout(() => {
>       document.getElementById("demo").innerHTML = "RUNOOB!";
>   }, 3000);
>   */
> </script>
> 
> </body>
> 
> </html>
> ```
>
> **注意：**既然 setTimeout 会在子线程中等待 3 秒，在 setTimeout 函数执行之后主线程并没有停止，所以：
>
> ### 实例
>
> ```html
> <!DOCTYPE html>
> <html>
> 
> <head>
> <meta charset="utf-8">
> <title>菜鸟教程(runoob.com)</title>
> </head>
> 
> <body>
> 
> <p>回调函数等待 3 秒后执行。</p>
> <p id="demo1"></p>
> <p id="demo2"></p>
> <script>
>   setTimeout(function () {
>       document.getElementById("demo1").innerHTML = "RUNOOB-1!";
>   }, 3000);
>   document.getElementById("demo2").innerHTML = "RUNOOB-2!";
> </script>
> 
> </body>
> 
> </html>
> ```
>
> 这段程序的执行结果是：
>
> ![2](https://i0.hdslb.com/bfs/album/ad3300e4fccf3861082bcb9633584d5aad190b98.gif)

（之前常用的异步操作解决方案是：回调函数）

```javascript
document.addEventListener(
    'click',
    () => {
        console.log('这里是异步的');
    },
    false
);
console.log('这里是同步的');
```

什么时候使用 Promise 呢？

Promise 一般用来解决层层嵌套的回调函数（回调地狱 callback hell）的问题。

例如下面展示两个回调地狱的例子：

例子1：分别间隔一秒打印省市县

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>回调举例</title>
</head>

<body>
<script>
    /*
    // 此种方式，省市县都会在一秒后同时打印，没有实现要求
    setTimeout(() => {
        console.log("云南省");
    }, 1000);
    setTimeout(() => {
        console.log("玉溪市");
    }, 1000);
    setTimeout(() => {
        console.log("峨山县");
    }, 1000);
    */

    // 通过回调函数的方式，实现异步
    setTimeout(() => {
        console.log("云南省");
        let str01 = "云南省";
        setTimeout(() => {
            console.log(str01 + "玉溪市");
            let str02 = "云南省玉溪市";
            setTimeout(() => {
                console.log(str02 + "峨山县");
            }, 1000, str02);
        }, 1000, str01);
    }, 1000);
    console.log("通过回调函数的方式，实现异步");
</script>
</body>

</html>
```

![555](https://i0.hdslb.com/bfs/album/a45ebe3c65367ca98ec1e4932a40f978cae5e818.gif)

例子2：当我们点击窗口后，盒子依次 “右——>下——>左” 移动

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Promise</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        #box {
            width: 300px;
            height: 300px;
            background-color: red;
            transition: all 0.5s;
        }
    </style>
</head>
<body>
<div id="box"></div>
<script>    
    // 运动函数
    const move = (el, {x = 0, y = 0} = {}, end = () => {}) => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.addEventListener(
            // transitionend 事件在 CSS 完成过渡后触发。
            'transitionend',
            () => {
                end();
            },
            false
        );
    };

    const boxEl = document.getElementById('box');

    // 形成回调地狱
    document.addEventListener(
        'click',
        () => {
            move(boxEl, {x: 150}, () => {
                move(boxEl, {x: 150, y: 150}, () => {
                    move(boxEl, {y: 150}, () => {
                        move(boxEl, {x: 0, y: 0});
                    });
                });
            });
        },
        false
    );
</script>
</body>
</html>
```

<img src="https://i0.hdslb.com/bfs/album/97e97a5e20c5634615ea020b9840ef838d9c0718.gif" style="zoom:25%;" />

## 2.Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 有三个状态：pending（等待）、fulfilled 或 resolved（成功）、rejected（失败）。

并且 Promise 必须接收一个回调函数，这个回调函数有两个参数，这两个参数也是两个函数，`(resolve, reject) => {}`。

- 实例化 Promise 后，默认是等待状态。

- 当执行 `resolve()` 函数时，Promise 从等待状态——>成功状态。

- 当执行 `reject()` 函数时，Promise 从等待状态——>失败状态。

注意：当 Promise 的状态一但从等待转变为某一个状态后，后续的转变就自动忽略了，比如：先调用 resolve() 再调用 reject()，那么 Promise 的最终结果是成功状态。

> 注意：这里的 resolve reject 只是一个形参，可以取任意名字，但是我们约定直接使用 resolve reject。

注意，为了行文方便，本章后面的`resolved`统一只指`fulfilled`状态，不包含`rejected`状态。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 3.Promise 的基本用法

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

下面代码创造了一个`Promise`实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

`resolve()` 和 `reject()` 函数是可以接收参数的。

- `resolve()` 接收的参数会传递给 then 方法的第一个回调函数
- `reject()` 接收的参数会传递给 then 方法的第二个回调函数

注意：通常我们不仅仅会传递一个基本数据类型的值，我们还常常传递对象，比如再 reject 中传递一个错误对象：

`reject(new Error("出错了！"));`

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数。

下面是一个`Promise`对象的简单例子。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

上面代码中，`timeout`方法返回一个`Promise`实例，表示一段时间以后才会发生的结果。过了指定的时间（`ms`参数）以后，`Promise`实例的状态变为`resolved`，就会触发`then`方法绑定的回调函数。

Promise 新建后就会立即执行。

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

下面是异步加载图片的例子。

```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

上面代码中，使用`Promise`包装了一个图片加载的异步操作。如果加载成功，就调用`resolve`方法，否则就调用`reject`方法。

如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

上面代码中，`p1`和`p2`都是 Promise 的实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

上面代码中，`p1`是一个 Promise，3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 2 秒，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。

注意，调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

上面代码中，调用`resolve(1)`以后，后面的`console.log(2)`还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用`resolve`或`reject`以后，Promise 的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。所以，最好在它们前面加上`return`语句，这样就不会有意外。

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## 4.Promise.prototype.then()

1. then 方法的两个回调函数什么时候执行

   - pending——>resolved时，执行 then 的第一个回调函数
   - pending——>rejected 时，执行 then 的第二个回调函数

2. then 方法执行后的返回值

   - then 方法执行后默认自动返回一个新的 Promise 对象

3. then 方法返回的 Promise 对象的状态改变

   - then 方法其实默认返回的是 undefined，即：`return undefined`，但是 ES6 的机制规定：当 then 返回 undefined 时，那么会将这个 undefined 包装成一个 Promise，并且这个 Promise 默认调用了 `resilve()` 方法（成功态），并且把 undefined 作为了 resilve() 的参数，相当于：

     ```javascript
     const p = new Promise((resolve, reject) => {
         resolve();
     });
     p.then(() => {
         // 默认会执行这一条
         // return undefined;
     }, () => {
     });
     
     // 实际上，return 会包装为一个 Promise 对象，同时默认执行 resolve()，并把 return 的值作为 resolve() 的参数
     /*
     return new Promise(resolve => {
         resolve(undefined);
     });
     */
     
     // -----------------------------
     // 如果我们在这个返回的 Promise 上继续调用 then 方法，并接收参数的话，可以发现 then 中成功接收到了被 Promise 包装后的参数
     const p2 = new Promise((resolve, reject) => {
         resolve();
     });
     p2.then(() => {
         // 默认会执行这一条
         // return undefined;
     }).then(data => {
         console.log(data);  // 打印 undefined
         // 手动 return 一个值
         return 24;
         // 相当于：return new Promise(resolve => {resolve(24);});
     }).then((data) => {
         console.log(data);	// 打印 24
     });
     ```

   - 如果我们要让 then 返回一个失败状态的 Promise，那么我们可以手动 return 一个 Promise 并执行 reject() 方法。

     ```javascript
     const p3 = new Promise((resolve, reject) => {
         resolve();
     });
     p3.then(() => {
         // 手动返回一个调用了 reject 的 Promise
         return new Promise((resolve, reject) => {
             reject("失败");
         })
     }).then(() => {}, errData => {
         console.log(errData);	// 失败
     });
     ```

> **总结**：Promise 是一个构造函数，需要 new 才能使用。在 new Promise() 的时候需要传递一个匿名回调函数作为 Promise() 唯一的参数，这个回调函数有两个参数 resolve reject，这两个参数也是函数，当回调函数执行第一个 resolve 函数后 Promise 便变为了成功状态，反之回调函数执行了 reject 后 Promise 便变为了失败状态，且每个 Promise 只能要么执行 resolve，要么执行 reject，不能同时执行！当 Promise 被 new 之后就会有一个 then 方法，该方法默认接收两个匿名回调函数作为参数，其中第一个回调函数是在 Promise 为成功状态时自动调用的，反之第二个回调函数是在 Promise 为失败状态时自动调用的，并且这两个回调函数是可以接收参数的，参数就来自于 resolve 或 reject 调用时传递的实参！在 then 方法执行后会默认返回 undefined（在没有指定返回值的情况下），ES6 会将其包装为一个新的成功态的 Promise，该 Promise 会自动执行 resolve 函数，该函数的参数来自于 then 方法的返回值（如果没有返回值那么默认就返回 undefined）。如果需要返回一个失败态的 Promise，那么需要在 then 中手动指定返回值：
>
> ```javascript
> return new Promise((resolve, reject) => {
> 	reject(参数);
> }
> ```

案例：分别间隔一秒打印省市县。

```javascript
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promise</title>
</head>

<body>
<script>
    // 通过 Promise 的方式，解决回调地狱
    new Promise((resolve) => {
        setTimeout(() => {
            console.log("云南省");
            resolve("云南省");
        }, 1000);
    }).then(res => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(res + "玉溪市");
                resolve(res + "玉溪市");
            }, 1000);
        });
    }).then(res => {
        setTimeout(() => {
            console.log(res + "峨山县");
        }, 1000);
    });

    console.log("通过 Promise 的方式，实现异步");
</script>
</body>

</html>
```

![2](https://i0.hdslb.com/bfs/album/1891f1c10ba44350cb747b01463178deb806c8bf.gif)

## 5.Promise.prototype.catch() 

由之前的例子可以看出，我们在使用 Promise 的时候，大部分情况下，我们只用 resolve() 方法（成功态），所以在 Promise 回调函数中我们常常省略 reject 函数参数，在 then 中我们常常省略第二个回调函数。

但是我们还是需要处理异步中的异常，所以 ES6 中提供了我们一个 `catch()` 方法专门用来处理 Promise 的异常部分（失败态）。

- catch 专门用来处理 rejected 状态

- catch 本质上是 then 的特例

```javascript
new Promise((resolve, reject) => {
    reject("失败");
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);   // 失败
});

// -------------------------------------
// 上面的代码本质上等同于
new Promise((resolve, reject) => {
    reject("失败");
}).then(res => {
    console.log(res);
}).then(null, err => {
    console.log(err);	// 失败
});
```

> 在 Promise 中，一但出现了错误状态，那么这个错误是不会消失的，会一直向下传递，直到遇到可以处理错误的函数。

由于 catch 是 then 的特例，所以 catch 依旧返回的是一个 Promise 对象，我们可以在 catch 后继续调用 then。

```javascript
new Promise((resolve, reject) => {
    reject("失败");
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);   // 失败
    return "测试";
}).then(res => {
   console.log(res);	// 测试 
});
```

> 一般总是建议，Promise 对象后面要跟一个或多个 catch 方法，这样可以处理 Promise 内部发生的错误！

## 6.Promise.prototype.finally()

 当 Promise 状态发生变化时，不论如何变化都会执行，不变化不执行。

- finally() 不能接收参数。

- finally 也是 then 的特例。

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

下面是一个例子，服务器使用 Promise 处理请求，然后使用`finally`方法关掉服务器。

```js
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。

```javascript
new Promise(resolve => {
    resolve("测试01");
}).finally(data => {
    console.log(data + " finally01");
    return new Promise((resolve, reject) => {
        reject("测试02");
    })
}).finally(data => {
    console.log(data + " finally02")
}).catch(err => {
    console.log("catch: " + err);
});

/*
undefined finally01
undefined finally02
catch: 测试02
*/

// 从以上示例可以看出：finally 可以接收正确状态或错误状态，但是不能接收参数。

// -------------------------------------
// finally 也是 then 的特例
// finally 等同于：
new Promise((resolve, reject) => {
    ...
}).then(res => {
    return res;
}, err => {
    return new Promise((resolve, reject) => {
        reject(err);
    })
})
```

`finally`：主要是用来处理一些必做操作，比如在操作数据库之后（无论成功与否）都要关闭数据库连接。

## 7.Promise.all()

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

下面是一个具体的例子。

```js
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

上面代码中，`promises`是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

```js
/*
Promise.all() 的状态变化与所有传入的 Promise 实例对象状态有关
用途举例：在用 Ajax 从后端接口获取数据的时候，如果全部获取到了，那么才处理，否则不处理。
*/

const delay = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

// 示例一：所有状态都变为 resolved
const p1 = delay(1000).then(() => {
    console.log('p1 完成了');
    return 'p1';
});
const p2 = delay(2000).then(() => {
    console.log('p2 完成了');
    return 'p2';
});
const p = Promise.all([p1, p2]);
p.then(res => {
    console.log(res + " 成功");
}, err => {
    console.log(err + " 失败");
});

/*
p1 完成了
p2 完成了
p1,p2 成功
*/
/*
解释：
1、Promise.all() 直接执行两个 Promise 实例
2、执行 p1，输出 p1 完成了
3、检测到 resolved，Promise.all() 继续执行
4、执行 p2，输出 p2 完成了
5、检测到 resolved，由于 Promise 已经全部执行完，所以执行 then 第一个回调输出 p1,p2 成功，Promise.all() 终止。
*/

// 示例二：出现一个 rejected 状态
const p1 = delay(1000).then(() => {
    console.log('p1 完成了');
    return Promise.reject('p1');
});
const p2 = delay(2000).then(() => {
    console.log('p2 完成了');
    return 'p2';
});
const p = Promise.all([p1, p2]);
p.then(res => {
    console.log(res + " 成功");
}, err => {
    console.log(err + " 失败");
});
/*
p1 完成了
p1 失败
p2 完成了
*/
/*
解释：
1、Promise.all() 直接执行两个 Promise 实例
2、执行 p1，输出 p1 完成了
3、检测到 rejected，Promise.all() 直接变为 rejected，执行 then 第二个回调输出 p1 失败，至此 Promise.all() 已经执行完毕。
4、由于 p2 延迟了两秒执行所以在后面输出（如果 p2 延时小于 p1，那么应该先输出 p2 完成了，然后在是 p1 完成了，p1 失败）
*/
```

## 8.Promise.resolve()和Promise.reject()

 以上两者都是 Promise 构造函数的方法。

> 下面我们以 Promise.resolve() 举例，Promise.reject() 同理。

 ```javascript
// Promise.resolve() 可以理解为普通成功状态的一种简写形式
new Promise(resolve => resolve('foo'));
// 简写
Promise.resolve('foo');
 ```

Promise.resolve() 与 Promise.reject() 的参数问题：

1、一般参数

```javascript
Promise.resolve('foo').then(data => {
    console.log(data);
})	// foo
```

2、特殊参数：Promise 作为参数

```javascript
const p1 = new Promise(resolve => {
    setTimeout(resolve, 1000, '我执行了');
    /*
    上述延时器写法相当于：
    setTimeout(()=>{
        resolve('我执行了');
    }, 1000);
     */
});
Promise.resolve(p1).then(data => {
    console.log(data);	// 等待一秒后，输出 '我执行了'
});

/*
当 Promise.resolve() 接收的是 Promise 对象时，直接返回这个 Promise 对象，什么都不做
*/

// 所以，以上代码等同于：
p1.then(data => {
   console.log(data); // 等待一秒后，输出 '我执行了'
});

// 验证
console.log(Promise.resolve(p1) === p1);	// true

// 由于 Promise.resolve() 可以理解为普通成功状态的一种简写形式，所以：
new Promise(resolve => resolve(p1)).then(data => {
   console.log(data); // 等待一秒后，输出 '我执行了'
});
```

3、特殊参数：具有 then 方法的对象（了解即可）

```javascript
const thenable = {
    then() {
        console.log('then');
    }
};
Promise.resolve(thenable).then(
    res => console.log("res " + res),
    err => console.log("err " + err)
);

/*
then
*/

// 当接收一个含 then 方法的对象时，Promise.resolve() 会直接调用 then 方法。

// 为什么不会执行 then 中的两个回调函数呢？
console.log(Promise.resolve(thenable));
/*
Promise { <pending> }
then
*/
// 可见，当接收一个含 then 方法的对象时，默认返回一个 Promise 并且是等待状态的，没有状态的变化，那么就不可能会执行 then 的回调函数
// 如果我们要改变这个返回的 Promise 对象的状态，并让 then 的回调对应处理的话，ES6 规定了以下写法：
const thenable02 = {
    then(resolve, reject) {
        console.log('then');
        resolve('then');
    }
};
Promise.resolve(thenable02).then(
    res => console.log("res " + res),
    err => console.log("err " + err)
);
/*
then
res then
*/
```

> 与 Promise.resolve() 不同，Promise.reject() 无论接收什么类型的参数，都会原封不动的向后传递！

## 9.Promise.race()

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

`Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为`reject`，否则变为`resolve`。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

上面代码中，如果 5 秒之内`fetch`方法无法返回结果，变量`p`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数。

## 10.Promise.allSettled()

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

`Promise.all()`方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

```js
const urls = [url_1, url_2, url_3];
const requests = urls.map(x => fetch(x));

try {
  await Promise.all(requests);
  console.log('所有请求都成功。');
} catch {
  console.log('至少一个请求失败，其他请求可能还没结束。');
}
```

上面示例中，`Promise.all()`可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。

为了解决这个问题，ES2020引入了`Promise.allSettled()`方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

`Promise.allSettled()`方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是`fulfilled`还是`rejected`），返回的 Promise 对象才会发生状态变更。

```js
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

上面示例中，数组`promises`包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），`removeLoadingIndicator()`才会执行。

该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是`fulfilled`，不会变成`rejected`。状态变成`fulfilled`后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。

```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

上面代码中，`Promise.allSettled()`的返回值`allSettledPromise`，状态只可能变成`fulfilled`。它的回调函数接收到的参数是数组`results`。该数组的每个成员都是一个对象，对应传入`Promise.allSettled()`的数组里面的两个 Promise 对象。

`results`的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。

```js
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
```

成员对象的`status`属性的值只可能是字符串`fulfilled`或字符串`rejected`，用来区分异步操作是成功还是失败。如果是成功（`fulfilled`），对象会有`value`属性，如果是失败（`rejected`），会有`reason`属性，对应两种状态时前面异步操作的返回值。

下面是返回值的用法例子。

```js
const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
```

## 11.Promise的应用

【异步加载图片】

异步加载：也称为图片的预加载。利用 js 代码提前加载图片，用户需要时可以直接从本地缓存获取，但是会增加服务器前端的压力。这样做可以提高用户的体验，因为同步加载大图片的时候，图片会一层一层的显示处理，但是经过预加载后，直接显示出整张图片。

```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Promise 的应用</title>
    <style>
        #img {
            width: 24%;
            padding: 24px;
        }
    </style>
</head>
<body>
<!-- 一般加载图片方式 -->
<!-- <img src="https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg" alt=""/> -->
<img src="" alt="" id="img">

<script>
    // 异步加载图片
    // 异步加载图片函数（参数：图片路径）
    const loadImgAsync = url => {
        // Promise 实现异步
        return new Promise((resolve, reject) => {
            // 创建一个图片对象
            const img = new Image();

            // 图片成功加载触发事件
            img.onload = () => {
                resolve(img);
            };

            // 图片加载失败触发事件
            img.onerror = () => {
                reject(new Error(`Could not load image at ${url}`));
            };

            // 这个放在 onload 与 onerror 之后
            // 一但给 img.src 赋值，那么便立马开始发送请求加载图片（在后台加载，页面上不会显示）
            // 注意：这里的 src 是 img 对象的属性，与 html 中 img 的 src 无关
            img.src = url;
        });
    };

    const imgDOM = document.getElementById('img');
    loadImgAsync('https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg')
        .then(img => {
            // 如果加载成功，那么把后台缓存的图片显示到页面上
            imgDOM.src = img.src;
        })
        .catch(err => {
            console.log(err);
        });
</script>
</body>
</html>
```

![image-20220528144323405](https://i0.hdslb.com/bfs/album/3d95f9d84019bfe212e1abec0eb135f92636a8ef.png)

