# 11 【标准库之JSON对象 JSON5】

## 1.JSON 格式

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

相比 XML 格式，JSON 格式有两个显著的优点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准。

每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值。

JSON 对值的类型和格式有严格的规定。

> 1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
> 2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。
> 3. 字符串必须使用双引号表示，不能使用单引号。
> 4. 对象的键名必须放在双引号里面。
> 5. 数组或对象最后一个成员的后面，不能加逗号。

以下都是合法的 JSON。

```js
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
```

以下都是不合法的 JSON。

```js
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用 undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象
```

注意，`null`、空数组和空对象都是合法的 JSON 值。

**JSON 对象的方法**

`JSON`对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：`JSON.stringify()`和`JSON.parse()`。

## 2.JSON.stringify()

### 2.1 基本用法

`JSON.stringify()`方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被`JSON.parse()`方法还原。

```js
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'
```

上面代码将各种类型的值，转成 JSON 字符串。

注意，对于原始类型的字符串，转换结果会带双引号。

```js
JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
```

上面代码中，字符串`foo`，被转成了`"\"foo\""`。这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。

```js
JSON.stringify(false) // "false"
JSON.stringify('false') // "\"false\""
```

上面代码中，如果不是内层的双引号，将来还原的时候，引擎就无法知道原始值是布尔值还是字符串。

如果对象的属性是`undefined`、函数或 XML 对象，该属性会被`JSON.stringify()`过滤。

```js
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```

上面代码中，对象`obj`的`a`属性是`undefined`，而`b`属性是一个函数，结果都被`JSON.stringify`过滤。

如果数组的成员是`undefined`、函数或 XML 对象，则这些值被转成`null`。

```js
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

上面代码中，数组`arr`的成员是`undefined`和函数，它们都被转成了`null`。

正则对象会被转成空对象。

```js
JSON.stringify(/foo/) // "{}"
```

`JSON.stringify()`方法会忽略对象的不可遍历的属性。

```js
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // "{"foo":1}"
```

上面代码中，`bar`是`obj`对象的不可遍历属性，`JSON.stringify`方法会忽略这个属性。

### 2.2 第二个参数

`JSON.stringify()`方法还可以接受一个数组，作为第二个参数，指定参数对象的哪些属性需要转成字符串。

```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

上面代码中，`JSON.stringify()`方法的第二个参数指定，只转`prop1`和`prop2`两个属性。

这个类似白名单的数组，只对对象的属性有效，对数组无效。

```js
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"
```

上面代码中，第二个参数指定 JSON 格式只转`0`号属性，实际上对数组是无效的，只对对象有效。

第二个参数还可以是一个函数，用来更改`JSON.stringify()`的返回值。

```js
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

上面代码中的`f`函数，接受两个参数，分别是被转换的对象的键名和键值。如果键值是数值，就将它乘以`2`，否则就原样返回。

注意，这个处理函数是递归处理所有的键。

```js
var obj = {a: {b: 1}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(obj, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'
```

上面代码中，对象`obj`一共会被`f`函数处理三次，输出的最后那行是`JSON.stringify()`的默认输出。第一次键名为空，键值是整个对象`obj`；第二次键名为`a`，键值是`{b: 1}`；第三次键名为`b`，键值为1。

递归处理中，每一次处理的对象，都是前一次返回的值。

```js
var obj = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(obj, f)
// "{"b": 4}"
```

上面代码中，`f`函数修改了对象`obj`，接着`JSON.stringify()`方法就递归处理修改后的对象`obj`。

如果处理函数返回`undefined`或没有返回值，则该属性会被忽略。

```js
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: "abc", b: 123 }, f)
// '{"b": 123}'
```

上面代码中，`a`属性经过处理后，返回`undefined`，于是该属性被忽略了。

### 2.3 第三个参数

`JSON.stringify()`还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。

默认返回的是单行字符串，对于大型的 JSON 对象，可读性非常差。第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）。

```js
// 默认输出
JSON.stringify({ p1: 1, p2: 2 })
// JSON.stringify({ p1: 1, p2: 2 })

// 分行输出
JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
// {
// 	"p1": 1,
// 	"p2": 2
// }
```

上面例子中，第三个属性`\t`在每个属性前面添加一个制表符，然后分行显示。

第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。

```js
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/
```

## 3.JSON.parse()

`JSON.parse()`方法用于将 JSON 字符串转换成对应的值。

```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

如果传入的字符串不是有效的 JSON 格式，`JSON.parse()`方法将报错。

