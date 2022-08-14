import { shallowMount } from "@vue/test-utils";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import {
  INPUT_TYPE,
  BASE_COLOR_SCHEME,
} from "@/components/atoms/d-input/constants";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import DInput from "@/components/atoms/d-input";
import config from "./config";
import {
  baseClassCase,
  borderClassCase,
  controlIdAbsenceCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  errorClassCase,
  errorFontCase,
  errorHtmlCase,
  errorSlotCase,
  errorStringCase,
  fontSizeClassCase,
  inputAttrsCase,
  inputClassCase,
  inputValueCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  labelHtmlCase,
  labelPresenceCase,
  labelSlotCase,
  minControlWidthCase,
  outlineClassCase,
  paddingClassesCase,
  roundingClassCase,
  sizeClassCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";

describe("DInput", () => {
  const wrapper = shallowMount(DInput);

  baseClassCase(wrapper, config.className);

  minControlWidthCase(wrapper);

  inputValueCase(wrapper);

  inputClassCase(wrapper);

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

  inputAttrsCase(wrapper);

  labelPresenceCase(wrapper);

  labelAbsenceCase(wrapper);

  labelClassCase(wrapper);

  labelFontCase(wrapper);

  labelHtmlCase(wrapper);

  labelSlotCase(DInput);

  controlIdPresenceCase(wrapper);

  controlIdAbsenceCase(wrapper);

  controlIdAutogeneratedCase(wrapper);

  borderClassCase(wrapper, wrapper.find("input"), BASE_COLOR_SCHEME);

  it("Should render props.inputFont to input font class", async () => {
    const inputFont = FONT.LARGE;
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      inputFont
    );
    await wrapper.setProps({ inputFont });
    const inputEl = wrapper.find("input");
    expect(inputEl.classes()).toContain(className);
    await wrapper.setProps({ inputFont: undefined });
  });

  fontSizeClassCase(wrapper, wrapper.find("input"));

  outlineClassCase(
    wrapper,
    wrapper.find("input"),
    BASE_COLOR_SCHEME,
    SIZE.LARGE
  );

  paddingClassesCase(wrapper, wrapper.find("input"));

  roundingClassCase(wrapper, wrapper.find("input"));

  sizeClassCase(wrapper, wrapper.find("input"));

  transitionClassCase(wrapper, wrapper.find("input"));

  errorStringCase(wrapper, config.errorClassName);

  errorClassCase(wrapper, config.errorClassName);

  errorFontCase(wrapper, config.errorClassName);

  errorHtmlCase(wrapper, config.errorClassName);

  errorSlotCase(DInput, config.errorClassName);

  // TODO: case factory
  it("Should emit onChange event with value payload", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(wrapper.emitted("change")?.[0]).toStrictEqual([newValue]);
    expect(wrapper.emitted("update:value")?.[0]).toStrictEqual([newValue]);
  });

  // TODO: case factory
  it("Shouldn't emit onChange event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("change");
    expect(wrapper.emitted("change")).toBeFalsy();
  });

  // TODO: case factory
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

  // TODO: case factory
  it("Shouldn't call passed props.whenChange if is disabled", async () => {
    const whenChange = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenChange, disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("change");
    expect(whenChange).toHaveBeenCalledTimes(0);
  });

  // TODO: case factory
  it("Should emit onInput event", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    expect(wrapper.emitted("input")?.[0]).toStrictEqual([newValue]);
  });

  // TODO: case factory
  it("Shouldn't emit onInput event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("input");
    expect(wrapper.emitted("input")).toBeFalsy();
  });

  // TODO: case factory
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

  // TODO: case factory
  it("Shouldn't call passed props.whenInput if is disabled", async () => {
    const whenInput = jest.fn();
    const wrapper = shallowMount(DInput, {
      props: { whenInput, disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("input");
    expect(whenInput).toHaveBeenCalledTimes(0);
  });

  // TODO: case factory
  it("Should emit onSubmit event", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(wrapper.emitted("submit")?.[0]).toStrictEqual([newValue]);
  });

  // TODO: case factory
  it("Shouldn't emit onSubmit event if is disable", async () => {
    const wrapper = shallowMount(DInput, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("keyup", { key: "Enter" });
    expect(wrapper.emitted("submit")).toBeFalsy();
  });

  // TODO: case factory
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

  // TODO: case factory
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

  tagCase(wrapper);
});
