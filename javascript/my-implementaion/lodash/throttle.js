// 控制事件发生的频率
// delay的时间内，只会执行一次
// 场景：
// scroll 事件，每隔一秒计算一次位置信息等
// 浏览器播放事件，每个一秒计算一次进度信息等
// input 框实时搜索并发送请求展示下拉列表，没隔一秒发送一次请求 (也可做防抖)
function throttle(fn, delay) {
  let canUse = true
  return function () {
    if (canUse) {
      canUse = false
      fn.apply(this, arguments)
      setTimeout(() => (canUse = true), delay)
    }
  }
}

const doNotSayHiTooFrequently = throttle(msg => console.log(msg), 1000)

doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')

setTimeout(() => {
  doNotSayHiTooFrequently('hi')
}, 1000)
