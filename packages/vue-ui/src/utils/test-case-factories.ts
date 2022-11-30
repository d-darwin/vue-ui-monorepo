import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils";
import { defineComponent } from "vue";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";

// TODO: description

function getTargetName(
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>
): string {
  return (
    (targetWrapper as VueWrapper)?.vm?.$options?.name ||
    targetWrapper.element.tagName
  );
}

export function propContentCase(wrapper: VueWrapper) {
  return it("Renders props.content", async () => {
    const content = "some text content";
    await wrapper.setProps({ content });
    expect(wrapper.html()).toMatch(content);
  });
}

export function contentHtmlCase(wrapper: VueWrapper) {
  return it("Renders props.content as HTML string", async () => {
    const contentHtml = `<div>some <b>html</b> content</div>`;
    await wrapper.setProps({ content: contentHtml, enableHtml: true });
    expect(wrapper.html()).toMatch(contentHtml);
  });
}

export function slotDefaultCase(component: ReturnType<typeof defineComponent>) {
  return it("Renders $slots.default", async () => {
    const slotContent = `<div>Some <b>slot</b> content</div>`;
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

export function inputClassCase(wrapper: VueWrapper) {
  return it("Input element classes should contain props.inputClass if passed", async () => {
    const inputClass = "someCustomInputClass";
    await wrapper.setProps({ inputClass });
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(inputClass);
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

export function defaultCheckMarkCase(
  wrapper: VueWrapper,
  config: Record<string, string | number>
) {
  return it(`Should render default icon with ${config.checkMark}`, async () => {
    const iconEl = wrapper.find(`.${config.iconClassName}`);
    expect(iconEl.exists()).toBeTruthy();
    expect(iconEl.text()).toBe(config.checkMark);
  });
}

export function labelStringCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Should render label element with props.label content if passed", async () => {
    const label = "Some label";
    await wrapper.setProps({ label });

    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.exists()).toBeTruthy();
    expect(labelEl.text()).toBe(label);
  });
}

export function labelAbsenceCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Shouldn't render label element if props.label isn't passed", async () => {
    await wrapper.setProps({ label: undefined });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.exists()).toBeFalsy();
  });
}

export function labelClassCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Label element classes should contain props.labelClass if passed", async () => {
    const labelClass = "someCustomLabelClass";
    await wrapper.setProps({ label: "Some label", labelClass });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.classes()).toContain(labelClass);
  });
}

export function labelFontCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Should render props.labelFont to font class", async () => {
    const labelFont = FONT.HUGE;
    await wrapper.setProps({ label: "Some label", labelFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      labelFont
    );
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.classes()).toContain(className);
  });
}

export function labelHtmlCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Should render prop.label as HTML string", async () => {
    const labelHtml = `<div>some label html</div>`;
    await wrapper.setProps({ label: labelHtml, enableHtml: true });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.html()).toMatch(labelHtml);
  });
}

export function labelSlotCase(
  component: ReturnType<typeof defineComponent>,
  labelSelector = "label"
) {
  return it("Should render $slots.label instead of label content", async () => {
    const labelSlot = `<div>Some <b>slot</b> content</div>`;
    const wrapper = shallowMount(component, {
      slots: {
        label: labelSlot,
      },
    });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.html()).toMatch(labelSlot);
  });
}

export function labelDisabledClassCase(
  wrapper: VueWrapper,
  labelSelector = "label"
) {
  return it("Label classes should contain __disabled if props.disabled passed", async () => {
    await wrapper.setProps({ disabled: true });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.classes()).toContain("__disabled");
  });
}

