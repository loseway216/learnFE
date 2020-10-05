const fs = require('fs')
const superagent = require('superagent')

// 手工创建promise版本的方法
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find file.')
      resolve(data)
    })
  })
}

// 手工创建promise版本的方法
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file.')
      resolve('success')
    })
  })
}

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`)

    // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)

    const all = await Promise.all([res1Pro, res2Pro])
    const imgs = all.map(el => el.body.message)
    console.log(imgs)

    await writeFilePro('dog-img.txt', imgs.join('\n'))
    console.log('Random dog image saved to file!')
  } catch (err) {
    console.log(err)
    throw err // throw会使getDogPic方法reject
  }
  return '2: Ready' // 即使上面的promise reject，getDogPic方法仍然会resolve
}

// 创建一个async IIFE来包住await
;(async () => {
  try {
    console.log('1: Will get dog pics!')
    const x = await getDogPic()
    console.log(x)
    console.log('3: Done getting dog pics!')
  } catch (error) {
    console.log('ERROR')
  }
})()

/*
console.log('1: Will get dog pics!')
// const x = getDogPic()，x是pending promise
getDogPic()
  .then(x => {
    console.log(x)
    console.log('3: Done getting dog pics!')
  })
  .catch(err => console.log('ERROR'))
*/

// 方法return promise，可以链式调用
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then(res => {
    console.log(res.body.message)
    return writeFilePro('dog-img.txt', res.body.message)
  })
  .then(() => {
    console.log('Random dog image saved to file!')
  })
  .catch(err => console.log(err))
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`)

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message)
//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         if (err) return console.log(err.message)
//         console.log('Random dog image saved to file!')
//       })
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })
