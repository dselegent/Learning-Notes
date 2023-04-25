# 12 【操作mongodb数据库】

## 1.简介

- 1.Mongoose是一个让我们可以通过Node来操作MongoDB的模块。
- 2.Mongoose是一个对象文档模型(ODM)库,它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处
- 3.mongoose中的对象：
  - Schema  模式对象（Schema对象定义约束了数据库中的文档结构）
  - Model  模型对象（Model对象作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collection）
  - Document  文档对象（Document表示集合中的具体文档，相当于集合中的一个具体的文档）

**mongoose的好处**

> 1. 可以为文档创建一个模式结构(Schema)
> 2. 可以对模型中的对象/文档进行验证
> 3. 数据可以通过类型转换转换为对象模型
> 4. 可以使用中间件来应用业务逻辑挂钩
> 5. 比Node原生的MongoDB驱动更容易

**安装**

```bash
npm i -S mongoose
```

## 2.连接数据库

`config/db.config.js`

```js
// 1.引入mongoose
const mongoose = require("mongoose");

// 2.连接mongodb数据库
// 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
/*
mongoose.connect('mongodb://数据库地址:端口号/数据库名',{useMongoClient:true})
如果端口号是默认端口号(27017)则可以省略不写
*/
mongoose.connect('mongodb://127.0.0.1:27017/ds2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// 3.监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once("open", function () {
    console.log("连接成功");
});
// 绑定数据库连接失败事件
mongoose.connection.once("close", function () {
    console.log("数据库连接已经断开");
});

// 4.断开数据库连接(一般不用)
mongooes.disconnect();
```

> `注:MongoDB数据库，一般情况下，只需要连接一次，连接一次后，除非项目停止服务器关闭，否则连接一般不会断开`

**在bin目录下的www文件中使用直接require(“../config/db.config.js”)进行数据库连接的启动**

