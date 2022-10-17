import { mount } from "@vue/test-utils";
import {
  baseClassCase,
  outlineClassCase,
  paddingClassesCase,
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

  const fontClassName = prepareCssClassName(
    codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
    FONT.MEDIUM
  );
  baseClassCase(wrapper, fontClassName);

  outlineClassCase(wrapper, wrapper, COLOR_SCHEME.PRIMARY, SIZE.MEDIUM);

  paddingClassesCase(wrapper, wrapper);

  transitionClassCase(wrapper, wrapper);
  // TODO: bindings
  it("Should ....", () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.content
  // TODO: slots.default
  // TODO: props.active
  // TODO: props.id
  // TODO: props.tabId
  // TODO: props.tag
  // TODO: props.enableHtml
});
