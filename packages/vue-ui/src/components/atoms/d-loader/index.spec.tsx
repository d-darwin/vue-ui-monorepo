import { shallowMount } from "@vue/test-utils";
import DLoader from "@/components/atoms/d-loader";
import { DBackdropAsync as DBackdrop } from "@/components/atoms/d-backdrop/async";
import config from "./config";
import {
  colorSchemeClassCase,
  fontClassCase,
  roundingClassCase,
  sizeClassCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

describe("DLoader", () => {
  const wrapper = shallowMount(DLoader);

  it("Should render .dLoader element", async () => {
    const loaderEl = wrapper.find(`.${config.className}`);
    expect(loaderEl.exists()).toBeTruthy();
  });

  it("Should render props.content", async () => {
    const content = <div>...</div>;
    await wrapper.setProps({ content });

    expect(wrapper.html()).toMatchSnapshot();
  });

  colorSchemeClassCase(wrapper, `.${config.className}`, COLOR_SCHEME.DANGER);

  fontClassCase(wrapper, `.${config.className}`);

  roundingClassCase(wrapper, `.${config.className}`);

  sizeClassCase(wrapper, `.${config.className}`);

  transitionClassCase(wrapper, `.${config.className}`);

  it("Should render props.animationDuration to the .dLoader style as '--animation-duration: props.animationDuration'", async () => {
    const animationDuration = "333ms";
    await wrapper.setProps({
      animationDuration,
    });

    const loaderEl = wrapper.find(`.${config.className}`);
    expect(loaderEl.attributes("style")).toContain(
      `--animation-duration: ${animationDuration}`
    );
  });

  it("Should render props.zIndex to the .dLoader style as '--z-index: props.zIndex'", async () => {
    const zIndex = 0.33;
    await wrapper.setProps({
      zIndex,
    });

    const loaderEl = wrapper.find(`.${config.className}`);
    expect(loaderEl.attributes("style")).toContain(`--z-index: ${zIndex}`);
  });

  it("Should render DBackdrop if props.fillAvailable is true", async () => {
    await wrapper.setProps({ fillAvailable: true });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeTruthy();
  });

  it("Shouldn.t render DBackdrop if props.fillAvailable is false", async () => {
    await wrapper.setProps({ fillAvailable: false });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeFalsy();
  });

  // TODO: props.backdropOptions
});
