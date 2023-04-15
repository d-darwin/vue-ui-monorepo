import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  colorSchemeClassCase,
  controlIdAbsenceCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  elementValueAttrCase,
  fontSizeClassCase,
  minControlWidthCase,
  offsetCase,
  propStringCase,
  propVNodeCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import DProgress from "@/components/atoms/d-progress";
import DCaption from "@/components/atoms/d-caption";
import DLoader from "@/components/atoms/d-loader";
import config from "@/components/atoms/d-progress/config";
import { Type } from "@/components/atoms/d-progress/types";
import sleep from "@/utils/sleep";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";

describe("DProgress", () => {
  const wrapper = mount(DProgress);

  baseClassCase(wrapper, config.class);

  controlIdAbsenceCase(wrapper, `.${config.progressOptions.class}`);
  controlIdPresenceCase(wrapper, `.${config.progressOptions.class}`);
  controlIdAutogeneratedCase(wrapper, `.${config.progressOptions.class}`);

  propStringCase(wrapper, `.${config.labelOptions.class}`, "label");
  propVNodeCase(wrapper, `.${config.labelOptions.class}`, "label");
  slotCase(DProgress, `.${config.labelOptions.class}`, "label");
  offsetCase(wrapper, `.${config.labelOptions.class}`, "labelOffset");
  // TODO: props.labelOptions

  elementValueAttrCase(wrapper, 34, `.${config.progressOptions.class}`);

  it("Should render linear variant if props.type === Type.linear", async () => {
    await wrapper.setProps({
      type: Type.linear,
      value: 99,
    });
    const progressEl = wrapper.find(`.${config.progressOptions.class}`);
    expect(progressEl.classes()).toContain(config.linearClass);
  });

  it("Should render circular variant if props.type === Type.linear", async () => {
    await wrapper.setProps({
      type: Type.circular,
      value: 99,
    });
    const progressEl = wrapper.find(`.${config.progressOptions.class}`);
    expect(progressEl.classes()).toContain(config.circularClass);
  });

  it("Should render linear progress content as '${props.value}%'", async () => {
    const value = 19;
    await wrapper.setProps({
      type: Type.linear,
      value,
    });

    const progressEl = wrapper.find(`.${config.progressOptions.class}`);
    expect(progressEl.text()).toBe(`${value}%`);
  });
  // TODO: props.progressOptions

  propStringCase(wrapper, `.${config.contentOptions.class}`, "content");
  propVNodeCase(wrapper, `.${config.contentOptions.class}`, "content");
  slotCase(DProgress, `.${config.contentOptions.class}`, "default", {
    value: 12,
  });
  // TODO: props.contentOptions

  it(`Should render props.caption as string`, async () => {
    const caption = "some text content";
    const wrapper = mount(DProgress, { props: { caption, value: 56 } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionOptions.class}`);
    expect(captionEl?.text()).toMatch(caption);
  });

  // TODO: reactivity is broken
  it(`Should render prop.caption as VNode`, async () => {
    const caption = <div>some caption html</div>;
    const captionHtml = `${caption}`;
    const wrapper = mount(DProgress, { props: { caption: captionHtml } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionOptions.class}`);
    expect(captionEl.html()).toMatch(captionHtml);
  });
  slotCase(DProgress, `.${config.captionOptions.class}`, "caption");
  // TODO: reactivity is broken
  it(`Should render props.captionOffset to the label style as '--offset: props.captionOffset'`, async () => {
    const captionOffset = "12%";
    const wrapper = mount(DProgress, {
      props: { captionOffset: captionOffset, caption: "Not empty" },
    });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const targetEl = wrapper.find(`.${config.captionOptions.class}`);
    expect(targetEl.attributes("style")).toContain(
      `--offset: ${captionOffset}`
    );
  });
  // TODO: props.captionOptions

  colorSchemeClassCase(
    wrapper,
    `.${config.progressOptions.class}`,
    COLOR_SCHEME.ALTERNATIVE,
    { value: 11 }
  );

  it(`Should pass props.colorScheme to the DLoader`, async () => {
    const colorScheme = COLOR_SCHEME.SECONDARY;
    await wrapper.setProps({ colorScheme, value: undefined });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const loaderComp = wrapper.findComponent(DLoader);
    expect(loaderComp?.props().colorScheme).toBe(colorScheme);
  });

  colorSchemeClassCase(
    wrapper,
    `.${config.contentOptions.class}`,
    COLOR_SCHEME.DANGER,
    { value: 11 }
  );

  roundingClassCase(wrapper, `.${config.progressOptions.class}`, {
    value: 99,
  });

  it(`Should pass props.rounding to the DLoader`, async () => {
    const rounding = ROUNDING.SMALL;
    await wrapper.setProps({
      value: undefined,
      rounding,
      loaderOptions: { rounding },
    });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const loaderComp = wrapper.findComponent(DLoader);
    expect(loaderComp?.props().rounding).toBe(rounding);
  });

  roundingClassCase(wrapper, `.${config.contentOptions.class}`, {
    type: Type.circular,
    value: 99,
    content: "Not empty",
  });

  fontSizeClassCase(wrapper, `.${config.class}`);

  sizeClassCase(wrapper, `.${config.class}`);

  it(`Should pass props.size as size and font to the DLoader`, async () => {
    const size = SIZE.SMALL;
    await wrapper.setProps({
      value: undefined,
      size,
      loaderOptions: { size },
    });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const loaderComp = wrapper.findComponent(DLoader);
    expect(loaderComp?.props().size).toBe(size);
    expect(loaderComp?.props().font).toBe(size);
  });

  it(`Should pass props.size font to DCaption`, async () => {
    const size = SIZE.SMALL;
    const wrapper = mount(DProgress, {
      props: {
        value: 78,
        size,
        caption: "Not empty",
        captionOptions: { size },
      },
    });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionComp = wrapper.findComponent(DCaption);
    expect(captionComp?.props().font).toBe(size);
  });

  minControlWidthCase(wrapper, `.${config.linearClass}`, {
    type: Type.linear,
    value: 99,
  });

  transitionClassCase(wrapper, `.${config.progressOptions.class}`, {
    value: 32,
  });

  it(`Should render props.transition to DLoader classes`, async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition, value: undefined });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const loaderComp = wrapper.findComponent(DLoader);
    expect(loaderComp?.props().transition).toBe(transition);
  });

  // TODO: reactivity is broken
  it(`Should render props.transition to .caption transition class`, async () => {
    const transition = TRANSITION.AVERAGE;
    const wrapper = mount(DProgress, {
      props: { transition, value: 83, caption: "Not empty" },
    });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );

    const targetEl = wrapper.find(`.${config.captionOptions.class}`);
    expect(targetEl.classes()).toContain(className);
  });

  tagCase(wrapper);

  propStringCase(wrapper, `.${config.loaderContainerClass}`, "loader", {
    value: undefined,
  });

  propVNodeCase(wrapper, `.${config.loaderContainerClass}`, "loader", {
    value: undefined,
  });

  slotCase(DProgress, `.${config.loaderContainerClass}`, "loader", {
    value: undefined,
  });
  // TODO: props.loaderOptions

  // TODO: indeterminate -> branches

  // TODO: aria attrs
});
