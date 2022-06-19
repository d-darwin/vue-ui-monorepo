import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import config from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";

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

  it("Renders $slots.default when passed", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DButton, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toMatch(slotContent);
  });

  // TODO: classes are not rendered in jest ???
  it("Renders dButton class name", async () => {
    expect(wrapper.classes()).toContain("dButton");
  });

  // TODO: classes are not rendered in jest ???
  it("Renders props.size to size class when passed", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size }); // TODO: why it doesn't work with composition api ???
    const sizeClassName = prepareCssClassName(
      config.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    expect(wrapper.classes()).toContain(sizeClassName);
  });

  // TODO: other classes tests

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
