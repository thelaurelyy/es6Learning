# es6learning

# 第一讲 let 和 const 命令

## 1、let命令
### （1）基本用法
### （2）不存在变量提升
### （3）暂时性死区
var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined   <br />
如果区块中存在let和const命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。     <br />
暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。    <br />

    var tmp = 123;

    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }

### （4）不允许重复申明


## 2、块级作用域
### （1）ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。    <br />
第一种场景，内层变量可能会覆盖外层变量。                                         <br />
第二种场景，用来计数的循环变量泄露为全局变量。                                        <br />

### （2）ES6 的块级作用域   <br />
let实际上为 JavaScript 新增了块级作用域。                                  <br />
ES6 允许块级作用域的任意嵌套，外层作用域无法读取内层作用域的变量。              <br />
块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。     <br />

### （3）块级作用域与函数声明
        // 情况一
        if (true) {
          function f() {}
        }

        // 情况二
        try {
          function f() {}
        } catch(e) {
          // ...
        }

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。      <br />
在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。   <br />
考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。   <br />
还有一个需要注意的地方。ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。   <br />
        // 不报错
        'use strict';
        if (true) {
          function f() {}
        }

        // 报错
        'use strict';
        if (true)
          function f() {}

## 3、const命令
### （1）const声明一个只读的常量，一旦声明，常量的值就不能改变。
这意味着，const一旦声明变量就必须立即初始化，不能留到以后赋值。 <br />
const的作用域与let命令相同：只在声明所在的块级作用域内有效。<br />
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。<br />
const声明的常量，也与let一样不可重复声明。<br />

> 注意！const只能保证这个指针是固定的的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

### （2）如果真的想讲对象冻结，应该是用 Object.freeze({})方法。

        const foo = Object.freeze({});

        // 常规模式时，下面一行不起作用；
        // 严格模式时，该行会报错
        foo.prop = 123;

甚至对象属性也应该冻结：

        var constantize = (obj) => {
          Object.freeze(obj);
          Object.keys(obj).forEach( (key, i) => {
            if ( typeof obj[key] === 'object' ) {
              constantize( obj[key] );
            }
          });
        };

### （3）ES6声明变量的6种方法
ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，还有import命令和class命令。

### （4）顶层对象的属性
ES5中，顶层对象的属性与全局变量是等价的，这样造成了 ###很多隐患### 。   <br />
ES6中，var命令和function命令声明的全局变量依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

### （5）global对象


# 第二讲 变量的解构赋值
## 1、数组的解构赋值
>ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。  <br />
>本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。    <br />
>如果解构不成功，变量的值就等于undefined。

### （1）基本用法：事实上只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

        function* fibs() {
        var a = 0;
        var b = 1;
        while (true) {

        yield a;
        [a, b] = [b, a + b];
        }
        }

        var [first, second, third, fourth, fifth, sixth] = fibs();
        sixth // 5

上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
可以解释为：

        var tmp=function* fibs() {
            var a = 0;
            var b = 1;
            while (true) {

                yield a;
                [a, b] = [b, a + b];
            }}
        for(const n of tmp()){
            if(n>6){
                break
            }
            console.log(n);
        }
        // 输出 0 1 1 2 3 5[sixth]


### （2）默认值
解构赋值允许指定默认值。注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。 <br />

        let [x = 1] = [undefined];
        x // 1

        let [x = 1] = [null];
        x // null

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候才会求值。

        function f() {
          console.log('aaa');
        }

        let [x = f()] = [1];

上面的代码其实等价于：

        let x;
        if ([1][0] === undefined) {
          x = f();
        } else {
          x = [1][0];
        }

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

        let [x = 1, y = x] = [];     // x=1; y=1
        let [x = 1, y = x] = [2];    // x=2; y=2
        let [x = 1, y = x] = [1, 2]; // x=1; y=2
        let [x = y, y = 1] = [];     // ReferenceError: y is not defined

个人小结：（1）可以先看元素解构赋值的执行结果，如果解构赋值为undefined，再查找是否有默认值。（2）切记涉及引用的变量必须已经声明。

