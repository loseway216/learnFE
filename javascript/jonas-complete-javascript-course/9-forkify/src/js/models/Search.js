import axios from 'axios'
import { key, proxy } from '../config'

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getResults() {
    try {
      const url = `${proxy}https://api.binstd.com/recipe/search?keyword=${this.query}&num=1000&appkey=${key}`
      const res = await axios(url)
      this.result = res.data.result.list
    } catch (error) {
      console.error(error)
      alert('Something went wrong :(')
    }
  }
}
