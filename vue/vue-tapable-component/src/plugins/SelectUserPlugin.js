export default class SelectUserPlugin {
  apply(instance) {
    instance.hooks.getConfig.tap('getConfig', () => {
      return { flag: true }
    })

    instance.hooks.fetchUser.tapPromise('fetchUser', (query, userList) => {
      return new Promise(resolve => {
        setTimeout(() => {
          userList.push({ name: 'loseway', id: 6 })
          resolve()
        }, 1000)
      })
    })

    instance.hooks.saveSchema.tapPromise('saveSchema', (query, schema) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(query, schema)
          resolve({ success: true })
        }, 1000)
      })
    })
  }
}
