// let and const

//ES5
function driversLicence5(passedTTest) {
  //undefined，因为变量提升
  //console.log(firstName);
  if (passedTTest) {
    var firstName = "John";
    var birthOfYear = "1990";
  }
  console.log(firstName + ",born in " + birthOfYear + ", passed");
}

driversLicence5(true);

//ES6,block scope，只能被{}内访问，并且const不能只定义不赋值
function driversLicence6(passedTTest) {
  //is not defined,报错
  //console.log(firstName);
  let firstName;
  const birthOfYear = "1990";
  if (passedTTest) {
    firstName = "John";
  }
  console.log(firstName + ",born in " + birthOfYear + ", passed");
}

driversLicence6(true);

//i被循环的i覆盖了
var i = 20;

for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i);

//i2没有被循环的i2覆盖，因为let是block scope不影响{}外的i2
let i2 = 20;

for (let i2 = 0; i2 < 5; i2++) {
  console.log(i2);
}
console.log(i2);

//////////////////////////////////////
// block and IIFE
{
  let a = 1;
  const b = 2;
  var c = 3;
}
// console.log(c);
// console.log(a);
// console.log(b);

(function () {
  var d = 4;
})();
// console.log(d);

///////////////////////////////////////////
//Strings

let firstName = "john";
let lastName = "smith";
const birthOfYear = 1990;

function calculateAge(year) {
  return 2020 - year;
}

console.log(
  "This is " +
    firstName +
    " " +
    lastName +
    ". He was borned in " +
    birthOfYear +
    ", Today, he is " +
    calculateAge(birthOfYear) +
    " years old."
);
//template literal
console.log(
  `This is ${firstName} ${lastName}. He was borned in ${birthOfYear}. Today, he is ${calculateAge(
    birthOfYear
  )} years old.`
);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith("j"));
console.log(n.endsWith("m"));
console.log(n.includes("oh"));
console.log(`${firstName} `.repeat(5));

///////////////////////////////////
// Arrow functions

const years = [1990, 1967, 1845];

var ages5 = years.map(function (el) {
  return 2020 - el;
});
console.log(ages5);

let ages6 = years.map((el) => 2020 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}:${2020 - el}`);
console.log(ages6);

ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  return `Age element ${index + 1}:${now - el}`;
});
console.log(ages6);

//this的作用域
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    //callback里面的this是global的this，而不是box5的this
    var self = this;
    document.querySelector(".green").addEventListener("click", function () {
      alert("This is box " + self.position + " and it is " + self.color);
    });
  },
};

box5.clickMe();

//arrow function 的 this
var box6 = {
  color: "green",
  position: 1, //外层的function如果改成了箭头函数，this就会指向window
  clickMe: function () {
    document.querySelector(".green").addEventListener("click", () => {
      alert("This is box " + this.position + " and it is " + this.color);
    });
  },
};

// box6.clickMe();

// ES5 bind的用法，使回调可以使用this
function Person(name) {
  return (this.name = name);
}

Person.prototype.myFriends5 = function (friedns) {
  var arr = friedns.map(
    function (el) {
      return this.name + " is friends with " + el;
    }.bind(this)
  );
  console.log(arr);
};

var friedns = ["Bob", "Jane", "Mark"];
// new Person("John").myFriends5(friedns);

Person.prototype.myFriends6 = function (friedns) {
  var arr = friedns.map((el) => this.name + " is friends with " + el);
  console.log(arr);
};
new Person("John").myFriends6(friedns);

//////////////////////////////////////////
// Destructuring，解构

/*
var obj = { firstName: "john", lastName: "smith" };
const { firstName, lastName } = obj;
const { firstName: a, lastNam: b } = obj;
*/
function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}
const [age, retirement] = calcAgeRetirement(1993);
console.log(age);
console.log(retirement);

///////////////////////////////////////////
// Arrays
const boxes = document.querySelectorAll(".box");

//ES5,将nodelist转成array

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (el) {
  el.style.backgroundColor = "dodgerblue";
});

//Array.from
const boxes6Arr = Array.from(boxes);
Array.from(boxes).forEach((el) => {
  el.style.backgroundColor = "dodgerblue";
});

// ES5,改变文字
for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === "box blue") {
    continue;
  }
  boxesArr5[i].textContent = "I changed to blue";
}

//ES6 for of
for (const cur of boxes6Arr) {
  if (cur.className.includes("blue")) {
    continue;
  }
  cur.textContent = "I changed to blue";
}

//ES6 find和findIndex
const ages = [12, 13, 18, 19];

console.log(ages.findIndex((cur) => cur > 18));
console.log(ages.find((cur) => cur > 18));

// Spread operator

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

//ES5
var sum1 = addFourAges(12, 13, 18, 19);
console.log(sum1);

var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
var sum3 = addFourAges(...ages);
console.log(sum3);

//合并数组

const familySmith = ["John", "Jane", "Mark"];
const familyMiller = ["Mary", "Bob", "Ann"];

const bigFamily = [...familySmith, "Lily", ...familyMiller];
console.log(bigFamily);

//也可以用于nodelist
const h = document.querySelector("h1");
// const boxes = document.querySelectorAll(".box");
const all = [h, ...boxes];

Array.from(all).forEach((cur) => {
  cur.style.color = "purple";
});

////////////////////////////////////////////////
// Rest parameter：与spread相反，把多个参数合并成数组

//ES5
function isFullAge5(limit) {
  var argsArr = Array.prototype.slice.call(arguments, 1);
  argsArr.forEach(function (cur) {
    console.log(new Date().getFullYear() - cur >= limit);
  });
}
isFullAge5(18, 1990, 1993, 2005);

//ES6
function isFullAge6(limit, ...years) {
  years.forEach((cur) => {
    console.log(new Date().getFullYear() - cur >= limit);
  });
}
isFullAge6(18, 1990, 1993, 2005);

////////////////////////////////////
// Default parameters

//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  //默认值
  lastName === undefined ? (lastName = "Smith") : lastName;
  nationality === undefined ? (nationality = "american") : nationality;

  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

//ES6 默认参数
function SmithPerson(
  firstName,
  yearOfBirth,
  lastName = "Smith",
  nationality = "american"
) {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);

///////////////////////////////////
// Maps,key可以是primitive、function

const question = new Map();
question.set(
  "question",
  "What is the official name of the latest major JavaScript version?"
);
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES2015");
question.set("correct", 3);
question.set(true, "Correct anwser");
question.set(false, "Wrong, please try again");

console.log(question.get("question"));
console.log(question.size);

if (question.has(4)) {
  console.log("Anwser 4 is here");
  // question.delete(4);
}

//question.clear()

question.forEach((value, key) => {
  // console.log(`This is key:${key},and it's set to ${value}`);
});

