import { defineStore } from "pinia";
import http from "../utils/http";
// import jsondata from '../utils/json/events.json';

export const useBigScreenStore = defineStore("bigscreen", {
  state: () => ({
    importantEvents: [],
  }),
  actions: {
    async getImportantEvents() {
      try {
        const res = await http.get(`/isoc/api/v1/big_screen/get_data?type=import_event&interval=3`);
        if (res.status == 200) {
          this.importantEvents = res.data || list;
        }
        // console.log('jsondata', jsondata);
        // this.importantEvents = jsondata.data
      } catch (error) {
        console.log(error);
      }
    },
  },
});
