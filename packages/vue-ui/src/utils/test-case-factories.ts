import { shallowMount, VueWrapper } from "@vue/test-utils";
import DLink from "@/components/atoms/d-link";

export function propContentCase(wrapper: VueWrapper) {
  return it("Renders props.content", async () => {
    const text = "Some text content";
    await wrapper.setProps({ text });
    expect(wrapper.text()).toMatch(text);
  });
}

export function propHtmlCase(wrapper: VueWrapper) {
  return it("Renders props.html", async () => {
    const html = "Some <b>html</b> content";
    await wrapper.setProps({ text: "", html });
    expect(wrapper.html()).toMatch(html);
  });
}

export function slotDefaultCase(wrapper: VueWrapper) {
  return it("Renders $slots.default", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>";
    const wrapper = shallowMount(DLink, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toMatch(slotContent);
  });
}

export function baseClassCase(wrapper: VueWrapper, className: string) {
  return it(`Renders ${className} class name`, async () => {
    expect(wrapper.classes()).toContain(className);
  });
}
