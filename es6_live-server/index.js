// let jspang='技术胖|';
// let blog = `非常高兴你能看到这篇文章，我是你的老朋友。这节课我们学习字符串模版。`;
// document.write(jspang.repeat(10));



// let binary = 0B010101;
// document.write(binary);
//
// let octal = 0O666;
// document.write('octal', octal);
//
// let a = 11/4;
// console.log(Number.isFinite(a));
// console.log(Number.isFinite('jspang'));
// console.log(Number.isFinite(NaN));
// console.log(Number.isFinite(undefined));
//
// let b = NaN;
// console.log(Number.isNaN(b));
//
// let c = 918.1;
// console.log(Number.isInteger(c));
// console.log(Number.parseInt(c));
// console.log(Number.parseFloat(c));
//
// let test = Math.pow(2, 53)-1;
// console.log(test);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.MIN_SAFE_INTEGER);
// console.log(Number.isSafeInteger(test));



// let  json = {
//     '0': 'jspang',
//     '1': '技术胖',
//     '2': '大胖逼逼叨',
//     length:3
// };
// let arr=Array.from(json);
// console.log(arr);
//
//
// let arr1 = Array.of(3,4,5,6);
// console.log(arr1);
//
//
//
// let arr2 =Array.of('技术胖','jspang','大胖逼逼叨');
// console.log(arr2);
//
//
//
// let arr3=[1,2,3,4,5,6,7,8,9];
// console.log(arr3.find(function(value,index,arr){
//     return value > 5;
// }));



// console.log('--------------');
// const arr4 = ['laurelyy', 'YY', '小胖子'];
// arr4.fill('3岁', 1,3);
// console.log(arr4);
//
// const arr5 = ['laurelyy', 'YY', '小胖子'];
// for(let item of arr5) {
//     console.log(item)
// }
// for(let item of arr5.keys()) {
//     console.log(item)
// }
// for(let item of arr5.entries()) {
//     console.log(item)
// }
// console.log('----------------------');
// for(let [key, value] of arr5.entries()) {
//     console.log(`${key}:${value}`)
// }
// console.log('***********************');
// let tempArr = arr5.entries();
// console.log(tempArr);
// console.log('========================');
// console.log(tempArr.next().value);
// console.log('========================');
// console.log(tempArr.next().value);
// console.log('========================');
// console.log(tempArr.next().value);



// console.log('箭头函数及拓展========================');
// function add(a, b = 3) {
//     // 'use strict';
//     if(a===0) {
//         throw new Error('A is Error')
//     }
//     console.log(a+b)
// }
//
// add(1, 2);
// add(1);
// console.log('add函数的入参长度：', add.length);
//
// var addFunc = (a, b) => a + b;
// var addFunc = (a, b) => { return a + b };
// var addFunc = (a, b) => {
//     console.log('jspang');
//     return a + b
// };
// console.log('箭头函数', addFunc(1, 2));



// console.log('函数及数组补漏========================');
//
// // 对象的函数解构
// let jsonStr = {
//     a: 'jspang',
//     b: '技术胖'
// };
// function func({a, b}) {
//     console.log('对象的函数解构', a, b);
// }
// func(jsonStr);
//
//
// // 数组的函数解构
// let numArr = ['jspang', '技术胖'];
// function func2(a, b) {
//     console.log('数组的函数解构', a, b);
// }
// func2(...numArr);

// in 的用法
// let obj = {
//     a: 'jspang',
//     b: '技术胖'
// };
// console.log('in 的对象用法', 'a' in obj);
//
// // in 判断数组下标位置是否为空
// let arr6 = [,,,,,,,];
// console.log('不准确的判断方法', arr6.length);
// console.log('in 的数组用法：', 0 in arr6);
//
//
// // 数组遍历方法
// let arr7 = ['jspang', '技术胖'];
//
//     // forEach会自动忽略为空的数组元素
//     arr7.forEach((val, index) => {
//         console.log(index, val)
//     });
//
//     // filter
//     arr7.filter(x => console.log(x));
//
//     // some
//     arr7.some(x => console.log(x));
//
//     // map 在这里实现替换的作用
//     console.log(arr7.map(item=>'web'));
//
// // 数组转换为字符串
// console.log(arr7.join('|'));
// console.log(arr7.toString());



