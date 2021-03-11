import makeButton from './button'
// import trim from 'lodash-es/trim'
// console.log(trim('   yes!'))

// import * as GSAP from 'gsap'
const getGSAP = () => import('gsap')

// code splitting 不支持 named exports
// 要么新建一个文件引入依赖的api，再export
// 要么import具体的路径
const getLodashUniq = () =>
  import(
    /* webpackChunkName: "uniq" */
    'lodash-es/uniq'
  )

// dynamic code splitting
// context module
// webpack can resolve js json mjs wasm
let setButtonStyle
if (process.env.NODE_ENV === 'development') {
  setButtonStyle = color =>
    import(
      /* webpackMode: "lazy-once" */
      /* webpackChunkName: "color" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      `./button-styles/${color}.js`
    )
} else {
  setButtonStyle = color =>
    import(
      /* webpackChunkName: "color" */
      /* webpackPrefetch: true */ `./button-styles/${color}.js`
    )
}

const button = makeButton('A Button')

button.addEventListener('click', function() {
  // 引入一个很大的库
  getGSAP().then(gsap => {
    console.log(gsap)
  })
  // 引入一个很大的库其中的子方法
  getLodashUniq().then(uniq => {
    console.log(uniq)
  })
  console.log(Object.prototype.toString.call(this))
  // 切换主题
  setButtonStyle('red').then(styleStr => {
    console.log(styleStr)
    this.style = styleStr.default
  })
})
document.body.appendChild(button)
