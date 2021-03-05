var persistLang = function(store) {
  // 订阅mutation
  store.subscribe((mutation, state) => {
    if (mutation.type == 'locale/toggleLang') {
      console.log('mutation', mutation.type)
      console.log('locale', state.locale.langSelected)

      try {
        localStorage.setItem(
          'locale',
          JSON.stringify(state.locale.langSelected)
        )
      } catch (error) {
        throw error
      }
    }
  })

  store.subscribeAction((action, state) => {
    console.log(action.type)
  })
}
export default persistLang
