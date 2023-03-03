import { shallowMount } from "@vue/test-utils";
import {
  baseClassCase,
  callWhenClickCase,
  colorSchemeClassCase,
  tagCase,
} from "@/utils/test-case-factories";
import DBackdrop from "@/components/atoms/d-backdrop";
import config from "./config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

describe("DButton", () => {
  const wrapper = shallowMount(DBackdrop);
  baseClassCase(wrapper, config.className);

  //TODO: opacity
  it("Should render props.opacity to the component style as '--opacity: <number>'", async () => {
    expect(true).toBeFalsy();
  });

  //TODO: zIndex
  it("Should render props.zIndex to the component style as '--z-index: <number>'", async () => {
    expect(true).toBeFalsy();
  });

  //TODO: colorScheme
  //  "--background-color": `var(--color-${this.colorScheme}-background)`
  colorSchemeClassCase(
    wrapper,
    `.${config.className}`,
    COLOR_SCHEME.ALTERNATIVE
  );

  //TODO: tag
  tagCase(wrapper);

  //TODO: when\onClick
  it("Should emit onClick event on click", async () => {
    expect(true).toBeFalsy();
  });
  callWhenClickCase(wrapper);
});
