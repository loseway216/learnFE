import { defineStore } from "pinia";
import http from "../utils/http";

export const useAssetStore = defineStore("asset", {
    state: () => ({
        assetStatus: { total: 0, online: 0, offline: 0, ip_list: [] },
    }),
    actions: {
        async getAssetStatus() {
            try {
                this.assetStatus = await http.get(`/asset/assetCommon/pingAsset`);
            } catch (error) {
                console.log(error);
            }
        },
    },
});
