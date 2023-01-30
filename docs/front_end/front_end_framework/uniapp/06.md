# 06 【uniapp生命周期】

生命周期的概念：一个对象从创建、运行、销毁的整个过程被成为生命周期。

生命周期函数：在生命周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数。

## 1.应用生命周期

[uni-app官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)

`uni-app` 支持如下应用生命周期函数：

| 函数名   | 说明                                           |
| :------- | :--------------------------------------------- |
| onLaunch | 当`uni-app` 初始化完成时触发（全局只触发一次） |
| onShow   | 当 `uni-app` 启动，或从后台进入前台显示        |
| onHide   | 当 `uni-app` 从前台进入后台                    |
| onError  | 当 `uni-app` 报错时触发                        |

**示例代码**

```html
<script>
	// 只能在App.vue里监听应用的生命周期
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
        onError: function(err) {
        	console.log('App Err', err)
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
```

**代码分析：**

- 第一次加载页面时会调用`onLaunch` ，`onShow` 打印`App Launch`，`App Show`
- 当你在浏览器离开页面，去查看其它页面，或者其它应用会触发`onHide`，在回来查看该页面时触发`onShow` ，打印`App Hide`，`App Show`
- 我们手动把`onShow`方法里面的`console.log(‘App Show’) `改为`consol.log(‘App Show’) `去掉一个`e`字母，这样会导致报错，这个时候我们`onError`方法就可以监听到错误

**注意**

- **应用生命周期仅可在`App.vue`中监听，在其它页面监听无效**。
- 应用启动参数，可以在API `uni.getLaunchOptionsSync`获取，[详见(opens new window)](https://uniapp.dcloud.net.cn/api/plugins/getLaunchOptionsSync.html#getlaunchoptionssync)
- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942(opens new window)](https://ask.dcloud.net.cn/article/35942)
- `App.vue` 不能写模板
- onPageNotFound 页面实际上已经打开了（比如通过分享卡片、小程序码）且发现页面不存在，才会触发，api 跳转不存在的页面不会触发（如 uni.navigateTo）

## 2.页面生命周期

[页面简介 | uni-app官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)

`uni-app` 支持如下页面生命周期函数：

| 函数名   | 说明                                                         | 平台差异说明 | 最低版本 |
| :------- | :----------------------------------------------------------- | :----------- | :------- |
| onLoad   | 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考[示例](https://uniapp.dcloud.net.cn/api/router#navigateto) |              |          |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |              |          |
| onReady  | 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发 |              |          |
| onHide   | 监听页面隐藏                                                 |              |          |
| onUnload | 监听页面卸载                                                 |              |          |

`index.vue`页面里面定义的页面生命周期函数如下：


```js
export default {
    data() {
        return {
            title: 'Hello'
        }
    },
    onLoad(option) {
        console.log('页面加载了', option);
    },
    onShow() {
        console.log('页面显示了');
    },
    onReady() {
        console.log('页面初次渲染完成了');
    },
    onHide() {
        console.log('页面隐藏了');
    },
    onUpload() {
        console.log('页面卸载了');
    },
    methods: {

    }
}
```
**代码分析：**

- 第一次加载首页，触发onLoad，onShow，onReady方法，依次打印页面加载了，页面显示了，页面初次渲染完成了
- 当你在浏览器离开页面，去查看其它页面，或者其它应用，会触发onHide方法，打印页面隐藏了，在回来查看该页面时触发onShow方法，打印页面显示了。可以发现印页面加载了，页面初次渲染完成了都不在打印，证明onLoad，onReady方法只触发一次，而onShow，onHide方法多次触发

当我们取tabbr底部栏从首页切换到其它页面，会触发onHide方法，打印页面隐藏了。再次会到首页，触发onShow方法，打印页面显示了

  tabbar的提示：

```tex
tabbar 切换第一次加载时可能渲染不及时，可以在每个tabbar页面的onLoad生命周期里先弹出一个等待雪花（hello uni-app使用了此方式）
tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad
```

## 3.组件生命周期

`uni-app` 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

| 函数名        | 说明                                                         | 平台差异说明 | 最低版本 |
| :------------ | :----------------------------------------------------------- | :----------- | :------- |
| beforeCreate  | 在实例初始化之前被调用。[详见(opens new window)](https://cn.vuejs.org/v2/api/#beforeCreate) |              |          |
| created       | 在实例创建完成后被立即调用。[详见(opens new window)](https://cn.vuejs.org/v2/api/#created) |              |          |
| beforeMount   | 在挂载开始之前被调用。[详见(opens new window)](https://cn.vuejs.org/v2/api/#beforeMount) |              |          |
| mounted       | 挂载到实例上去之后调用。[详见 (opens new window)](https://cn.vuejs.org/v2/api/#mounted)注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue官方文档(opens new window)](https://cn.vuejs.org/v2/api/#Vue-nextTick) |              |          |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见(opens new window)](https://cn.vuejs.org/v2/api/#beforeUpdate) | 仅H5平台支持 |          |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见(opens new window)](https://cn.vuejs.org/v2/api/#updated) | 仅H5平台支持 |          |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。[详见(opens new window)](https://cn.vuejs.org/v2/api/#beforeDestroy) |              |          |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://cn.vuejs.org/v2/api/#destroyed) |              |          |