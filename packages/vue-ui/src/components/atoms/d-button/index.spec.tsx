import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
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
  paddingClassesCase,
  preventDefaultCase,
  labelPresenceCase,
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

  labelPresenceCase(wrapper);

  contentHtmlCase(wrapper);

  slotDefaultCase(DButton);

  borderClassCase(wrapper, wrapper, COLOR_SCHEME.DANGER);

  colorSchemeClassCase(wrapper, wrapper, COLOR_SCHEME.INVERSE);

  fontSizeClassCase(wrapper, wrapper);

  outlineClassCase(wrapper, wrapper, COLOR_SCHEME.SECONDARY, SIZE.SMALL);

  paddingClassesCase(wrapper, wrapper);

  roundingClassCase(wrapper, wrapper);

  sizeClassCase(wrapper, wrapper);

  transitionClassCase(wrapper, wrapper);

  // TODO: utils/test-case-factories ?
  it("Renders as 'a' html tag if 'href' is passed", async () => {
    await wrapper.setProps({ href: "http://some.href" }); // TODO: add href validator to the component
    expect(wrapper.element.tagName).toEqual("A");
  });

  routerLinkComponentCase(wrapper);

  dontEmitClickEventCase(wrapper);

  emitClickEventCase(wrapper);

  dontCallWhenClickCase(wrapper);

  callWhenClickCase(wrapper);

  preventDefaultCase(wrapper);

  disabledControlCase(wrapper, wrapper);
});
