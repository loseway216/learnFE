//Function constructor，开头字母大写

//两种定义calculateAge的区别：希望被继承的放到prototype里面

var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  //   this.calculateAge = function () {
  //     console.log(2020 - this.yearOfBirth);
  //   };
};

Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
};
Person.prototype.lastName = "Smith";

var john = new Person("John", 1993, "teacher");
var jane = new Person("Jane", 1992, "designer");
var mark = new Person("Mark", 1948, "retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.__proto__ === Person.prototype);
console.log(john.hasOwnProperty("name"));
console.log(john.hasOwnProperty("lastname"));
console.log(john instanceof Person);

var a = [2, 4, 6];
console.log(a);
console.log(typeof a);
console.log(a instanceof Array);

//////////////////////////////////////////////
//Object.create

var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  },
};

var john = Object.create(personProto);
john["name"] = "John";
john["yearOfBirth"] = 1993;
john["job"] = "teacher";

var jane = Object.create(personProto, {
  name: { value: "Jane" },
  yearOfBirth: { value: 1992 },
  job: { value: "designer" },
});

console.log(john);
console.log(jane);

//////////////////////////////////////////////
//Primitivies vs objects

var a = 23;
var b = a;
a = 46;
console.log(a, b);

//Objects
var obj1 = { name: "John", age: 23 };
var obj2 = obj1; //指向内存中同一个object
obj1.age = 46;

console.log(obj1);
console.log(obj2);

//Functions
var age = 27;
var obj = { name: "Jonas", city: "Lisbon" };

//
function change(a, b) {
  a = 30;
  b.city = "San Francisco";
}

//参数age是primitive，产生的新的变量，与age无关
//参数obj不是obj本身，是指向obj的引用
change(age, obj);
console.log(age);
console.log(obj.city);

//passing functions as arguments

/*
var years = [1990, 1965, 1947, 2005, 1993];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else {
    return -1;
  }
}
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
// console.log(fullAges);

var rates = arrayCalc(ages, maxHeartRate);
*/

//Functions returning functions
/*
function interviewQuestion(job) {
  if (job === "designer") {
    return function (name) {
      console.log(name + ", can you explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function (name) {
      console.log(name + ", what subject do you teach?");
    };
  } else {
    return function (name) {
      console.log(name + ",Hello,what dou you do?");
    };
  }
}

interviewQuestion("teacher")("John");
interviewQuestion("teacher")("Jane");
*/

//////////////////////////////////////////////
//IIFE：immediately invoked function expressions
//将function declaration伪装成function expression

(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

//报错，无法访问private的变量
//console.log(score);

(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);

//Closures:内部的函数永远可以访问外部函数的参数和变量，即使外部函数已经被返回
//return之后，execution context is gone，but variable objec is still there

function retirement(retirementAge) {
  var a = " years left until retirement.";
  return function (yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}
//retirementAge和a是定义在匿名函数外的变量，retirement(60)执行之后，函数已经return了，但是其中的匿名函数还是可以访问得到retirementAge和a
var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

//////////////////////////////////////////////
//使用闭包改写interviewQuestion

/*
function interviewQuestion(job) {
  if (job === "designer") {
    return function (name) {
      console.log(name + ", can you explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function (name) {
      console.log(name + ", what subject do you teach?");
    };
  } else {
    return function (name) {
      console.log(name + ",Hello,what dou you do?");
    };
  }
}
*/

function interviewQuestion(job) {
  return function (name) {
    if (job === "designer") {
      console.log(name + ", can you explain what UX design is?");
    } else if (job === "teacher") {
      console.log(name + ", what subject do you teach?");
    } else {
      console.log(name + ",Hello,what dou you do?");
    }
  };
}

//////////////////////////////////////////////
// bind, call, apply
var lzw = {
  name: "Lu Ziwei",
  job: "software engineer",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " + timeOfDay + ", I'm " + this.name + " and I'm a " + this.job
      );
    } else if (style === "friendly") {
      console.log(
        "What's up! Good " +
          timeOfDay +
          "I'm " +
          this.name +
          " and I'm a " +
          this.job
      );
    }
  },
};

var lzw2 = {
  name: "Loseway",
  job: "wower",
};

lzw.presentation("friendly", "Morning");
lzw.presentation.call(lzw2, "formal", "afternoon");
// lzw.presentation.apply(lzw2, ["friendly", "afternoon"]);

//carrying：复制一个function，预设一些参数
var lzwFriendly = lzw.presentation.bind(lzw, "friendly");
lzwFriendly("night");
lzwFriendly("noon");

var lzw2Formal = lzw.presentation.bind(lzw2, "formal");
lzw2Formal("night");

//用bind改写上面的计算年龄
var years = [1990, 1965, 1947, 2005, 1993];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

var fullAgeCN = isFullAge.bind(this, "18");

var fullAges = arrayCalc(ages, fullAgeCN);

console.log(fullAges);

//////////////////////////////////////////////
//Coding challange
//放到IIFE里，不会影响外面的代码
(function () {
  var Question = function (question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  };

  //展示问题的方法不接触每个具体的问题，而是在原型中
  Question.prototype.displayQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ":" + this.answers[i]);
    }
  };
  Question.prototype.checkAnswer = function (userAnswer, callback) {
    var sc;
    if (userAnswer === this.correctAnswer) {
      console.log("Correct!");
      sc = callback(true);
    } else {
      console.log("Wrong!");
      sc = callback(false);
    }
    this.displayScore(sc);
  };
  Question.prototype.displayScore = function (score) {
    console.log("your current score is " + score);
    console.log("-------------");
  };

  var q1 = new Question(
    "What class do you play in WOW?",
    ["mage", "rouge", "hunter"],
    0
  );

  var q2 = new Question(
    "Which rank is the highest in WOW?",
    ["rank14", "rank13", "rank12"],
    0
  );

  var q3 = new Question(
    "Who is the final boss of TBC?",
    ["Arthas", "Sageras", "Illidan"],
    2
  );

  var questions = [q1, q2, q3];

  //闭包：更新分数
  function score() {
    var sc = 0;
    return function (correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }

  //创建闭包，sc永远可以被keepScore访问到，将keepScore作为回调函数传给checkAnswer
  var keepScore = score();

  // nextQuestion();

  // function nextQuestion() {
  //   var n = Math.floor(Math.random() * questions.length);
  //   questions[n].displayQuestion();
  //   var userAnswer = prompt("please enter your answer below");
  //   questions[n].checkAnswer(parseInt(userAnswer), keepScore);
  //   if (userAnswer !== "exit") {
  //     nextQuestion();
  //   }
  // }
})();
