import { shallowMount } from "@vue/test-utils";
import DButton from "@/components/atoms/d-button";
import DTypography from "@/components/containers/d-typography";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import config from "@darwin-studio/vue-ui-codegen/config.json";

describe("DButton", () => {
  const wrapper = shallowMount(DButton);

  it("Renders props.content when passed", async () => {
    const content = "Some text content";
    await wrapper.setProps({ content });
    expect(wrapper.text()).toMatch(content);
  });

  it("Renders props.html when passed", async () => {
    const html = "Some <b>html</b> content";
    await wrapper.setProps({ content: "", html });
    expect(wrapper.html()).toMatch(html);
  });

  it("Renders $slots.default when passed", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DTypography, {
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
  });

  // TODO: onClick \ whenClick
  // TODO: click if not disabled
  // TODO: no click if disabled
  // TODO: default type (theme) class
  // TODO: type (theme) class when passed
  // TODO: ???
});
