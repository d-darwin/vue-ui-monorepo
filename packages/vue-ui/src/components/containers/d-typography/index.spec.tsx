import { shallowMount } from "@vue/test-utils";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DTypography from "@/components/containers/d-typography";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import {
  baseClassCase,
  propStringCase,
  propVNodeCase,
  slotCase,
  tagCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DTypography", () => {
  const wrapper = shallowMount(DTypography);

  baseClassCase(wrapper, config.className);

  propStringCase(wrapper, `.${config.className}`);
  propVNodeCase(wrapper, `.${config.className}`);
  slotCase(DTypography, `.${config.className}`);

  // TODO: classes are not rendered in jest ???
  it("Renders props.font to font class when passed", async () => {
    const font = FONT.HUGE;
    await wrapper.setProps({ font }); // TODO: why it doesn't work with composition api ???
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );
    expect(wrapper.classes()).toContain(className);
  });

  tagCase(wrapper);
});
