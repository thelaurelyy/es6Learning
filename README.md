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
###（1）const声明一个只读的常量，一旦声明，常量的值就不能改变。
这意味着，const一旦声明变量就必须立即初始化，不能留到以后赋值。 <br />
const的作用域与let命令相同：只在声明所在的块级作用域内有效。<br />
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。<br />
const声明的常量，也与let一样不可重复声明。<br />

> 注意！const只能保证这个指针是固定的的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

###（2）如果真的想讲对象冻结，应该是用 Object.freeze({})方法。

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

###（3）ES6声明变量的6种方法
ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，还有import命令和class命令。

###（4）顶层对象的属性
ES5中，顶层对象的属性与全局变量是等价的，这样造成了 ####很多隐患### 。   <br />
ES6中，var命令和function命令声明的全局变量依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

###（5）global对象


# 第二讲 变量的解构赋值
## 1、数组的解构赋值
>ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
>本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
>如果解构不成功，变量的值就等于undefined。

###（1）基本用法：事实上只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

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


###（2）默认值
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
###（1）对象的结构与数组有一个重要的不同。
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

###（2）默认值
默认值生效的条件是，对象的属性值严格等于undefined。

###（3）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

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

## 5、函数参数的解构赋值 <font color="Hotpink">【重点】</font>
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