![image-20221103204502381](https://i0.hdslb.com/bfs/album/585a2a31647d3662dd1af7fd3aa86f639073e082.png)

## 3.创建模式对象和模型对象

数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema会映射到 mongodb 中的一个 collection，它不具备操作数据库的能力。

- 每个 schema 都会映射到一个 MongoDB collection 并定义这个collection里的文档结构
- 支持的字段类型

| 类型     | 作用         |
| -------- | ------------ |
| String   | 定义字符串   |
| Number   | 定义数字     |
| Date     | 定义日期     |
| Buffer   | 定义二进制   |
| Boolean  | 定义布尔值   |
| Mixed    | 定义混合类型 |
| ObjectId | 定义对象ID   |
| Array    | 定义数组     |

`model/UserModel.js`

```js
const mongoose = require("mongoose")
const Schema=mongooes.Schema;
//创建模式对象
const UserType=new Schema({
    name:{
           type: 'string',
           //添加约束，保证数据的完整性，让数据按规矩统一
           require: true
        },
    age:Number,
    gender:{
        type:String,
        // 默认值
        default:'female'
    },
    address:String
})

//创建模型对象
//通过Schema来创建Model
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName,schema)
//建立映射关系，students是集合,mongoose会自动将集合变成复数比如student会变成students
//大写也会被自动转换为小写，比如Users会变成users
const UserModel=mongoose.model("UserModel",UserType，"user"); 
//第一个参数表示创建的集合的名称，第二个参数表示利用的模式对象，第三个参数是强行指定集合名称

module.exports  = UserModel 
```

![image-20220619145550360](https://img-blog.csdnimg.cn/609a88b5e2f840269695406093bf1225.png)

## 4.文档新增

### 4.1 save()

- 操作的是文档

案例：

```js
var mongoose = require('mongoose')
const UserModel = require('../model/UserModel');

//链式调用 通过new 一个Model创建一个 document
new UserModel({name:"小明",age:18}).save((err,docs) => {
    if(!err){
        console.log(docs)
        res.send({
          code: 200,
          data: {
            id: docs._id,
          },
        })
        //{ _id: 6017bd1cf4cc8544d8ed2a8a, name: '小明', age: 18, __v: 0 }
    }
})   
```

### 4.2 create()

- 操作模型

- Model.create(doc(s), [callback])

- 参数：

  [doc(s)]：文档对象或文档对象数组

  [callback]：回调函数

```js
var mongoose = require('mongoose')
const UserModel = require('../model/UserModel');

UserModel.create({name:"小明",age:18},{name:"小红",age:10},(err,doc1,doc2) => {
   if(!err){
        console.log(doc1)
        //{ _id: 6017be2d77c8dd01242624bb, name: '小明', age: 18, __v: 0 }
        console.log(doc2)
        //{ _id: 6017be2d77c8dd01242624bc, name: '小红', age: 10, __v: 0 }
    }
})
```

其它：

```js
//Model.createOne(doc, [callback]);		创建一个对象
//Model.createMany(doc, [callback]);		创建多个对象
//	-doc是需要插入的文档
//	-callback(err) 是回调函数，可以用来提示是否创建成功了
```

### 4.3 insertMany()

- Model.insertMany(doc(s), [options], [callback])
- 返回值为一个数组
- 案例：

```js
UserModel.insertMany({name:"小明",age:18},{name:"小芳",age:14},(err,docs) => {
   if(!err){
        console.log(docs)
        /*[{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
           { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }]*/
    }
})
```

## 5.文档查询

| _id                      | name | grades | __v  |
| ------------------------ | ---- | ------ | ---- |
| 6017befb5c36d64d08b72576 | 小明 | 68     | 0    |
| 6017befb5c36d64d08b72577 | 小芳 | 94     | 0    |
| 6017c455ba09d355a49ec8eb | 小红 | 52     | 0    |
| 6017c455ba09d355a49ec8ec | 小刚 | 46     | 0    |

### 5.1 find()

- Model.find(conditions, [projection], [options], [callback])

- 参数

​		conditions：查询条件

​		[projection]：控制返回字段

​		[options]：配置查询参数

​		[callback]：回调函数–function(err,docs){}

- 案例：

  ```js
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/student',(err) => {
      if(!err){
          var schema = new mongoose.Schema({name:String,grades:Number})
          var stuModel = mongoose.model('grades',schema)
          //查询所有数据
          stuModel.find((err,docs) => {
             if(!err){
              	console.log(docs)
          	}
          })        
         /* [{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
             { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 },
             { _id: 6017c455ba09d355a49ec8eb, name: '小红', grades: 52, __v: 0 },
             { _id: 6017c455ba09d355a49ec8ec, name: '小刚', grades: 46, __v: 0 }]*/
          
          //查询成绩大于60以上的数据
          stuModel.find({grades:{$gte:60}},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
             { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }]*/
          
          //查询成绩大于60以上且名字里存在‘芳’的数据
          stuModel.find({name:/芳/,grades:{$gte:60}},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[
          *     { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }
          * ]*/
          
          //查询名字里存在‘明’的数据且只输出‘name’字段
          //_id默认会返回
          stuModel.find({name:/明/},{name:1,_id:0},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          // [{name: '小明'}]
          
          //跳过前两条数据并限制只输出一条数据
          stuModel.find(null,null,{skip:2,limit: 1},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[{ _id: 6017c455ba09d355a49ec8eb, name: '小红', grades: 52, __v: 0 }*/
      }
  })
  ```

### 5.2 findById()

- Model.findById(id, [projection], [options], [callback])
- 案例：

```js
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',(err) => {
    if(!err){
        var schema = new mongoose.Schema({name:String,grades:Number})
        var stuModel = mongoose.model('grades',schema)
        //保存查询数据的_id
        var aIDArr = []
        
        //查询所有数据
        stuModel.find((err,docs) => {
           if(!err){
            	docs.forEach((item,index,arr)=>{
                    aIDArr.push(item._id)
                })
                //显示第 0 个元素的所有字段
                stuModel.findById(aIDArr[0],(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 }
               
                //显示第 0 个元素且只输出name字段
                stuModel.findById(aIDArr[0],{name:1,_id:0},(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { name: '小明' }
               
                //显示第 0 个元素且输出最少的字段(_id默认输出)
                stuModel.findById(aIDArr[0],{lean:true},(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { _id: 6017befb5c36d64d08b72576 }
        	}
        })
    }
})
```

### 5.3 findOne()

- 返回查询到的数据的第一个
- Model.findOne([conditions], [projection], [options], [callback])
- 案例：

```js
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',(err) => {
    if(!err){
        var schema = new mongoose.Schema({name:String,grades:Number})
        var stuModel = mongoose.model('grades',schema)
        //找出age>80的文档中的第一个文档
        stuModel.findOne({grades:{$gt:80}},(err,doc) => {
           if(!err){
            	console.log(doc)
        	}
        })
        //{ _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }

        //找出age>80的文档中的第一个文档，且只输出name字段
        stuModel.findOne({grades:{$gt:80}},{name:1,_id:0},(err,doc) => {
            if(!err){
                 console.log(doc)
             }
         })
         //{ name: '小芳' }

        //找出age>80的文档中的第一个文档，且输出包含name字段在内的最短字段
        stuModel.findOne({grades:{$gt:80}},{lern:true},(err,doc) => {
            if(!err){
                 console.log(doc)
             }
         })
         //{ _id: 6017befb5c36d64d08b72577 }
    }
})
```

### 5.4 复杂查询【$where】

- $where 可以使用任意的 JavaScript 作为查询的一部分，包含JavaScript 表达式的字符串或者函数

- 案例

  ```js
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/student',(err) => {
      if(!err){
          var schema = new mongoose.Schema({name:String,grades:Number})
          //添加一个测试字段
          // schema.add({test:Number})
          var stuModel = mongoose.model('grades',schema)
          //添加两条数据
          // stuModel.create({name:"小花",grades:76,test:76},{name:"小兰",grades:60,test:30},(err,docs)=>{
          //     console.log(docs)
          // })
  
          //字符串 es5中this与obj指向一样，es6中只能用obj
          stuModel.find({$where:"this.grades == this.test" || "obj.grades == obj.test"},(err,doc) => {
             if(!err){
              	console.log(doc)
          	}
          })
          //[{_id: 6017d7cb8a95cb2a00aae3ae,name: '小花',grades: 76,test: 76,__v: 0}]
  
          //函数
          stuModel.find({$where:function() {
              return this.grades == this.test || obj.grades == obj.test*2
          }},(err,doc) => {
              if(!err){
                   console.log(doc)
               }
           })
           /*[{_id: 6017d7cb8a95cb2a00aae3ae,name: '小花',grades: 76,test: 76,__v: 0},
              {_id: 6017d7cb8a95cb2a00aae3af,name: '小兰',grades: 60,test: 30,__v: 0}]*/
      }
  })
  ```

### 5.5 常用查询条件

```bash
$or　　　　 或关系

$nor　　　 或关系取反

$gt　　　　 大于

$gte　　　 大于等于

$lt　　　　 小于

$lte　　　 小于等于

$ne　　　　 不等于

$in　　　　 在多个值范围内

$nin　　　 不在多个值范围内

$all　　　 匹配数组中多个值

$regex　　 正则，用于模糊查询

$size　　　 匹配数组大小

$maxDistance　 范围查询，距离（基于LBS）

$mod　　　　 取模运算

$near　　　 邻域查询，查询附近的位置（基于LBS）

$exists　　 字段是否存在

$elemMatch　 匹配内数组内的元素

$within　　　 范围查询（基于LBS）

$box　　　　 范围查询，矩形范围（基于LBS）

$center　　　 范围醒询，圆形范围（基于LBS）

$centerSphere　范围查询，球形范围（基于LBS）

$slice　　　　 查询字段集合中的元素（比如从第几个之后，第N到第M个元素
```

### 5.6 特定类型查询

| _id                      | name | grades | __v  | test |
| ------------------------ | ---- | ------ | ---- | ---- |
| 6017befb5c36d64d08b72576 | 小明 | 68     | 0    | 1    |
| 6017befb5c36d64d08b72577 | 小芳 | 94     | 0    | 3    |
| 6017c455ba09d355a49ec8eb | 小红 | 52     | 0    | 5    |
| 6017c455ba09d355a49ec8ec | 小刚 | 46     | 0    | 2    |
| 6017d7cb8a95cb2a00aae3ae | 小花 | 76     | 0    | 4    |
| 6017d7cb8a95cb2a00aae3af | 小兰 | 60     | 0    | 6    |

**方法**

| 方法     | 作用     |
| -------- | -------- |
| sort     | 排序     |
| skip     | 跳过     |
| limit    | 限制     |
| select   | 显示字段 |
| exect    | 执行     |
| count    | 计数     |
| distinct | 去重     |

> exec(）和 then()
>
> 两者返回的都是 promise对象
> exec一般用于独立的动作一次性执行，
> then则用于连续性的动作
> 从其方法名也可以区别它们的用法，exec就是执行的意思，then就是然后怎么怎么，
> exec和then的参数是有所不同的，前者是 callback(err,doc)，后者则是 resolved(doc),rejected(err)

案例：

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
var stuModel = mongoose.model('grades', Schema);

// 按test从小到大排序
// 1是升序，-1是降序
stuModel.find().sort({test:1}).exec((err,docs)=>{
  console.log(docs)
})
// 按test从大到小排列
stuModel.find().sort('-test').exec((err,docs)=>{
  console.log(docs)
})
// 跳过1个，显示其他
stuModel.find().skip(1).exec((err,docs)=>{
  console.log(docs)
})
// 显示2个
stuModel.find().limit(2).exec((err,docs)=>{
  console.log(docs)
})
// 显示name、grades字段，不显示id字段
stuModel.find().select('name grades -id').exec((err,docs)=>{
  console.log(docs)
})
// 跳过第1个后，只显示2个数据，按照grades由大到小排序，且不显示id字段
stuModel.find().skip(1).limit(2).sort('-grades').select('-id').exec((err,docs)=>{
  console.log(docs)
  /[{ name: '小明', grades: 78, v: 0, test: 1 },
     { name: '小花', grades: 76, test: 4, v: 0 }]/
})
// 显示集合stuModel中的文档数量
stuModel.find().count((err,count)=>{
  console.log(count)
  //6
})
// 返回集合stuModel中的grades的值
stuModel.find().distinct('grades',(err,distinct)=>{
  console.log(distinct)
  //[ 46, 52, 60, 76, 78, 94 ]
})
```

## 6.文档更新

### 6.1 update()

- Model.update(conditions, doc, [options], [callback])

- 参数

  conditions：查询条件

  doc：需要修改的数据（插入的数据）

  [options]：控制选项

  > safe (boolean)： 默认为true。安全模式。
  > upsert (boolean)： 默认为false。如果不存在则创建新记录。
  > multi (boolean)： 默认为false。是否更新多个查询记录。
  > runValidators： 如果值为true，执行Validation验证。
  > setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
  > strict (boolean)： 以strict模式进行更新。
  > overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。

- [callback]：回调函数

- 若设置了查询条件，当数据库不满足时默认什么也不发生

- update() 方法中的回调函数不能省略，否则数据不会更新，当回调无有用信息时可以使用exec()简化

  ```js
  stuModel.update({name:'小明'},{$set:{test:34}}.exec())
  ```

- 案例

  ```js
  //第一步，引入mongoose
  const mongoose = require('mongoose')
  //第二步，连接数据库
  mongoose.connect('mongodb://localhost:27017/student',err=>{
    if(!err){
      //第三步，创建模板
      var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
      // var Schema = new Schema()
      //第四步，将模板映射到集合并创建
      var stuModel = mongoose.model('grades',Schema)
  
      //查询name为小明的数据，并将其test更改为34
      //若有多个文档，默认只更新第一个
      stuModel.update({name:'小明'},{$set:{test:34}},(err,raw)=>{
        console.log(raw)
      })
        
       //{ n: 1, nModified: 1, ok: 1 }
  	 //6017befb5c36d64d08b72576	小明	68	0	34
    }
  })
  ```

### 6.2 updateOne()

- Model.updateOne(conditions, doc, [options], [callback])

- 与update()相似，唯一区别为updateOne() 默认更新一个文档，即使设置{multi:true}也无法只更新一个文档

### 6.3 updateMany()

- Model.updateMany(conditions, doc, [options], [callback])

- 与update()相似，唯一区别为updateMany() 默认更新多个文档，即使设置{multi:false}也无法只更新一个文档

### 6.4 find()+save()

用于复杂更新

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
	
     //查询成绩小于60的数据，并在其名字后添加‘：差生’字段
     stuModel.find({grades:{$lt:60}},(err,docs)=>{
      console.log(docs);
      /*[{test: 0,_id: 6017c455ba09d355a49ec8eb,name: '小红',grades: 52,__v: 0},
        {test: 0,_id: 6017c455ba09d355a49ec8ec,name: '小刚',grades: 46,__v: 0}]*/
      
      docs.forEach((item,index,arr) => {
        item.name += '：差生'
        //将修改后的数据保存
        item.save()
      })
      console.log(docs)
      /*[{test: 0,_id: 6017c455ba09d355a49ec8eb,name: '小红：差生',grades: 52,__v: 0},
        {test: 0,_id: 6017c455ba09d355a49ec8ec,name: '小刚：差生',grades: 46,__v: 0}]*/
    })
  }
})
```

### 6.5 findOne() + save()

- 用于复杂更新
- findOne()返回值为文档对象

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
	
     //查询成绩小于60的数据，并在其名字后添加‘：差生’字段
     stuModel.findOne({name:'小明'},(err,doc)=>{
      console.log(doc);
      //{test: 34,_id: 6017c455ba09d355a49ec8eb,name: '小明',grades: 68,__v: 0},
      doc.age += 10
      doc.save()
      console.log(docs)
      //{test: 34,_id: 6017c455ba09d355a49ec8eb,name: '小明',grades: 78,__v: 0}
    })
  }
})
```

### 6.6 fingOneAndUpdate()

Model.findOneAndUpdate([conditions], [update], [options], [callback])

### 6.7 findByIdAndUpdate()

Model.findByIdAndUpdate([conditions], [update], [options], [callback])

## 7.文档删除

### 7.1 deleteOne()

- 会删除符合条件的所有数据
- Model的deleteOne（）

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
     //删除名字中包含‘差生’的数据
	 stuModel.deleteOne({name:/差生/},function(err){})
     // 回调函数不能省略，但可以使用exec() 简写
     //stuModel.deleteOne({name:/差生/}).exec()
    })
  }
})
```

