import nav from './nav'
import { footer } from './footer'
// button内部是commongJS，但是webpack支持用ESM来引用，只要不再同一个文件中混用即可
import makeButton from './button'
import { makeColorStyle } from './button-styles'

const button = makeButton('A button')
button.style = makeColorStyle('cyan')

document.body.appendChild(button)
document.body.appendChild(footer)
