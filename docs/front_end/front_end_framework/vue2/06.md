# 06 【Vue数据监视 v-model双向绑定】

## 1.Vue数据监视

### 1.1问题演示

先来个案例引入一下：

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul> 
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:'女'},
                {id:'002',name:'周冬雨',age:31,sex:'女'},
                {id:'003',name:'周杰伦',age:18,sex:'男'},
                {id:'004',name:'温兆伦',age:19,sex:'男'}
            ]
        },
        methods: {
            updateMei(){
                // this.persons[0].name = '马老师' //奏效
                // this.persons[0].age = 50 //奏效
                // this.persons[0].sex = '男' //奏效
                this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
                // this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
            }
        }
    }) 

</script>
```

点击更新马冬梅的信息，马冬梅的数据并没有发生改变。

![image-20220628130108394](https://img-blog.csdnimg.cn/img_convert/c17a4b812cb530f0e6b2761becebdfce.png)我们来看看控制台：

![image-20220628130253077](https://i0.hdslb.com/bfs/album/87ee84e1545374da657a5046f4040ccd17de15f4.png)

控制台上的数据发生了改变，说明，这个更改的数据并没有被 vue 监测到。

### 1.2模拟一个数据监测

> 代码

```js
let data = {
  name: '尚硅谷',
  address: '北京',
}

function Observer(obj) {
  // 汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj)
  // 遍历
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      get() {
        return obj[k]
      },
      set(val) {
        console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
        obj[k] = val
      }
    })
  })
}

// 创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data)
console.log(obs)

// 准备一个vm实例对象
let vm = {}
vm._data = data = obs
```

### 1.3Vue.set 的使用

`Vue.set(target，propertyName/index，value) `或

`vm.$set(target，propertyName/index，value)`

**用法**：

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `vm.myObject.newProperty = 'hi'`)

```html
<!-- 准备好一个容器-->
<div id="root">
    <h1>学生信息</h1>
    <button @click="addSex">添加性别属性，默认值：男</button> <br/>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            student:{
                name:'tom',
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            addSex(){
                // Vue.set(this.student,'sex','男')
                this.$set(this.student,'sex','男')
            }
        }
    })
</script>
```

`Vue.set() `或 `vm.$set `有缺陷：

![image-20220629113903480](https://i0.hdslb.com/bfs/album/da7f37aafd2dc99d321163067f9ca642f4068593.png)

### 1.4监测数组

看完了 vue 监测对象中的数据，再来看看 vue 如何监测 数组里的数据

```html
<!-- 准备好一个容器-->
<div id="root">
    <h2>爱好</h2>
    <ul>
        <li v-for="(h,index) in student.hobby" :key="index">
            {{h}}
        </li>
    </ul>
    <h2>朋友们</h2>
    <ul>
        <li v-for="(f,index) in student.friends" :key="index">
            {{f.name}}--{{f.age}}
        </li>
    </ul>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:
            student:{
                name:'tom',
                age:{
                    rAge:40,
                    sAge:29,
                },
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'jerry',age:35},
                    {name:'tony',age:36}
                ]
            }
        },
        methods: {
            
        }
    })
</script>
```

![image-20220629114734366](https://i0.hdslb.com/bfs/album/7304e7fff94505ba6d02df3de656ea39ca4e631f.png)

> 所以我们通过 vm._data.student.hobby[0] = ‘aaa’ // 不奏效
>
> `vue `监测在数组那没有 getter 和 setter，所以监测不到数据的更改，也不会引起页面的更新

![image-20220629114843565](https://i0.hdslb.com/bfs/album/2587f112a526bafab430422c0851c4ac028d587a.png)

既然 vue 在对数组无法通过 getter 和 setter 进行数据监视，那 vue 到底如何监视数组数据的变化呢？

vue对数组的监测是通过 包装数组上常用的用于修改数组的方法来实现的。

vue官网的解释：

![image-20220629114924545](https://i0.hdslb.com/bfs/album/bd3b872ea663df9a7d6d5d5d77ade8fc7a0dea7b.png)

### 1.5练习

> 代码

```html
<style>button {margin-top: 10px;}</style>

<div id="root">
  <h1>学生信息</h1>
  <button @click="student.age++">年龄+1岁</button> <br />
  <button @click="addSex">添加性别属性，默认值：男</button> <br />
  <button @click="student.sex = '未知' ">修改性别</button> <br />
  <button @click="addFriend">在列表首位添加一个朋友</button> <br />
  <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br />
  <button @click="addHobby">添加一个爱好</button> <br />
  <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
  <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br />
  <h3>姓名：{{ student.name }}</h3>
  <h3>年龄：{{ student.age }}</h3>
  <h3 v-if="student.sex">性别：{{student.sex}}</h3>
  <h3>爱好：</h3>
  <ul>
    <li v-for="(h,index) in student.hobby" :key="index">{{ h }} </li>
  </ul>
  <h3>朋友们：</h3>
  <ul>
    <li v-for="(f,index) in student.friends" :key="index">{{ f.name }}--{{ f.age }}</li>
  </ul>
