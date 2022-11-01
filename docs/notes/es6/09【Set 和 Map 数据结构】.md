# 09【Set 和 Map 数据结构】

## 1.什么是 Set？

Set 是一系列无序、没有重复值的数据集合。

> 数组是一系列有序（下标索引）的数据集合。

```javascript
const s = new Set();
s.add(1);
s.add(2);

// Set 中不能有重复的成员
s.add(1);
console.log(s);		// Set(2) { 1, 2 }

// Set 没有下标去标识每一个值，所以 Set 是无序的，也不能像数组那样通过下标去访问 Set 的成员。
```

## 2.Set 实例的方法和属性

### 2.1 add 方法

```javascript
const s = new Set();
s.add(0);
// 可以连写
s.add(1).add(2).add(2).add(3);
console.log(s);		// Set(4) { 0, 1, 2, 3 }
```

### 2.2 has 方法

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);
console.log(s.has(1));	// true
console.log(s.has(4));	// false
```

### 2.3 delete 方法

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);
s.delete(2);
// 使用 delete 删除不存在的成员，什么都不会发生，也不会报错
s.delete(4);
console.log(s);	// Set(3) { 0, 1, 3 }
```

### 2.4 clear 方法

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);
s.clear();
console.log(s);	// Set(0) {}
```

### 2.5 forEach 方法

作用：用于遍历 Set 的（按照成员添加进集合的顺序遍历）。

forEach 方法可以接受两个参数，第一个是：回调函数，第二个是：指定回调函数的 this 指向。

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);

s.forEach(function (value, key, set) {
    // Set 中 value = key，原因：好多数据结构都有 forEach 方法，为了方便统一，所以参数是统一的，但是参数的意义各有不同
    // set 就是 s 本身
    console.log(value, key, set === s);
    console.log(this);
});

/*
0 0 true
Window
1 1 true
Window
2 2 true
Window
3 3 true
Window 
*/
```

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);

s.forEach(function (value, key, set) {
    // Set 中 value = key，原因：好多数据结构都有 forEach 方法，为了方便统一，所以参数是统一的，但是参数的意义各有不同
    // set 就是 s 本身
    console.log(value, key, set === s);
    console.log(this);
}, document);

/*
0 0 true
#document
1 1 true
#document
2 2 true
#document
3 3 true
#document
*/
```

### 2.6 size 属性

```javascript
const s = new Set();
s.add(0);
s.add(1).add(2).add(2).add(3);

console.log(s.size);	// 4
```

## 3.Set 构造函数的参数

- 数组
- 字符串、arguments、NodeList、Set 等

【数组】

```javascript
const s = new Set([1, 2, 1]);
console.log(s);		// Set(2) { 1, 2 }
```

【字符串】

```javascript
console.log(new Set('hiii'));	// Set(2) { 'h', 'i' }
```

【arguments】

```javascript
function func() {
    console.log(new Set(arguments));
}
func(1, 2, 1);	// Set(2) { 1, 2 }
```

【NodeList】

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>1</p>
<p>2</p>
<p>3</p>
<script>
    console.log(new Set(document.querySelectorAll('P')));
</script>
</body>
</html>
```

【Set】

```javascript
const s = new Set([1, 2, 1]);
console.log(new Set(s));	// Set(2) { 1, 2 }
console.log(s);				// Set(2) { 1, 2 }
// 这也是复制一个 Set 的方法
```

## 4. Set 注意事项

【Set 如何判断重复】

- Set 对重复值的判断基本遵循严格相等（===）

- 但是对于 NaN 的判断与 === 不同，Set 中 NaN 等于 NaN

```javascript
const s = new Set();
s.add({}).add({});
console.log({} === {});	 // false
console.log(s);			 // Set(2) { {}, {} }
```

【什么时候使用 Set】

- 数组或字符串需要去重时
- 不需要通过下标访问，只需要遍历时
- 为了使用 Set 提供的方法和属性时

## 5.Set 的应用

【数组去重】

```javascript
const s = new Set([1, 2, 1]);
console.log(s);			// Set(2) { 1, 2 }
console.log([...s]);	// [ 1, 2 ]
```

【字符串去重】

```javascript
const s = new Set('abbacbd');
console.log(s);					// Set(4) { 'a', 'b', 'c', 'd' }
console.log([...s].join(''));	// abcd
```

