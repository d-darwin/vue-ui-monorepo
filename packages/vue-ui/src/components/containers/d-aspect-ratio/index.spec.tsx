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

  it("Formatted aspect-ratio of 0.66 is '0.66'", async () => {
    await wrapper.setProps({ aspectRatio: 0.66 });
    expect(wrapper.vm.formattedAspectRatio).toBe("0.66");
  });

  it("Formatted aspect-ratio of '3 /5' is '3 / 5'", async () => {
    await wrapper.setProps({ aspectRatio: "3 /5" });
    expect(wrapper.vm.formattedAspectRatio).toBe("3 / 5");
  });

  it("Formatted aspect-ratio of '4: 1' is '4 / 1'", async () => {
    await wrapper.setProps({ aspectRatio: "4: 1" });
    expect(wrapper.vm.formattedAspectRatio).toBe("4 / 1");
  });

  it("Formatted aspect-ratio of 'wrong-string' is '1 / 1'", async () => {
    await wrapper.setProps({ aspectRatio: "wrong-string" });
    expect(wrapper.vm.formattedAspectRatio).toBe("1 / 1");
  });

  // TODO: tag
  it("Renders props.tag when passed", async () => {
    const tag = "picture";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
  // TODO: padding branch ???
});
