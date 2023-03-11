import { shallowMount } from "@vue/test-utils";
import DLoader from "@/components/atoms/d-loader";
import config from "./config";

describe("DLoader", () => {
  const wrapper = shallowMount(DLoader);

  it("Should render .dLoader element", async () => {
    const loaderEl = wrapper.find(`.${config.className}`);
    expect(loaderEl.exists()).toBeTruthy();
  });
});
