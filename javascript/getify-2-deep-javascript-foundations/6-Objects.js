// ********************************
// this keyword
// A function's this references the execution context for that call,
// determined entirely by how the function was called.
// this和lexical scope的区别：scope在parsing阶段就决定了，但是this取决于runtime，取决于上下文

// lexical scope
var teacher = "Kyle";

function ask(question) {
  // lexical scope：ask无法访问otherClass作用域的teacher，只能访问global scope的
  // 如果是dynamic scope，ask可以访问调用者otherClass的teacher
  console.log(teacher, question);
}

function otherClass() {
  var teacher = "Brian";

  ask("Why?");
}

otherClass();

// dynamic context ~= JS's dynamic scope
function ask(question) {
  // this取决与ask如何被调用
  console.log(this.teacher, question);
}

function otherClass() {
  var context = { teacher: "Brian" };

  ask.call(context, "Why?");
}

otherClass();

// *****************************************
// 调用function的四种方法
// 1.implicit binding
function ask(question) {
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: "Kyle",
  ask,
};

var workshop2 = {
  teacher: "Brian",
  ask,
};

workshop1.ask("What is implicit binding?");
workshop2.ask("What is implicit binding?");

// *********************************************
// 2.hard binding

// call apply
ask.call(workshop1, "What is hard binding?");
ask.apply(workshop2, ["What is hard binding?"]);

var workshop = {
  teacher: "Kyle",
  ask(question) {
    console.log(this.teacher, question);
  },
};

// 1秒之后，执行的是 workshop.ask.call(window, "Lost this?")
setTimeout(workshop.ask, 1000, "Lost this?");

// bind produce a new function bound to a particular this context
setTimeout(workshop.ask.bind(workshop), 1000, "Hard bound this?");

// **************************************
// 3.new binding
var teacher2 = "Brian";
function ask(question) {
  console.log(this.teacher2, question);
}

// new 并不是创建类，与class无关
// 1.create a brand new empty object
// 2.* link that object to another object
// 3.call function with 'this' set to the new object
// 4.if function does not return an object, assume return of 'this'
var newEmptyObject = new ask("What is 'new' doing here?"); // 有点类似 ask.call({}, "What is 'new' doing here?")

// ************************************
// 4.default binding，不属于上面三种的所有情况，默认绑定到gloabl，没有意义因此strict模式是undefined
var teacher = "Kyle";

function ask(question) {
  console.log(this.teacher, question);
}

function askAgain(question) {
  "use strict";
  console.log(this.teacher, question);
}

ask("What is the non-strict-mode default?");

// undefined
// askAgain("What is the strict-mode default?");

// 三种binding的优先级
// Is the function called by new ?
// Is the function called by call() or apply() Note:bind() effectively uses apply()
// Is the function called on a context object?
// Default global object(except strict mode)
var workshop = {
  teacher: "Kyle",
  ask: function (question) {
    console.log(this.teacher, question);
  },
};

new (workshop.ask.bind(workshop))("What does this do?"); // undefined

// *****************************************
// arrow function

// Wrong：An arrow function is this-bound(aka .bind()) to its parent function
// Spec: An ArrowFunction does not define local bindings for arguments, super, this, or new.target.
// Any reference to arguments, super, this, or new.target within an ArrowFunction must resolve to a binding in a lexically enclosing environment
// https://262.ecma-international.org/9.0/#sec-arrow-function-definitions-runtime-semantics-evaluation

// lexcial this behavior: this并不是箭头函数内部的变量，就像其他变量一样，会往上找scope，然后找那一层scope的this
var workshop = {
  teacher: "Kyle",
  ask(question) {
    setTimeout(() => {
      console.log(this.teacher, question);
    }, 100);
  },
};

workshop.ask("Is this lexical 'this'?");

// objeact的{}并不创建scope
var workshop = {
  teacher: "Kyle",
  ask: (question) => {
    console.log(this.teacher, question);
  },
};

workshop.ask("What happened to 'this'?"); // undefined What happened to 'this'?

workshop.ask.call(workshop, "Still no 'this'?"); // undefined Still no 'this'?

// ************************************
// Class 对比原型的优势在于继承、多态

// 某些做法：为了得到固定的this，把method绑定在实例上，而不是原型上
// https://gist.github.com/getify/86bed0bb78ccb517c84a6e61ec16adca
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
    this.ask = (question) => {
      console.log(this.teacher, question);
    };
  }
}

// class 中 super并不是语法糖，而是新增的特性，实现多态（polymorphism），子类引用父类的方法
class AnotherWorkshop extends Workshop {
  // shadowing
  ask(msg) {
    super.ask(msg.toUpperCase());
  }
}
