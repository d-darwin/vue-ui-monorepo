import { mount, shallowMount } from "@vue/test-utils";
import DCheckboxGroup from "@/components/molecules/d-checkbox-group";
import DCheckbox from "@/components/atoms/d-checkbox";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import {
  baseClassCase,
  propVNodeCase,
  propStringCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  tagCase,
  slotCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";
import sleep from "@/utils/sleep";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import DCaption from "@/components/atoms/d-caption";

describe("DCheckboxGroup", () => {
  const wrapper = mount(DCheckboxGroup, { props: { caption: "Not empty" } });

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
  propStringCase(wrapper, "legend", "label");
  propVNodeCase(wrapper, "legend", "label");
  slotCase(DCheckboxGroup, "legend", "label");
  labelClassCase(wrapper, "legend");
  labelFontCase(wrapper, "legend");

  // TODO: combine all Caption cases in one factory or just test composition???
  it("Shouldn render props.size into props.font of the DCaption", async () => {
    const size = SIZE.HUGE;
    const wrapper = await mount(DCheckboxGroup, {
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
    const wrapper = await mount(DCheckboxGroup);
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported
    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeFalsy();
  });
  it("Should render caption element with props.caption content if passed", async () => {
    const captionContent = "some caption";
    const caption = <div>{captionContent}</div>;
    const wrapper = await mount(DCheckboxGroup, { props: { caption } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeTruthy();
    expect(captionEl.text()).toBe(captionContent);
  });
  slotCase(DCheckboxGroup, `.${config.captionClassName}`, "caption");
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
    const wrapper = mount(DCheckboxGroup, {
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

  tagCase(wrapper);

  // TODO: emits and whens
});
