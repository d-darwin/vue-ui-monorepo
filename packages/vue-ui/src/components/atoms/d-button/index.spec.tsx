import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import {
  baseClassCase,
  propContentCase,
  propHtmlCase,
  slotDefaultCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  baseClassCase(wrapper, config.className);

  propContentCase(wrapper);

  propHtmlCase(wrapper);

  slotDefaultCase(DButton);

  // TODO: classes are not rendered in jest ???
  it("Renders border class name", async () => {
    const size = SIZE.TINY; // TODO: const names maybe different - Object.values and Math.rand()
    const colorScheme = COLOR_SCHEME.DANGER; // TODO: const names maybe different - Object.values and Math.rand()
    await wrapper.setProps({ size, colorScheme }); // TODO: why it doesn't work with composition api ???
    const className = prepareCssClassName(
      codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders props.colorScheme to color scheme class", async () => {
    const colorScheme = COLOR_SCHEME.INVERSE;
    await wrapper.setProps({ colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
      colorScheme
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders font class name", async () => {
    const size = SIZE.SMALL;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders outline class name", async () => {
    const size = SIZE.LARGE;
    const colorScheme = COLOR_SCHEME.SECONDARY;
    await wrapper.setProps({ size, colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    expect(wrapper.classes()).toContain(className);
  });

  // TODO: what if there is no such padding option ??
  it("Renders size depending padding class name", async () => {
    const size = SIZE.LARGE;
    const padding = PADDING.EQUAL;
    await wrapper.setProps({ size, padding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      `${padding}-${size}`
    );
    expect(wrapper.classes()).toContain(className);
  });

  // TODO: what if there is no such padding option ??
  it("Renders size independent padding class name", async () => {
    const padding = PADDING.NONE;
    await wrapper.setProps({ padding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      padding
    );
    expect(wrapper.classes()).toContain(className);
  });

  // TODO: what if there is no such padding option ??
  it("Renders size independent padding class name", async () => {
    const padding = PADDING.NONE;
    await wrapper.setProps({ padding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      padding
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders props.rounding to rounding class", async () => {
    const rounding = ROUNDING.FULL;
    await wrapper.setProps({ rounding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
      rounding
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders props.size to size class", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders props.transition to transition class", async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders as 'button' html tag by default", () => {
    expect(wrapper.element.tagName).toEqual("BUTTON");
  });

  it("Renders as 'a' html tag if 'href' is passed", async () => {
    await wrapper.setProps({ href: "http://some.href" }); // TODO: add href validator to the component
    expect(wrapper.element.tagName).toEqual("A");
  });

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
    await wrapper.trigger("click");
    expect(whenClick).toHaveBeenCalledTimes(1);
  });

  it("Doesn't call props.whenClick when clicked if disabled", async () => {
    await wrapper.setProps({ disabled: true });
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick });
    await wrapper.trigger("click");
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