## 2、对象的解构赋值
### （1）对象的结构与数组有一个重要的不同。
- 数组的元素是按次序排列的，变量的取值由它的位置决定；
- 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
- 如果变量名和属性名不一致，必须写成下面这样：

        let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
        baz // "aaa"

        let obj = { first: 'hello', last: 'world' };
        let { first: f, last: l } = obj;
        f // 'hello'
        l // 'world'

这实际上说明，对象的解构赋值是下面形式的简写

        let { foo: baz, bar: bar } = { foo: "aaa", bar: "bbb" };

foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo，需要注意：**模式** 和 **变量** 的区别！

### （2）默认值
默认值生效的条件是，对象的属性值严格等于undefined。

### （3）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

        // 错误的写法
        let x;
        {x} = {x: 1};
        // SyntaxError: syntax error

上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

        // 正确的写法
        let x;
        ({x} = {x: 1});

解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。   <br/>
下面的表达式虽然毫无意义，但是语法是合法的，可以执行。

        ({} = [true, false]);
        ({} = 'abc');
        ({} = []);

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

        let arr = [1, 2, 3];
        let {0 : first, [arr.length - 1] : last} = arr;
        first // 1
        last // 3

上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。    <br />
**方括号这种写法，属于“属性名表达式”**（参见《对象的扩展》一章）


## 3、字符串的解构赋值
- 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。 <br />
- 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

        const [a, b, c, d, e] = 'hello';
        a // "h"
        b // "e"
        c // "l"
        d // "l"
        e // "o"

        let {length : len} = 'hello';
        len // 5

## 4、数值和布尔值的解构赋值
> 解构赋值的规则是：只要等号右边的值不是对象或数组，就先将其转为对象，由于undefined和null无法转为对象，所以对他们进行解构赋值都会报错。

        let {toString: s} = 123;
        s === Number.prototype.toString // true

        let {toString: s} = true;
        s === Boolean.prototype.toString // true

        let { prop: x } = undefined; // TypeError
        let { prop: y } = null; // TypeError

## 5、函数参数的解构赋值 【重点】
函数参数的解构也可以使用默认值，undefined就会触发函数参数的默认值。

        [[1, 2], [3, 4]].map(([a, b]) => a + b);
        // [ 3, 7 ]

        function move({x = 0, y = 0} = {}) {
          return [x, y];
        }

        相当于：

        "use strict";
        function move() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref$x = _ref.x,
              x = _ref$x === undefined ? 0 : _ref$x,
              _ref$y = _ref.y,
              y = _ref$y === undefined ? 0 : _ref$y;

          return [x, y];
        }
        move({x: 3, y: 8}); // [3, 8]
        move({x: 3}); // [3, 0]
        move({}); // [0, 0]
        move(); // [0, 0]


上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。
注意，下面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。

        function move({x, y} = { x: 0, y: 0 }) {
          return [x, y];
        }

        相当于：

        "use strict";
        function move() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
              x = _ref.x,
              y = _ref.y;

          return [x, y];
        }
        move({x: 3, y: 8}); // [3, 8]
        move({x: 3}); // [3, undefined]
        move({}); // [undefined, undefined]
        move(); // [0, 0]


## 6、圆括号问题
只要有可能导致结构的歧义就不得使用圆括号。

不得使用圆括号的三种情况：
- （1）变量声明语句
- （2）函数参数
- （3）赋值语句的模式

可以使用圆括号的情况：
赋值语句的非模式部分可以使用圆括号。

        [(b)] = [3]; // 正确
        ({ p: (d) } = {}); // 正确
        [(parseInt.prop)] = [3]; // 正确


## 7、解构赋值的用途

- （1）交换变量的值

        let x = 1;
        let y = 2;
        [x, y] = [y, x];

