import { mount, createLocalVue, enableAutoDestroy } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import AlbumTracksList from "@/components/AlbumTracksList.vue";
import mockAlbumObject from "../../util/mockAlbumObject";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe("AlbumTracksList.vue", () => {
  const tracksWithPrev = mockAlbumObject[0].tracks.items;
  const tracksWithoutPrev = mockAlbumObject[1].tracks.items;
  const playPreviewFn = jest.fn();

  // Stup prototype audio functions
  window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.pause = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.addTextTrack = () => {
    /* do nothing */
  };

  enableAutoDestroy(afterEach);

  it("checks that track renders with prev", () => {
    const wrapper = mount(AlbumTracksList, {
      propsData: {
        tracks: tracksWithPrev,
        playPreview: playPreviewFn
      },
      localVue
    });

    expect(wrapper.findComponent({ name: "v-card" }).exists()).toBeTruthy();

    const linkAnchor = wrapper.find("a");
    const linkHref = linkAnchor.attributes("href");
    expect(linkHref).toEqual(tracksWithPrev[0].external_urls.spotify);

    const audioBtn = wrapper.find(".play-btn");
    expect(audioBtn.exists()).toBeTruthy();

    const audioEl = audioBtn.find("audio");
    const audioSrc = audioEl.attributes("src");
    expect(audioSrc).toEqual(tracksWithPrev[0].preview_url);

    const audioSrcBeforeClick = wrapper.vm.activeAudio.instance.src;
    expect(audioSrcBeforeClick).toEqual("");

    audioBtn.trigger("click");
    const audioUpdatedSrc = wrapper.vm.activeAudio.instance.src;
    expect(audioUpdatedSrc).toEqual(audioSrc);
  });

  it("checks that track renders without prev", () => {
    const wrapper = mount(AlbumTracksList, {
      propsData: {
        tracks: tracksWithoutPrev
      },
      localVue
    });

    const audioBtn = wrapper.find(".play-btn");
    expect(audioBtn.exists()).toBeFalsy();
  });
});
