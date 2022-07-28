import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils";
import { defineComponent } from "vue";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";

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

export function inputValueCase(wrapper: VueWrapper) {
  return it("Input element's value attr should contain props.value", async () => {
    const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);
  });
}

export function inputAttrsCase(wrapper: VueWrapper) {
  return it("Should render props.inputAttrs to the input element attributes", async () => {
    const inputAttrs = { readonly: true };
    await wrapper.setProps({ inputAttrs });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().readonly).toBe("");
  });
}

export function minControlWidthCase(wrapper: VueWrapper) {
  return it("Should render props.size to the container minControlWidth class", async () => {
    const size = SIZE.LARGE;
    await wrapper.setProps({ size });
    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );
    expect(wrapper.classes()).toContain(minControlWidthClassName);
  });
}

export function labelPresenceCase(wrapper: VueWrapper) {
  return it("Should render label element with props.label content if passed", async () => {
    const label = "Some label";
    await wrapper.setProps({ label });
    const labelEl = wrapper.find("label");
    expect(labelEl.exists()).toBeTruthy();
    expect(labelEl.text()).toBe(label);
  });
}

export function labelAbsenceCase(wrapper: VueWrapper) {
  return it("Shouldn't render label element if props.label isn't passed", async () => {
    await wrapper.setProps({ label: undefined });
    const labelEl = wrapper.find("label");
    expect(labelEl.exists()).toBeFalsy();
  });
}

export function labelClassCase(wrapper: VueWrapper) {
  return it("Label element classes should contain props.labelClass if passed", async () => {
    const labelClass = "someCustomLabelClass";
    await wrapper.setProps({ label: "Some label", labelClass });
    const labelEl = wrapper.find("label");
    expect(labelEl.classes()).toContain(labelClass);
  });
}

export function labelFontCase(wrapper: VueWrapper) {
  return it("Should render props.labelFont to font class", async () => {
    const labelFont = FONT.HUGE;
    await wrapper.setProps({ label: "Some label", labelFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      labelFont
    );
    const labelEl = wrapper.find("label");
    expect(labelEl.classes()).toContain(className);
  });
}

export function labelHtmlCase(wrapper: VueWrapper) {
  return it("Should render prop.labelHtml to the label v-html", async () => {
    const labelHtml = "<div>some label html</div>";
    await wrapper.setProps({ labelHtml, label: undefined });
    const labelEl = wrapper.find("label");
    expect(labelEl.html()).toMatch(labelHtml);
  });
}

export function labelSlotCase(component: ReturnType<typeof defineComponent>) {
  return it("Should render $slots.label instead of label content", async () => {
    const labelSlot = "<div>Some <b>slot</b> content</div>"; // TODO: should be HTML Element, not string
    const wrapper = shallowMount(component, {
      slots: {
        label: labelSlot,
      },
    });
    const labelEl = wrapper.find("label");
    expect(labelEl.html()).toMatch(labelSlot);
  });
}

export function controlIdPresenceCase(wrapper: VueWrapper) {
  return it("Should render passed props.id as input id and label for attrs", async () => {
    const id = "some-external-id";
    const label = "Some label";
    await wrapper.setProps({ id, label });
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");
    expect(inputEl.attributes()?.id).toBe(id);
    expect(labelEl.attributes()?.for).toBe(id);
  });
}

export function controlIdAbsenceCase(wrapper: VueWrapper) {
  return it("Shouldn't render id attr if there is no props.label and props.id", async () => {
    await wrapper.setProps({ id: undefined, label: undefined });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes()?.id).toBeFalsy();
  });
}

export function controlIdAutogeneratedCase(wrapper: VueWrapper) {
  return it("Should render equal, not null, autogenerated id attr for the input and for attr for the label if id isn't passed", async () => {
    await wrapper.setProps({ id: undefined, label: "Some label" });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const uuidControlId = wrapper.vm.controlId;
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");

    expect(uuidControlId).toBeTruthy();
    expect(inputEl.attributes()?.id).toBe(uuidControlId);
    expect(labelEl.attributes()?.for).toBe(uuidControlId);
  });
}

export function roundingClassCase(
  wrapper: VueWrapper,
  targetEl: VueWrapper | DOMWrapper<never>
) {
  return it(`Should render props.rounding to ${
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    targetEl?.vm?.$options?.name || targetEl.element.tagName
  } rounding class`, async () => {
    const rounding = ROUNDING.FULL;
    await wrapper.setProps({ rounding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
      rounding
    );
    expect(targetEl.classes()).toContain(className);
  });
}

/*
export function labelClassCase(wrapper: VueWrapper) {
  return
}*/
