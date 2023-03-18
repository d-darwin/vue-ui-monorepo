import { shallowMount } from "@vue/test-utils";
import DRadio from "@/components/atoms/d-radio";
import config from "@/components/atoms/d-radio/config";
import { DButtonAsync as DButton } from "@/components/atoms/d-button/async";
import { BASE_COLOR_SCHEME, TYPE } from "@/components/atoms/d-radio/constants";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import {
  baseClassCase,
  borderClassCase,
  colorSchemeClassCase,
  controlIdAbsenceCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  defaultCheckMarkCase,
  errorClassCase,
  errorFontCase,
  propVNodeCase,
  propStringCase,
  iconSlotCase,
  inputAttrsCase,
  inputClassCase,
  inputValueCase,
  labelClassCase,
  labelFontCase,
  minControlWidthCase,
  outlineClassCase,
  paddingEqualClassesCase,
  roundingClassCase,
  sizeClassCase,
  transitionClassCase,
  tagCase,
  slotCase,
  disabledClassCase,
  disabledAttrCase,
} from "@/utils/test-case-factories";

describe("DRadio", () => {
  const name = "some name";
  const value = "some value";
  const wrapper = shallowMount(DRadio, {
    props: { name, value, checked: true },
  });

  baseClassCase(wrapper, config.className);

  it("Should render input element with radio type, name and value", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().name).toBe(name);
    expect(inputEl.attributes().value).toBe(value);
  });

  inputValueCase(wrapper);

  inputClassCase(wrapper);

  inputAttrsCase(wrapper);

  minControlWidthCase(wrapper);

  defaultCheckMarkCase(wrapper, config);

  iconSlotCase(DRadio, config, { name, value });

  // TODO: make check target class factory ???
  it("Icon container classes should contain props.iconContainerClass if passed", async () => {
    const iconContainerClass = "iconContainerCustomClass";
    await wrapper.setProps({ iconContainerClass });
    const iconContainerEl = wrapper.find(`.${config.iconContainerClassName}`);
    expect(iconContainerEl.classes()).toContain(iconContainerClass);
  });

  // TODO: make check target class factory ???
  it("Icon container classes should contain colorSchemeStyles.__disabled if props.disabled passed", async () => {
    await wrapper.setProps({ disabled: true });
    const iconContainerEl = wrapper.find(`.${config.iconContainerClassName}`);
    expect(iconContainerEl.classes()).toContain(colorSchemeStyles.__disabled);
  });

  it("Should render DButton instead of icon container if props.type === 'button'", async () => {
    const label = "some label";
    const wrapper = shallowMount(DRadio, {
      props: { type: TYPE.BUTTON, name, value, label },
    });
    const button = wrapper.findComponent(DButton);
    expect(button).toBeTruthy();
    expect(button.attributes().content).toBe(label);
  });

  it("Should trigger input events on DButton click", async () => {
    const wrapper = shallowMount(DRadio, {
      props: { type: TYPE.BUTTON, name, value },
    });
    const button = wrapper.findComponent(DButton);
    await button.trigger("click");

    expect(wrapper.emitted("change")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:checked")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  labelClassCase(wrapper);
  labelFontCase(wrapper);
  propStringCase(wrapper, `.${config.labelInnerClassName}`, "label");
  propVNodeCase(wrapper, `.${config.labelInnerClassName}`, "label");
  slotCase(DRadio, `.${config.labelInnerClassName}`, "label", {
    name,
    value,
  });

  disabledClassCase(wrapper, `.${config.labelClassName}`);

  disabledAttrCase(wrapper, `.${config.inputClassName}`);

  controlIdPresenceCase(wrapper);

  controlIdAbsenceCase(wrapper);

  controlIdAutogeneratedCase(wrapper);

  borderClassCase(
    wrapper,
    `.${config.iconContainerClassName}`,
    COLOR_SCHEME.SECONDARY
  );

  colorSchemeClassCase(
    wrapper,
    `.${config.iconContainerClassName}`,
    COLOR_SCHEME.DANGER
  );

  outlineClassCase(wrapper, "input", BASE_COLOR_SCHEME, SIZE.LARGE);

  paddingEqualClassesCase(wrapper, `.${config.iconContainerClassName}`);

  it("Should pass props.padding to DButton if props.type === 'button'", async () => {
    const padding = PADDING.NONE;
    const wrapper = shallowMount(DRadio, {
      props: { type: TYPE.BUTTON, name, value, padding },
    });
    const button = wrapper.findComponent(DButton);
    expect(button).toBeTruthy();
    expect(button.attributes().padding).toBe(padding);
  });

  roundingClassCase(wrapper, `.${config.iconContainerClassName}`);

  sizeClassCase(wrapper, "input");
  sizeClassCase(wrapper, `.${config.iconContainerClassName}`);
  sizeClassCase(wrapper, `.${config.iconContainerBackdropClassName}`);
  transitionClassCase(wrapper, `.${config.iconContainerClassName}`);

  errorClassCase(wrapper, `.${config.errorClassName}`);
  errorFontCase(wrapper, `.${config.errorClassName}`);
  propStringCase(wrapper, `.${config.errorClassName}`, "error");
  propVNodeCase(wrapper, `.${config.errorClassName}`, "error");
  slotCase(DRadio, `.${config.errorClassName}`, "error", {
    name,
    value,
  });

  it("Should emit onChange event with checked and value payload", async () => {
    const value = "some value";
    const checked = false;
    const wrapper = shallowMount(DRadio, { props: { name, value, checked } });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(wrapper.emitted("change")?.[0]).toStrictEqual([
      !checked,
      !checked ? value : undefined,
    ]);
    expect(wrapper.emitted("update:checked")?.[0]).toStrictEqual([!checked]);
    expect(wrapper.emitted("update:value")?.[0]).toStrictEqual([
      !checked ? value : undefined,
    ]);
  });

  it("Shouldn't emit onChange if props.disabled is passed", async () => {
    const value = "some value";
    const checked = false;
    const disabled = true;
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, disabled },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(wrapper.emitted("change")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:checked")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  it("Should call passed props.whenChange", async () => {
    const value = "some value";
    const checked = false;
    const whenChange = jest.fn();
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, whenChange },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(whenChange).toHaveBeenCalledWith(
      !checked,
      !checked ? value : undefined
    );
  });

  it("Shouldn't call passed props.whenChange if props.disabled passed", async () => {
    const value = "some value";
    const checked = false;
    const disabled = true;
    const whenChange = jest.fn();
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, disabled, whenChange },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(whenChange).toHaveBeenCalledTimes(0);
  });

  it("Should emit onInput event with value payload", async () => {
    const value = "some value";
    const checked = false;
    const disabled = false;
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, disabled },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toStrictEqual([
      !checked ? value : undefined,
    ]);
  });

  it("Shouldn't emit onInput if props.disabled is passed", async () => {
    const value = "some value";
    const checked = false;
    const disabled = true;
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, disabled },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  it("Should call passed props.whenInput", async () => {
    const value = "some value";
    const checked = false;
    const whenInput = jest.fn();
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, whenInput },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledWith(!checked ? value : undefined);
  });

  it("Shouldn't call passed props.whenInput if props.disabled passed", async () => {
    const value = "some value";
    const checked = false;
    const disabled = true;
    const whenInput = jest.fn();
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, disabled, whenInput },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledTimes(0);
  });

  it("Shouldn't call any props.when... or emit events if already is checked", async () => {
    const checked = true;
    const whenInput = jest.fn();
    const whenChange = jest.fn();
    const wrapper = shallowMount(DRadio, {
      props: { name, value, checked, whenChange, whenInput },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");

    expect(wrapper.emitted("change")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:checked")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
    expect(whenChange).toHaveBeenCalledTimes(0);
    expect(whenInput).toHaveBeenCalledTimes(0);
  });

  tagCase(wrapper);

  it("Should change innerChecked on props.checked change", async () => {
    const checked = true;
    await wrapper.setProps({ checked });
    expect(wrapper.props().checked).toBe(checked);

    await wrapper.setProps({ checked: !checked });
    expect(wrapper.props().checked).toBe(!checked);
  });

  // TODO: 488-490

  // TODO: props. ...Options cases
});
