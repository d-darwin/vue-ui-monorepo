import { shallowMount } from "@vue/test-utils";
import { SIZE } from "@darwin-studio/vue-ui-codegen/build/constants/size"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DTypography from "@/components/containers/d-typography";
import config from "@darwin-studio/vue-ui-codegen/config.json";

describe("DTypography", () => {
  const wrapper = shallowMount(DTypography);

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

  // TODO: dTypography class

  it("Renders props.tag when passed", async () => {
    const tag = "address";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
});
