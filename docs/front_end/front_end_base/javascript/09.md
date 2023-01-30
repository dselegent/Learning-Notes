# 09 【标准库之Math对象和String对象】

## 1.Math对象

`Math`是 JavaScript 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在`Math`对象上调用。

`Math`对象提供以下一些静态方法。

- `Math.abs()`：绝对值
- `Math.ceil()`：向上取整
- `Math.floor()`：向下取整
- `Math.max()`：最大值
- `Math.min()`：最小值
- `Math.round()`：四舍五入
- `Math.random()`：随机数

### 1.1 Math.abs()

`Math.abs`方法返回参数值的绝对值。

```js
Math.abs(1) // 1
Math.abs(-1) // 1
```

### 1.2 Math.max()，Math.min()

`Math.max`方法返回参数之中最大的那个值，`Math.min`返回最小的那个值。如果参数为空, `Math.min`返回`Infinity`, `Math.max`返回`-Infinity`。

```js
Math.max(2, -1, 5) // 5
Math.min(2, -1, 5) // -1
Math.min() // Infinity
Math.max() // -Infinity
```

### 1.3 Math.floor()，Math.ceil()

`Math.floor`方法返回小于或等于参数值的最大整数（地板值）。

```js
Math.floor(3.2) // 3
Math.floor(-3.2) // -4
```

`Math.ceil`方法返回大于或等于参数值的最小整数（天花板值）。

```js
Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3
```

这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数。

```js
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2) // 3
ToInteger(3.5) // 3
ToInteger(3.8) // 3
ToInteger(-3.2) // -3
ToInteger(-3.5) // -3
ToInteger(-3.8) // -3
```

上面代码中，不管正数或负数，`ToInteger`函数总是返回一个数值的整数部分。

### 1.4 Math.round()

`Math.round`方法用于四舍五入。

```js
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1

// 等同于
Math.floor(x + 0.5)
```

注意，它对负数的处理（主要是对`0.5`的处理）。

```js
Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

### 1.5 Math.random()

`Math.random()`返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。

```js
Math.random() // 0.7151307314634323
```

任意范围的随机数生成函数如下。

```js
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5)
// 2.4942810038223864
```

任意范围的随机整数生成函数如下。

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

返回随机字符的例子如下。

```js
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // "NdQKOr"
```

上面代码中，`random_str`函数接受一个整数作为参数，返回变量`ALPHABET`内的随机字符所组成的指定长度的字符串。

## 2.String对象

### 2.1 概述

`String`对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

```js
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

s2.valueOf() // "abc"
```

上面代码中，变量`s1`是字符串，`s2`是对象。由于`s2`是字符串对象，`s2.valueOf`方法返回的就是它所对应的原始字符串。

字符串对象是一个类似数组的对象（很像数组，但不是数组）。

```js
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}