</div>

<script type="text/javascript">
  Vue.config.productionTip = false

  const vm = new Vue({
    el: '#root',
    data: {
      student: {
        name: 'tom',
        age: 18,
        hobby: ['抽烟', '喝酒', '烫头'],
        friends: [
          { name: 'jerry', age: 35 },
          { name: 'tony', age: 36 }
        ]
      }
    },
    methods: {
      addSex() {
        // Vue.set(this.student,'sex','男')
        this.$set(this.student, 'sex', '男')
      },
      addFriend() {
        this.student.friends.unshift({ name: 'jack', age: 70 })
      },
      updateFirstFriendName() {
        this.student.friends[0].name = '张三'
      },
      addHobby() {
        this.student.hobby.push('学习')
      },
      updateHobby() {
        // this.student.hobby.splice(0,1,'开车')
        // Vue.set(this.student.hobby,0,'开车')
        this.$set(this.student.hobby, 0, '开车')
      },
      removeSmoke() {
        this.student.hobby = this.student.hobby.filter((h) => {
          return h !== '抽烟'
        })
      }
    }
  })
```

![image-20220629115039898](https://i0.hdslb.com/bfs/album/e6207d82681ef4aaa4b15ce445a07de9ccf65ebf.png)

### 1.6总结

Vue监视数据的原理：

* vue会监视data中所有层次的数据

* 如何监测对象中的数据？

  通过setter实现监视，且要在new Vue时就传入要监测的数据。

  * 对象中后追加的属性，Vue默认不做响应式处理

  * 如需给后添加的属性做响应式，请使用如下API：

    `Vue.set(target，propertyName/index，value) `或 

    `vm.$set(target，propertyName/index，value)`

* 如何监测**数组**中的数据？

  通过包裹数组更新元素的方法实现，本质就是做了两件事：

  * 调用原生对应的方法对数组进行更新
  * 重新解析模板，进而更新页面

* 在Vue修改数组中的某个元素一定要用如下方法：

  * 使用这些API:**push()、pop()、shift()、unshift()、splice()、sort()、reverse()**
  * `Vue.set()` 或 `vm.$set()`

> 特别注意：`Vue.set()` 和 `vm.$set() `不能给vm 或 vm的根数据对象 添加属性！！！
> 例:`Vue.set(this,…,…)`或`this.$set(this,…,…)`

## 2.v-model双向绑定

### 2.1收集表单数据

若：`<input type="text"/>`，则`v-model`收集的是`value`值，用户输入的就是`value值`。

```vue
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
        密码：<input type="password" v-model="userInfo.password"> <br/><br/>
        年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                account:'',
                password:'',
                age:18,
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

若：`<input type="radio"/>`，则`v-model`收集的是`value`值，且要给标签配置`value`值。

```vue
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        性别：
        男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
        女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                sex:'female'
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

若：`<input type="checkbox"/>`

* 没有配置`input`的`value`属性，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）
* 配置`input`的`value`属性:
  * `v-model`的初始值是**非数组**，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）
  * `v-model`的初始值是**数组**，那么收集的的就是`value`组成的数组

```vue
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
        <br/><br/>
        所属校区
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
            <option value="wuhan">武汉</option>
        </select>
        <br/><br/>
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                hobby:[],
                city:'beijing',
                other:'',
                agree:''
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

![image-20220629115509712](https://i0.hdslb.com/bfs/album/9d56474120ea22578c73d48fa3ea5f43e98cc379.png))

> 备注：v-model的三个修饰符：
>
> lazy：失去焦点再收集数据
>
> number：输入字符串转为有效的数字
>
> trim：输入首尾空格过滤
>
> 例：`v-model.number=“phone” `就算是number类型的input框，`vue`收集的还是字符串，可以使用这个修饰符

### 2.2模拟实现v-model

```vue
    <h2>v-model实现原理(vue2)</h2>
    <!-- 
      原生DOM当中是有oninput事件,它经常结合表单元素一起使用,当表单元素文本内容发生变化的时候就会发出一次回调
      Vue2:可以通过value与input事件实现v-model功能
      原生DOM标签身上的 :value是v-bind单项数据绑定
    -->
    <input type="text" :value="msg" 
    @input="msg = $event.target.value">
    <span>{{msg}}</span>
```



