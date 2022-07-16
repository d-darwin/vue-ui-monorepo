import { shallowMount } from "@vue/test-utils";
import DAspectRatio from "@/components/containers/d-aspect-ratio/index";
import {
  baseClassCase,
  propHtmlCase,
  slotDefaultCase,
} from "@/utils/test-case-factories";
import config from "./config";

describe("DTypography", () => {
  // NB: by jest.config all CSS properties are supported, see jest.globals.js
  const wrapperWithFullCSSSupport = shallowMount(DAspectRatio);
  window.CSS.supports = () => false;
  const wrapperWithoutCSSSupport = shallowMount(DAspectRatio);

  baseClassCase(wrapperWithFullCSSSupport, config.className);

  propHtmlCase(wrapperWithFullCSSSupport);

  slotDefaultCase(DAspectRatio);

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
    await wrapperWithFullCSSSupport.setProps({ aspectRatio: 0.33 });
    expect(wrapperWithFullCSSSupport.vm.formattedAspectRatio).toBe("0.33");
  });

  it("Formatted aspect-ratio of '3 /5' is '3 / 5'", async () => {
    await wrapperWithFullCSSSupport.setProps({ aspectRatio: "3 /5" });
    expect(wrapperWithFullCSSSupport.vm.formattedAspectRatio).toBe("3 / 5");
  });

  it("Formatted aspect-ratio of '4: 1' is '4 / 1'", async () => {
    await wrapperWithFullCSSSupport.setProps({ aspectRatio: "4: 1" });
    expect(wrapperWithFullCSSSupport.vm.formattedAspectRatio).toBe("4 / 1");
  });

  it("Formatted aspect-ratio of 'wrong-string' is '1 / 1'", async () => {
    await wrapperWithFullCSSSupport.setProps({
      aspectRatio: "wrong-string",
    });
    expect(wrapperWithFullCSSSupport.vm.formattedAspectRatio).toBe("1 / 1");
  });

  it("Formatted aspect-ratio of 0 is 1", async () => {
    await wrapperWithFullCSSSupport.setProps({
      aspectRatio: 0,
    });
    expect(wrapperWithFullCSSSupport.vm.formattedAspectRatio).toBe("1");
  });

  it("Padding-bottom for 0.8 is '125%'", async () => {
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: 0.8 });
    expect(wrapperWithoutCSSSupport.vm.paddingBottom).toBe("125%");
  });

  it("Padding-bottom for '3 /5' is '166.66666666666666%'", async () => {
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: "3 /5" });
    expect(wrapperWithoutCSSSupport.vm.paddingBottom).toBe(
      "166.66666666666666%"
    );
  });

  it("Padding-bottom for '4: 1' is '25%'", async () => {
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: "4: 1" });
    expect(wrapperWithoutCSSSupport.vm.paddingBottom).toBe("25%");
  });

  it("Padding-bottom for 0 is '100%'", async () => {
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: 0 });
    expect(wrapperWithoutCSSSupport.vm.paddingBottom).toBe("100%");
  });

  it("Padding-bottom for 'wrong-string' is '100%'", async () => {
    await wrapperWithoutCSSSupport.setProps({
      aspectRatio: "wrong-string",
    });
    expect(wrapperWithoutCSSSupport.vm.paddingBottom).toBe("100%");
  });

  it("Generates aspect-ratio style if it is supported", async () => {
    await wrapperWithFullCSSSupport.setProps({ aspectRatio: 0.5 });
    expect(JSON.stringify(wrapperWithFullCSSSupport.vm.style)).toBe(
      JSON.stringify({ "aspect-ratio": "0.5" })
    );
  });

  it("Generates padding-bottom style if aspect-ratio is NOT supported", async () => {
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: 0.8 });
    expect(JSON.stringify(wrapperWithoutCSSSupport.vm.style)).toBe(
      JSON.stringify({ "padding-bottom": "125%" })
    );
  });

  it("Renders additional inner div if aspect-ratio is NOT supported", () => {
    const innerElement = wrapperWithFullCSSSupport.find(
      `.${config.innerClassName}`
    );
    expect(innerElement).toBeTruthy();
  });

  it("Renders props.html if aspect-ratio is NOT supported", async () => {
    const html = "Some <b>html</b> content";
    await wrapperWithoutCSSSupport.setProps({ aspectRatio: 1, html });
    expect(wrapperWithoutCSSSupport.html()).toMatch(html);
  });

  it("Renders props.tag when passed", async () => {
    const tag = "picture";
    await wrapperWithFullCSSSupport.setProps({ tag });
    expect(wrapperWithFullCSSSupport.element.tagName).toEqual(
      tag.toLocaleUpperCase()
    );
  });
});