(new String('abc'))[1] // "b"
```

上面代码中，字符串`abc`对应的字符串对象，有数值键（`0`、`1`、`2`）和`length`属性，所以可以像数组那样取值。

除了用作构造函数，`String`对象还可以当作工具方法使用，将任意类型的值转为字符串。

```js
String(true) // "true"
String(5) // "5"
```

上面代码将布尔值`true`和数值`5`，分别转换为字符串。

### 2.2 实例属性

**String.prototype.length**

字符串实例的`length`属性返回字符串的长度。

```js
'abc'.length // 3
```

### 实例方法

[W3C JavaScript 字符串方法](https://www.w3school.com.cn/js/js_string_methods.asp)

> ES6中的字符串新方法  
>
>  **String.prototype.padStart(maxLength, fillString='')** 或 **String.prototype.padEnd(maxLength, fillString='')**来填充字符串；  

| 方法                  | 作用                                                         |
| --------------------- | ------------------------------------------------------------ |
|                       |                                                              |
| length                | 获取字符串的长度                                             |
| charAt()              | 根据索引获取指定的字符                                       |
| charCodeAt()          | 根据索引获取指定的字符编码                                   |
| String.fromCharCode() | 根据字符编码获取字符                                         |
| indexOf()             | 查找字符/子字符串在大字符串中**第一次出现的位置，找到了返回下标，找不到返回-1；** |
| lastIndexOf()         | 从一个字符串中检索指定内容  <br/> 如果找到该内容，则会返回其第一次出现的索引，如果没有找到则返回-1。  <br/>可以指定一个第二个参数，来表示开始查找的位置    indexOf()是从前向后找   lastIndexOf()是从后向前找 |
| slice(start,[end])    | 可以从一个字符串中截取指定的内容，并将截取到内容返回，不会影响原变量  <br/>参数：  <br/> 	第一个：截取开始的位置（包括开始）  <br/> 	第二个：截取结束的位置**（不包括结束）**  <br/> 		 可以省略第二个参数，如果省略则一直截取到最后  <br/> 	 可以传负数，如果是负数则从后往前数 |
| substr()              | 和slice()基本一致，不同的是它第二个参数不是索引，而是截取的数量 |

| 方法            | 功能                         |
| --------------- | ---------------------------- |
| `charAt()`      | 得到指定位置字符             |
| `substring()`   | 提取子串                     |
| `substr()`      | 提取子串                     |
| `slice()`       | 提取子串                     |
| `toUpperCase()` | 将字符串变为大写             |
| `toLowerCase()` | 将字符串变为小写             |
| `indexOf()`     | 检索字符串                   |
| `includes()`    | 判断子字符串是否存在         |
| `lastIndexOf()` | 从末尾检索字符串             |
| `trim()`        | 删除首尾空格                 |
| `trimStart()`   | 删除首部空格                 |
| `trimEnd()`     | 删除尾部空格                 |
| `match()`       | 匹配子字符串                 |
| `search()`      | 搜索子字符串的第一次出现位置 |
| `replace()`     | 替换匹配的子字符串           |
| `split()`       | 分割字符串变成数组           |
| `concat()`      | 连接两个字符串               |

### 11.3.1 charAt() 方法

`charAt()` 方法可以得到指定位置的字符。

字符串中的每个字符都按顺序编号，编号从 0 开始。

| `"`  | 我   | 喜   | 欢   | J    | S    | ,    | 我   | 也   | 喜   | 欢   | N    | O    | D    | E    | `"`  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|      | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   | 13   |      |

```javascript
"我喜欢JS，我也喜欢NODE".charAt(0);		// "我"
"我喜欢JS，我也喜欢NODE".charAt(5);		// "，"
"我喜欢JS，我也喜欢NODE".charAt(11);	// "O"
"我喜欢JS，我也喜欢NODE".charAt(99);	// ""
"我喜欢JS，我也喜欢NODE".charAt(-1);	// ""
```

这个方法完全可以用数组下标替代。

```js
'abc'.charAt(1) // "b"
'abc'[1] // "b"
```

如果参数为负数，或大于等于字符串的长度，`charAt`返回空字符串。

```js
'abc'.charAt(-1) // ""
'abc'.charAt(3) // ""
```

### 11.3.2 substring()、substr() 和 slice() 方法

**（1）`substring(a, b)` 方法得到从 a 开始到 b 结束（不包括 b 处）的子串** `[a, b)`

> 编程语言的区间一般都是：左闭右开

```javascript
"我喜欢JS，我也喜欢NODE".substring(3, 5);		// "JS"
"我喜欢JS，我也喜欢NODE".substring(10, 14);		// "NODE"
"我喜欢JS，我也喜欢NODE".substring(10, 99);		// "NODE"
"我喜欢JS，我也喜欢NODE".substring(-1, 4);		// "我喜欢J"
```

> 超出范围的部分，取到端点字符。

- substring(a, b) 方法如果省略第二个参数，返回的子串会一直到字符串的结尾

```javascript
"我喜欢JS，我也喜欢NODE".substring(6);		// "我也喜欢NODE"
```

- substring(a, b) 中，a 可以大于 b，数字顺序将自动调整为小数在前

> 应该没有人会这样用

```javascript
"我喜欢JS，我也喜欢NODE".substring(3, 5);		// "JS"
"我喜欢JS，我也喜欢NODE".substring(5, 3);		// "JS"
```

**（2）`substr(a, b)` 中，将得到从 a 开始的长度为 b 的子串**

```javascript
"我喜欢JS，我也喜欢NODE".substr(3, 2);		// "JS"
```

- substr(a, b) 中，b 可以省略，表示到字符串结尾

```javascript
"我喜欢JS，我也喜欢NODE".substr(3);		// "JS，我也喜欢NODE"
```

- substr(a, b) 中，a 可以是负数，表示倒数位置

> 倒数第一位为 -1，而不是 -0

```javascript
"我喜欢JS，我也喜欢NODE".substr(-4, 2);		// "NO"
```

**（3）`slice(a, b)` 方法得到从 a 开始到 b 结束（不包括 b 处）的子串**

> slice：切片

```javascript
"我喜欢JS，我也喜欢NODE".slice(3, 5);		// "JS"
```

- slice(a, b) 的参数 a 可以是负数（与 substring(a, b) 的区别）

```javascript
"我喜欢JS，我也喜欢NODE".slice(-4, -1);		// "NOD"
// (-4, -1)：从 倒数第4位 到 倒数第1位，不包括 倒数第1位
```

- slice(a, b) 中，参数 a 必须小于参数 b，否则便会返回一个空字符串

```javascript
"我喜欢JS，我也喜欢NODE".slice(5, 2);		// ""
```

### 11.3.3 toUpperCase() 和 toLowerCase() 方法

- `toUpperCase()` 转为大写
- `toLowerCase()` 转为小写

```javascript
"I Love You".toUpperCase();		// "I LOVE YOU"
"IMooc".toLowerCase();		    // "imooc"
```

> 注意：toUpperCase() 和 toLowerCase()，只是返回一个大小写格式，变量本身的值并没有改变。
>
> ```javascript
> var str = "I Love You";
> console.log(str.toUpperCase());		// "I LOVE YOU"
> console.log(str);				   // "I Love You"
> str = str.toUpperCase();
> console.log(str);				   // "I LOVE YOU"
> ```

### 11.3.4 indexOf()、includes()和lastIndexOf() 方法

**(1) indexOf()**

`indexOf()` 方法返回某个指定的字符串值在字符串中首次出现的位置

如果要检索的字符串没有出现，则返回 `-1`

```javascript
"abcdebb".indexOf("b");		// 1
"abcdebb".indexOf("deb");	// 3
"abcdebb".indexOf("m");		// -1
```

**(2) includes()**

ES6新增

includes(string)  此函数检查字符串**是否包含子字符串**，返回布尔值。

使用方法和indexOf一样

**(3) lastIndexOf()**

`lastIndexOf`方法的用法跟`indexOf`方法一致，主要的区别是`lastIndexOf`从尾部开始匹配，`indexOf`则是从头部开始匹配。

```js
'hello world'.lastIndexOf('o') // 7
```

另外，`lastIndexOf`的第二个参数表示从该位置起向前匹配。

```js
'hello world'.lastIndexOf('o', 6) // 4
```

### 11.3.5 trim()、trimStart()、trimEnd() 方法

```javascript
// 删除首尾空格
console.log("---" + " 123 ".trim() + "---");
// 删除首部空格
console.log("---" + " 123 ".trimStart() + "---");
// 删除尾部空格
console.log("---" + " 123 ".trimEnd() + "---");

