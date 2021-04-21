var machines = {
  bender: {
    last_serviced: "feb 2019",
    condition: "working",
  },
};

var state = {
  machineName: "bender",
  isCheckingMachine: false,
};

var actions = {
  checkMachineState({ state, commit }) {
    commit("isCheckingMachine", true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("isCheckingMachine", false);
        resolve(machines[state.machineName]);
      }, 1000);
    });
  },
};

var mutations = {
  isCheckingMachine(state, payload) {
    state.isCheckingMachine = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
