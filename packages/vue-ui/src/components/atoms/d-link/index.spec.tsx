import { shallowMount } from "@vue/test-utils";
import DLink from "@/components/atoms/d-link";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import config from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";

describe("DLink", () => {
  const wrapper = shallowMount(DLink);

  // TODO: add case factory
  it("Renders props.content", async () => {
    const text = "Some text content";
    await wrapper.setProps({ text });
    expect(wrapper.text()).toMatch(text);
  });

  // TODO: add case factory
  it("Renders props.html", async () => {
    const html = "Some <b>html</b> content";
    await wrapper.setProps({ text: "", html });
    expect(wrapper.html()).toMatch(html);
  });

  // TODO: add case factory
  it("Renders $slots.default", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DLink, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toMatch(slotContent);
  });

  // TODO: classes are not rendered in jest ???
  it("Renders dLink class name", async () => {
    expect(wrapper.classes()).toContain("dLink");
  });

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
});
