import { elements } from './base'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResList.innerHTML = ''
  elements.searchResPages.innerHTML = ''
}

export const highlightSelected = id => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'))
  resultArr.forEach(el => el.classList.remove('results__link--active'))

  document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active')
}

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []
  if (title.length > limit) {
    //控制长度，但不截断完整单词
    title.split(',').reduce((accumulator, cur) => {
      if (accumulator + cur.length <= limit) {
        newTitle.push(cur)
      }
      return accumulator + cur.length
    }, 0)
  }
  return `${newTitle.join(',')} ...`
}

const renderRecipe = recipe => {
  const markup = `
        <li>
                    <a class="results__link results__link--active" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="${recipe.pic}" alt="${recipe.name}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.name}</h4>
                            <p class="results__author">${limitRecipeTitle(recipe.tag)}</p>
                        </div>
                    </a>
                </li>
    `
  elements.searchResList.insertAdjacentHTML('beforeend', markup)
}

// type: 'prev' or 'next'
const createButton = (pageNumber, type) => `
    <button class="btn-inline results__btn--${type}" 
        data-goto=${type === 'prev' ? pageNumber - 1 : pageNumber + 1}>
        <span>Page ${type === 'prev' ? pageNumber - 1 : pageNumber + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (pageNubmer, numResults, pageSize) => {
  const pages = Math.ceil(numResults / pageSize)

  let button
  if (pageNubmer === 1 && pages > 1) {
    button = createButton(pageNubmer, 'next')
  } else if (pageNubmer < pages) {
    button = `
      ${createButton(pageNubmer, 'prev')}
      ${createButton(pageNubmer, 'next')}
    `
  } else if (pageNubmer === pages && pages > 1) {
    button = createButton(pageNubmer, 'prev')
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}

export const renderRecipes = (recipes, pageNumber = 1, pageSize = 5) => {
  //分页
  const start = (pageNumber - 1) * pageSize
  const end = pageNumber * pageSize

  recipes.slice(start, end).forEach(renderRecipe)

  //render pagination buttons
  renderButtons(pageNumber, recipes.length, pageSize)
}
