import Vue from "vue";
import Vuex from "vuex";

import spotify from "@/store/modules/spotify";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spotify
  }
});
