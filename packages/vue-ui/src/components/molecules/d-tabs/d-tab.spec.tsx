import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  propVNodeCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingEqualClassesCase,
  propStringCase,
  sizeClassCase,
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { DTab } from "./index";
import config from "./config";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTab", () => {
  const wrapper = mount(DTab);

  baseClassCase(wrapper, config.tabOptions.class);

  it("Should render 'tab' role attr", () => {
    expect(wrapper.attributes("role")).toBe("tab");
  });

  it("Should render props.id to the attrs", async () => {
    const id = "some-id";
    await wrapper.setProps({ id });
    expect(wrapper.attributes("id")).toBe(id);
  });

  it("Should render 'aria-controls' attr eq to props.tabpanelId", async () => {
    const tabpanelId = "some-tabpanel-id";
    await wrapper.setProps({ tabpanelId });
    expect(wrapper.attributes("aria-controls")).toBe(tabpanelId);
  });

  it("Should render props.active === true to appropriate aria, tabindex attrs and class", async () => {
    await wrapper.setProps({ active: true });
    expect(wrapper.attributes("tabindex")).toBe("0");
    expect(wrapper.attributes("aria-selected")).toBe("true");
    expect(wrapper.classes()).toContain("active");
  });

  it("Should render props.active === false to appropriate aria, tabindex attrs and class", async () => {
    await wrapper.setProps({ active: false });
    expect(wrapper.attributes("tabindex")).toBe("-1");
    expect(wrapper.attributes("aria-selected")).toBeFalsy();
    expect(wrapper.classes()).not.toContain("active");
  });

  propStringCase(wrapper, `.${config.tabOptions.class}`);
  propVNodeCase(wrapper, `.${config.tabOptions.class}`);
  slotCase(DTab, `.${config.tabOptions.class}`);

  fontSizeClassCase(wrapper, `.${config.tabOptions.class}`);

  outlineClassCase(
    wrapper,
    `.${config.tabOptions.class}`,
    COLOR_SCHEME.PRIMARY,
    SIZE.MEDIUM
  );

  paddingEqualClassesCase(wrapper, `.${config.tabOptions.class}`);

  sizeClassCase(wrapper, `.${config.tabOptions.class}`);

  transitionClassCase(wrapper, `.${config.tabOptions.class}`);

  it("Should render disabled class if props.disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).toContain("disabled");
  });

  it("Shouldn't render disabled class if props.disabled is false", async () => {
    await wrapper.setProps({ disabled: false });
    expect(wrapper.classes()).not.toContain("disabled");
  });

  tagCase(wrapper);

  it("Shouldn't emit click event if props.disabled is true", async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it("Should emit click event if props.disabled is false", async () => {
    await wrapper.setProps({ disabled: false });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("Shouldn't call props.whenClick if props.disabled is true", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ disabled: true, whenClick });
    await wrapper.trigger("click");
    expect(whenClick).toHaveBeenCalledTimes(0);
  });

  it("Should call props.whenClick if props.disabled is false", async () => {
    const whenClick = jest.fn();
    await wrapper.setProps({ disabled: false, whenClick });
    await wrapper.trigger("click");
    expect(whenClick).toHaveBeenCalledTimes(1);
  });
});
