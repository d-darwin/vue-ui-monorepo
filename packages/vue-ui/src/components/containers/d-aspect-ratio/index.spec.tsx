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

  slotDefaultCase(DAspectRatio);

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

  it("Formatted aspect-ratio of 0.33 is '0.33'", async () => {
    await wrapper.setProps({ aspectRatio: 0.33 });
    expect(wrapper.vm.formattedAspectRatio).toBe("0.33");
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

  it("Padding-bottom for 0.8 is '125%'", async () => {
    await wrapper.setProps({ aspectRatio: 0.8 });
    expect(wrapper.vm.paddingBottom).toBe("125%");
  });

  it("Padding-bottom for '3 /5' is '166.66666666666666%'", async () => {
    await wrapper.setProps({ aspectRatio: "3 /5" });
    expect(wrapper.vm.paddingBottom).toBe("166.66666666666666%");
  });

  it("Padding-bottom for '4: 1' is '25%'", async () => {
    await wrapper.setProps({ aspectRatio: "4: 1" });
    expect(wrapper.vm.paddingBottom).toBe("25%");
  });

  it("Padding-bottom for 'wrong-string' is '100%'", async () => {
    await wrapper.setProps({ aspectRatio: "wrong-string" });
    expect(wrapper.vm.paddingBottom).toBe("100%");
  });

  it("Generates aspect-ratio style if it is supported", async () => {
    // NB: by default it supported, see jest.globals.js
    await wrapper.setProps({ aspectRatio: 0.5 });
    expect(JSON.stringify(wrapper.vm.style)).toBe(
      JSON.stringify({ "aspect-ratio": "0.5" })
    );
  });

  it("Generates padding-bottom style if aspect-ratio is NOT supported", async () => {
    // TODO: try to do this in a more accurate way
    Object.defineProperty(wrapper.vm, "hasAspectRationNativeSupport", {
      writable: true,
      value: false,
    });
    await wrapper.setProps({ aspectRatio: 0.8 });
    expect(JSON.stringify(wrapper.vm.style)).toBe(
      JSON.stringify({ "padding-bottom": "125%" })
    );
  });

  it("Renders additional inner div if aspect-ratio is NOT supported", () => {
    const innerElement = wrapper.find(".dAspectRatioInner");
    expect(innerElement).toBeTruthy();
  });

  it("Renders props.tag when passed", async () => {
    const tag = "picture";
    await wrapper.setProps({ tag });
    expect(wrapper.element.tagName).toEqual(tag.toLocaleUpperCase());
  });
});