- 文档的deleteOne（）

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
     //删除名字中包含‘差生’的数据
	 stuModel.find({name:/差生/},function(err,docs){
         docs.forEach((item,index,arr)=>{
             item.deleteOne((err,doc)=>{
                 //doc为被删除的值
                 console.log(doc)
             })
         })
     })
    })
  }
})
```

### 7.2 findOneAndRemove()

- 删除符合条件的一条数据

- Model.findOneAndRemove(conditions, [options], [callback])

- 回调不可省略，但可以使用exec() 简写

```js
stuModel.findOneAndRemove({name:/差生/}).exec()
```

### 7.3 findByIdAndRemove()

- 通过id删除数据（id是唯一的）
- Model.findByIdAndRemove(conditions, [options], [callback])
- 回调不可省略，但可以使用exec() 简写

## 8.前后钩子

- 前后钩子即 pre() 和 post() 方法（中间件）

- 中间件在schema上指定，类似静态方法或实例方法等

- 可以在执行以下操作时设置前后钩子

  >  init
  >  validate
  >  save
  >  remove
  >  count
  >  find
  >  findOne
  >  findOneAndRemove
  >  findOneAndUpdate
  >  insertMany
  >  update

- 【pre()】：在执行某些操作前执行
- 【post】：在执行某些操作前后执行，不可以使用next()

案例：

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
Schema.pre('find',function(next){
    console.log('我是pre方法1');
    next();
});
Schema.pre('find',function(next){
    console.log('我是pre方法2');
    next();
});
Schema.post('find',function(docs){
  console.log('我是post方法1');
});
Schema.post('find',function(docs){
  console.log('我是post方法2');
});  
var stuModel = mongoose.model('grades', Schema);
stuModel.find(function(err,docs){
    console.log(docs[0]);
})    
/*
我是pre方法1
我是pre方法2
我是post方法1
我是post方法2
{test: 34, _id: 6017befb5c36d64d08b72576,name: '小明',grades: 78,__v: 0}
*/
```

