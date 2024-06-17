import { defineStore } from "pinia";
import http from "../utils/http";

export const useTopoStore = defineStore("topo", {
  state: () => ({
    topoData: {},
    remark: {}
  }),
  actions: {
    async getData(params) {
      try {
        const res = await http.get(`/asset/assetTopo/getAssetTopo`, params);
        this.topoData = res.errMsg.data;
        this.remark = JSON.parse(res.errMsg.remark || "")
      } catch (error) {
        console.log(error);
      }
    },
  },
});
