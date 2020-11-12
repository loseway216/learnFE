// var p = prompt("Hello World!");
// console.log(p);

var x = 10
++x
// console.log(x);

//flasy values：undefined、null、0、""、NaN

var height = 23

if (height || height === 0) {
  console.log('variable is defined')
} else {
  console.log('variable has not been defined')
}

if (height == '23') {
  console.log('The == oprater does type corecion!')
}

//Function declaration
function whatDoYouDo() {}

//Function expression
var whatDoYouDo = function () {}

//Arrays
var john = ['John', 'Smith', 1990, 'teacher']

john.push('blue')
john.unshift('Mr.')

john.pop()
john.shift()

//Objects
var john = {
  birthYear: 1993,
  calcAge: function () {
    this.age = 2020 - this.birthYear
  }
}

john.calcAge()
console.log(john.age)
