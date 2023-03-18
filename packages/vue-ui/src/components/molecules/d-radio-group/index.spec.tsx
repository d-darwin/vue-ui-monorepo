import { shallowMount, mount } from "@vue/test-utils";
import DRadioGroup from "@/components/molecules/d-radio-group";
import DRadio from "@/components/atoms/d-radio";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import {
  baseClassCase,
  errorClassCase,
  errorFontCase,
  propStringCase,
  propVNodeCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  tagCase,
  errorAbsenceCase,
  slotCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DRadioGroup", () => {
  const wrapper = shallowMount(DRadioGroup);

  baseClassCase(wrapper, config.className);

  it("Should render passes props.items", async () => {
    const items = [
      <DRadio label={"radio 1"} value={1} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios.length).toBe(items.length);
  });

  labelAbsenceCase(wrapper, "legend");
  labelClassCase(wrapper, "legend");
  labelFontCase(wrapper, "legend");
  propStringCase(wrapper, "legend", "label");
  propVNodeCase(wrapper, "legend", "label");
  slotCase(DRadioGroup, "legend", "label");

  errorAbsenceCase(wrapper, `.${config.errorClassName}`);
  errorClassCase(wrapper, `.${config.errorClassName}`);
  errorFontCase(wrapper, `.${config.errorClassName}`);
  propStringCase(wrapper, `.${config.errorClassName}`, "error");
  propVNodeCase(wrapper, `.${config.errorClassName}`, "error");
  slotCase(DRadioGroup, `.${config.errorClassName}`, "error");

  it("Should add config.radioClassName to the descendants", async () => {
    const firstRadioOwnClass = "some-own-class";
    const items = [
      <DRadio label={"radio 1"} value={1} class={firstRadioOwnClass} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items });
    const firstRadio = wrapper.findComponent(DRadio);
    expect(firstRadio.classes()).toContain(config.radioClassName);
    expect(firstRadio.classes()).toContain(firstRadioOwnClass);
  });

  it("Should pass props.disabled to the descendants", async () => {
    const disabled = true;
    const items = [
      <DRadio label={"radio 1"} value={1} />,
      <DRadio label={"radio 2"} value={2} disabled={false} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items, disabled });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios[0]?.props("disabled")).toBeTruthy();
    expect(radios[1]?.props("disabled")).toBeFalsy();
  });

  it("Should pass props.colorScheme to the descendants", async () => {
    const firstRadioColorScheme = COLOR_SCHEME.PRIMARY;
    const colorScheme = COLOR_SCHEME.DANGER;
    const items = [
      <DRadio
        label={"radio 1"}
        value={1}
        colorScheme={firstRadioColorScheme}
      />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items, colorScheme });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios[0]?.props("colorScheme")).toBe(firstRadioColorScheme);
    expect(radios[1]?.props("colorScheme")).toBe(colorScheme);
  });

  it("Should pass props.rounding to the descendants", async () => {
    const firstRadioRounding = ROUNDING.FULL;
    const rounding = ROUNDING.LARGE;
    const items = [
      <DRadio label={"radio 1"} value={1} rounding={firstRadioRounding} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items, rounding });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios[0]?.props("rounding")).toBe(firstRadioRounding);
    expect(radios[1]?.props("rounding")).toBe(rounding);
  });

  it("Should pass props.size to the descendants", async () => {
    const firstRadioSize = SIZE.TINY;
    const size = SIZE.MEDIUM;
    const items = [
      <DRadio label={"radio 1"} value={1} size={firstRadioSize} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items, size });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios[0]?.props("size")).toBe(firstRadioSize);
    expect(radios[1]?.props("size")).toBe(size);
  });

  it("Should pass props.transition to the descendants", async () => {
    const firstRadioTransition = TRANSITION.AVERAGE;
    const transition = TRANSITION.FAST;
    const items = [
      <DRadio label={"radio 1"} value={1} transition={firstRadioTransition} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    await wrapper.setProps({ items, transition });
    const radios = wrapper.findAllComponents(DRadio);
    expect(radios[0]?.props("transition")).toBe(firstRadioTransition);
    expect(radios[1]?.props("transition")).toBe(transition);
  });

  tagCase(wrapper);

  it("Should change innerValue on child change event", async () => {
    const items = [
      <DRadio label={"radio 1"} value={1} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    const wrapper = mount(DRadioGroup);
    await wrapper.setProps({ items });

    const firstRadio = wrapper.findComponent(DRadio);
    const firstRadioValue = "some value";
    await firstRadio.props("whenChange")(firstRadioValue);

    expect(wrapper.vm.innerValue).toBe(firstRadioValue);
  });

  it("Should call radio.props?.whenInput?.(value) on child radio input", async () => {
    const firstRadioWhenInput = jest.fn();
    const items = [
      <DRadio label={"radio 1"} value={1} whenInput={firstRadioWhenInput} />,
      <DRadio label={"radio 2"} value={2} />,
      <DRadio label={"radio 3"} value={3} />,
    ];
    const wrapper = mount(DRadioGroup);
    await wrapper.setProps({ items });

    const firstRadioInputEl = wrapper.find("input");
    await firstRadioInputEl.trigger("input");

    expect(firstRadioWhenInput).toBeCalled();
  });
});
