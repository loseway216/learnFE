///////////////////////////////////////
// Lecture: Hoisting “提升”

//可以在declaration之前先调用
calculateAge(1993);
//function declaration
function calculateAge(year) {
  console.log(2020 - year);
  console.log(this);
}
//报错
// retirement(1993);
//hoisting 对 function expression 不生效
var retirement = function (year) {
  console.log(60 - 2020 + year);
};

console.log(age); //undefined，而非 is not defined
var age = 23;
function foo() {
  console.log(age); //undefined，因为age属于foo的execution context的variable object
  var age = 60;
  console.log(age);
}
foo();
console.log(age);

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

//scope chain，子作用域可以访问父作用域的变量，自己的VO+父VO
var a = "Hello!";
first();

function first() {
  var b = "Hi!";
  second();

  function second() {
    var c = "Hey!";
    console.log(a + b + c);
  }
}

// Example to show the differece between execution stack and scope chain

var a = "Hello!";
first();

function first() {
  var b = "Hi!";
  second();

  function second() {
    var c = "Hey!";
    third(); //因为作用域链，有权调用global scope的third函数
  }
}

function third() {
  var d = "John";
  //   console.log(a + b + c + d);
  //console.log(c); //c is not defined，因为作用域链，无权调用变量c
}

///////////////////////////////////////
// Lecture: The this keyword

function calculateAge(year) {
  console.log(2020 - year);
  console.log(this);
}

var john = {
  name: "Jhon",
  yearOfBirth: 1993,
  calculateAge: function () {
    console.log(this);
    // console.log(2020 - this.yearOfBirth);

    function innerFunction() {
      console.log(this);
    }
    innerFunction();
  },
};
//1和3是window的this,2是john的this，因为1和3是regular function，2是method call
//反直觉的：counter-intuitive
john.calculateAge();

var mike = {
  name: "Mike",
  yearOfBirth: 1990,
};
mike.calculateAge = john.calculateAge;
mike.calculateAge(); //this只在object calls the method的时候赋值
