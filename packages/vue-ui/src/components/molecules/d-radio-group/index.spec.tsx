import { shallowMount, mount } from "@vue/test-utils";
import DRadioGroup from "@/components/molecules/d-radio-group";
import DRadio from "@/components/atoms/d-radio";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import {
  baseClassCase,
  propStringCase,
  propVNodeCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  tagCase,
  slotCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";
import { sleep } from "@/utils/sleep";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import DCaption from "@/components/atoms/d-caption";

describe("DRadioGroup", () => {
  const wrapper = mount(DRadioGroup, { props: { caption: "Not empty" } });

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

  // TODO: combine all Caption cases in one factory or just test composition???
  it("Shouldn render props.size into props.font of the DCaption", async () => {
    const size = SIZE.HUGE;
    const wrapper = await mount(DRadioGroup, {
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
    const wrapper = await mount(DRadioGroup);
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported
    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeFalsy();
  });
  it("Should render caption element with props.caption content if passed", async () => {
    const captionContent = "some caption";
    const caption = <div>{captionContent}</div>;
    const wrapper = await mount(DRadioGroup, { props: { caption } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeTruthy();
    expect(captionEl.text()).toBe(captionContent);
  });
  slotCase(DRadioGroup, `.${config.captionClassName}`, "caption");
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
    const wrapper = mount(DRadioGroup, {
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
    const wrapper = shallowMount(DRadio, { props: { value, checked } });
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
