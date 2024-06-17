import CadTopo1 from '../components/CadTopos/CadTopo1.vue';
import CadTopo2 from '../components/CadTopos/CadTopo2.vue';
import CadTopo3 from '../components/CadTopos/CadTopo3.vue';
import Map from "../components/map/Map.vue";
import Points from "../components/Points.vue";
import Topo from "../components/Topos/Topo.vue";
import Topo2 from "../components/Topos/Topo2.vue";
import Topo3 from "../components/Topos/Topo3.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Map, name: 'Map' },
  // { path: "/topo/:id", component: Topo, name:'Topo' },
  { path: "/topo/1", component: Topo, name: 'Topo' },
  { path: "/topo/2", component: Topo2, name: 'Topo2' },
  { path: "/topo/3", component: Topo3, name: 'Topo3' },
  { path: "/cad/1", component: CadTopo1, name: 'CadTopo' },
  { path: "/cad/2", component: CadTopo2, name: 'CadTopo2' },
  { path: "/cad/3", component: CadTopo3, name: 'CadTopo3' },
  { path: "/points/:id", component: Points, name: 'Points' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router