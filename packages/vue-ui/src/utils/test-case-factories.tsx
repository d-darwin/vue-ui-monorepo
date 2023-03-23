import { DOMWrapper, shallowMount, VueWrapper, mount } from "@vue/test-utils";
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

export function propStringCase(
  wrapper: VueWrapper,
  targetSelector = ".content",
  propName = "content",
  props?: Record<string, unknown>
) {
  return it(`Should render props.${propName} as string`, async () => {
    const content = "some text content";
    await wrapper.setProps({ [propName]: content, ...props });

    const contentEl = wrapper.find(targetSelector);
    expect(contentEl?.html()).toMatch(content);
  });
}

export function propVNodeCase(
  wrapper: VueWrapper,
  targetSelector = ".content",
  propName = "content",
  props?: Record<string, unknown>
) {
  return it(`Should render prop.${propName} as VNode`, async () => {
    const content = <div>some content html</div>;
    const contentHtml = `${content}`;
    await wrapper.setProps({ [propName]: contentHtml, ...props });

    const contentEl = wrapper.find(targetSelector);
    expect(contentEl.html()).toMatch(contentHtml);
  });
}

export function slotCase(
  component: ReturnType<typeof defineComponent>,
  targetSelector: string,
  slotName = "default",
  props?: Record<string, unknown>
) {
  return it(`Should render $slots.${slotName}`, async () => {
    const slotContent = `<div>Some <b>slot</b> content</div>`;
    const wrapper = mount(component, {
      props,
      slots: {
        [slotName]: slotContent,
      },
    });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl?.html()).toMatch(slotContent);
  });
}

export function baseClassCase(
  wrapper: VueWrapper | DOMWrapper<HTMLElement> | undefined,
  className: string
) {
  return it(`Renders ${className} class name`, async () => {
    expect(wrapper?.classes()).toContain(className);
  });
}

export function elementValueAttrCase(
  wrapper: VueWrapper,
  value: string | number = "some value",
  targetSelector = "input"
) {
  return it(`${targetSelector}'s value attr should contain props.value`, async () => {
    await wrapper.setProps({ value });
    const inputEl = wrapper.find(targetSelector);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO
    expect(String(inputEl.element?.value || inputEl.attributes().value)).toBe(
      String(value)
    );
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

export function minControlWidthCase(
  wrapper: VueWrapper,
  targetSelector?: string,
  props?: Record<string, unknown>
) {
  return it("Should render props.size to the container minControlWidth class", async () => {
    const size = SIZE.LARGE;
    await wrapper.setProps({ size, ...props });
    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );

    const targetEl = targetSelector ? wrapper.find(targetSelector) : wrapper;
    expect(targetEl.classes()).toContain(minControlWidthClassName);
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

// TODO: propAbsenceCase
export function labelAbsenceCase(wrapper: VueWrapper, labelSelector = "label") {
  return it("Shouldn't render label element if props.label isn't passed", async () => {
    await wrapper.setProps({ label: undefined });
    const labelEl = wrapper.find(labelSelector);
    expect(labelEl.exists()).toBeFalsy();
  });
}

// TODO: merge with labelAbsenceCase
export function captionAbsenceCase(
  wrapper: VueWrapper,
  captionSelector = "caption"
) {
  return it("Shouldn't render caption element if props.caption isn't passed", async () => {
    await wrapper.setProps({ caption: undefined });
    const captionEl = wrapper.find(captionSelector);
    expect(captionEl.exists()).toBeFalsy();
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

export function iconSlotCase(
  component: ReturnType<typeof defineComponent>,
  config: Record<string, string | number>,
  props?: Record<string, unknown>
) {
  return it("Should render icon slot instead of default icon", () => {
    const slotIconClass = "slotAfter";
    const slotIcon = `<div class="${slotIconClass}">icon slot content</div>`;
    const wrapper = shallowMount(component, {
      props: {
        ...props,
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

// TODO: naming
export function controlIdPresenceCase(
  wrapper: VueWrapper,
  targetSelector = "input"
) {
  return it("Should render passed props.id as input id and label for attrs", async () => {
    const id = "some-external-id";
    const label = "Some label";
    await wrapper.setProps({ id, label });
    const inputEl = wrapper.find(targetSelector);
    const labelEl = wrapper.find("label");
    expect(inputEl.attributes()?.id).toBe(id);
    expect(labelEl.attributes()?.for).toBe(id);
  });
}

// TODO: naming
export function controlIdAbsenceCase(
  wrapper: VueWrapper,
  targetSelector = "input"
) {
  return it("Shouldn't render id attr if there is no props.label and props.id", async () => {
    await wrapper.setProps({ id: undefined, label: undefined });
    const inputEl = wrapper.find(targetSelector);
    expect(inputEl.attributes()?.id).toBeFalsy();
  });
}

// TODO: naming
export function controlIdAutogeneratedCase(
  wrapper: VueWrapper,
  targetSelector = "input"
) {
  return it("Should render equal, not null, autogenerated id attr for the input and for attr for the label if id isn't passed", async () => {
    await wrapper.setProps({ id: undefined, label: "Some label" });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO
    const uuidControlId = wrapper.vm.controlId || wrapper.vm.id;
    const inputEl = wrapper.find(targetSelector);
    const labelEl = wrapper.find("label");

    expect(uuidControlId).toBeTruthy();
    expect(inputEl.attributes()?.id).toBe(uuidControlId);
    expect(labelEl.attributes()?.for).toBe(uuidControlId);
  });
}

export function borderClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  colorScheme: ColorScheme
) {
  return it(`${targetSelector} element should contain color scheme and size dependent border class name`, async () => {
    const size = SIZE.TINY;
    await wrapper.setProps({ size, colorScheme });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl?.classes()).toContain(className);
  });
}

export function colorSchemeClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  colorScheme: ColorScheme,
  props?: Record<string, unknown>
) {
  return it(`Should render props.colorScheme to the ${targetSelector}'s color scheme class`, async () => {
    await wrapper.setProps({ colorScheme, ...props });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
      colorScheme
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl?.classes()).toContain(className);
  });
}

export function fontClassCase(wrapper: VueWrapper, targetSelector: string) {
  return it(`Should render props.size to ${targetSelector} font class`, async () => {
    const font = FONT.SMALL;
    await wrapper.setProps({ font });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl?.classes()).toContain(className);
  });
}

export function fontSizeClassCase(wrapper: VueWrapper, targetSelector: string) {
  return it(`Should render props.size to ${targetSelector} font class`, async () => {
    const size = SIZE.SMALL;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl?.classes()).toContain(className);
  });
}

export function outlineClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  colorScheme: ColorScheme,
  size: Size
) {
  return it(`${targetSelector} should contain color scheme and size dependent outline class name`, async () => {
    const className = prepareCssClassName(
      codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `${colorScheme}-${size}`
    );
    await wrapper.setProps({ size, colorScheme });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain(className);
  });
}

export function paddingEqualClassesCase(
  wrapper: VueWrapper,
  targetSelector: string
) {
  return it(`Should render props.padding to ${targetSelector} padding classes`, async () => {
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

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain(paddingClassName);
    expect(targetEl.classes()).toContain(paddingSizeClassName);
  });
}

export function roundingClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  props?: Record<string, unknown>
) {
  return it(`Should render props.rounding to ${targetSelector} rounding class`, async () => {
    const rounding = ROUNDING.FULL;
    await wrapper.setProps({ rounding, ...props });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
      rounding
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain(className);
  });
}

export function sizeClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  props?: Record<string, unknown>
) {
  return it(`Should render props.size to ${targetSelector} size class`, async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size, ...props });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain(className);
  });
}

export function transitionClassCase(
  wrapper: VueWrapper,
  targetSelector: string,
  props?: Record<string, unknown>
) {
  return it(`Should render props.transition to ${targetSelector} transition class`, async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition, ...props });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain(className);
  });
}

