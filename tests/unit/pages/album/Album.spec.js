import { enableAutoDestroy, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Album from "@/views/Album.vue";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.config.async = false;

describe("Album.vue", () => {
  let store;
  let state = {
    album: {
      loaded: false,
      data: {}
    },
    albumError: false
  };
  const actions = {
    loadAlbum: jest.fn(),
    removeAlbum: jest.fn()
  };

  const setupStore = state => {
    store = new Vuex.Store({
      modules: {
        spotify: {
          namespaced: true,
          actions,
          state
        }
      }
    });
  };

  enableAutoDestroy(afterEach);

  it("checks initial state: loading icon shown, request for data dispatched", () => {
    setupStore(state);

    const wrapper = mount(Album, { store, localVue });
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(actions.loadAlbum).toHaveBeenCalled();
  });

  it("checks error msg is shown when album data can't be retrieved", () => {
    state.albumError = true;
    setupStore(state);

    const wrapper = mount(Album, { store, localVue });
    expect(wrapper.find(".error-msg").exists()).toBeTruthy();
  });
});
