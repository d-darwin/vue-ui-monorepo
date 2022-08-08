import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils";
import { defineComponent } from "vue";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import { ColorScheme } from "@darwin-studio/vue-ui-codegen/dist/types/color-scheme";
import { Size } from "@darwin-studio/vue-ui-codegen/dist/types/size";
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
    // @ts-ignore TODO
    const uuidControlId = wrapper.vm.controlId;
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");

    expect(uuidControlId).toBeTruthy();
    expect(inputEl.attributes()?.id).toBe(uuidControlId);
    expect(labelEl.attributes()?.for).toBe(uuidControlId);
  });
}

export function borderClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>,
  colorScheme: ColorScheme
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`${targetName} element should contain color scheme and size dependent border class name`, async () => {
    const size = SIZE.TINY;
    await wrapper.setProps({ size, colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function colorSchemeClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>,
  colorScheme: ColorScheme
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Renders props.colorScheme to the ${targetName}'s color scheme class`, async () => {
    await wrapper.setProps({ colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
      colorScheme
    );
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function fontSizeClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Should render props.size to ${targetName} font class`, async () => {
    const size = SIZE.SMALL;
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    await wrapper.setProps({ size });
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function outlineClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>,
  colorScheme: ColorScheme,
  size: Size
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`${targetName} should contain color scheme and size dependent outline class name`, async () => {
    const className = prepareCssClassName(
      codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    await wrapper.setProps({ size, colorScheme });

    expect(targetWrapper.classes()).toContain(className);
  });
}

export function paddingClassesCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Should render props.padding to ${targetName} padding classes`, async () => {
    const padding = PADDING.EQUAL;
    const paddingClassName = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      padding
    );
    const size = SIZE.MEDIUM;
    const paddingSizeClassName = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      `${padding}-${size}`
    );
    await wrapper.setProps({ padding, size });
    expect(targetWrapper.classes()).toContain(paddingClassName);
    expect(targetWrapper.classes()).toContain(paddingSizeClassName);
  });
}

export function roundingClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Should render props.rounding to ${targetName} rounding class`, async () => {
    const rounding = ROUNDING.FULL;
    await wrapper.setProps({ rounding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
      rounding
    );
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function sizeClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Should render props.size to ${targetName} size class`, async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function transitionClassCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
) {
  const targetName =
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName;

  return it(`Should render props.transition to ${targetName} transition class`, async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );
    expect(targetWrapper.classes()).toContain(className);
  });
}

export function routerLinkComponentCase(wrapper: VueWrapper) {
  return it("Renders as 'router-link' component if 'to' is passed", async () => {
    await wrapper.setProps({
      to: { path: "/some-relative-path" },
      href: undefined,
    }); // TODO: add to validator to the component
    expect(wrapper.element.tagName).toEqual("ROUTER-LINK");
  });
}

export function dontEmitClickEventCase(wrapper: VueWrapper) {
  return it("Doesn't emit click event when clicked if disabled", async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });
}

export function emitClickEventCase(wrapper: VueWrapper) {
  return it("Emits click event when clicked", async () => {
    await wrapper.setProps({ to: null, href: null, disabled: false });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });
}

export function dontCallWhenClickCase(wrapper: VueWrapper) {
  return it("Doesn't call props.whenClick when clicked if disabled", async () => {
    await wrapper.setProps({ disabled: true });
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick });
    await wrapper.trigger("click"); // TODO: shouldn't we find button element ???
    expect(whenClick).toHaveBeenCalledTimes(0);
  });
}

export function callWhenClickCase(wrapper: VueWrapper) {
  return it("Calls props.whenClick when clicked", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ whenClick, disabled: false });
    await wrapper.trigger("click");
    expect(whenClick).toHaveBeenCalledTimes(1);
  });
}

export function preventDefaultCase(wrapper: VueWrapper) {
  return it("Calls $event.preventDefault if prop.eventDefault is passed", async () => {
    const event = { preventDefault: jest.fn() } as unknown as MouseEvent;
    await wrapper.setProps({ disabled: false, preventDefault: true });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await wrapper.vm?.clickHandler(event); // TODO
    expect(event.preventDefault).toBeCalled();
  });
}

export function disabledClassCase(wrapper: VueWrapper) {
  return it("Renders __disabled class if prop.disabled is passed", async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).toContain("__disabled");
  });
}

/*
export function labelClassCase(wrapper: VueWrapper) {
  return
}*/
