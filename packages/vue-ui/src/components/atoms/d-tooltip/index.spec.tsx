import { shallowMount } from "@vue/test-utils";
import DTooltip from "@/components/atoms/d-tooltip";
import config from "@/components/atoms/d-tooltip/config";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { BASE_COLOR_SCHEME } from "@/components/atoms/d-tooltip/constant";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import {
  baseClassCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingClassesCase,
  roundingClassCase,
  sizeClassCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";

describe("DTooltip", () => {
  const wrapper = shallowMount(DTooltip);

  baseClassCase(wrapper, config.className);

  it("Should render props.target", async () => {
    const target = "simple string target";
    await wrapper.setProps({ target });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl).toBeTruthy();
    expect(targetEl.text()).toBe(target);
  });

  it("Should render props.target as HTML string", async () => {
    const target = `<div>HTML <b>string</b> target</div>`;
    await wrapper.setProps({ target, enableHtml: true });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl).toBeTruthy();
    expect(targetEl.html()).toContain(target);
  });

  it("Should render slots.target", async () => {
    const target = `<div>HTML <b>slot</b> target</div>`;
    const wrapper = shallowMount(DTooltip, {
      slots: {
        target,
      },
    });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl).toBeTruthy();
    expect(targetEl.html()).toContain(target);
  });

  it("Target element should have props.targetClass if passed", async () => {
    const targetClass = "someTargetClass";
    await wrapper.setProps({ targetClass });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl.classes()).toContain(targetClass);
  });

  it("Should render props.targetFont to the target font class", async () => {
    const targetFont = FONT.HUGE;
    await wrapper.setProps({ targetFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      targetFont
    );
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl.classes()).toContain(className);
  });

  it("Should render props.content", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.content as HTML string", () => {
    expect(false).toBeTruthy();
  });

  it("Should render slots.content", () => {
    expect(false).toBeTruthy();
  });

  it("Target element should have props.contentClass if passed", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.contentFont to the target font class", () => {
    expect(false).toBeTruthy();
  });

  /*
  it("Should render props.position to the container position class", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.offset to the content offset style", () => {
    expect(false).toBeTruthy();
  });

  it("Should show content on mouse enter", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on mouse leave", () => {
    expect(false).toBeTruthy();
  });

  it("Should show content on focusin", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on focusout", () => {
    expect(false).toBeTruthy();
  });

  it("Should toggle content on click", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on Escape button keyup", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.tabindex to the target attr", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.hasArrow to the container class", () => {
    expect(false).toBeTruthy();
  });

  it("Should emits change event on visibility change", () => {
    expect(false).toBeTruthy();
  });

  it("Should emits update:show event on visibility change", () => {
    expect(false).toBeTruthy();
  });

  it("Should call props.whenChange on visibility change", () => {
    expect(false).toBeTruthy();
  });

  fontSizeClassCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  outlineClassCase(
    wrapper,
    wrapper.find(`.${config.targetClassName}`),
    BASE_COLOR_SCHEME,
    SIZE.TINY
  );

  paddingClassesCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  roundingClassCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  sizeClassCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  transitionClassCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  tagCase(wrapper);*/
});
