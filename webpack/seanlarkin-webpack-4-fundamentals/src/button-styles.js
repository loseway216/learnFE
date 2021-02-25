// commonJS named export
const red = 'color: red;'
const blue = 'color: blue;'
const makeColorStyle = color => `color: ${color}`

// 导出最好都放到最后
exports.red = red
exports.blue = blue
exports.makeColorStyle = makeColorStyle
