import { mount, shallowMount } from "@vue/test-utils";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import {
  INPUT_TYPE,
  BASE_COLOR_SCHEME,
} from "@/components/atoms/d-input/constants";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import DInput from "@/components/atoms/d-input";
import config from "./config";
import {
  baseClassCase,
  borderClassCase,
  controlIdAbsenceCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  propVNodeCase,
  propStringCase,
  fontSizeClassCase,
  inputAttrsCase,
  inputClassCase,
  elementValueAttrCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  minControlWidthCase,
  outlineClassCase,
  paddingEqualClassesCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import sleep from "@/utils/sleep";
import DCaption from "@/components/atoms/d-caption";

describe("DInput", () => {
  const wrapper = mount(DInput, { props: { caption: "Not empty" } });

  baseClassCase(wrapper, config.className);

  minControlWidthCase(wrapper);

  elementValueAttrCase(wrapper);

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

  labelAbsenceCase(wrapper);
  labelClassCase(wrapper);
  labelFontCase(wrapper);
  propStringCase(wrapper, `.${config.labelClassName}`, "label");
  propVNodeCase(wrapper, `.${config.labelClassName}`, "label");
  slotCase(DInput, `.${config.labelClassName}`, "label");

  controlIdPresenceCase(wrapper);

  controlIdAbsenceCase(wrapper);

  controlIdAutogeneratedCase(wrapper);

  borderClassCase(wrapper, "input", BASE_COLOR_SCHEME);

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

  // TODO: fix
  fontSizeClassCase(wrapper, "input");

  outlineClassCase(wrapper, "input", BASE_COLOR_SCHEME, SIZE.LARGE);

  paddingEqualClassesCase(wrapper, "input");

  roundingClassCase(wrapper, "input");

  sizeClassCase(wrapper, "input");

  transitionClassCase(wrapper, "input");

  // TODO: combine all Caption cases in one factory or just test composition???
  it("Shouldn render props.size into props.font of the DCaption", async () => {
    const size = SIZE.HUGE;
    const wrapper = await mount(DInput, {
      props: { size, caption: "Not empty" },
    });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    expect(captionEl.classes()).toContain(className);
  });
  it("Shouldn't render caption element if props.caption isn't passed", async () => {
    const wrapper = await mount(DInput);
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported
    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeFalsy();
  });
  it("Should render caption element with props.caption content if passed", async () => {
    const captionContent = "some caption";
    const caption = <div>{captionContent}</div>;
    const wrapper = await mount(DInput, { props: { caption } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeTruthy();
    expect(captionEl.text()).toBe(captionContent);
  });
  slotCase(DInput, `.${config.captionClassName}`, "caption");
  it("Should render props.captionOffset to the caption style as '--offset: props.captionOffset'", async () => {
    const captionOffset = 33;
    await wrapper.setProps({
      caption: "Caption string",
      captionOffset,
    });

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.attributes("style")).toContain(
      `--offset: ${captionOffset}`
    );
  });
  transitionClassCase(wrapper, `.${config.captionClassName}`);
  it("Should merge props from props.caption and CAPTION_DEFAULTS to the caption element attrs", async () => {
    const externalClass = "some-external-class";
    const wrapper = mount(DInput, {
      props: {
        caption: "not empty",
        captionOptions: {
          class: externalClass,
        },
      },
    });

    const caption = wrapper.findComponent(DCaption);
    expect(caption.classes()).toContain(externalClass);
  });
  it("Should emit onChange event with checked and value payload", async () => {
    const value = "some value";
    const checked = false;
    const wrapper = shallowMount(DInput, { props: { name, value, checked } });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(wrapper.emitted("change")?.[0]).toStrictEqual([value]);
    expect(wrapper.emitted("update:value")?.[0]).toStrictEqual([value]);
  });

  // TODO: case factory
  it("Should emit onChange event with value payload", async () => {
    const wrapper = shallowMount(DInput);
    const inputEl = wrapper.find("input");
    const newValue = "new value";
    await inputEl.setValue(newValue);
    await inputEl.trigger("change");
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
