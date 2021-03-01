import makeButton from './button'

// import * as GSAP from 'gsap'
const getGSAP = () => import('gsap')

// code splitting 不支持 named exports
// 要么新建一个文件引入依赖的api，再export
// 要么import具体的路径
const getLodashUniq = () => import('lodash-es/uniq')

getLodashUniq().then(uniq => {
  console.log(uniq)
})

const button = makeButton('A Button')
button.addEventListener('click', function() {
  getGSAP().then(gsap => {
    console.log(gsap)
  })
})
document.body.appendChild(button)
