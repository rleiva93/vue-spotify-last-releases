import { mount } from "@vue/test-utils";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Footer from "@/components/Footer.vue";

Vue.use(VueRouter);
Vue.use(Vuetify);

describe("Footer.vue", () => {
  it("validates that footer link is the correct one", () => {
    const wrapper = mount(Footer, { stubs: ['router-link'] });
    const anchorHref = wrapper.find("a");
    expect(anchorHref.attributes("href")).toEqual("https://github.com/rleiva93/spotify-webapp")
  });
});