## 9.文档验证

- 保证保存文档时，可以按照Schema设置的字段进行设置

### 9.1 【required】：数据必填

```js
//将name设置为必填字段，如果没有name字段，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:Number
})
var stuModel = mongoose.model('students', Schema);
new stuModel({age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//报错：name: Path `name` is required.
```

###  9.2 【default】：默认值

```js
//设置age字段的默认值为18，如果不设置age字段，则会取默认值
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:String,
  age:{
    type:Number,
    default:18
  }
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷'}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//{ age: 18, _id: 6018f3bd7e51343e6c4f212b, name: '李雷', __v: 0 }
```

### 9.3 【min】【max】：最小/大值

- 只适用于数字

```js
//将age的取值范围设置为[0,10]。如果age取值为20，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:String,
  age:{
    type:Number,
    min:10,
    max:18
  }
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//age: Path `age` (20) is more than maximum allowed value (18).
```

### 9.4 【match】：正则匹配

- 只适用于字符串

```js
//将name的match设置为必须存在'01'字符。如果name不存在'01'，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,match:/01/},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//name: Path `name` is invalid (李雷).
```

### 9.5【enum】：枚举匹配

- 只适用于字符串

```js
//将name的枚举取值设置为['zs','ls','ww']，如果name不在枚举范围内取值，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,enum:['zs','ls','ww']},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'lss',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//name: ValidatorError: `lss` is not a valid enum value for path `name`.
```

### 9.6 【validate】：自定义匹配

- validate实际上是一个函数，函数的参数代表当前字段，返回true表示通过验证，返回false表示未通过验证

```js
//定义名字name的长度必须在4个字符以上
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,validate:nameLength},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'abcd',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

function nameLength(arg){
  if(arg.length>4){
    return true
  }
  return false
}

//name: Validator failed for path `name` with value `abcd`
```