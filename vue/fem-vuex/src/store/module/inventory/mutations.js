export default {
  isRestocking(state, payload) {
    state.isRestocking = payload
  },
  isDispensing(state, payload) {
    state.isDispensing = payload
  },

  dispense(state) {
    state.supply--
  },
  restockItems(state, payload) {
    state.supply = payload
  }
}
