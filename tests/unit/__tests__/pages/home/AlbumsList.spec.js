import {
  enableAutoDestroy,
  mount,
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumsList from "@/components/AlbumsList.vue";
import AlbumFigure from "@/components/AlbumFigure.vue";
import mockAlbumsListObject from "../../util/mockAlbumsListObject";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);
localVue.use(Vuex);

const router = new VueRouter();

describe("AlbumsList.vue", () => {
  let store;
  const state = {
    albumsList: [],
    releasesListError: false
  };
  const actions = {
    loadNewReleases: jest.fn()
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

  it("checks loading icon is shown and request is dispatched", () => {
    setupStore();

    const wrapper = mount(AlbumsList, { store, localVue });
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(actions.loadNewReleases).toHaveBeenCalled();
  });

  it("checks error msg when the album list can't be retrieved", () => {
    state.releasesListError = true;
    setupStore(state);

    const wrapper = mount(AlbumsList, { store, localVue });
    expect(wrapper.find(".error-msg").exists()).toBeTruthy();
  });

  it("checks that albums are displayed when data is available", () => {
    state.albumsList = mockAlbumsListObject;
    state.releasesListError = false;
    setupStore(state);

    const wrapper = shallowMount(AlbumsList, {
      store,
      localVue,
      router,
      stubs: ["router-link"]
    });

    // div is loaded
    expect(wrapper.find(".albums").exists()).toBeTruthy();

    // all items in albumList array are rendered
    const albumFigures = wrapper.findAllComponents(AlbumFigure);
    expect(albumFigures).toHaveLength(state.albumsList.length);

    // check that all links are rendered
    const albumFigureLinks = wrapper.findAllComponents({ name: "router-link" });
    expect(albumFigureLinks).toHaveLength(state.albumsList.length);

    // check that all links were structured correctly
    for (let i = 0; i < state.albumsList.length; i++) {
      const link = albumFigureLinks.at(i);
      expect(link.props().to).toEqual(`/album/${state.albumsList[i].id}`);
    }
  });
});