export function iconSlotCase(
  component: ReturnType<typeof defineComponent>,
  config: Record<string, string | number>
) {
  return it("Should render icon slot instead of default icon", () => {
    const slotIconClass = "slotAfter";
    const slotIcon = `<div class="${slotIconClass}">icon slot content</div>`;
    const wrapper = shallowMount(component, {
      props: {
        checked: true,
      },
      slots: {
        icon: slotIcon,
      },
    });
    const iconContainerEl = wrapper.find(`.${config.iconContainerClassName}`);
    expect(iconContainerEl.exists()).toBeTruthy();
    const slotIconEl = wrapper.find(`.${slotIconClass}`);
    expect(slotIconEl.html()).toMatch(slotIcon);
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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>, // TODO: should pass selector
  colorScheme: ColorScheme
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>, // TODO: should pass selector
  colorScheme: ColorScheme
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement>, // TODO: should pass selector
  colorScheme: ColorScheme,
  size: Size
) {
  const targetName = getTargetName(targetWrapper);

  return it(`${targetName} should contain color scheme and size dependent outline class name`, async () => {
    const className = prepareCssClassName(
      codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    await wrapper.setProps({ size, colorScheme });

    expect(targetWrapper.classes()).toContain(className);
  });
}

export function paddingEqualClassesCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

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
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

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
    const whenClick = jest.fn();
    await wrapper.setProps({ disabled: true, whenClick });
    await wrapper.trigger("click"); // TODO: shouldn't we find button element ???
    expect(whenClick).toHaveBeenCalledTimes(0);
  });
}

export function callWhenClickCase(wrapper: VueWrapper) {
  return it("Calls props.whenClick when clicked", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ disabled: false, whenClick });
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

export function disabledControlCase(
  wrapper: VueWrapper,
  targetWrapper: VueWrapper | DOMWrapper<HTMLElement> // TODO: should pass selector
) {
  const targetName = getTargetName(targetWrapper);

  return it(`${targetName} should have attrs.disabled and wrapper should have __disabled class if prop.disabled is passed`, async () => {
    await wrapper.setProps({ disabled: true });
    expect(targetWrapper.attributes()?.disabled).toBe("");
    expect(wrapper.classes()).toContain("__disabled");
  });
}

export function errorAbsenceCase(wrapper: VueWrapper, errorClassName: string) {
  return it("Shouldn't render error element if props.error isn't passed", async () => {
    await wrapper.setProps({ error: undefined });
    const labelEl = wrapper.find(`.${errorClassName}`);
    expect(labelEl.exists()).toBeFalsy();
  });
}

export function errorStringCase(wrapper: VueWrapper, errorClassName: string) {
  // TODO: error array ???
  // TODO: error via Tooltip ???
  return it("Should render error string if props.error if passed", async () => {
    const error = "Some error string";
    await wrapper.setProps({ error });
    const errorEl = wrapper.find(`.${errorClassName}`);
    expect(errorEl.exists()).toBeTruthy();
    expect(errorEl.text()).toBe(error);
  });
}

export function errorClassCase(wrapper: VueWrapper, errorClassName: string) {
  return it("Error element classes should contain props.errorClass if passed", async () => {
    const errorClass = "someCustomErrorClass";
    await wrapper.setProps({ error: "Some error", errorClass });
    const errorEl = wrapper.find(`.${errorClassName}`);
    expect(errorEl.classes()).toContain(errorClass);
  });
}

export function errorFontCase(wrapper: VueWrapper, errorClassName: string) {
  return it("Should render props.errorFont to the error font class", async () => {
    const errorFont = FONT.HUGE;
    await wrapper.setProps({ error: "Some error", errorFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      errorFont
    );
    const errorEl = wrapper.find(`.${errorClassName}`);
    expect(errorEl.classes()).toContain(className);
  });
}

export function errorHtmlCase(wrapper: VueWrapper, errorClassName: string) {
  return it("Should render prop.errorHtml to the error's v-html", async () => {
    const errorHtml = `<div>some label html</div>`;
    await wrapper.setProps({ error: errorHtml, enableHtml: true });
    const errorEl = wrapper.find(`.${errorClassName}`);
    expect(errorEl.html()).toMatch(errorHtml);
  });
}

export function errorSlotCase(
  component: ReturnType<typeof defineComponent>,
  errorClassName: string
) {
  return it("Should render $slots.error instead of error content", async () => {
    const errorSlot = `<div>Some <b>error</b> content</div>`;
    const wrapper = shallowMount(component, {
      slots: {
        error: errorSlot,
      },
    });
    const errorEl = wrapper.find(`.${errorClassName}`);
    expect(errorEl.html()).toMatch(errorSlot);
  });
}

export function tagCase(wrapper: VueWrapper) {
  return it("Should render as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
}
