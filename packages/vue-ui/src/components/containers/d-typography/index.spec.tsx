import { shallowMount } from "@vue/test-utils";
// TODO: get @darwin-studio/vue-ui-codegen paths from config.json
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DTypography from "@/components/containers/d-typography";
import config from "@darwin-studio/vue-ui-codegen/config.json";

describe("DTypography", () => {
  const wrapper = shallowMount(DTypography);

  // TODO: make case factory
  it("Renders props.content when passed", async () => {
    const text = "Some text content";
    await wrapper.setProps({ text });
    expect(wrapper.text()).toMatch(text);
  });

  // TODO: make case factory
  it("Renders props.html when passed", async () => {
    const html = "Some <b>html</b> content";
    await wrapper.setProps({ text: "", html });
    expect(wrapper.html()).toMatch(html);
  });

  // TODO: make facade factory
  it("Renders $slots.default when passed", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DTypography, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toMatch(slotContent);
  });

  it("Renders dTypography class name", async () => {
    expect(wrapper.classes().includes("dTypography")).toEqual(true);
  });

  it("Renders props.size to font class when passed", async () => {
    const size = FONT.HUGE;
    await wrapper.setProps({ size });
    const fontClassName = prepareCssClassName(
      config.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    expect(wrapper.classes().includes(fontClassName)).toEqual(true);
  });

  it("Renders props.tag when passed", async () => {
    const tag = "address";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
});
