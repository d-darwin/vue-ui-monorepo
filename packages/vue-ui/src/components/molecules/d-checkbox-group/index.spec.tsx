import { shallowMount } from "@vue/test-utils";
import DCheckboxGroup from "@/components/molecules/d-checkbox-group";
import DCheckbox from "@/components/atoms/d-checkbox";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import {
  baseClassCase,
  errorClassCase,
  errorFontCase,
  errorHtmlCase,
  errorSlotCase,
  errorStringCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  labelStringCase,
  labelSlotCase,
  tagCase,
  labelHtmlCase,
  errorAbsenceCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DCheckboxGroup", () => {
  const wrapper = shallowMount(DCheckboxGroup);

  baseClassCase(wrapper, config.className);

  it("Should render passes props.items", async () => {
    const items = [
      <DCheckbox label={"checkbox 1"} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes.length).toBe(items.length);
  });

  labelAbsenceCase(wrapper, "legend");
  labelStringCase(wrapper, "legend");
  labelHtmlCase(wrapper, "legend");
  labelSlotCase(DCheckboxGroup, "legend");
  labelClassCase(wrapper, "legend");
  labelFontCase(wrapper, "legend");

  errorAbsenceCase(wrapper, `.${config.errorClassName}`);
  errorStringCase(wrapper, `.${config.errorClassName}`);
  errorHtmlCase(wrapper, `.${config.errorClassName}`);
  errorSlotCase(DCheckboxGroup, `.${config.errorClassName}`);
  errorClassCase(wrapper, `.${config.errorClassName}`);
  errorFontCase(wrapper, `.${config.errorClassName}`);

  it("Should add config.checkboxClassName to the descendants", async () => {
    const firstCheckboxOwnClass = "some-own-class";
    const items = [
      <DCheckbox label={"checkbox 1"} class={firstCheckboxOwnClass} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items });
    const firstCheckbox = wrapper.findComponent(DCheckbox);
    expect(firstCheckbox.classes()).toContain(config.checkboxClassName);
    expect(firstCheckbox.classes()).toContain(firstCheckboxOwnClass);
  });

  it("Should pass props.disabled to the descendants", async () => {
    const disabled = true;
    const items = [
      <DCheckbox label={"checkbox 1"} />,
      <DCheckbox label={"checkbox 2"} disabled={false} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, disabled });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("disabled")).toBeTruthy();
    expect(checkboxes[1]?.props("disabled")).toBeFalsy();
  });

  it("Should pass props.colorScheme to the descendants", async () => {
    const firstCheckboxColorScheme = COLOR_SCHEME.PRIMARY;
    const colorScheme = COLOR_SCHEME.DANGER;
    const items = [
      <DCheckbox label={"checkbox 1"} colorScheme={firstCheckboxColorScheme} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, colorScheme });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("colorScheme")).toBe(firstCheckboxColorScheme);
    expect(checkboxes[1]?.props("colorScheme")).toBe(colorScheme);
  });

  it("Should pass props.rounding to the descendants", async () => {
    const firstCheckboxRounding = ROUNDING.FULL;
    const rounding = ROUNDING.LARGE;
    const items = [
      <DCheckbox label={"checkbox 1"} rounding={firstCheckboxRounding} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, rounding });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("rounding")).toBe(firstCheckboxRounding);
    expect(checkboxes[1]?.props("rounding")).toBe(rounding);
  });

  it("Should pass props.size to the descendants", async () => {
    const firstCheckboxSize = SIZE.TINY;
    const size = SIZE.MEDIUM;
    const items = [
      <DCheckbox label={"checkbox 1"} size={firstCheckboxSize} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, size });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("size")).toBe(firstCheckboxSize);
    expect(checkboxes[1]?.props("size")).toBe(size);
  });

  it("Should pass props.transition to the descendants", async () => {
    const firstCheckboxTransition = TRANSITION.AVERAGE;
    const transition = TRANSITION.FAST;
    const items = [
      <DCheckbox label={"checkbox 1"} transition={firstCheckboxTransition} />,
      <DCheckbox label={"checkbox 2"} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, transition });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("transition")).toBe(firstCheckboxTransition);
    expect(checkboxes[1]?.props("transition")).toBe(transition);
  });

  it("Should pass props.enableHtml to the descendants", async () => {
    const enableHtml = true;
    const items = [
      <DCheckbox label={"checkbox 1"} />,
      <DCheckbox label={"checkbox 2"} enableHtml={false} />,
      <DCheckbox label={"checkbox 3"} />,
    ];
    await wrapper.setProps({ items, enableHtml });
    const checkboxes = wrapper.findAllComponents(DCheckbox);
    expect(checkboxes[0]?.props("enableHtml")).toBeTruthy();
    expect(checkboxes[1]?.props("enableHtml")).toBeFalsy();
  });

  tagCase(wrapper);

  // TODO: emits and whens
});
