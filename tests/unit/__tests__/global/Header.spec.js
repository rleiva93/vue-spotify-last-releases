import { mount } from "@vue/test-utils";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Header from "@/components/Header.vue";

Vue.use(VueRouter);
Vue.use(Vuetify);

describe("Header.vue", () => {
  it("checks that the title is the rendered correctly", () => {
    const wrapper = mount(Header, { stubs: ["router-link"] });
    expect(wrapper.text()).toMatch("New releases");
  });
});