【存放 DOM 元素】

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>1</p>
<p>2</p>
<p>3</p>
<script>
    // 这里使用 Set 是因为我们不需要通过下标去访问，只需直接遍历即可
    const s = new Set(document.querySelectorAll('p'));
    s.forEach(function (elem) {
        elem.style.color = 'red';
    });
</script>
</body>
</html>
```

【遍历】

数组的`map`和`filter`方法也可以间接用于 Set 了。

```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```

因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## 6.什么是 Map？

Map 可以理解为：“映射”。

Map 和 对象 都是键值对的集合。

```javascript
// 键 ——> 值，key ——> value
// 对象：
const person = {
    name: 'alex',
    age: 18
};

// Map：
const m = new Map();
m.set('name', 'alex');
m.set('age', 18);
console.log(m);		// Map(2) { 'name' => 'alex', 'age' => 18 }

// Map 和 对象 的区别：
// 对象一般用字符串当作 “键”（当然在书写时字符串键的引号可以去掉）.
// Map 中的 “键” 可以是一切类型。
const m = new Map();
m.set(true, 'true');
m.set({}, 'object');
m.set(new Set([1, 2]), 'set');
m.set(undefined, 'undefined');
console.log(m);
/*
Map(4) {
  true => 'true',
  {} => 'object',
  Set(2) { 1, 2 } => 'set',
  undefined => 'undefined'
}
*/
```

## 7.Map 实例的方法和属性

### 7.1 set 方法

`set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

```js
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
```

`set`方法返回的是当前的`Map`对象，因此可以采用链式写法。

```js
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

### 7.2 get 方法

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

```javascript
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
```

### 7.3 has 方法

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

### 7.4 delete 方法

`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

```javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```

### 7.5 clear 方法

`clear`方法清除所有成员，没有返回值。

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### 7.6 forEach 方法

```javascript
m.forEach(function (value, key, map) {
    console.log(this);
}, document);
```

### 7.7 size 属性

`size`属性返回 Map 结构的成员总数。

```javascript
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
```

## 8.Map 构造函数的参数

- 二维数组
- Set、Map 等

【二维数组】

```javascript
console.log(new Map([
    ['name', 'alex'],
    ['age', 18]
]));
// Map(2) { 'name' => 'alex', 'age' => 18 }
```

【Set、Map】

```javascript
// Set
// Set 中也必须体现出键和值
const s = new Set([
    ['name', 'alex'],
    ['age', 18]
]);
console.log(new Map(s));
console.log(s);
// Map(2) { 'name' => 'alex', 'age' => 18 }
// Set(2) { [ 'name', 'alex' ], [ 'age', 18 ] }

// Map
const m = new Map([
    ['name', 'alex'],
    ['age', 18]
]);
console.log(m);
const m2 = new Map(m);
console.log(m2, m2 === m);
// Map(2) { 'name' => 'alex', 'age' => 18 }
// Map(2) { 'name' => 'alex', 'age' => 18 } false
// Map 复制的方法
```

## 9.Map 注意事项

【Map 如何判断键名是否相同】

> 在 Set 中遇到重复的值直接去掉后者，而 Map 中遇到重复的键值则是后面的覆盖前面的。

- 基本遵循严格相等（===）
- Map 中 NaN 也是等于 NaN

【什么时候使用 Map】

- 如果只是需要键值对结构
- 需要字符串以外的值做键
- 对象一般用在模拟实体上

## 10.Map 的应用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>1</p>
<p>2</p>
<p>3</p>
<script>
    const [p1, p2, p3] = document.querySelectorAll('p');
    const m = new Map([
        [p1, {
            color: 'red',
            backgroundColor: 'yellow',
            fontSize: '40px'
        }],
        [p2, {
            color: 'green',
            backgroundColor: 'pink',
            fontSize: '40px'
        }],
        [p3, {
            color: 'blue',
            backgroundColor: 'orange',
            fontSize: '40px'
        }]
    ]);
    m.forEach((propObj, elem) => {
        for (const p in propObj) {
            elem.style[p] = propObj[p];
        }
    });	// 由于不需要改变 this 指向，所以可以使用箭头函数
</script>
</body>
</html>
```

![image-20220327154158420](https://i0.hdslb.com/bfs/album/c8a469a0e6e61c621b19216d036cd405d3fe578d.png)

