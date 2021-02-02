// scope:在执行阶段之前，进行的编译阶段，规划好所有的作用域

// global scope 无法访问子作用域
function f1() {
  function f2() {
    console.log("test");
  }
  f2();
}

f1();
// f2(); ReferenceError

// function expression 的scope是在自己内部，并且是readonly，这里是 named function expression
var f1 = function f2() {
  console.log(f2);
};

f1();
// f2(); ReferenceError

// 使用named function expression的三个优点
// 1.Reliable function self-reference（recursion，etc）
// 2.More debuggable stack traces
// 3.More self-documenting code

var ids = people.map((person) => person.id);

var ids = people.map(function getId(person) {
  return person.id;
});

/////////////////////////////////////////
// IIFE
var teacher = "Kyle";

function anotherTeacher() {
  var teacher = "Brian";
  console.log(teacher);
}

anotherTeacher();
// 拆成两部分看，左边的anotherTeacher是一个变量，可以放到括号里，右边的括号是在执行
// (anotherTeacher)();
(function anotherTeacher() {
  var teacher = "Brian";
  console.log(teacher);
})();

/////////////////////////////////////////
// block scope

var teacher = "Kyle";
// 在{}中出现了let、const，就创建了block scope
{
  let teacher = "Brian";
  console.log(teacher);
}

function diff(x, y) {
  if (x < y) {
    let temp = x; // temp这个变量创建了block scope,temp只希望在内部使用，所以使用let
    x = y;
    y = temp;
  }
}
