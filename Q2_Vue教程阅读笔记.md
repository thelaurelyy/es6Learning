
# Vue教程阅读笔记

## 一、基础

### Vue实例

1.数据与方法

 - 当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
 - 只有当vue实例被创建时，data中存在的属性才是响应式的。向实例中添加新的属性并作出改动不会触发任何视图的更新。
 - 唯一的例外是使用 Object.freeze()会阻止修改现有的属性，也意味着响应系统无法再追踪变化
 - 除了数据属性，还有一些前缀$的实例属性与方法，以便与用户定义的属性区分开来。

2.实力生命周期钩子

 - 不要在选项属性或回调上使用箭头函数，因为箭头函数的this指向父级上下文，而不是当前vue实例。

3.生命周期图示
![avatar](es6Learning/src/assets/lifecycle.png)



### 模板语法

1.插值

2.指令

 - 动态参数，方括号中的内容会作为一个JavaScript表达式进行动态求值。
 - 注意：动态属性的值为null时会显性移除绑定，动态表达式中不能使用空格和引号，建议使用计算属性代替复杂表达式。
 - 修饰符（modifier）

     <a v-bind:[attributeName]="url"> ... </a>
     //如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href

     <a v-on:[eventName]="doSomething"> ... </a>
     //当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus

3.缩写



### 计算属性和侦听器

1.计算属性缓存 VS 方法  <br />

 - **相同点：**将同一个函数定义为一个方法或计算属性其结果是相同的
 - **不同点：**计算属性是基于它们的依赖进行缓存的，只有在相关依赖发生改变时他们才会重新求值（缓存）；
              只要data不发生改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行计算。  <br />
              相比之下，每当重新触发渲染时，调用方法将**总会**再次执行函数。

2.计算属性 VS 侦听属性

3.计算属性的setter

 - 计算属性默认只有getter，不过在需要时你也可以提供一个setter。

        // ...
        computed: {
          fullName: {
            // getter
            get: function () {
              return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
              var names = newValue.split(' ')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
            }
          }
        }
        // ...

4.侦听器

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。



### Class与Style绑定

1.对象语法

        <div v-bind:class="classObject"></div>

        data: {
          isActive: true,
          error: null
        },
        computed: {
          classObject: function () {
            return {
              active: this.isActive && !this.error,
              'text-danger': this.error && this.error.type === 'fatal'
            }
          }
        }

2.数组语法

        <div v-bind:class="[activeClass, errorClass]"></div>

        data: {
          activeClass: 'active',
          errorClass: 'text-danger'
        }

        <div v-bind:class="[{ active: isActive }, errorClass]"></div>

3.用在组件上

当在一个自定义的组件使用class属性时，这些类将被添加到该组件的根元素上，这个元素上已经存在的类不会被覆盖。



### 条件渲染

1.<template>可以当做不可见的包裹元素，在该元素上使用v-if指令可以条件渲染一组内容

        <template v-if="ok">
          <h1>Title</h1>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </template>

2.Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。

        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address">
        </template>

那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder。

但是在实际需求中，如果需要表达“这两个元素是完全独立的，不要复用它们”，只需要添加具有唯一值的key属性即可。

3.注意：v-show指令不支持<template>元素，也不支持v-else。

4.v-if VS v-show <br />

 - v-if是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当的被销毁和重建。
 - v-if也是惰性的：如果在初始渲染时条件为假，则什么也不做直到条件第一次变为真时，才会开始渲染条件块。
 - v-show不论初始条件是什么，元素总是会被渲染，并且只是简单的基于css进行切换。

一般来说，v-if具有更高的切换开销，而v-show有更高的初始渲染开销。因此：

 - 如果需要频繁切换，使用v-show较好；
 - 如果在运行时条件很少改变，则使用v-if较好。

5.不推荐同时使用v-for和v-if，但是当它们一起使用时，v-for优先级更高



### 列表渲染

1.遍历数组和对象属性

        <div v-for="item in items"></div>

        <div v-for="item of items"></div>

        <div v-for="(value, key, index) in object">
          {{ index }}. {{ key }}: {{ value }}
        </div>

> 在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

2.“就地复用”策略

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。
如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

因此建议在使用v-for时提供key属性，除非遍历输出的DOM内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

3.数组的方法

变异方法（mutation method）会改变被这些方法调用的原始数组

 - push()            // 末尾添加一个或多个元素,返回新的长度
 - pop()             // 删除并返回数组的最后一个元素
 - shift()           // 删除并返回数组的第一个元素
 - unshift()         // 开头添加一个或更多元素,并返回新的长度
 - **splice()**      // 向/从数组中添加/删除项目,然后返回被删除的项目
 - sort()            // 默认是升序排序,如果想按照其他标准进行排序,就需要提供比较函数
 - reverse()         // 颠倒数组中元素的顺序

非变异方法（non-mutating method）不会改变原始数组，总是返回一个新数组。

 - filter()          // 返回通过过滤的元素数组
 - concat()          // 连接两个或多个数组
 - slice(start,end)  // 从已有的数组中返回选定的元素

此时用含有相同元素的数组去替换原来的数组是非常高效的操作，Vue不会完全丢弃现有的DOM，并重新渲染整个列表。

        example1.items = example1.items.filter(function (item) {
          return item.message.match(/Foo/)
        })

