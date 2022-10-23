# 6.接口（ interface）

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

## 6.1 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]以外，也常用于对「对象的形状（Shape）」进行描述。

## 6.2 基本使用

当一个对象类型被多次使用时，一般会使用接口（`interface`）来描述对象的类型，达到复用的目的

- 解释：
  1. 使用 `interface` 关键字来声明接口
  2. 接口名称(比如，此处的 Person)，可以是任意合法的名称
  3. 声明接口后，直接使用接口名称作为类型

```typescript
interface IPerson {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中，我们定义了一个接口 `IPerson`，接着定义了一个变量 `tom`，它的类型是 `IPerson`。这样，我们就约束了 `tom` 的形状必须和接口 `IPerson` 一致。

接口一般首字母大写。

定义的变量比接口少了一些属性是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

多一些属性也是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见，**赋值的时候，变量的形状必须和接口的形状保持一致**。

## 6.3 可选 | 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

## 6.4 任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
    name: string;
    age?: number; // 这里真实的类型应该为：number | undefined
    [propName: string]: string | number | undefined;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 6.5 绕开额外属性检查的方式

### 6.5.1 类型断言

类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。

```typescript
interface Props { 
  name: string; 
  age: number; 
  money?: number;
}

let p: Props = {
  name: "兔神",
  age: 25,
  money: -100000,
  girl: false
} as Props; // OK
```

### 6.5.2 索引签名

> 使用场景：当无法确定对象中有那些属性(或对象中可以出现任意多的属性)
> 使用[key:string] 来约束该接口中允许出现的属性名称。表示只要是string类型的属性名称，都可以出现在对象中
> key只是一个占位符，可以换成任意合法的变量名称

```typescript
 interface AnyObject {
    [key:string]:number
}
let obj1:AnyObject ={
    '1':11,
    // 's':'ss'
}
//  ||
//  \/
interface AnyObject1<T> {
    [key:string]:T
}
let obj2:AnyObject1<number> ={
    '1':11,
    // 's':'ss'
}
```

数组接口也是使用了索引签名类型

```ts
interface MyArray<T> {
    [n:number]:T
}

let mayy:MyArray<number> = [1,2]
```

> MyArray模拟了原生的数组接口 并使用[n:number]来作为索引签名类型
> 该签名表示：只要是number类型的键/索引都可以出现在数组中，或者说数组中可以有任意多个元素
> 同时也符合数组索引十number类型的这一前提

# 7. interface vs type

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。

> type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

## 7.1 Objects / Functions

两者都可以用来描述对象或函数的类型，但是语法不同。

**Interface**

```typescript
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

**Type**

```typescript
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

## 7.2 Other Types

与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

```typescript
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```

## 7.3 接口可以定义多次,类型别名不可以

与类型别名不同，接口可以定义多次，会被自动合并为单个接口。

```typescript
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };

```

## 7.4 扩展

### 7.4.1 基本使用

- 如果两个接口之间有相同的属性或方法，可以将**公共的属性或方法抽离出来，通过继承来实现复用**
- 比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐

```ts
interface Point2D { x: number; y: number }
interface Point3D { x: number; y: number; z: number }
```

- 更好的方式:

```ts
interface Point2D { x: number; y: number }
// 扩展 Point2D
interface Point3D extends Point2D {
  z: number
}
```

- 解释：
  1. 使用 `extends`(扩展)关键字实现了接口 Point3D 继承 Point2D
  2. 扩展后，Point3D 就有了 Point2D 的所有属性和方法(此时，Point3D 同时有 x、y、z 三个属性)

### 7.4.2 和type的区别

两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。

接口的扩展就是继承，通过 `extends` 来实现。类型别名的扩展就是交叉类型，通过 `&` 来实现。

**接口扩展接口**

```typescript
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}
```

**类型别名扩展类型别名**

```typescript
type PointX = {
    x: number
}

type Point = PointX & {
    y: number
}
```

**接口扩展类型别名**

```typescript
type PointX = {
    x: number
}
interface Point extends PointX {
    y: number
}
```

**类型别名扩展接口**

```typescript
interface PointX {
    x: number
}
type Point = PointX & {
    y: number
}
```