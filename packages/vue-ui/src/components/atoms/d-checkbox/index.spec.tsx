import { shallowMount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/d-checkbox";
import config from "@/components/atoms/d-checkbox/config";
import { BASE_COLOR_SCHEME } from "@/components/atoms/d-checkbox/constants";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
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
  disabledAttrCase,
  disabledClassCase,
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
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";

describe("DCheckbox", () => {
  const wrapper = shallowMount(DCheckbox, {
    props: { checked: true },
  });

  baseClassCase(wrapper, config.className);

  it("Should render input element with checkbox type", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().type).toBe("checkbox");
  });

  inputValueCase(wrapper);

  inputClassCase(wrapper);

  inputAttrsCase(wrapper);

  minControlWidthCase(wrapper);

  defaultCheckMarkCase(wrapper, config);

  iconSlotCase(DCheckbox, config);

  // TODO: make check target class ??
  it("Icon container classes should contain props.iconContainerClass if passed", async () => {
    const iconContainerClass = "iconContainerCustomClass";
    await wrapper.setProps({ iconContainerClass });
    const iconContainerEl = wrapper.find(`.${config.iconContainerClassName}`);
    expect(iconContainerEl.classes()).toContain(iconContainerClass);
  });

  // TODO: make check target class ??
  it("Icon container classes should contain colorSchemeStyles.__disabled if props.disabled passed", async () => {
    await wrapper.setProps({ disabled: true });
    const iconContainerEl = wrapper.find(`.${config.iconContainerClassName}`);
    expect(iconContainerEl.classes()).toContain(colorSchemeStyles.__disabled);
  });

  labelClassCase(wrapper);
  labelFontCase(wrapper);
  propStringCase(wrapper, `.${config.labelInnerClassName}`, "label");
  propVNodeCase(wrapper, `.${config.labelInnerClassName}`, "label");
  slotCase(DCheckbox, `.${config.labelInnerClassName}`, "label");

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

  roundingClassCase(wrapper, `.${config.iconContainerClassName}`);

  sizeClassCase(wrapper, "input");
  sizeClassCase(wrapper, `.${config.iconContainerClassName}`);
  sizeClassCase(wrapper, `.${config.iconContainerBackdropClassName}`);
  transitionClassCase(wrapper, `.${config.iconContainerClassName}`);

  propStringCase(wrapper, `.${config.errorClassName}`, "error");
  propVNodeCase(wrapper, `.${config.errorClassName}`, "error");
  slotCase(DCheckbox, `.${config.errorClassName}`, "error");
  errorClassCase(wrapper, `.${config.errorClassName}`);
  errorFontCase(wrapper, `.${config.errorClassName}`);

  it("Should emit onChange event with checked and value payload", async () => {
    const value = "some value";
    const checked = true;
    const wrapper = shallowMount(DCheckbox, { props: { value, checked } });
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
    const checked = true;
    const disabled = true;
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, disabled },
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
    const checked = true;
    const whenChange = jest.fn();
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, whenChange },
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
    const checked = true;
    const disabled = true;
    const whenChange = jest.fn();
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, disabled, whenChange },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("change");

    expect(whenChange).toHaveBeenCalledTimes(0);
  });

  it("Should emit onInput event with value payload", async () => {
    const value = "some value";
    const checked = true;
    const disabled = false;
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, disabled },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toStrictEqual([
      !checked ? value : undefined,
    ]);
    expect(wrapper.emitted("update:value")?.[0]?.[0]).toStrictEqual(
      !checked ? value : undefined
    );
  });

  it("Shouldn't emit onInput if props.disabled is passed", async () => {
    const value = "some value";
    const checked = true;
    const disabled = true;
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, disabled },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(wrapper.emitted("input")?.[0]).toBeFalsy();
    expect(wrapper.emitted("update:value")?.[0]).toBeFalsy();
  });

  it("Should call passed props.whenInput", async () => {
    const value = "some value";
    const checked = true;
    const whenInput = jest.fn();
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, whenInput },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledWith(!checked ? value : undefined);
  });

  it("Shouldn't call passed props.whenInput if props.disabled passed", async () => {
    const value = "some value";
    const checked = true;
    const disabled = true;
    const whenInput = jest.fn();
    const wrapper = shallowMount(DCheckbox, {
      props: { value, checked, disabled, whenInput },
    });
    const inputEl = wrapper.find("input");
    await inputEl.trigger("click");
    await inputEl.trigger("input");

    expect(whenInput).toHaveBeenCalledTimes(0);
  });

  tagCase(wrapper);
});