```js
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。

为了处理解析错误，可以将`JSON.parse()`方法放在`try...catch`代码块中。

```js
try {
  JSON.parse("'String'");
} catch(e) {
  console.log('parsing error');
}
```

`JSON.parse()`方法可以接受一个处理函数，作为第二个参数，用法与`JSON.stringify()`方法类似。

```js
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```

上面代码中，`JSON.parse()`的第二个参数是一个函数，如果键名是`a`，该函数会将键值加上10。

## 4.JSON5

JSON 格式可以说是目前最流行的数据传输格式了，被广泛应用于前后端通信，尤其是在 SPA 应用中，JSON 数据通过 HTTP 协议进行传输，具有体积小、易序列化、可读性好等优点。（当然，这些优点是相对的，例如体积小是相对于 XML 而言的，如果跟 protobuf 比，那体积就大多了。）
JSON 虽好，但是仍有两大痛点让开发者苦恼不已：

- 不能添加注释（这个不能忍）
- 序列化之后的 key 被加上了双引号（体积变大了）

### 4.1 JSON如何添加注释 

目前的标准是不能添加注释，如果想添加的话，只能曲线救国了，例如我是这么干的：

```json
{
 "----------base----------": "通用模块变量定义",
 "common": {
 "object_not_exit": "对象 ${id} 不存在！",
 "invalid_username_or_password": "用户名或密码错误！"
 },
 "----------sms----------": "短信模块相关变量",
 "sms": {
 "template_missing_parameters": "模板缺少变量！",
 "param_length_limit": "参数超出长度限制！"
 }
}

```

总结下来一般有下面三种方法：

1、使用约定的 key 作为注释字段：
如以 //， _comment，#####，—--— (# 或 - 的个数自定) 作为注释的 key 等。

2、使用重名 key 作为注释：
即每个 key，使用两次，第1次做注释，第2次做实际属性。

3、使用字段 key 加前缀做注释 key：
常用的前缀有 #, _ 等。

### 4.2 能否去掉 key 中的双引号 

序列化之后的 key 被加上了双引号，例如：

```json
const obj = { name: 'keliq', age: 12 }
console.log(JSON.stringify(obj))
// {"name":"keliq","age":12}
```

仔细观察可以发现，对象的 key 是没有双引号的，但是序列化之后，两边都被加上了引号，导致字符数量变多了，那问题就来了：

- 为什么要给 key 加双引号？
- 能不能去掉 key 里面的双引号？

这里先说一个历史背景：

```json
在 ECMAScript 3 中，保留字是不能作为对象的 key 的，例如：
{function: 0} // 语法错误
{if: 0} // 语法错误
{true: 0} // 语法错误

只能给 key 添加双引号或单引号：
{"function": 0} // Ok
{"if": 0} // Ok
{"true": 0} // Ok
```

但是在 ES5 之后，保留字也是可以作为 key 的了，因此在不考虑向后兼容的情况下，如果能把 JSON 对象表示成跟 JavaScript 对象一模一样，只是把中间的空格、换行等删掉该多好呀！

### 4.3 JSON5 解决了什么问题？

- 你想要的，它都有！这就是 [JSON5 ](https://json5.org/)标准，它有以下特性：

  **对象**

  对象的 key 可以跟 JavaScript 中对象 key 完全一致
  末尾可以有一个逗号

  **数组**

  末尾可以有一个逗号

  **字符串**

  - 字符串可以用单引号
  - 字符串可以用反引号
  - 字符串可以用转义字符

  **数字**

  - 数字可以是 16 进制
  - 数字可以用点开头或结尾
  - 数字可以表示正无穷、负无穷和NaN.
  - 数字可以用加号开头

  **注释**

  支持单行和多行注释

  **空格**

  允许多余的空格

**可以看到，JSON5 比 JSON 强大很多，是 JSON 的超集，就好比 TypeScript 相较于 JavaScript。**

### 4.4 JSON5的使用

使用 Node.js 环境，通过一个简单示例，展示JSON5的使用方式以及新的功能。

1. 新建文件test.js

2. 安装 json5
   ```shell
   pnpm add json5
   ```

`test.js`

```js
const JSON5 = require('json5')

const obj = {
    // comments
    /* 
        multi 
        comments
    */
    unquoted: 'and you can quote me on that',
    singleQuotes: 'I can use "double quotes" here',
    lineBreaks: "Look, Mom! \
  No \\n's!",
    hexadecimal: 0xdecaf,
    leadingDecimalPoint: .8675309, andTrailing: 8675309.,
    positiveSign: +1,
    trailingComma: 'in objects', andIn: ['arrays',],
    "backwardsCompatible": "with JSON",
}
const res = JSON5.stringify(obj)

console.log(res)
console.log("***************************");
console.log(JSON5.parse(res))

/* 输出结果如下：

{unquoted:'and you can quote me on that',singleQuotes:'I can use "double quotes" here',lineBreaks:"Look, Mom!   No \\n's!",hexadecimal:912559,leadingDecimalPoint:0.8675309,andTrailing:8675309,positiveSign:1,trailingComma:'in objects',andIn:['arrays'],backwardsCompatible:'with JSON'}
***************************
{
  unquoted: 'and you can quote me on that',
  singleQuotes: 'I can use "double quotes" here',
  lineBreaks: "Look, Mom!   No \\n's!",
  hexadecimal: 912559,
  leadingDecimalPoint: 0.8675309,
  andTrailing: 8675309,
  positiveSign: 1,
  trailingComma: 'in objects',
  andIn: [ 'arrays' ],
  backwardsCompatible: 'with JSON'
}

*/
```

**运行**

```shell
node test.js
```

