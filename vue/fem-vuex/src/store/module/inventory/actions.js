// fake API call //
var inventory = {
  chips: {
    stock: 15,
  },
};

var pingInventory = function (item) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(inventory[item]);
    }, 1000);
  });
};

var pingDispenseItem = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export default {
  fetchFromInventory({ dispatch, commit }) {
    // 检查机器状态
    dispatch("machine/checkMachineState").then(() => {
      // 补货
      commit("isRestocking", true);
      pingInventory("chips")
        .then((inventory) => {
          commit("restockItems", inventory.stock);
        })
        .finally(() => commit("isRestocking", false));
    });
  },
  dispenseItem({ commit }) {
    commit("isDispensing", true);
    pingDispenseItem()
      .then(() => commit("dispense"))
      .finally(() => commit("isDispensing", false));
  },
};
