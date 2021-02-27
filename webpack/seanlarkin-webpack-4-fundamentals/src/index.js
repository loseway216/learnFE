import nav from './nav'
import makeButton from './button' // button内部是commongJS，但是webpack支持用ESM来引用，只要不再同一个文件中混用即可
import { makeColorStyle } from './button-styles'
import makeImage from './image'
import imageUrl from './webpack-logo.jpg'

import './footer.css' // side effect import
import buttonStyles from './button.css'

// 让js模块也支持HMR需要自定义API
// module.hot.accept('./button', () => {
//   import('./button')
// })

//  webpack默认支持动态导入，不需要babel，返回一个promise
const loadFooter = () => import('./footer')

const button = makeButton('A button!')
button.style = makeColorStyle('orangered')
// 场景：点击按钮的时候才加载footer，co'de spliting
button.addEventListener('click', e => {
  loadFooter().then(m => {
    const footer = m.footer
    document.body.appendChild(footer)
  })
})

const image = makeImage(imageUrl)

document.body.appendChild(button)
document.body.appendChild(image)
