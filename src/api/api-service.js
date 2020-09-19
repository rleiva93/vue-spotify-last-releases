import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const ApiService = {
  init(apiUrl) {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = apiUrl;
  },

  setAuthHeader(type, token) {
    Vue.axios.defaults.headers.common["Authorization"] = `${type} ${token}`;
  },
  get(resource, slug = "") {
    try {
      return Vue.axios.get(`${resource}/${slug}`);
    } catch (error) {
      throw new Error(`[ERROR GET] ApiService ${error}`);
    }
  },
  post(resource, params) {
    try {
      return Vue.axios.post(`${resource}`, params);
    } catch (error) {
      throw new Error(`[ERROR POST] ApiService ${error}`);
    }
  }
};

export default ApiService;