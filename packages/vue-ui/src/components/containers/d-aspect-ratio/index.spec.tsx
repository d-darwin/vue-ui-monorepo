import { shallowMount } from "@vue/test-utils";
import DAspectRatio from "@/components/containers/d-aspect-ratio/index";
import {
  baseClassCase,
  propHtmlCase,
  slotDefaultCase,
} from "@/utils/test-case-factories";

describe("DTypography", () => {
  const wrapper = shallowMount(DAspectRatio);

  propHtmlCase(wrapper);

  slotDefaultCase(wrapper);

  baseClassCase(wrapper, "dAspectRatio");

  const aspectRatioValidator = DAspectRatio.props.aspectRatio.validator;

  it("Validator pass prop.aspectRatio = 0.66", () => {
    expect(aspectRatioValidator(0.66)).toBe(true);
  });

  it("Validator passes prop.aspectRatio = 3 / 2", () => {
    expect(aspectRatioValidator("2 / 3")).toBe(true);
  });

  it("Validator passes prop.aspectRatio = 2 : 1", () => {
    expect(aspectRatioValidator("2 : 1")).toBe(true);
  });

  it("Validator rejects prop.aspectRatio = 0. 66", () => {
    expect(aspectRatioValidator("0. 66")).toBe(false);
  });

  it("Validator rejects prop.aspectRatio = 3 \\ 2", () => {
    expect(aspectRatioValidator("2 \\ 3")).toBe(false);
  });

  it("Validator rejects prop.aspectRatio = 2 : 1", () => {
    expect(aspectRatioValidator("2 ; 1")).toBe(false);
  });

  // TODO: tag
  it("Renders props.tag when passed", async () => {
    const tag = "picture";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
  // TODO: padding branch ???
});
