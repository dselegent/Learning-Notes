# 02 【Jest的基本使用】

## 1.快速入门

首先用你喜欢的软件包管理工具来安装 Jest：

- npm
- Yarn

```bash
npm install --save-dev jest
```

下面我们开始给一个假定的函数写测试，这个函数的功能是两数相加。首先创建 `sum.js` 文件：

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

接下来，我们根据上面的目标文件(sum.js)创建一个测试用例文件-- `sum.test.js`， 测试用例文件名称统一为`*.test.js`(后缀根据实际场景区分为.js或者.ts或者.tsx)

> **test(name, fn, timeout)**
>
> `test`有别名`it`，两个方法是一样的。
>
> - 第一个参数是你想要描述的测试用例名称; 
>
> - 第二个参数是包含测试期望的函数，也是测试用例的核心。
>
> - 第三个参数(可选)是超时时间，也就是超过多久将会取消测试（默认是5秒钟）
>
> **Note**: 如果fn返回的是个promise，Jest在完成测试前将会等待`Promise`达到`resolved`状态。具体情况本文下面也会讲到如何对异步代码进行测试。

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

将如下代码添加到 `package.json` 中：

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

> 为了提高效率，可以通过加启动参数的方式让 jest 持续监听文件的修改，而不需要每次修改完再重新执行测试用例
>
> 改写 `package.json`
>
> ```json
> "scripts": {
>     "test": "jest --watchAll"
> }
> ```

最后，运行 `yarn test` 或者 `npm test` ，Jest 将输出如下信息：

