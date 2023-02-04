import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import {
  baseClassCase,
  borderClassCase,
  callWhenClickCase,
  colorSchemeClassCase,
  disabledControlCase,
  dontCallWhenClickCase,
  dontEmitClickEventCase,
  emitClickEventCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingEqualClassesCase,
  preventDefaultCase,
  labelStringCase,
  contentHtmlCase,
  roundingClassCase,
  routerLinkComponentCase,
  sizeClassCase,
  slotDefaultCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  baseClassCase(wrapper, config.className);

  labelStringCase(wrapper, "button");

  contentHtmlCase(wrapper);

  slotDefaultCase(DButton);

  borderClassCase(wrapper, `.${config.className}`, COLOR_SCHEME.DANGER);

  colorSchemeClassCase(wrapper, `.${config.className}`, COLOR_SCHEME.INVERSE);

  fontSizeClassCase(wrapper, `.${config.className}`);

  outlineClassCase(
    wrapper,
    `.${config.className}`,
    COLOR_SCHEME.SECONDARY,
    SIZE.SMALL
  );

  paddingEqualClassesCase(wrapper, `.${config.className}`);

  roundingClassCase(wrapper, `.${config.className}`);

  sizeClassCase(wrapper, `.${config.className}`);

  transitionClassCase(wrapper, `.${config.className}`);

  // TODO: utils/test-case-factories ?
  it("Renders as 'a' html tag if 'href' is passed", async () => {
    await wrapper.setProps({ href: "http://some.href" }); // TODO: add href validator to the component
    expect(wrapper.element.tagName).toEqual("A");
  });

  routerLinkComponentCase(wrapper);

  dontEmitClickEventCase(shallowMount(DButton));

  dontCallWhenClickCase(shallowMount(DButton));

  emitClickEventCase(wrapper);

  callWhenClickCase(wrapper);

  preventDefaultCase(wrapper);

  disabledControlCase(wrapper, `.${config.className}`);
});
