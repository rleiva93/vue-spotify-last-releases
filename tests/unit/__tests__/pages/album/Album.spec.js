import {
  enableAutoDestroy,
  shallowMount,
  mount,
  createLocalVue
} from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Album from "@/views/Album.vue";
import mockAlbumObject from "../../util/mockAlbumObject";

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

  it("checks initial state: loading icon shown, request data", () => {
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

  it("checks that the album data is correctly placed with audio prev", () => {
    state.album.data = mockAlbumObject[0];
    state.album.loaded = true;
    state.albumError = false;
    setupStore(state);

    const wrapper = shallowMount(Album, {
      store,
      localVue
    });

    // main container is loaded
    expect(wrapper.find(".album").exists()).toBeTruthy();

    // check that all the components are loaded correctly
    const imgComp = wrapper.findComponent({ name: "album-img" });
    const dataComp = wrapper.findComponent({ name: "album-data" });
    const trackListComp = wrapper.findComponent({ name: "album-tracks-list" });

    expect(imgComp.exists()).toBeTruthy();
    expect(dataComp.exists()).toBeTruthy();
    expect(trackListComp.exists()).toBeTruthy();
  });
});
