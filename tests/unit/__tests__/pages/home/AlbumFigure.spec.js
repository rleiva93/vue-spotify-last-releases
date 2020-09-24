import { mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumFigure from "@/components/AlbumFigure.vue";
import mockAlbumsListObject from "../../util/mockAlbumsListObject";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("AlbumsFigure.vue", () => {
  const albumObject = mockAlbumsListObject[0];

  it("checks that rendered data matchs props", () => {
    const wrapper = mount(AlbumFigure, {
      propsData: {
        album: albumObject
      },
      localVue
    });

    for (let artist of albumObject.artists) {
      expect(wrapper.find(".v-card__title").text()).toContain(artist.name);
    }
    expect(wrapper.find(".v-card__text").text()).toBe(albumObject.name);
    expect(wrapper.findComponent({ name: "v-img" }).exists()).toBeTruthy();
  });
});