![image-20230124140352747](https://i0.hdslb.com/bfs/album/9d9eca4760721fe6a4b4239c60674ab2db352bf7.png)

**你刚才使用 Jest 成功地写出了第一个测试！**

在此测试中，使用了 `expect` 和 `toBe` 来检测两个值是否完全相同。若要了解其它使用 Jest 可以测试的内容，请参阅[使用匹配器(Matcher)](https://www.jestjs.cn/docs/using-matchers)。

就这样，基于jest的一个基础单元测试流程走好了，Jest的单元测试核心就是在`test`方法的第二个参数里面，expect方法返回一个期望对象，通过匹配器(例如toBe)进行断言，期望是否和你预期的一致，和预期一致则单元测试通过，不一致则测试无法通过，需要排除问题然后继续进行单元测试。

更多的配置以及命令行参数请参考[**官方文档**](https://link.juejin.cn?target=https%3A%2F%2Fjestjs.io%2Fdocs%2Fen%2Fgetting-started)下面开始讲解一些核心API。

## 2.其它配置项

### 2.1 生成基础配置文件

Jest 将根据你的项目提出一系列问题，并且将创建一个基础配置文件。文件中的每一项都配有简短的说明：

```bash
jest --init
```

### 2.2 使用 Babel

> nodejs 采用的是 CommonJS 的模块化规范，使用 require 引入模块；而 import 是 ES6 的模块化规范关键字。想要使用 import，必须引入 babel 转义支持，通过 babel 进行编译，使其变成 node 的模块化代码
>
> 为了能使用这些新特性，我们就需要使用 babel 把 ES6 转成 ES5 语法

要使用 [Babel](https://babeljs.io/)，请首先安装所需的依赖项：

- npm
- Yarn

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

在项目的根目录下创建 `babel.config.js` ，通过配置 Babel 使其能够兼容当前的 Node 版本。

`babel.config.js`

```javascript
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

*Babel 理想的配置取决于项目本身。* 请查阅 [Babel 官方文档](https://babeljs.io/docs/en/) 来获得更多详细信息。

### 2.3 使用 Typescript

1. 通过 `babel` 来支持 Typescript

   通过 Babel，Jest 能够支持 Typescript。首先要确保你遵循了上述 [使用 Babel](https://www.jestjs.cn/docs/getting-started#using-babel) 指引。接下来安装 `@babel/preset-typescript` 插件：

   ```bash
   npm install --save-dev @babel/preset-typescript
   ```

   然后将 `@babel/preset-typescript` 添加到 `babel.config.js` 中的 presets 列表中。

   `babel.config.js`

   ```javascript
   module.exports = {
     presets: [
       ['@babel/preset-env', {targets: {node: 'current'}}],
       '@babel/preset-typescript',
     ],
   };
   ```
   不过，将 TypeScript 和 Babel 一起使用时有一些 [注意事项]	(https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats) 。由于 	Babel 对 Typescript 的支持是通过代码转换（Transpilation）实现的，而 Jest 在运行时并不会对你的测试用例做类型检查。 如果你需要此功能，可以使用 [ts-jest](https://github.com/kulshekhar/ts-jest) ，或者单独（或作为构建流程的一部分）直接运行 TypeScript 编译器 [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 。

2. 通过 `ts-jest`

   [ts-jest](https://github.com/kulshekhar/ts-jest) 是一个支持Jest源映射的TypeScript预处理器，它允许您使用Jest测试用TypeScript编写的项目。

   ```bash
   npm install --save-dev ts-jest
   ```

   为了让Jest用`ts-Jest`转换TypeScript，您可能还需要创建一个 [配置](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation#jest-config-file) 文件。

3. 类型定义

   有两种方法可以为用 TypeScript 编写的测试文件键入[Jest 全局 API 。](https://www.jestjs.cn/docs/api)

   您可以使用 Jest 附带的类型定义，并且会在您每次更新 Jest 时更新。只需从`@jest/globals`包中导入 API：

   ```js
   import {describe, expect, test} from '@jest/globals';
   import {sum} from './sum';
   
   describe('sum module', () => {
     test('adds 1 + 2 to equal 3', () => {
       expect(sum(1, 2)).toBe(3);
     });
   });
   ```

   或者您可以选择安装[`@types/jest`](https://npmjs.com/package/@types/jest)软件包。它为 Jest 全局变量提供类型而无需导入它们。

   ```bash
   npm install --save-dev @types/jest
   ```

> `@types/jest`[是在DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest)维护的第三方库，因此可能尚未涵盖最新的 Jest 功能或版本。尝试尽可能匹配 Jest 的版本`@types/jest`。例如，如果您正在使用 Jest，`27.4.0`那么安装`27.4.x`of`@types/jest`是最理想的。

## 3.匹配器

Jest 使用“匹配器”让您以不同的方式测试值。本文档将介绍一些常用的匹配器。有关完整列表，请参阅[`expect`API 文档](https://www.jestjs.cn/docs/expect)。

### 3.1 公共匹配器

测试值的最简单方法是完全相等。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

在此代码中，`expect(2 + 2)`返回一个“期望”对象。除了对它们调用匹配器外，您通常不会对这些期望对象做太多事情。在此代码中，`.toBe(4)`是匹配器。当 Jest 运行时，它会跟踪所有失败的匹配器，以便它可以为您打印出不错的错误消息。

`toBe`用于`Object.is`测试完全相等。如果要检查对象的值，请`toEqual`改用：

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

`toEqual`递归检查对象或数组的每个字段。

和上面的toBe进行对比，toBe对比俩对象对比的是内存地址，toEqual比的是属性值。

您还可以测试匹配器的对立面：

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

`.not` 非常容易理解，一般就是反向测试

```js
test('two plus two is four', () => {
  expect(2 + 2).not.toBe(4);
});
```

### 3.2 真实性

在测试中，您有时需要区分`undefined`、`null`和`false`，但有时您不想区别对待它们。Jest 包含帮助程序，可让您明确说明自己想要什么。

- `toBeNull`仅匹配`null`
- `toBeUndefined`仅匹配`undefined`
- `toBeDefined`是相反的`toBeUndefined`
- `toBeTruthy`匹配`if`语句视为 true的任何内容
- `toBeFalsy`匹配`if`语句视为假的任何内容

例如：

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

您应该使用与您希望代码执行的操作最精确对应的匹配器。

### 3.3 数字

大多数比较数字的方法都有匹配器等价物。

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

对于浮点相等性，请使用`toBeCloseTo`而不是`toEqual`，因为您不希望测试依赖于微小的舍入误差。

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

### 3.4 字符串

您可以使用正则表达式检查字符串`toMatch`：

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

### 3.5 数组和可迭代对象

您可以使用以下方法检查数组或可迭代对象是否包含特定项目`toContain`：

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```

### 3.6 例外情况

如果要测试特定函数在调用时是否抛出错误，请使用`toThrow`.

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // 还可以使用必须包含在错误消息或正则表达式中的字符串
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // 或者您可以使用下面的regexp来匹配精确的错误消息
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

> 提示
>
> 抛出异常的函数需要在包装函数中调用，否则`toThrow`断言将失败。

## 4.测试异步代码

在JavaScript中执行异步代码是很常见的。 当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已执行完成，然后它可以转移到另一个测试。 Jest有若干方法处理这种情况。

### 4.1 回调

最常见的异步模式就是回调函数，例如下面的setTimeout方法，下面的测试用例无法通过，原因是Jest无法知道callback具体的调用时间，所以会造成测试已经结束，但是setTimeout的callback还没有执行。

```js
const callback = fn => {
  setTimeout(() => {
    fn('成功')
  }, 1000)
}

test('callback', () => {
  callback(data => {
    expect(data).toBe('成功')
  })
})
```

想要解决上面的问题，非常简单，很容易就会联想到消息通知机制，也就是在callback调用的时候通知Jest，表示当前测试用例通过，可以跑下一个测试。

test方法的第二个参数fn，可以添加一个done参数，done是一个方法，调用了done，就是通知Jest测试完成，当然如果你的测试用例中的done方法始终没有执行，那么你的测试也会失败（超时），所以最好的方式就是加上try catch。

```js
test('callback', done => {
  callback(data => {
    try {
      expect(data).toEqual('成功')
      done()
    } catch (error) {
      done(error)
    }
  })
})
```

> 如果在测试完成后没有调用`done`,如果测试出错也会通过。

### 4.2 Promise

如果你的代码使用了Promise， Jest提供了一种更加直接的方式去处理异步测试。在test第二个参数fn中直接返回一个promise，Jest就会等待这个promise达到`fulfilled`状态，如果达到了`fulfilled`状态，测试将会自动成功。

```js
function fetchPromiseData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      true ? resolve('成功') : reject(new Error('出错'))
    }, 2000)
  })
}

test('fetchPromiseData', () => {
  return fetchPromiseData().then(res => {
    expect(res).toBe('成功')
  })
})
```

> 注意要写`return`，不然测试出错也会通过。

### 4.3 Async/Await

可以在测试中使用`async`and `await`。要编写异步测试，请在传递给 `test`的函数前面使用关键字`async`。例如，`fetchData`可以使用以下方法测试相同的场景：

```js
const TEN = 10
const BASE = 5

function fetchData() {
  return new Promise((resolve, reject) => {
    const random = Math.random() * TEN
    random > BASE ? resolve(random) : reject(random)
  })
}

test('the random promise', async () => {
  expect.assertions(1) // expect的执行次数
  try {
    const random = await fetchData()
    expect(random).toBeGreaterThan(BASE)
  } catch (e) {
    expect(e).toBeLessThanOrEqual(BASE)
  }
})
```

## 5.生命周期钩子

通常在编写测试时，您需要在测试运行之前进行一些设置工作，并且需要在测试运行之后进行一些收尾工作。Jest 提供了辅助函数来处理这个问题。

### 5.1 重复设置 

如果你有一些工作需要重复做很多测试，你可以使用`beforeEach`和`afterEach`钩子。

例如，假设有几个测试与城市数据库交互。您有一个`initializeCityDatabase()`必须在每个这些测试之前调用的方法，以及一个`clearCityDatabase()`必须在每个这些测试之后调用的方法。你可以这样做：

```js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

`beforeEach`和`afterEach`可以以测试处理异步代码的相同方式处理异步代码——它们可以接受`done`参数或返回promise。例如，如果`initializeCityDatabase()`返回了一个在初始化数据库时解析的promise，我们希望返回该promise：

```js
beforeEach(() => {
  return initializeCityDatabase();
});
```

### 5.2 一次性设置

在某些情况下，您只需要在文件开头进行一次设置。当设置是异步的时，这可能会特别麻烦，因此您不能内联执行。Jest提供了`beforeAll`和`afterAll`钩子来处理这种情况。
例如，如果`initializeCityDatabase()`和`clearCityDatabase()`都返回了promise，并且城市数据库可以在测试之间重用，我们可以将测试代码更改为：

```js
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

### 5.3 范围界定

默认情况下，`beforeAll`和`afterAll`块应用于文件中的每个测试。您还可以使用描述块将测试分组在一起。当它们位于`describe`块内时，`beforeAll`和`afterAll`块仅适用于该描述块内的测试。
例如，假设我们不仅有一个城市数据库，还有一个食物数据库。我们可以为不同的测试进行不同的设置：

```js
// 应用于此文件中的所有测试
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // 仅适用于此描述块中的测试
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

请注意，顶级`beforeEach`在`describe`块中的`beforeEah`之前执行。它可能有助于说明所有钩子的执行顺序。

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

### 5.4 建议

如果测试失败，首先要检查的一件事应该是当测试是唯一运行的测试时，测试是否失败。要使用Jest仅运行一个测试，请将该`test`命令临时更改为`test.only`：

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

如果您有一个测试在作为较大套件的一部分运行时经常失败，但在单独运行时不会失败，那么很有可能是来自不同测试的东西干扰了这个测试。通常可以通过使用`beforeEach`清除某些共享状态来解决此问题。如果您不确定是否正在修改某些共享状态，也可以尝试记录数据的`beforeEach`。

