import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base'

/** Global state of the app，状态管理
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 * **/
const state = {}

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  //1 Get query from view
  const query = searchView.getInput()
  //   console.log(query);

  if (query) {
    //2 new search object and add to state
    state.search = new Search(query)

    //3 Prepare UI for results
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchRes)

    try {
      //4 search for recipes
      await state.search.getResults()

      //5 render results on UI
      // console.log(state.search.result)
      clearLoader()
      searchView.renderRecipes(state.search.result)
    } catch (error) {
      console.error(error)
      alert('Something went wrong with the search...')
      clearLoader()
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  //取消表单的默认提交刷新
  e.preventDefault()
  controlSearch()
})

//事件委托，分页按钮并没有生成，操作父级元素，然后用closest方法
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    //data-goto属性
    const goToPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults()
    searchView.renderRecipes(state.search.result, goToPage)
  }
})

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  //get id from URL
  const id = window.location.hash.replace('#', '')
  if (id) {
    //prepare UI for changes
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    // highlight selected search item
    if (state.search) searchView.highlightSelected(id)

    //create new recipe object
    state.recipe = new Recipe(id)

    try {
      //get recipe data and parse ingredients
      await state.recipe.getRecipe()
      state.recipe.parseIngredients()

      //render recipe
      clearLoader()
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
    } catch (error) {
      console.error(error)
      alert('Error processing recipe...')
    }
  }
}

//hashchange:url的路由变化
//load:带路由的url加载以后，不会自动查询
const events = ['hashchange', 'load']
events.forEach(event => window.addEventListener(event, controlRecipe))

/**
 * LIST CONTROLLER
 */
const controlList = () => {
  if (!state.list) state.list = new List()

  //add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    listView.renderItem(item)
  })
}

//增减商品的按钮，同样是事件委派
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid

  //handle the delete button，按钮或子元素
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    //delete from state
    state.list.deleteItem(id)

    //delete from UI
    listView.deleteItem(id)
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10)
    state.list.updateCount(id, val)
  }
})

/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
  if (!state.likes) state.likes = new Likes()

  const currentID = state.recipe.id

  //还没有添加当前的recipe
  if (!state.likes.isLiked(currentID)) {
    //add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )

    //toggle the like button
    likesView.toggleButton(true)

    //add like to UI list
    likesView.renderLike(newLike)
  } else {
    //remove like from state
    state.likes.deleteLike(currentID)

    //toggle the like button
    likesView.toggleButton(false)

    //remove from to UI list
    likesView.deleteLike(currentID)
  }
  likesView.toggleMenu(state.likes.getNumLikes())
}

// Restore liked recipes when the page load
window.addEventListener('load', () => {
  state.likes = new Likes()

  // Restore likes
  state.likes.readStorage()

  // Toggle like menu button
  likesView.toggleMenu(state.likes.getNumLikes())

  //render the existing likes
  state.likes.likes.forEach(el => likesView.renderLike(el))
})

//为按钮添加点击事件，同样是事件委派，但不能使用closet，而是用matches
elements.recipe.addEventListener('click', el => {
  //点击btn-decrease元素或者内部的子元素
  if (el.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      recipeView.updateServingsIngredients(state.recipe)
    }
  } else if (el.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngredients(state.recipe)
  } else if (el.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList()
  } else if (el.target.matches('.recipe__love, .recipe__love *')) {
    controlLike()
  }
})