for (const [key, value] of question.entries()) {
  if (typeof key === "number") {
    console.log(`Anwser ${key}: ${value}`);
  }
}

// const ans = parseInt(prompt("enter the anwser"));
// console.log(question.get(ans === question.get("correct")));

/////////////////////////////////
// Classes和function constructor的区别：
// 1.class不会被hoist，必须先声明
// 2.只能添加方法，不能添加属性

//ES5
var Person5 = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};
Person5.prototype.calculateAge = function () {
  console.log(new Date().getFullYear() - this.yearOfBirth);
};

//ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log("hello");
  }
}

//static方法不能被实例调用
Person6.greeting();

////////////////////////////////
// subclasses

//ES5
var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
};

Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function () {
  this.medals++;
  console.log(this.medals);
};

var john = new Person5("john", 1990, "swimmer");
var johnAthlete5 = new Athlete5("john", 1990, "swimmer", 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//ES6

class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }
  wonMedal() {
    this.medals++;
    console.log(this.medals);
  }
}

const johnAthlete6 = new Athlete6("john", 1990, "swimmer", 3, 10);
johnAthlete6.calculateAge();
johnAthlete6.wonMedal();

//challenge

class townElements {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends townElements {
  constructor(name, buildYear, trees, area) {
    super(name, buildYear);
    this.trees = trees;
    this.area = area;
  }

  treeDensity() {
    console.log(
      `${this.name} has a tree density of ${
        this.trees / this.area
      } trees per square km`
    );
  }

  treeCount() {
    if (this.trees > 1000) {
      console.log(`${this.name} has more than 1000 trees`);
    }
  }
}

class Street extends townElements {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifySize() {
    const classification = new Map();
    classification.set(1, "tiny");
    classification.set(2, "small");
    classification.set(3, "normal");
    classification.set(4, "big");
    classification.set(5, "huge");
    console.log(
      `${this.name},built in ${this.buildYear}, is a ${classification.get(
        this.size
      )} street`
    );
  }
}

const park1 = new Park("Green Park", 1978, 200, 0.2);
const park2 = new Park("National Park", 2004, 1200, 2.9);
const park3 = new Park("Oak Park", 2012, 600, 0.4);
const parksArr = [park1, park2, park3];

const allStreets = [
  new Street("Ocean Avenue", 1999, 1.1, 4),
  new Street("Evergreen Street", 1999, 1.5, 5),
  new Street("4th Street", 1999, 3, 1),
  new Street("Sunset Boulevard", 1999, 2),
];

function calc(arr) {
  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

  return [sum, sum / arr.length];
}

function reportParks(p) {
  console.log("----PARK REPORT-------");
  const agesArr = p.map((cur) => new Date().getFullYear() - cur.buildYear);
  const [sumYears, averageYears] = calc(agesArr);
  console.log(
    `Our ${p.length} parks have an average of ${averageYears} years.`
  );
  p.forEach((cur) => {
    cur.treeDensity();
  });
  p.forEach((cur) => {
    cur.treeCount();
  });
  // p.map((el) => el.trees).findIndex((el) => el > 1000);
}

function reportStreets(p) {
  console.log("----STREETS REPORT-------");

  const [totalLength, averageLength] = calc(p.map((el) => el.length));
  console.log(
    `Our ${p.length} streets have a total length of ${totalLength} km,and average length of ${averageLength} km.`
  );

  p.forEach((cur) => cur.classifySize());
}

reportParks(parksArr);
reportStreets(allStreets);
