import nav from './nav'
import { footer } from './footer'
import makeButton from './button' // button内部是commongJS，但是webpack支持用ESM来引用，只要不再同一个文件中混用即可
import { makeColorStyle } from './button-styles'
import makeImage from './image'
import imageUrl from './webpack-logo.jpg'

import css from './footer.css' // side effect import
import buttonStyles from './button.css'

const button = makeButton('A button!')
button.style = makeColorStyle('cyan')

const image = makeImage(imageUrl)

document.body.appendChild(button)
document.body.appendChild(image)
document.body.appendChild(footer)
