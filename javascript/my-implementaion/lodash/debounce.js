// 防止抖动，以免把一次事件误认为多次
// delay时间到后才执行，再次执行会重新计算delay
// 场景：
// 1.登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
// 2.调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
// 3.文本编辑器实时保存，当无任何更改操作一秒后进行保存
function debounce(fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

const doNotSayHiTooFrequently = debounce(msg => console.log(msg), 1000)

doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')
doNotSayHiTooFrequently('hi')
