# 02 【el和data的两种写法 MVVM模型】

## 1.el和data的两种写法

**el**有2种写法

- 创建Vue实例对象的时候配置el属性

- 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值

**data**有2种写法

- 对象式：data： { }
- 函数式：data() { return { } }
- 如何选择：目前哪种写法都可以，以后到组件时，data必须使用函数，否则会报错
  一个重要的原则
- 由Vue管理的函数，一定不要写箭头函数，否则 this 就不再是Vue实例了

```html
  <body>
    <div id="root">
      <h1>你好，{{name}}</h1>
    </div>
  </body>
  <script type="text/javascript">
    // el的两种写法
    // const v = new Vue({
    // 	//el:'#root', // 第一种写法
    // 	data: {
    // 		name:'dselegent'
    // 	}
    // })
    // console.log(v)
    // v.$mount('#root') // 第二种写法

    // data的两种写法
    new Vue({
      el: '#root',
      // data的第一种写法：对象式
      // data:{
      // 	name:'dselegent'
      // }

      //data的第二种写法：函数式
      data() {
        console.log('@@@', this) // 此处的this是Vue实例对象
        return {
          name: 'dselegent'
        }
      }
    })
  </script>
```

## 2.MVVM模型

![image-20220627114527315](https://i0.hdslb.com/bfs/album/16a3c9896eb5b087c5c8e8cfa276f89b76b9732e.png)

MVVM模型

- M：模型 `Model`，data中的数据
- V：视图 `View`，模板代码
- VM：视图模型 `ViewModel`，Vue实例（相当于数据和页面的连接桥梁）

观察发现

- `data`中所有的属性，最后都出现在了`vm`身上
- `vm`身上所有的属性 及Vue原型身上所有的属性，在 Vue模板中都可以直接使用

```html
    <div id="root">
        <h2>名称：{{ name }}</h2>
        <h2>战队：{{ team }}</h2>
        <h2>测试：{{ $options }}</h2>
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: { 
                name: 'uzi',
                team: 'RNG'
            }
        })
    </script>
```

![image-20220627114825918](https://i0.hdslb.com/bfs/album/a58c057f9f09939e3c77bcb11c1dc8743354607f.png)