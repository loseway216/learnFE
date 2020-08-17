import axios from 'axios'
import { key, proxy } from '../config'

export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    try {
      const url = `${proxy}https://api.binstd.com/recipe/detail?id=${this.id}&appkey=${key}`

      const result = await axios(url)

      this.title = result.data.result.name
      this.author = '菜谱大全'
      this.img = result.data.result.pic
      this.url = result.data.result.pic
      //   this.ingredients = result.data.result.material
      this.ingredients = [
        '4-1/2 cups unbleached high-gluten, bread, or all-purpose flour',
        '1 3/4(.44 ounce) teaspoons salt',
        '1 teaspoon(.11 ounce) instant yeast',
        'Semolina flour',
        '1 package aaa'
      ]
      this.time = 10 //result.data.result.cookingtime
      this.servings = 2 //result.data.result.peoplenum
    } catch (error) {
      console.error(error)
    }
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']

    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']

    //原料的字符串处理，中文api无法处理
    const newIngredients = this.ingredients.map(el => {
      //uniform units
      let ingredient = el.toLowerCase()
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i])
      })
      //remove parentheses,正则
      ingredient = ingredient.replace(/\([^\)]*\)/g, '')

      //parse ingredients into count,unit and ingredient
      const arrIng = ingredient.split(' ')
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2))

      let objIng
      //带单位的
      if (unitIndex > -1) {
        //Ex. 4 1/4 cups, arrCount:[4,1/4],eval('4+1/4')=4.5
        const arrCount = arrIng.slice(0, unitIndex)

        let count
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'))
        } else {
          count = eval(arrCount.join('+'))
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      }
      //带数字没有单位的
      else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.splice(1).join(' ')
        }
      }
      //不带数字和单位的
      else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient //ES6写法，等于 ingredient:ingredient
        }
      }
      return objIng
    })
    this.ingredients = newIngredients
  }

  updateServings(type) {
    // update servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1

    //update ingredients
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings
    })

    this.servings = newServings
  }
}
