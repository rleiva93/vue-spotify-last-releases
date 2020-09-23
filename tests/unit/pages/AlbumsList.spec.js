import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumsList from "@/components/AlbumsList.vue";
import mockAlbumObject from "../util/mockAlbumObject";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);
localVue.use(Vuex);

const router = new VueRouter();

describe("AlbumsList.vue", () => {
  let store;
  let state = {
    albumsList: [],
    releasesListError: false,
  };
  const actions = {
    loadNewReleases: jest.fn(),
  };

  const setupStore = (state) => {
    store = new Vuex.Store({
      modules: {
        spotify: {
          namespaced: true,
          actions,
          state,
        },
      },
    });
  };

  it("checks initial state: albums list empty, loading icon shown, request for data dispatched", () => {
    setupStore();

    const wrapper = mount(AlbumsList, { store, localVue });
    expect(state.albumsList.length).toBe(0);
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(actions.loadNewReleases).toHaveBeenCalled();
  });

  it("checks error msg when the album list can't be retrieved", () => {
    state.releasesListError = true;
    setupStore(state);

    const wrapper = mount(AlbumsList, { store, localVue });
    expect(wrapper.find(".error-msg").exists()).toBeTruthy();
  });

  it("checks that the albums container are displayed when data is available", () => {
    state.albumsList = mockAlbumObject;
    setupStore(state);

    const wrapper = shallowMount(AlbumsList, {
      store,
      localVue,
      router,
      attachToDocument: true,
    });

    expect(wrapper.find(".albums").exists()).toBeTruthy();

    window.scrollTo(0, document.body.scrollHeight);
    expect(actions.loadNewReleases).toHaveBeenCalled();
  });
});