/*
---123---
---123 ---
--- 123---
*/
```

### 11.3.6 match() 方法

`match`方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回`null`。

```js
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null
```

返回的数组还有`index`属性和`input`属性，分别表示匹配字符串开始的位置和原始字符串。

```js
var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"
```

`match`方法还可以使用正则表达式作为参数，以后讲正则会说到。

### 11.3.7 search() 方法和replace() 方法

`search`方法的用法基本等同于`match`，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回`-1`。

```js
'cat, bat, sat, fat'.search('at') // 1
```

`search`方法还可以使用正则表达式作为参数，以后讲正则会说到。

`replace`方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有`g`修饰符的正则表达式）。

```js
'aaa'.replace('a', 'b') // "baa"
```

`replace`方法还可以使用正则表达式作为参数，以后讲正则会说到。

### 11.3.8 split() 方法

`split`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

```js
'a|b|c'.split('|') // ["a", "b", "c"]
```

如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。

```js
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
```

如果省略参数，则返回数组的唯一成员就是原字符串。

```js
'a|b|c'.split() // ["a|b|c"]
```

如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。

```js
'a||c'.split('|') // ['a', '', 'c']
```

如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。

```js
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]
```

`split`方法还可以接受第二个参数，限定返回数组的最大成员数。

```js
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
'a|b|c'.split('|', 3) // ["a", "b", "c"]
'a|b|c'.split('|', 4) // ["a", "b", "c"]
```

上面代码中，`split`方法的第二个参数，决定了返回数组的成员数。

`split`方法还可以使用正则表达式作为参数，以后讲正则会说到。

### 11.3.9 concat() 方法

`concat`方法用于连接两个字符串，返回一个新字符串，不改变原字符串。

```js
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"
```

该方法可以接受多个参数。

```js
'a'.concat('b', 'c') // "abc"
```

如果参数不是字符串，`concat`方法会将其先转为字符串，然后再连接。

```js
var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // "123"
one + two + three // "33"
```

上面代码中，`concat`方法将参数先转成字符串再连接，所以返回的是一个三个字符的字符串。作为对比，加号运算符在两个运算数都是数值时，不会转换类型，所以返回的是一个两个字符的字符串。