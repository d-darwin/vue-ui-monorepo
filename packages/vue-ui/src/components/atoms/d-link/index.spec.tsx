import { shallowMount } from "@vue/test-utils";
import DLink from "@/components/atoms/d-link";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import config from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import {
  baseClassCase,
  propContentCase,
  propHtmlCase,
  slotDefaultCase,
} from "@/utils/test-case-factories";

describe("DLink", () => {
  const wrapper = shallowMount(DLink);

  propContentCase(wrapper);

  propHtmlCase(wrapper);

  slotDefaultCase(DLink);

  baseClassCase(wrapper, "dLink");

  it("Renders font class name", async () => {
    const font = FONT.SMALL;
    await wrapper.setProps({ font });
    const className = prepareCssClassName(
      config.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders outline class name", async () => {
    const className = prepareCssClassName(
      config.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `primary-medium`
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders props.transition to transition class", async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition });
    const className = prepareCssClassName(
      config.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );
    expect(wrapper.classes()).toContain(className);
  });

  it("Renders as 'button' html tag by default", () => {
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
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).toContain("__disabled");
  });
});