4.注意事项

 - 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

   a.当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
   b.当你修改数组的长度时，例如：vm.items.length = newLength

        var vm = new Vue({
          data: {
            items: ['a', 'b', 'c']
          }
        })
        vm.items[1] = 'x' // 不是响应性的
        vm.items.length = 2 // 不是响应性的

为解决这样的问题，以下两种方式都可以实现数据更新，并且触发状态更新

        // Vue.set
        Vue.set(vm.items, indexOfItem, newValue)

        // Array.prototype.splice
        vm.items.splice(indexOfItem, 1, newValue)
        vm.items.splice(newLength)

        //你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：
        vm.$set(vm.items, indexOfItem, newValue)

 - 由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
 对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。

        var vm = new Vue({
          data: {
            userProfile: {
              name: 'Anika'
            }
          }
        })
        Vue.set(vm.userProfile, 'age', 27)
        vm.$set(vm.userProfile, 'age', 27)

 如果需要为已有对象添加多个新属性，比如使用 *Object.assign()* 或 *_.extend()*
 这种情况下应该用新增对象的属性创建一个新的对象，添加新的响应式属性不能这样：

        Object.assign(vm.userProfile, {
            age: 27,
            favoriteColor: 'Vue Green'
        })

 正确的做法是：

        vm.userProfile = Object.assign({}, vm.userProfile, {
            age: 27,
            favoriteColor: 'Vue Green'
        })

5.显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。
在这种情况下，可以创建返回过滤或排序数组的计算属性。

类似于 v-if，你也可以利用带有 v-for 的 <template> 渲染多个元素



### 事件处理

1.事件修饰符

        <!-- 阻止单击事件继续传播 -->
        <a v-on:click.stop="doThis"></a>

        <!-- 提交事件不再重载页面 -->
        <form v-on:submit.prevent="onSubmit"></form>

        <!-- 修饰符可以串联 -->
        <a v-on:click.stop.prevent="doThat"></a>

        <!-- 只有修饰符 -->
        <form v-on:submit.prevent></form>

        <!-- 添加事件监听器时使用事件捕获模式 -->
        <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
        <div v-on:click.capture="doThis">...</div>

        <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
        <!-- 即事件不是从内部元素触发的 -->
        <div v-on:click.self="doThat">...</div>

        <!-- 点击事件将只会触发一次 -->
        <a v-on:click.once="doThis"></a>

        <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
        <!-- 而不会等待 `onScroll` 完成  -->
        <!-- 这其中包含 `event.preventDefault()` 的情况 -->
        <!-- .passive 修饰符尤其能够提升移动端的性能 -->
        <div v-on:scroll.passive="onScroll">...</div>

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，
而 v-on:click.self.prevent 只会阻止对元素自身的点击。

> 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。
请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

2.按键修饰符

可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

        <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
        <input v-on:keyup.enter="submit">

        <!-- 处理函数只会在 $event.key 等于 PageDown 时被调用 -->
        <input v-on:keyup.page-down="onPageDown">

按键码的用法已经被废弃了，为支持旧浏览器，Vue提供了绝大多数常用的按键码的别名：

 - .enter
 - .tab
 - .delete (捕获“删除”和“退格”键)
 - .esc
 - .space
 - .up
 - .down
 - .left
 - .right

3.可以通过全局*config.keyCodes*对象自定义按键修饰符别名：

        // 可以使用 `v-on:keyup.f1`
        Vue.config.keyCodes.f1 = 112

4.系统修饰键

 - .ctrl

        //只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl
        //如果需要单单释放 ctrl，请为 ctrl 换用 keyCode（：keyup.17）

 - .alt
 - .shift
 - .meta
 - .exact

        <!-- .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件 -->
        <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
        <button @click.ctrl="onClick">A</button>

        <!-- 有且只有 Ctrl 被按下的时候才触发 -->
        <button @click.ctrl.exact="onCtrlClick">A</button>

        <!-- 没有任何系统修饰符被按下的时候才触发 -->
        <button @click.exact="onClick">A</button>

4.鼠标按钮修饰符

 - .left
 - .right
 - .middle

5.为什么在HTML中监听事件

 a.扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法
 b.因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
 c.当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。



### 表单输入绑定

1.单个复选框，绑定到布尔值；多个复选框，绑定到同一个数组。

        <div id='example-3'>
          <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
          <label for="jack">Jack</label>
          <input type="checkbox" id="john" value="John" v-model="checkedNames">
          <label for="john">John</label>
          <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
          <label for="mike">Mike</label>
          <br>
          <span>Checked names: {{ checkedNames }}</span>
        </div>

2.选择框

选择框单选时，绑定到字符串；多选时，v-model绑定到一个数组

> 如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。
在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。
因此，更推荐像下面这样提供一个值为空的禁用选项。

        <div id="example-5">
          <select v-model="selected">
            <option disabled value="">请选择</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <span>Selected: {{ selected }}</span>
        </div>

        new Vue({
          el: '...',
          data: {
            selected: ''
          }
        })

3.修饰符

 - .lazy        // 在“change”时而非“input”时更新
 - .number      // 自动将用户的输入值转为数值类型
 - .trim        // 自动过滤用户输入的首尾空白字符



### 组件基础

1.一个组件的*data*选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

2.每个组件必须只有一个根元素

3.在组件上使用v-model **注意**

4.<font color="red">通过插槽分发内容 <slot> **注意区分默认插槽（匿名插槽slot）、具名插槽、作用域插槽（slot-scope）</font>

5.<font color="red">动态组件和异步组件</font>










