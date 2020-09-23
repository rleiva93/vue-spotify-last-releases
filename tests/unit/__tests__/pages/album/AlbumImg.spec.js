import { mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumImg from "@/components/AlbumImg.vue";
import mockAlbumObject from "../../util/mockAlbumObject";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("AlbumImg.vue", () => {
  const albumObject = mockAlbumObject[0];

  it("checks that rendered data matchs props", () => {
    const wrapper = mount(AlbumImg, {
      propsData: {
        album: albumObject
      },
      localVue
    });

    const link = wrapper.find("a");
    expect(link.attributes("href")).toEqual(albumObject.external_urls.spotify);
    expect(link.attributes("target")).toEqual("_blank");

    const imgComp = wrapper.findComponent({ name: "v-img" });
    expect(imgComp.exists()).toBeTruthy();
    expect(imgComp.props().src).toEqual(albumObject.images[0].url);

    const caption = wrapper.find(".caption").text();
    expect(caption).toEqual(albumObject.copyrights[0].text);
  });
});
