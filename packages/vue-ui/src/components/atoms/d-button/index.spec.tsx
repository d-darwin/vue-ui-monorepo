import { mount, shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
import { DLoaderAsync as DLoader } from "@/components/atoms/d-loader/async";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import {
  baseClassCase,
  borderClassCase,
  callWhenClickCase,
  colorSchemeClassCase,
  disabledClassCase,
  dontCallWhenClickCase,
  dontEmitClickEventCase,
  emitClickEventCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingEqualClassesCase,
  preventDefaultCase,
  propStringCase,
  propVNodeCase,
  roundingClassCase,
  routerLinkComponentCase,
  sizeClassCase,
  slotCase,
  transitionClassCase,
  activeControlCase,
  disabledAttrCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  baseClassCase(wrapper, config.class);

  propStringCase(wrapper, `.${config.class}`, "content");

  propVNodeCase(wrapper, `.${config.class}`);

  slotCase(DButton, `.${config.class}`);

  borderClassCase(wrapper, `.${config.class}`, COLOR_SCHEME.DANGER);

  colorSchemeClassCase(wrapper, `.${config.class}`, COLOR_SCHEME.INVERSE);

  fontSizeClassCase(wrapper, `.${config.class}`);

  outlineClassCase(
    wrapper,
    `.${config.class}`,
    COLOR_SCHEME.SECONDARY,
    SIZE.SMALL
  );

  paddingEqualClassesCase(wrapper, `.${config.class}`);

  roundingClassCase(wrapper, `.${config.class}`);

  sizeClassCase(wrapper, `.${config.class}`);

  transitionClassCase(wrapper, `.${config.class}`);

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

  disabledClassCase(wrapper, `.${config.class}`);

  disabledAttrCase(wrapper, `.${config.class}`);

  activeControlCase(wrapper, `.${config.class}`);

  // TODO: move to the factories
  it("Should render DLoader if props.loading is true", async () => {
    const wrapper = mount(DButton);
    await wrapper.setProps({ loading: true });
    const loader = wrapper.findComponent(DLoader);
    expect(loader.exists()).toBeTruthy();
  });
});
