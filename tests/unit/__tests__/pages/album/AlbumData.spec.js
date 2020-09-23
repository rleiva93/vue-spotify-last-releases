import { mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumData from "@/components/AlbumData.vue";
import mockAlbumObject from "../../util/mockAlbumObject";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("AlbumData.vue", () => {
  const albumObject = mockAlbumObject[1];
  const expectedArtists = "Justin Bieber, Chance the Rapper";
  const expectedName = "Holy";

  it("checks that rendered data matchs props", () => {
    const wrapper = mount(AlbumData, {
      propsData: {
        album: albumObject
      },
      localVue
    });

    expect(wrapper.find("h1").text()).toEqual(expectedArtists);
    expect(wrapper.find("h2").text()).toEqual(expectedName);
  });
});
