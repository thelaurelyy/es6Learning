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



