import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import config from "@darwin-studio/vue-ui-codegen/config.json";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  it("Renders props.content when passed", async () => {
    const text = "Some text content";
    await wrapper.setProps({ text });
    expect(wrapper.text()).toMatch(text);
  });

  it("Renders props.html when passed", async () => {
    const html = "Some <b>html</b> content";
    await wrapper.setProps({ text: "", html });
    expect(wrapper.html()).toMatch(html);
  });

  /*
  it("Renders $slots.default when passed", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DButton, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toMatch(slotContent);
  });

  it("Renders props.size to font class when passed", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size });
    const fontClassName = prepareCssClassName(
      config.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    expect(wrapper.classes().includes(fontClassName)).toEqual(true);
  });*/

  it("Emits click event when clicked", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("Calls props.whenClick when clicked", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick });
    await wrapper.find("button").trigger("click");
    expect(whenClick).toHaveBeenCalledTimes(1);
  });

  // TODO: button / a / router-link
  // TODO: click if not disabled
  // TODO: no click if disabled
  // TODO: default type (theme) class
  // TODO: type (theme) class when passed
  // TODO: preventDefault
  // TODO: ???
});
