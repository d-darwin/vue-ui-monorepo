import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  propVNodeCase,
  outlineClassCase,
  paddingEqualClassesCase,
  propStringCase,
  slotCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { DTabpanel } from "./index";
import config from "./config";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";

// TODO: move to the config
jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabpanel", () => {
  const wrapper = mount(DTabpanel);

  baseClassCase(wrapper, config.tabpanelClass);

  it("Should render 'tabpanel' role attr", () => {
    expect(wrapper.attributes("role")).toBe("tabpanel");
  });

  it("Should render 'tabindex' attr eq to '0'", () => {
    expect(wrapper.attributes("tabindex")).toBe("0");
  });

  it("Should render props.id to the attrs", async () => {
    const id = "some-id";
    await wrapper.setProps({ id });
    expect(wrapper.attributes("id")).toBe(id);
  });

  it("Should render 'aria-labelledby' attr eq to props.tabId", async () => {
    const tabId = "some-tab-id";
    await wrapper.setProps({ tabId });
    expect(wrapper.attributes("aria-labelledby")).toBe(tabId);
  });

  it("Should render props.active === true to appropriate aria and hidden attrs", async () => {
    await wrapper.setProps({ active: true });
    expect(wrapper.attributes("aria-expanded")).toBe("true");
    expect(wrapper.attributes("aria-hidden")).toBeFalsy();
    expect(wrapper.attributes("hidden")).toBeFalsy();
  });

  it("Should render props.active === false/undefined to appropriate aria and hidden attrs", async () => {
    await wrapper.setProps({ active: false });
    expect(wrapper.attributes("aria-expanded")).toBeFalsy();
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.attributes("hidden")).toBe("");
  });

  propStringCase(wrapper, `.${config.tabpanelClass}`);
  propVNodeCase(wrapper, `.${config.tabpanelClass}`);
  slotCase(DTabpanel, `.${config.tabpanelClass}`);

  const fontClassName = prepareCssClassName(
    codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
    FONT.MEDIUM
  );
  baseClassCase(wrapper, fontClassName);

  outlineClassCase(
    wrapper,
    `.${config.tabpanelClass}`,
    COLOR_SCHEME.PRIMARY,
    SIZE.MEDIUM
  );

  paddingEqualClassesCase(wrapper, `.${config.tabpanelClass}`);

  transitionClassCase(wrapper, `.${config.tabpanelClass}`);

  tagCase(wrapper);
});
