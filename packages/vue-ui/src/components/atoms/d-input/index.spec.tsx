import { shallowMount } from "@vue/test-utils";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import DInput, { BASE_COLOR_SCHEME } from "@/components/atoms/d-input";
import config from "./config";
import { baseClassCase } from "@/utils/test-case-factories";
import { INPUT_TYPE } from "@/components/atoms/d-input/constants";

describe("DInput", () => {
  const wrapper = shallowMount(DInput);

  baseClassCase(wrapper, config.className);

  it("Input element's value attr should contain props.value", async () => {
    const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);
  });

  it("Input element classes should contain props.inputClass if passed", async () => {
    const inputClass = "someCustomInputClass";
    await wrapper.setProps({ inputClass });
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(inputClass);
  });

  it("Should render props.placeholder to the input element placeholder attr", async () => {
    const placeholder = "Some placeholder";
    await wrapper.setProps({ placeholder });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().placeholder).toBe(placeholder);
  });

  it("Should render props.inputType to the input element type attr", async () => {
    const inputType = INPUT_TYPE.PASSWORD;
    await wrapper.setProps({ inputType });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().type).toBe(inputType);
  });

  it("Should render props.inputSize to the input element size attr", async () => {
    const inputSize = 5;
    await wrapper.setProps({ inputSize });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().size).toBe(String(inputSize));
  });

  it("Should render props.inputAttrs to the input element attributes", async () => {
    const inputAttrs = { readonly: true };
    await wrapper.setProps({ inputAttrs });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().readonly).toBe("");
  });

  it("Should render props.size to the container minControlWidth class", async () => {
    const size = SIZE.LARGE;
    await wrapper.setProps({ size });
    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );
    expect(wrapper.classes()).toContain(minControlWidthClassName);
  });

  it("Should render label element with props.label content if passed", async () => {
    const label = "Some label";
    await wrapper.setProps({ label });
    const labelEl = wrapper.find("label");
    expect(labelEl.exists()).toBeTruthy();
    expect(labelEl.text()).toBe(label);
  });

  it("Shouldn't render label element if props.label isn't passed", async () => {
    await wrapper.setProps({ label: undefined });
    const labelEl = wrapper.find("label");
    expect(labelEl.exists()).toBeFalsy();
  });

  it("Label element classes should contain props.labelClass if passed", async () => {
    const labelClass = "someCustomLabelClass";
    await wrapper.setProps({ label: "Some label", labelClass });
    const labelEl = wrapper.find("label");
    expect(labelEl.classes()).toContain(labelClass);
  });

  it("Should render props.labelFont to font class", async () => {
    const labelFont = FONT.HUGE;
    await wrapper.setProps({ label: "Some label", labelFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      labelFont
    );
    const labelEl = wrapper.find("label");
    expect(labelEl.classes()).toContain(className);
  });

  it("Should render prop.labelHtml to the label v-html", async () => {
    const labelHtml = "<div>some label html</div>";
    await wrapper.setProps({ labelHtml, label: undefined });
    const labelEl = wrapper.find("label");
    expect(labelEl.html()).toMatch(labelHtml);
  });

  it("Should render $slots.label instead of label content", async () => {
    const labelSlot = "<div>Some <b>slot</b> content</div>"; // TODO: should be HTML Element, not string
    const wrapper = shallowMount(DInput, {
      slots: {
        label: labelSlot,
      },
    });
    const labelEl = wrapper.find("label");
    expect(labelEl.html()).toMatch(labelSlot);
  });

  it("Should render passed props.id as input id and label for attr", async () => {
    const id = "some-external-id";
    const label = "Some label";
    await wrapper.setProps({ id, label });
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");
    expect(inputEl.attributes()?.id).toBe(id);
    expect(labelEl.attributes()?.for).toBe(id);
  });

  it("Should render equal, not null, autogenerated id attr for the input and for attr for the label if id isn't passed", async () => {
    await wrapper.setProps({ id: undefined, label: "Some label" });

    const uuidControlId = wrapper.vm.controlId;
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");

    expect(uuidControlId).toBeTruthy();
    expect(inputEl.attributes()?.id).toBe(uuidControlId);
    expect(labelEl.attributes()?.for).toBe(uuidControlId);
  });

  it("Shouldn't render id attr if there is no props.label and props.id", async () => {
    await wrapper.setProps({ id: undefined, label: undefined });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes()?.id).toBeFalsy();
  });

  it("Input element should contain color scheme and size dependent border class name", async () => {
    const size = SIZE.TINY;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.BORDER.CSS_CLASS_PREFIX,
      `${BASE_COLOR_SCHEME}-${size}`
    );
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
  });

  it("Should render props.inputFont or props.size to input font class ", async () => {
    const size = SIZE.SMALL;
    let className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    await wrapper.setProps({ size });
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);

    const inputFont = FONT.LARGE;
    className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      inputFont
    );
    await wrapper.setProps({ inputFont });
    expect(inputEl.classes()).toContain(className);
  });

  it("Input element should contain color scheme and size dependent outline class name", async () => {
    const size = SIZE.LARGE;
    const className = prepareCssClassName(
      codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
      `${BASE_COLOR_SCHEME}-${size}`
    );
    await wrapper.setProps({ size });
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
  });

  it("Should render props.padding to input padding classes", async () => {
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
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(paddingClassName);
    expect(inputEl.classes()).toContain(paddingSizeClassName);
  });

  // TODO: utils/test-case-factories
  it("Should render props.rounding to input rounding class", async () => {
    const rounding = ROUNDING.FULL;
    await wrapper.setProps({ rounding });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
      rounding
    );
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
  });

  // TODO: utils/test-case-factories ???
  it("Should render props.size to input size class", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
  });

  // TODO: utils/test-case-factories ???
  it("Renders props.transition to input transition class", async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
  });

  // TODO: error (via Tooltip ???)
  it("Should render error string (array???)", async () => {
    const error = "Some error string";
    await wrapper.setProps({ error });
    const errorEl = wrapper.find(`.${config.errorClassName}`);
    expect(errorEl.exists()).toBeTruthy();
    expect(errorEl.text()).toBe(error);
  });

  it("Error element classes should contain props.errorClass if passed", async () => {
    const errorClass = "someCustomErrorClass";
    await wrapper.setProps({ error: "Some error", errorClass });
    const errorEl = wrapper.find(`.${config.errorClassName}`);
    expect(errorEl.classes()).toContain(errorClass);
  });

  it("Should render props.errorFont to font class", async () => {
    const errorFont = FONT.HUGE;
    await wrapper.setProps({ error: "Some error", errorFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      errorFont
    );
    const errorEl = wrapper.find(`.${config.errorClassName}`);
    expect(errorEl.classes()).toContain(className);
  });

  it("Should render prop.errorHtml to the error v-html", async () => {
    const errorHtml = "<div>some label html</div>";
    await wrapper.setProps({ errorHtml, error: undefined });
    const errorEl = wrapper.find(`.${config.errorClassName}`);
    expect(errorEl.html()).toMatch(errorHtml);
  });

  it("Should render $slots.error instead of error content", async () => {
    const errorSlot = "<div>Some <b>slot</b> content</div>"; // TODO: should be HTML Element, not string
    const wrapper = shallowMount(DInput, {
      slots: {
        error: errorSlot,
      },
    });
    const errorEl = wrapper.find(`.${config.errorClassName}`);
    expect(errorEl.html()).toMatch(errorSlot);
  });

  it("Should emit onChange event with value payload", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(wrapper.emitted("change")?.[0]).toStrictEqual([newValue]);
    expect(wrapper.emitted("update:value")?.[0]).toStrictEqual([newValue]);
  });

  it("Shouldn't emit onChange event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("change");
    expect(wrapper.emitted("change")).toBeFalsy();
  });

  it("Should call passed props.whenChange", async () => {
    const whenChange = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenChange, disabled: false },
    });
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(whenChange).toHaveBeenCalledWith(newValue);
  });

  it("Shouldn't call passed props.whenChange if is disabled", async () => {
    const whenChange = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenChange, disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("change");
    expect(whenChange).toHaveBeenCalledTimes(0);
  });

  it("Should emit onInput event", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(wrapper.emitted("input")?.[0]).toStrictEqual([newValue]);
  });

  it("Shouldn't emit onInput event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("input");
    expect(wrapper.emitted("input")).toBeFalsy();
  });

  it("Should call passed props.whenInput", async () => {
    const whenInput = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenInput, disabled: false },
    });
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(whenInput).toHaveBeenCalledWith(newValue);
  });

  it("Shouldn't call passed props.whenInput if is disabled", async () => {
    const whenInput = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenInput, disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("input");
    expect(whenInput).toHaveBeenCalledTimes(0);
  });

  it("Should emit onSubmit event", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(wrapper.emitted("submit")?.[0]).toStrictEqual([newValue]);
  });

  it("Shouldn't emit onSubmit event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(wrapper.emitted("submit")).toBeFalsy();
  });

  it("Should call passed props.whenSubmit", async () => {
    const whenSubmit = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenSubmit, disabled: false },
    });
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(whenSubmit).toHaveBeenCalledWith(newValue);
  });

  it("Shouldn't call passed props.whenSubmit if is disabled", async () => {
    const whenSubmit = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenSubmit, disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(whenSubmit).toHaveBeenCalledTimes(0);
  });

  it("Should should render before slot", () => {
    const slotBeforeClass = "slotBefore";
    const slotBefore = `<div class=${slotBeforeClass}>before slot content</div>`;
    const wrapper = shallowMount(DInput, {
      slots: {
        before: slotBefore,
      },
    });
    const slotBeforeContainerEl = wrapper.find(
      `.${config.beforeContainerClass}`
    );
    expect(slotBeforeContainerEl.exists()).toBeTruthy();
    const slotBeforeEl = wrapper.find(`.${slotBeforeClass}`);
    expect(slotBeforeEl.exists()).toBeTruthy();
  });

  it("Should should render after slot", () => {
    const slotAfterClass = "slotAfter";
    const slotAfter = `<div class=${slotAfterClass}>after slot content</div>`;
    const wrapper = shallowMount(DInput, {
      slots: {
        after: slotAfter,
      },
    });
    const slotAfterContainerEl = wrapper.find(`.${config.afterContainerClass}`);
    expect(slotAfterContainerEl.exists()).toBeTruthy();
    const slotAfterEl = wrapper.find(`.${slotAfterClass}`);
    expect(slotAfterEl.exists()).toBeTruthy();
  });

  it("Renders as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
});
