// **********************************
// Closure is when a function "remembers" its lexcical scope even when the function is excuted outside that lexical scope

// waitASec执行的时候，ask已经执行完毕了，但是question保留了
function ask(question) {
  setTimeout(function waitASec() {
    console.log(question);
  }, 1000);
}

ask();

// holdYourQuestion被返回后，仍然可以访问到question
function ask(question) {
  return function holdYourQuestion() {
    console.log(question);
  };
}

var myQuestion = ask("What is closure?");

myQuestion();

// var 改成 let。从1个变量，改成创建了3个变量
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

// **********************************
// namespace pattern，不是module pattern，因为encapsulation不止是组装，还需要隐藏
// teacher should be private
var workshop = {
  teacher: "Kyle",
  ask(question) {
    console.log(this.teacher, question);
  },
};

workshop.ask("Is this a module?");

//module pattern
// Modules encapsulate data and behavior(methods) together. The state(data) of a module is held by its methods via closure.

// 用IIFE包裹，singleton，执行一次之后就销毁了
// 单例模式
var workshop = (function Module(teacher) {
  // minimally expose API
  var publicAPI = { ask };
  return publicAPI;

  // ************
  function ask(question) {
    console.log(teacher, question);
  }
})("Kyle");

workshop.ask("It is a module, right?");

// 不用IIFE，可以多次被调用：module构造器
// 工厂模式
function WorkshopModule(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  // ************
  function ask(question) {
    console.log(teacher, question);
  }
}

// different instance of the module
var workshop1 = WorkshopModule("Kyle");
var workshop2 = WorkshopModule("Brian");

// **************************************
// ES6 Modules
// export的是public，其他的是private
// 一个module是一个文件，webpack打包后是什么写法？
// singleton，一个module只会执行一次，多次import只是创建reference
// node中也可以使用，文件名需要是mjs
var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}

// name import, more like java
import ask from "workshop.mjs";
ask("");

// namespace import, more like javascript old way
import * as workshop from "workshop.mjs";
workshop.ask();
