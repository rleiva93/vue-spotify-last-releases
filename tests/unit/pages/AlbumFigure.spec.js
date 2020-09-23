import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumFigure from "@/components/AlbumFigure.vue";
import mockAlbumObject from "../util/mockAlbumObject"

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("AlbumsFigure.vue", () => {
  const albumObject = mockAlbumObject[0];

  it("checks that the rendered text is the same of the mock object provided", () => {
    const wrapper = mount(AlbumFigure, {
      propsData: {
        album: albumObject
      },
      localVue
    });

    for(let artist of albumObject.artists) {
      expect(wrapper.find(".v-card__title").text()).toContain(artist.name);
    }
    expect(wrapper.find(".v-card__text").text()).toBe(albumObject.name);
    expect(wrapper.find(".v-image").exists()).toBeTruthy();
  });
});
