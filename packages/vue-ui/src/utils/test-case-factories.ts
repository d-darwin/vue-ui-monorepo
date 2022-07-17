import { shallowMount, VueWrapper } from "@vue/test-utils";
import { defineComponent } from "vue";

// TODO: description

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

export function slotDefaultCase(component: ReturnType<typeof defineComponent>) {
  return it("Renders $slots.default", async () => {
    const slotContent = "<div>Some <b>slot</b> content</div>"; // TODO: should be HTML Element, not string
    const wrapper = shallowMount(component, {
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