export function routerLinkComponentCase(wrapper: VueWrapper) {
  return it("Should render as 'router-link' component if 'to' is passed", async () => {
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

export function disabledClassCase(wrapper: VueWrapper, targetSelector: string) {
  return it(`${targetSelector} should have attrs.disabled and wrapper should have __disabled class if prop.disabled is passed`, async () => {
    await wrapper.setProps({ disabled: true });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.classes()).toContain("__disabled");
  });
}

export function disabledAttrCase(wrapper: VueWrapper, targetSelector: string) {
  return it(`${targetSelector} should have attrs.disabled and wrapper should have __disabled class if prop.disabled is passed`, async () => {
    await wrapper.setProps({ disabled: true });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.attributes()?.disabled).toBeFalsy();
  });
}

export function activeControlCase(wrapper: VueWrapper, targetSelector: string) {
  return it(`${targetSelector} should have attrs.active and wrapper should have __active class if prop.disabled is passed`, async () => {
    await wrapper.setProps({ active: true });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.attributes()?.disabled).toBeFalsy();
    expect(wrapper.classes()).toContain("__active");
  });
}

export function errorAbsenceCase(wrapper: VueWrapper, errorElSelector: string) {
  return it("Shouldn't render error element if props.error isn't passed", async () => {
    await wrapper.setProps({ error: undefined });
    const labelEl = wrapper.find(errorElSelector);
    expect(labelEl.exists()).toBeFalsy();
  });
}

export function errorClassCase(wrapper: VueWrapper, errorElSelector: string) {
  return it("Error element classes should contain props.errorClass if passed", async () => {
    const errorClass = "someCustomErrorClass";
    await wrapper.setProps({ error: "Some error", errorClass });
    const errorEl = wrapper.find(errorElSelector);
    expect(errorEl.classes()).toContain(errorClass);
  });
}

export function errorFontCase(wrapper: VueWrapper, errorElSelector: string) {
  return it("Should render props.errorFont to the error font class", async () => {
    const errorFont = FONT.HUGE;
    await wrapper.setProps({ error: "Some error", errorFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      errorFont
    );
    const errorEl = wrapper.find(errorElSelector);
    expect(errorEl.classes()).toContain(className);
  });
}

export function tagCase(wrapper: VueWrapper) {
  return it("Should render as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
}

export function offsetCase(
  wrapper: VueWrapper,
  targetSelector = "label",
  propName = "labelOffset"
) {
  return it(`Should render props.labelOffset to the label style as '--offset: props.${propName}'`, async () => {
    const offset = "12%";
    await wrapper.setProps({
      [propName]: offset,
    });

    const targetEl = wrapper.find(targetSelector);
    expect(targetEl.attributes("style")).toContain(`--offset: ${offset}`);
  });
}
