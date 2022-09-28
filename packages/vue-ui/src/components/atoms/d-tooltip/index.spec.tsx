import { shallowMount } from "@vue/test-utils";
import DTooltip from "@/components/atoms/d-tooltip";
import config from "@/components/atoms/d-tooltip/config";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import {
  BASE_COLOR_SCHEME,
  TRIGGER,
} from "@/components/atoms/d-tooltip/constant";
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

  fontSizeClassCase(wrapper, wrapper.find(`.${config.contentClassName}`));

  it("Should render props.target", async () => {
    const target = "simple string target";
    await wrapper.setProps({ target });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl).toBeTruthy();
    expect(targetEl.text()).toBe(target);
  });

  it("Should render props.target as HTML string if props.enableHtml is true", async () => {
    const target = `<div>HTML <b>string</b> target</div>`;
    await wrapper.setProps({ target, enableHtml: true });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl).toBeTruthy();
    expect(targetEl.html()).toContain(target);
  });

  it("Should render slots.target", async () => {
    const target = `<div>HTML <b>slot</b> target</div>`;
    const wrapper = await shallowMount(DTooltip, {
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

  it("Should render props.content", async () => {
    const content = "simple string content";
    await wrapper.setProps({ content });
    const contentEl = wrapper.find(`.${config.contentClassName}`);

    expect(contentEl).toBeTruthy();
    expect(contentEl.text()).toBe(content);
  });

  it("Should render props.content as HTML string if props.enableHtml is true", async () => {
    const content = `<div>HTML <b>string</b> content</div>`;
    await wrapper.setProps({ content, enableHtml: true });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl).toBeTruthy();
    expect(contentEl.html()).toContain(content);
  });

  it("Should render slots.content", async () => {
    const content = `<div>HTML <b>slot</b> content</div>`;
    const wrapper = await shallowMount(DTooltip, {
      slots: {
        content,
      },
    });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl).toBeTruthy();
    expect(contentEl.html()).toContain(content);
  });

  it("Target element should have props.contentClass if passed", async () => {
    const contentClass = "someTargetClass";
    await wrapper.setProps({ contentClass });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(contentClass);
  });

  it("Should render props.contentFont to the target font class", async () => {
    const contentFont = FONT.HUGE;
    await wrapper.setProps({ contentFont });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      contentFont
    );
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(className);
  });

  // TODO: emulate window size and process.browser
  /*  it("Should render props.position to the container position class", async () => {
    const position = POSITION.BOTTOM_RIGHT;
    await wrapper.setProps({ position });
    expect(wrapper.classes()).toContain(".bottom"); // TODO: avoid hardcode
    expect(wrapper.classes()).toContain(".right"); // TODO: avoid hardcode
  });*/

  it("Should render props.offset to the content offset style", async () => {
    const offset = [10, 12];
    await wrapper.setProps({ offset });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.attributes("style")).toBe(
      `margin: ${offset[0]}px ${offset[1]}px;`
    );
  });

  it("Shouldn't render the content offset style if props.offset if [0, 0] ", async () => {
    const offset = [0, 0];
    await wrapper.setProps({ offset });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.attributes("style")).toBeFalsy();
  });

  it("Should render props.tabindex to the target attr", async () => {
    const tabindex = 11;
    await wrapper.setProps({ tabindex });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    expect(targetEl.attributes("tabindex")).toBe(String(tabindex));
  });

  it("Should render the container class if props.hasArrow is true", async () => {
    await wrapper.setProps({ hasArrow: true });
    expect(wrapper.classes()).toContain("hasArrow"); // TODO: avoid hardcode
  });

  it("Shouldn't render the container class if props.hasArrow is false", async () => {
    await wrapper.setProps({ hasArrow: false });
    expect(wrapper.classes()).not.toContain("hasArrow"); // TODO: avoid hardcode
  });

  it("Should add isShown class to the container on mouse enter if props.trigger is 'hover'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.HOVER });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("mouseenter");
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should remove isShown class from the container on mouse leave if props.trigger is 'hover'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.HOVER });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("mouseleave");
    expect(wrapper.classes()).not.toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should add isShown class to the container on focusin if props.trigger is 'hover'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.HOVER });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("focusin");
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should remove isShown class from the container on focusout if props.trigger is 'hover'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.HOVER });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("focusout");
    expect(wrapper.classes()).not.toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should toggle isShown class on the container on mouse click if props.trigger is 'click'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.CLICK });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("click");
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
    await targetEl.trigger("click");
    expect(wrapper.classes()).not.toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should add isShown class to the container on Enter keyup if props.trigger is 'click'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.CLICK });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("keyup", { key: "Enter" });
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should add isShown class to the container on Space keyup if props.trigger is 'click'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.CLICK });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("keyup", { key: " " });
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should remove isShown class from the container on Escape keyup if props.trigger is 'click'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.CLICK });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("click");
    await targetEl.trigger("keyup", { key: "Escape" });
    expect(wrapper.classes()).not.toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should toggle isShown class on the container on props.forceShow if props.trigger is 'manual'", async () => {
    await wrapper.setProps({ trigger: TRIGGER.MANUAL, forceShow: true });
    expect(wrapper.classes()).toContain("isShown"); // TODO: avoid hardcode
    await wrapper.setProps({ trigger: TRIGGER.MANUAL, forceShow: false });
    expect(wrapper.classes()).not.toContain("isShown"); // TODO: avoid hardcode
  });

  it("Should emit change, update:show events and call props.whenChange on visibility change", async () => {
    const whenChange = jest.fn();
    const wrapper = shallowMount(DTooltip, {
      props: { trigger: TRIGGER.CLICK, whenChange },
    });
    const targetEl = wrapper.find(`.${config.targetClassName}`);
    await targetEl.trigger("click");
    expect(wrapper.emitted("change")?.[0]).toEqual([true]);
    expect(wrapper.emitted("update:show")?.[0]).toEqual([true]);
    expect(whenChange).toBeCalledWith(true);
    await targetEl.trigger("click");
    expect(wrapper.emitted("change")?.[1]).toEqual([false]);
    expect(wrapper.emitted("update:show")?.[1]).toEqual([false]);
    expect(whenChange).toBeCalledWith(false);
  });

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

  tagCase(wrapper);
});