- （2）从函数返回多个值时的解构赋值

        // 返回一个数组
        function example() {
          return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象
        function example() {
          return {
            foo: 1,
            bar: 2
          };
        }
        let { foo, bar } = example();

- （3）函数参数的定义

        // 参数是一组有次序的值
        function f([x, y, z]) { ... }
        f([1, 2, 3]);

        // 参数是一组无次序的值
        function f({x, y, z}) { ... }
        f({z: 3, y: 2, x: 1});

- （4）提取JSON数据（跟第二点类似）

- （5）函数参数的默认值
    注意：这里区别于第三点（给函数有序或无序传值），这是给函数参数设置默认值。
    只有当该变量为undefined时，默认值才会生效。

        jQuery.ajax = function (url, {
          async = true,
          beforeSend = function () {},
          cache = true,
          complete = function () {},
          crossDomain = false,
          global = true,
          // ... more config
        } = {}) {
          // ... do stuff
        };

- （6）遍历 Map 结构
    任何部署了Iterator接口的对象，都可以用 for...of...循环遍历。

        const map = new Map();
        map.set('first', 'hello');
        map.set('second', 'world');

        for (let [key, value] of map) {
          console.log(key + " is " + value);
        }
        // first is hello
        // second is world

- （7）输入模块的指定方法
    我们在使用import 或者 require 加载模块的时候，可以指定特定的方法，使得输入语句更清晰。

        const { SourceMapConsumer, SourceNode } = require("source-map");
        import { getToken } from '@/utils/auth';



# 第三讲 字符串的扩展

涉及到Unicode编码，文档没看懂，需要实例回顾
---

# 第四讲 正则的扩展



# 第五讲 数值的扩展



# 第六讲 函数的扩展

## 1、函数参数的默认值
（1）传统的函数参数 指定默认值缺点在于：如果参数赋值了，但是对应的布尔值为false，则该赋值不起作用。
    为了避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。

        function log(x, y) {
          y = y || 'World';
          //var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'World';
          console.log(x, y);
        }
        log('Hello') // Hello World
        log('Hello', 'China') // Hello China
        log('Hello', '') // Hello World

（2）ES6的写法比ES5简洁许多，而且非常自然  <br />
    a.默认声明的参数变量，在函数体中不能用 let 或 const 再次声明，否则会报错；
    b.使用参数默认值时，函数不能有同名参数；
    c.参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

        let x = 99;
        function foo(p = x + 1) {
            console.log(p);
        }
        foo();      //100

        x = 100;
        foo();      //101

（3）与解构赋值默认值结合使用

        function foo({x, y = 5} = {}) {
          console.log(x, y);
        }
        foo() // undefined 5


    //可解释为：
        "use strict";
        function foo() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              x = _ref.x,
              _ref$y = _ref.y,
              y = _ref$y === void 0 ? 5 : _ref$y;

          console.log(x, y);
        }
        foo(); // undefined 5


（4）双重默认值
        function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
          console.log(method);
        }
        fetch('http://example.com')
        // "GET"

函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值Get。

Q：解构赋值的默认值 ？？？


（5）对于这个demo存有疑虑！    <br />
        尤其涉及到解构赋值的部分，请重新学习 ## 第三讲 ## 变量的解构赋值

        // 写法一
        function m1({x = 0, y = 0} = {}) {
          return [x, y];
        }

        // 写法二
        function m2({x, y} = { x: 0, y: 0 }) {
          return [x, y];
        }

        // 函数没有参数的情况
        m1() // [0, 0]
        m2() // [0, 0]

        // x 和 y 都有值的情况
        m1({x: 3, y: 8}) // [3, 8]
        m2({x: 3, y: 8}) // [3, 8]

        // x 有值，y 无值的情况
        m1({x: 3}) // [3, 0]
        m2({x: 3}) // [3, undefined]

        // x 和 y 都无值的情况
        m1({}) // [0, 0];
        m2({}) // [undefined, undefined]

        m1({z: 3}) // [0, 0]
        m2({z: 3}) // [undefined, undefined]


（6）参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，哪些参数在调用时是可省略的。
否则无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。


（7）函数的length属性
指定了默认值以后，函数的length属性将返回没有指定默认值的参数个数，也就是说，指定默认值以后，length属性将失真。
如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

        (function (a = 0, b, c) {}).length // 0
        (function (a, b = 1, c) {}).length // 1


（8）作用域

        var x = 1;
        function foo(x, y = function() { x = 2; }) {
          var x = 3;
          y();
          console.log(x);
        }
        foo() // 3
        x // 1


        var x = 1;
        function foo(x, y = function() { x = 2; }) {
          x = 3;
          y();
          console.log(x);
        }
        foo() // 2
        x // 1


（9）应用
- 利用参数默认值，可以指定某个参数不能省略，如果省略就抛出一个错误。
- 如果将参数默认值设置为undefined，则表明这个参数说可以省略的。


