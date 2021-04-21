var translations = {
  en: {
    productName: "Potato Chips",
    supplyText: "Supply",
    restockText: "Restock",
    dispenseText: "Dispense",
    productCodeText: "Product Code",
  },
  zh: {
    productName: "薯片",
    supplyText: "供应",
    restockText: "补货",
    dispenseText: "发货",
    productCodeText: "商品代码",
  },
};

var state = {
  langSelected: "en",
};

var getters = {
  translation(state) {
    return translations[state.langSelected];
  },
};

var actions = {
  toggleLang({ commit }) {
    commit("toggleLang");
  },
};

var mutations = {
  toggleLang(state) {
    state.langSelected = state.langSelected == "en" ? "zh" : "en";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
