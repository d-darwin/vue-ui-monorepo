import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  contentHtmlCase,
  outlineClassCase,
  paddingClassesCase,
  propContentCase,
  slotDefaultCase,
  tagCase,
  transitionClassCase,
} from "@darwin-studio/vue-ui/src/utils/test-case-factories";
import { DTabpanel } from "./index";
import config from "./config";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabpanel", () => {
  const wrapper = mount(DTabpanel);

  baseClassCase(wrapper, config.tabpanelClassName);

  it("Should render 'tabindex' attr eq to '0'", () => {
    expect(wrapper.attributes("tabindex")).toBe("0");
  });

  it("Should render 'tabpanel' role attr", () => {
    expect(wrapper.attributes("role")).toBe("tabpanel");
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

  it("Should render props.id to the attrs", async () => {
    const id = "some-id";
    await wrapper.setProps({ id });
    expect(wrapper.attributes("id")).toBe(id);
  });

  const fontClassName = prepareCssClassName(
    codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
    FONT.MEDIUM
  );
  baseClassCase(wrapper, fontClassName);

  outlineClassCase(wrapper, wrapper, COLOR_SCHEME.PRIMARY, SIZE.MEDIUM);

  paddingClassesCase(wrapper, wrapper);

  transitionClassCase(wrapper, wrapper);

  propContentCase(wrapper);

  contentHtmlCase(wrapper);

  slotDefaultCase(DTabpanel);

  tagCase(wrapper);
});
