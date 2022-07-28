import { shallowMount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/d-checkbox";
import config from "@/components/atoms/d-checkbox/config";
import { baseClassCase } from "@/utils/test-case-factories";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";

describe("DCheckbox", () => {
  const wrapper = shallowMount(DCheckbox);

  baseClassCase(wrapper, config.className);

  it("Should render input element with checkbox type", () => {
    expect(false).toBeTruthy();
  });

  // TODO: make factory
  it("Input element's value attr should contain props.value", async () => {
    const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);
  });

  // TODO: inputClass

  it("Should render props.inputAttrs to the input element attributes", async () => {
    const inputAttrs = { readonly: true };
    await wrapper.setProps({ inputAttrs });
    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().readonly).toBe("");
  });

  it("Should render props.size to the container minControlWidth class", async () => {
    const size = SIZE.LARGE;
    await wrapper.setProps({ size });
    const minControlWidthClassName = prepareCssClassName(
      codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_PREFIX,
      `${size}-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}`
    );
    expect(wrapper.classes()).toContain(minControlWidthClassName);
  });

  it("Should render label element with props.label content", () => {
    expect(false).toBeTruthy();
  });

  it("Should render label element with props.label content", () => {
    expect(false).toBeTruthy();
  });
});