## 2、rest参数

ES6引入rest参数（形式为...变量名），用于获取函数多余的参数。它搭配的变量是一个数组，该变量将多余的参数放入数组中。

arguments对象不是数组，而是一个类似数组的对象，所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。

### 注意，rest参数之后不能再有其它参数（即只能是最后一个参数），否则会报错。 ###

### 函数的length属性，不包括rest参数。 ###


## 3、严格模式

从ES5开始，函数内部可以设定为严格模式，ES6做出了修改：规定只要函数参数使用了默认值、解构赋值、扩展运算符，函数内部就不能显示设置为严格模式，否则会报错。 <br />
这是因为，函数内部的严格模式，同样适用于函数参数和函数体。函数执行的时候，先执行函数参数，再执行函数体。但是只有从函数体中，才知道参数是否应该以严格模式执行。

两种方法可以规避这种限制：
- 设置全局性的严格模式是合法的。

        'use strict';
        function doSomething(a, b = a) {
          // code
        }

- 把函数包在一个无参数的立即执行函数里面。

        const doSomething = (function () {
          'use strict';
          return function(value = 42) {
            return value;
          };
        }());


## 4、name属性

函数的name属性返回该函数的函数名。ES6的时候将其写入标准并作出修改。
- 如果将一个匿名函数赋值给一个变量，ES5的name属性会返回一个空字符串，而ES6的name属性值会返回实际的函数名（赋值的变量名）。
- 如果将一个具名函数赋值给一个变量，ES5和ES6的name属性都会返回这个具名函数原本的名字。
- Function构造函数返回的函数实例，name属性的值为anonymous。

        (new Function).name // "anonymous"

- bind返回的函数，name属性值会加上bound前缀。

        function foo() {};
        foo.bind({}).name // "bound foo"

        (function(){}).bind({}).name // "bound "


## 5、箭头函数
1. 圆括号代表参数部分；
2. 代码多于一条语句就需要用大括号括起来，并且使用return语句返回；
3. 返回值是对象时，必须用大括号括起来；
4. 注意：

    - 函数体内的 *this*对象，就是定义是所在的对象，而不是使用时所在的对象；
    - 不可以当做构造函数，也就是说，不可以使用*new*命令，否则会抛出一个错误；
    - 不可以使用*arguments*对象，该对象在函数体内不存在，如果要用，可以使用rest参数代替；
    - 不可以使用*yield*命令，因此箭头函数不能用作 Generator 函数。

5. 箭头函数可以让*this*指向固化，这种特性很利于封装回调函数。 <br />
    实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
6. 除了this，以下三个变量在箭头函数中也是不存在的，指向外层函数的对应变量：arguments、super、new.target
7. 由于箭头函数没有自己的this，也就不能用call()、apply()、bind()这些方法去改变this的指向
8. 箭头函数不适用的场合：

    - 定义函数的方法，且该方法内部包括this。箭头函数使得this指向全局对象，因此不会得到预期结果。

        const cat = {
          lives: 9,
          jumps: () => {
            this.lives--;
          }
        }

    - 需要动态this的时候，也不应使用箭头函数。 <br />
    下面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

       var button = document.getElementById('press');
       button.addEventListener('click', () => {
         this.classList.toggle('on');
       });

9. 嵌套的箭头函数

        function insert(value) {
          return {into: function (array) {
            return {after: function (afterValue) {
              array.splice(array.indexOf(afterValue) + 1, 0, value);
              return array;
            }};
          }};
        }
        insert(2).into([1, 3]).after(1); //[1, 2, 3]

使用箭头函数改写

        let insert = (value) => ({into: (array) => ({after: (afterValue) => {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        }})});
        insert(2).into([1, 3]).after(1); //[1, 2, 3]


部署管道机制的例子

        const pipeline = (...funcs) =>
          val => funcs.reduce((a, b) => b(a), val);

        const plus1 = a => a + 1;
        const mult2 = a => a * 2;
        const addThenMult = pipeline(plus1, mult2);

        addThenMult(5)    // 12

如果觉得上面的写法可读性比较差，也可以采用下面的写法。

        const plus1 = a => a + 1;
        const mult2 = a => a * 2;

        mult2(plus1(5))     // 12





















