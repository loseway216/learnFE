// ***********************************
// Objects are built by "constructor call"(via new)
// A "constructor call" makes an object linked to its own prototype

function Workshop(teacher) {
  this.teacher = teacher
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question)
}

// 1.创建一个空{}
// 2.将空{} linked to Workshop.prototype
// 3.this指向新创建的{}
// 4.如果Workshop function返回的不是对象，视为返回this
var deepJS = new Workshop('Kyle')
var vueJS = new Workshop('Evan')

console.log(typeof deepJS)

// deepJS和vueJS对象上并没有ask方法，但是Workshop.prototype上面有
deepJS.ask(', what is js?')
vueJS.ask(', what is vue?')

// 表面上可以理解为deepJS这个实例是Workshop构造出来的，但是deepJS其实是new构造出来的新对象
deepJS.constructor === Workshop // true
// 原理
deepJS.constructor === Workshop.prototype.constructor
Workshop.prototype.constructor === Workshop

// dunderproto
// 看起来好像是deepJS上有一个属性叫做__proto__，其实是deepJS指向了Workshop.prototype
// Workshop.prototype上也没有__proto__，再往上指向了Object.prototype
// Object.prototype上有一个getter function叫__proto__，调用的this指向了deepJS
deepJS.__proto__ === Workshop.prototype // true

// shadowing prototypes，class中的super关键词
deepJS.ask = function (question) {
  // this.ask(question.toUpperCase());// 无限递归，因为this指向了deepJS
  // this.__proto__ === Wrokshop.prototype，调用上面的ask会将this指向Wrokshop.prototype，所以需要bind
  this.__proto__.ask.call(this, question.toUpperCase())
}

deepJS.ask('Is this fake polymorphism?')

// Prototype inheritance
// JavaScript's inheritance is Delegation
function AnotherWorkshop(teacher) {
  Workshop.call(this, teacher)
}

// 方法1
// Object.create做了new做的前两件事情
AnotherWorkshop.prototype = Object.create(Workshop.prototype)

// 方法2
function temp() {}
temp.prototype = Workshop.prototype
AnotherWorkshop.prototype = new temp()

// 绑定子类方法
AnotherWorkshop.prototype.speakUp = function (msg) {
  this.ask(msg.toUpperCase())
}

var JSRecentParts = new AnotherWorkshop('Kyle')

JSRecentParts.ask('Is this actually inheritance?')
JSRecentParts.speakUp('Is this actually inheritance?')

// getify个人推荐的pattern OLOO: Object Linked to Other Object
var Workshop = {
  setTeacher(teacher) {
    this.teacher = teacher
  },
  ask(question) {
    console.log(this.teacher, question)
  }
}

var AnotherWorkshop = Object.assign(Object.create(Workshop), {
  speakUp(msg) {
    this.ask(msg.toUpperCase())
  }
})

var JSRecentParts = Object(AnotherWorkshop)
JSRecentParts.setTeacher('Kyle')
JSRecentParts.speakUp("But isn't this cleaner?")

// Object.create pollyfill

if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o
    return new F()
  }
}
