import { shallowMount } from "@vue/test-utils";
import DLoader from "@/components/atoms/d-loader";
import config from "./config";

describe("DLoader", () => {
  const wrapper = shallowMount(DLoader);

  it("Should render .dLoader element", async () => {
    const loaderEl = wrapper.find(`.${config.className}`);
    expect(loaderEl.exists()).toBeTruthy();
  });

  it("Should render props.content ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.colorScheme ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.font ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.rounding ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.size ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.transition ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.animationDuration ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.zIndex ...", async () => {
    expect(false).toBeTruthy();
  });

  it("Should render .wrapper, .backdrop and .dLoader elements if props.fillAvailable is true", async () => {
    expect(false).toBeTruthy();
  });

  // TODO: props.backdropOptions
});
