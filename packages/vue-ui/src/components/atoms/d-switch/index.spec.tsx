import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  colorSchemeClassCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  inputClassCase,
  labelFontCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import DSwitch from "@/components/atoms/d-switch/index";
import DCaption from "@/components/atoms/d-caption";
import styles from "@/components/atoms/d-switch/index.css?module";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import config from "@/components/atoms/d-switch/config";
import { DOMWrapper } from "@vue/test-utils/dist/domWrapper";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { sleep } from "@/utils/sleep";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";

describe("DSwitch", () => {
  const wrapper = mount(DSwitch, {
    props: { caption: "Not empty" },
  });

  baseClassCase(wrapper, config.className);

  it("Should render input element with checkbox type", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().type).toBe("checkbox");
  });

  it("Should render input element with switch role", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().role).toBe("switch");
  });

  controlIdPresenceCase(wrapper);

  controlIdAutogeneratedCase(wrapper);

  it("Should render checked attr if props.checked is true", async () => {
    await wrapper.setProps({ checked: true });
    const inputEl = wrapper.find("input") as DOMWrapper<HTMLInputElement>;
    expect(inputEl.element.checked).toBeTruthy();
  });

  it("Shouldn't render checked attr if props.checked is falsy", async () => {
    await wrapper.setProps({ checked: false });
    const inputEl = wrapper.find("input");
    expect(inputEl.element.checked).toBeFalsy();
  });

  it("Shouldn render value attr if props.values.truthy is presented", async () => {
    const valueTruthy = "custom truthy value";
    await wrapper.setProps({
      values: {
        truthy: valueTruthy,
      },
    });
    const inputEl = wrapper.find("input");
    expect(inputEl.element.value).toBe(valueTruthy);
  });

  it("Shouldn render .label if props.labels.falsy is presented", async () => {
    const labelFalsy = "falsy label";
    await wrapper.setProps({
      labels: {
        falsy: labelFalsy,
      },
    });
    const labelFalsyEl = wrapper.find(`.${config.labelClassName}`);
    expect(labelFalsyEl.text()).toBe(labelFalsy);
  });

  slotCase(DSwitch, `.${config.labelClassName}`, "labelFalsy");

  it("Shouldn render .label if props.labels.truthy is presented", async () => {
    const labelTruthy = "falsy label";
    await wrapper.setProps({
      labels: {
        truthy: labelTruthy,
      },
    });
    const labelTruthyEl = wrapper.find(`.${config.labelClassName}`);
    expect(labelTruthyEl.text()).toBe(labelTruthy);
  });

  slotCase(DSwitch, `.${config.labelClassName}`, "labelTruthy");

  labelFontCase(wrapper, `.${config.labelClassName}`);

  it("Should render props.labels content as HTML", async () => {
    const labelFalsy = <b>Label falsy</b>;
    const labelTruthy = <b>Label truthy</b>;
    const labelFalsyHtml = `${labelFalsy}`;
    const labelTruthyHtml = `${labelTruthy}`;
    await wrapper.setProps({
      labels: {
        falsy: labelFalsyHtml,
        truthy: labelTruthyHtml,
      },
    });
    const labelFalsyEl = wrapper.find(`.${config.labelClassName}:nth-child(1)`);
    expect(labelFalsyEl.html()).toMatch(labelFalsyHtml);
    const labelTruthyEl = wrapper.find(
      `.${config.labelClassName}:nth-child(3)`
    );
    expect(labelTruthyEl.html()).toMatch(labelTruthyHtml);
  });

  inputClassCase(wrapper);

  it("Shouldn render props.font into font class for .label and .thumb elements", async () => {
    const labelFalsy = "Label falsy";
    const labelTruthy = "Label truthy";
    const font = FONT.MEDIUM;
    await wrapper.setProps({
      font,
      labels: {
        falsy: labelFalsy,
        truthy: labelTruthy,
      },
      labelFont: undefined,
    });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );

    const labelFalsyEl = wrapper.find(`.${config.labelClassName}:nth-child(1)`);
    expect(labelFalsyEl.classes()).toContain(className);
    const labelTruthyEl = wrapper.find(
      `.${config.labelClassName}:nth-child(3)`
    );
    expect(labelTruthyEl.classes()).toContain(className);
    const thumbEl = wrapper.find(`.${config.thumbClassName}`);
    expect(thumbEl.classes()).toContain(className);
  });

  colorSchemeClassCase(
    wrapper,
    `.${config.trackClassName}`,
    COLOR_SCHEME.DANGER
  );

  roundingClassCase(wrapper, `.${config.inputClassName}`);

  roundingClassCase(wrapper, `.${config.trackClassName}`);

  roundingClassCase(wrapper, `.${config.thumbClassName}`);

  sizeClassCase(wrapper, `.${config.trackClassName}`);

  sizeClassCase(wrapper, `.${config.thumbClassName}`);

  transitionClassCase(wrapper, `.${config.trackClassName}`);

  transitionClassCase(wrapper, `.${config.thumbClassName}`);

  transitionClassCase(wrapper, `.${config.thumbInnerClassName}`);

  // TODO: combine all Caption cases in one factory or just test composition???
  it("Shouldn render props.size into props.font of the DCaption", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size, caption: "Not empty" });

    await sleep(0); // Should wait next event loop step for asyncComponent to be imported
    const captionEl = wrapper.find(`.${config.captionClassName}`);
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      size
    );
    expect(captionEl.classes()).toContain(className);
  });
  it("Shouldn't render caption element if props.caption isn't passed", async () => {
    const wrapper = await mount(DSwitch);
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported
    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeFalsy();
  });
  it("Should render caption element with props.caption content if passed", async () => {
    const captionContent = "some caption";
    const caption = <div>{captionContent}</div>;
    const wrapper = await mount(DSwitch, { props: { caption } });
    await sleep(0); // Should wait next event loop step for asyncComponent to be imported

    const captionEl = wrapper.find(`.${config.captionClassName}`);
    expect(captionEl.exists()).toBeTruthy();
    expect(captionEl.text()).toBe(captionContent);
  });
  slotCase(DSwitch, `.${config.captionClassName}`, "caption");
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
    const wrapper = mount(DSwitch, {
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

  tagCase(wrapper);

  slotCase(DSwitch, `.${config.thumbClassName}`, "thumb");

  it("Shouldn render disabled attr for input element if props.disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    const inputEl = wrapper.find("input");
    expect(inputEl.element.disabled).toBeTruthy();
  });

  it("Shouldn't render disabled attr for input element if props.disabled is falsy", async () => {
    await wrapper.setProps({ disabled: false });
    const inputEl = wrapper.find("input");
    expect(inputEl.element.disabled).toBeFalsy();
  });

  it("Shouldn render aria-disabled attr for input element if props.disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes("aria-disabled")).toBeTruthy();
  });

  it("Shouldn't render aria-disabled attr for input element if props.disabled is falsy", async () => {
    await wrapper.setProps({ disabled: false });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes("aria-disabled")).toBeFalsy();
  });

  it("Shouldn render .__disabled class for .track and .label elements if props.disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    const trackEl = wrapper.find(`.${config.trackClassName}`);
    expect(trackEl.classes()).toContain(styles.__disabled);
    expect(trackEl.classes()).toContain(colorSchemeStyles.__disabled);
    const labelEl = wrapper.find(`.${config.labelClassName}`);
    expect(labelEl.classes()).toContain(styles.__disabled);
    expect(labelEl.classes()).toContain(colorSchemeStyles.__disabled);
  });

  it("Shouldn't render .__disabled class for .track and .label elements if props.disabled is false", async () => {
    await wrapper.setProps({ disabled: false });
    const trackEl = wrapper.find(`.${config.trackClassName}`);
    expect(trackEl.classes()).not.toContain(styles.__disabled);
    expect(trackEl.classes()).not.toContain(colorSchemeStyles.__disabled);
    const labelEl = wrapper.find(`.${config.labelClassName}`);
    expect(labelEl.classes()).not.toContain(styles.__disabled);
    expect(labelEl.classes()).not.toContain(colorSchemeStyles.__disabled);
  });

  it("Should emit onChange event with checked and value payload", async () => {
    let checked = false;
    const valueFalsy = "custom value falsy";
    const wrapper = await mount(DSwitch, {
      props: {
        checked,
        values: { falsy: valueFalsy },
      },
    });

    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");
    checked = !checked;

    expect(wrapper.emitted("change")?.[0]).toStrictEqual([checked, "on"]);
    expect(wrapper.emitted("update:checked")?.[0]).toStrictEqual([checked]);
    expect(wrapper.emitted("update:value")?.[0]).toStrictEqual(["on"]);

    await wrapper.setProps({ checked });
    await inputEl.trigger("click");
    await inputEl.trigger("change");
    checked = !checked;

    expect(wrapper.emitted("change")?.[1]).toStrictEqual([checked, valueFalsy]);
    expect(wrapper.emitted("update:checked")?.[1]).toStrictEqual([checked]);
    expect(wrapper.emitted("update:value")?.[1]).toStrictEqual([valueFalsy]);
  });

  it("Shouldn't emit onChange if props.disabled is true", async () => {
    const wrapper = await mount(DSwitch, {
      props: { disabled: true },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(wrapper.emitted("change")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:checked")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  it("Should call passed props.whenChange", async () => {
    let checked = false;
    const valueTruthy = "custom value truthy";
    const whenChange = jest.fn();
    const wrapper = await mount(DSwitch, {
      props: {
        checked,
        values: { truthy: valueTruthy },
        whenChange,
      },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");
    checked = !checked;

    expect(whenChange).toHaveBeenCalledWith(checked, valueTruthy);

    await wrapper.setProps({ checked });
    await inputEl.trigger("click");
    await inputEl.trigger("change");
    checked = !checked;

    expect(whenChange).toHaveBeenCalledWith(checked, undefined);
  });

  it("Shouldn't call passed props.whenChange if props.disabled is true", async () => {
    const whenChange = jest.fn();
    const wrapper = await mount(DSwitch, {
      props: {
        disabled: true,
        whenChange,
      },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");
    expect(whenChange).not.toHaveBeenCalled();
  });

  it("Should emit onInput event with value payload", async () => {
    const valueFalsy = "custom value falsy";
    const wrapper = await mount(DSwitch, {
      props: {
        checked: false,
        values: { falsy: valueFalsy },
      },
    });

    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toStrictEqual(["on"]);

    await wrapper.setProps({ checked: true });
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[1]).toStrictEqual([valueFalsy]);
  });

  it("Shouldn't emit onInput if props.disabled is passed", async () => {
    const wrapper = await mount(DSwitch, {
      props: { disabled: true },
    });

    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  it("Should call passed props.whenInput", async () => {
    const valueTruthy = "custom value truthy";
    const whenInput = jest.fn();
    const wrapper = await mount(DSwitch, {
      props: {
        checked: false,
        values: { truthy: valueTruthy },
        whenInput,
      },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledWith(valueTruthy);

    await wrapper.setProps({ checked: true });
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledWith(undefined);
  });

  it("Shouldn't call passed props.whenInput if props.disabled passed", async () => {
    const whenInput = jest.fn();
    const wrapper = await mount(DSwitch, {
      props: {
        disabled: true,
        whenInput,
      },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");
    expect(whenInput).not.toHaveBeenCalled();
  });

  // TODO: props. ...Options cases
});
