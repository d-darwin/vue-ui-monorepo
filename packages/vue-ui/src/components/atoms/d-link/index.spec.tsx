import { shallowMount } from "@vue/test-utils";
import DLink from "@/components/atoms/d-link";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import {
  baseClassCase,
  callWhenClickCase,
  dontCallWhenClickCase,
  dontEmitClickEventCase,
  emitClickEventCase,
  outlineClassCase,
  preventDefaultCase,
  labelStringCase,
  contentHtmlCase,
  routerLinkComponentCase,
  slotDefaultCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DLink", () => {
  const wrapper = shallowMount(DLink);

  baseClassCase(wrapper, config.className);

  labelStringCase(wrapper, "a");

  contentHtmlCase(wrapper);

  slotDefaultCase(DLink);

  it("Renders font class name", async () => {
    const font = FONT.SMALL;
    await wrapper.setProps({ font });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );
    expect(wrapper.classes()).toContain(className);
  });

  outlineClassCase(
    wrapper,
    `.${config.className}`,
    COLOR_SCHEME.PRIMARY,
    SIZE.MEDIUM
  );

  transitionClassCase(wrapper, `.${config.className}`);

  it("Renders as 'button' html tag by default", () => {
    expect(wrapper.element.tagName).toEqual("A");
  });

  routerLinkComponentCase(wrapper);

  dontEmitClickEventCase(wrapper);

  emitClickEventCase(wrapper);

  dontCallWhenClickCase(wrapper);

  callWhenClickCase(wrapper);

  preventDefaultCase(wrapper);

  it("Renders __disabled class if prop.disabled is passed", async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).toContain("__disabled");
  });
});
