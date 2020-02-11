let jspang='技术胖|';
let blog = `非常高兴你能看到这篇文章，我是你的老朋友。这节课我们学习字符串模版。`;
document.write(jspang.repeat(10));


let binary = 0B010101;
document.write(binary);

let octal = 0O666;
document.write('octal', octal);

let a = 11/4;
console.log(Number.isFinite(a));
console.log(Number.isFinite('jspang'));
console.log(Number.isFinite(NaN));
console.log(Number.isFinite(undefined));

let b = NaN;
console.log(Number.isNaN(b));

let c = 918.1;
console.log(Number.isInteger(c));
console.log(Number.parseInt(c));
console.log(Number.parseFloat(c));

let test = Math.pow(2, 53)-1;
console.log(test);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.isSafeInteger(test));


let  json = {
    '0': 'jspang',
    '1': '技术胖',
    '2': '大胖逼逼叨',
    length:3
};
let arr=Array.from(json);
console.log(arr);


let arr1 = Array.of(3,4,5,6);
console.log(arr1);



let arr2 =Array.of('技术胖','jspang','大胖逼逼叨');
console.log(arr2);



let arr3=[1,2,3,4,5,6,7,8,9];
console.log(arr3.find(function(value,index,arr){
    return value > 5;
}));


console.log('--------------');
const arr4 = ['laurelyy', 'YY', '小胖子'];
arr4.fill('3岁', 1,3);
console.log(arr4);

const arr5 = ['laurelyy', 'YY', '小胖子'];
for(let item of arr5) {
    console.log(item)
}
for(let item of arr5.keys()) {
    console.log(item)
}
for(let item of arr5.entries()) {
    console.log(item)
}
console.log('----------------------');
for(let [key, value] of arr5.entries()) {
    console.log(`${key}:${value}`)
}
console.log('***********************');
let tempArr = arr5.entries();
console.log(tempArr);
console.log('========================');
console.log(tempArr.next().value);
console.log('========================');
console.log(tempArr.next().value);
console.log('========================');
console.log(tempArr.next().value);



console.log('箭头函数及拓展========================');
function add(a, b = 3) {
    // 'use strict';
    if(a===0) {
        throw new Error('A is Error')
    }
    console.log(a+b)
}

add(1, 2);
add(1);
console.log('add函数的入参长度：', add.length);

var addFunc = (a, b) => a + b;
var addFunc = (a, b) => { return a + b };
var addFunc = (a, b) => {
    console.log('jspang');
    return a + b
};
console.log('箭头函数', addFunc(1, 2));




console.log('函数及数组补漏========================');

// 对象的函数解构
let jsonStr = {
    a: 'jspang',
    b: '技术胖'
};
function func({a, b}) {
    console.log('对象的函数解构', a, b);
}
func(jsonStr);


// 数组的函数解构
let numArr = ['jspang', '技术胖'];
function func2(a, b) {
    console.log('数组的函数解构', a, b);
}
func2(...numArr);


// in 的用法
let obj = {
    a: 'jspang',
    b: '技术胖'
};
console.log('in 的对象用法', 'a' in obj);

// in 判断数组下标位置是否为空
let arr6 = [,,,,,,,];
console.log('不准确的判断方法', arr6.length);
console.log('in 的数组用法：', 0 in arr6);


// 数组遍历方法
let arr7 = ['jspang', '技术胖'];

    // forEach会自动忽略为空的数组元素
    arr7.forEach((val, index) => {
        console.log(index, val)
    });

    // filter
    arr7.filter(x => console.log(x));

    // some
    arr7.some(x => console.log(x));

    // map 在这里实现替换的作用
    console.log(arr7.map(item=>'web'));

// 数组转换为字符串
console.log(arr7.join('|'));
console.log(arr7.toString());