// console.log('es6中的对象========================');
//
// // 对象字面量
// let name = 'jspang';
// let skill = 'web';
// let obj11 = {
//     name,
//     skill
// };
// console.log(obj11);
//
// // 可计算的属性名
// let key = 'skill';
// let obj12 = {
//     [key]: 'web'
// };
// console.log(obj12);
//
// //自定义对象方法
// let obj13 = {
//     add: function(a, b) {
//         return a + b;
//     }
// };
// console.log(obj13.add(1, 2));
//
//
// //Object.is()
// // === 同值相等
// // Object.is() 严格相等
// console.log(+0===-0);
// console.log(NaN===NaN);
// console.log(Object.is(+0, -0));
// console.log(Object.is(NaN, NaN));
//
// //Object.assign()
// var aa={a:'jspang'};
// var bb={b:'技术胖'};
// var cc={c:'web'};
// let dd=Object.assign(aa,bb,cc);
// console.log(dd);



///////////////////////////////// ES6中Symbol的使用
// let x = new Number;
// let y = new String;
// let z = new Boolean;
// let k = new Object;
// let m = new Array;
//
// let n = Symbol();
// console.log('n', n);
// console.log('n.toString()', n.toString());
// console.log(typeof(m));
// console.log(typeof(n));
//
//
// let l = Symbol();
// let objL = {
//     [l]: 'JavaScript'
// };
// console.log(objL[l]);
// objL[l] = 'web';
// console.log(objL[l]);

// Symbol 对 对象元素的保护作用
// var objN={name:'jspang',skill:'web',age:18};
// for (let item in objN){
//     console.log(objN[item]);
// }
//
// let objM={name:'jspang',skill:'web'};
// let age=Symbol();
// objM[age]=18;
// for (let item in objM){
//     console.log(objM[item]);
// }
// console.log(objM);
// console.log(objM[age]);


console.log('Set及WeakSet数据结构=======================');
let setArr = new Set(['jspang', '技术胖', 'web', 'jspang']);
// setArr.add('jspang');
// setArr.add('developer');
// setArr.delete('web');
// setArr.clear();
//
console.log(setArr);
console.log(setArr.has('技术胖'));
// console.log(setArr.size);

// for (let item of setArr) {
//     console.log(item)
// }

// setArr.forEach(value => console.log(value));


// let weakSet = new WeakSet();
// let tempObj = {a: 'jspang', b: '技术胖'};
// // let tempObj1 = {a: 'jspang', b: '技术胖'};
// weakSet.add(tempObj);
// // weakSet.add(tempObj1);
//
// let tempObj1 = tempObj;
// weakSet.add(tempObj1);
// console.log(weakSet);





console.log('用Proxy进行预处理=======================');
// let obj = {
//     name: 'yy',
//     add: function (val) {
//         return val+100
//     }
// }
// console.log(obj.name)
// console.log(obj.add(100))

// get set
// let pro = new Proxy({
//     name: 'yy',
//     add: function (val) {
//         return val+100
//     }
// }, {
//     get: function (target, key, property) {
//         console.log('Come in Get')
//         // console.log(target)
//         return target[key] + '~yy'
//     },
//     set(target, p, value, receiver) {
//         console.log(`Setting ${p} = ${value}`)
//         // console.log(receiver)
//         return target[p] = value
//     }
// })
//
// console.log(pro.name)
// pro.name = 'YY'
// console.log(pro.name)


// apply
let target = function () {
    return 'I am yy !~'
}
let handler = {
    apply(target, ctx, args) {
        console.log('target', target)
        console.log('ctx', ctx)
        console.log('args', args)
        return Reflect.apply(...arguments)
    }
}
var pro = new Proxy(target, handler)
console.log(pro())







