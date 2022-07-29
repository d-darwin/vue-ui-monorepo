import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import {
  baseClassCase,
  borderClassCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingClassesCase,
  propContentCase,
  propHtmlCase,
  roundingClassCase,
  sizeClassCase,
  slotDefaultCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  baseClassCase(wrapper, config.className);

  propContentCase(wrapper);

  propHtmlCase(wrapper);

  slotDefaultCase(DButton);

  borderClassCase(wrapper, wrapper, COLOR_SCHEME.DANGER);

  // TODO: utils/test-case-factories
  it("Renders props.colorScheme to color scheme class", async () => {
    const colorScheme = COLOR_SCHEME.INVERSE;
    await wrapper.setProps({ colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
      colorScheme
    );
    expect(wrapper.classes()).toContain(className);
  });

  fontSizeClassCase(wrapper, wrapper);

  outlineClassCase(wrapper, wrapper, COLOR_SCHEME.SECONDARY);

  paddingClassesCase(wrapper, wrapper);

  roundingClassCase(wrapper, wrapper);

  sizeClassCase(wrapper, wrapper);

  transitionClassCase(wrapper, wrapper);

  // TODO: utils/test-case-factories
  it("Renders as 'a' html tag if 'href' is passed", async () => {
    await wrapper.setProps({ href: "http://some.href" }); // TODO: add href validator to the component
    expect(wrapper.element.tagName).toEqual("A");
  });

  // TODO: utils/test-case-factories
  it("Renders as 'router-link' component if 'to' is passed", async () => {
    await wrapper.setProps({
      to: { path: "/some-relative-path" },
      href: null,
    }); // TODO: add to validator to the component
    expect(wrapper.element.tagName).toEqual("ROUTER-LINK");
  });

  it("Doesn't emit click event when clicked if disabled", async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it("Emits click event when clicked", async () => {
    await wrapper.setProps({ to: null, href: null, disabled: false });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("Calls props.whenClick when clicked", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick, disabled: false });
    await wrapper.trigger("click"); // TODO: shouldn't we find button element ???
    expect(whenClick).toHaveBeenCalledTimes(1);
  });

  it("Doesn't call props.whenClick when clicked if disabled", async () => {
    await wrapper.setProps({ disabled: true });
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick });
    await wrapper.trigger("click"); // TODO: shouldn't we find button element ???
    expect(whenClick).toHaveBeenCalledTimes(0);
  });

  it("Calls $event.preventDefault if prop.eventDefault is passed", async () => {
    const event = { preventDefault: jest.fn() } as unknown as MouseEvent;
    await wrapper.setProps({ disabled: false, preventDefault: true });
    await wrapper.vm.clickHandler(event);
    expect(event.preventDefault).toBeCalled();
  });

  it("Renders __disabled class if prop.disabled is passed", async () => {
    await wrapper.setProps({ href: "/some-link", disabled: true });
    expect(wrapper.classes()).toContain("__disabled");
  });

  // TODO: check disabled attr
  /*it("Renders :disabled attr if prop.disabled is passed and tag is Button", async () => {
    await wrapper.setProps({ href: null, to: null, disabled: true });
    console.log(wrapper.html());
    expect(wrapper.attributes()).toContain("disabled");
  });*/
});
