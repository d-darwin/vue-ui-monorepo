import { shallowMount } from "@vue/test-utils";
import DTooltip from "@/components/atoms/d-tooltip";
import config from "@/components/atoms/d-tooltip/config";
import {
  baseClassCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingClassesCase,
  roundingClassCase,
  sizeClassCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { BASE_COLOR_SCHEME } from "@/components/atoms/d-tooltip/constant";

describe("DTooltip", () => {
  const wrapper = shallowMount(DTooltip);

  baseClassCase(wrapper, config.className);

  it("Should render props.target", () => {
    console.log(wrapper.html());
    expect(false).toBeTruthy();
  });

  it("Should render props.target as HTML string", () => {
    expect(false).toBeTruthy();
  });

  it("Should render slots.target", () => {
    expect(false).toBeTruthy();
  });

  it("Target element should has props.targetClass if passed", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.targetFont to the target font class", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.content", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.content as HTML string", () => {
    expect(false).toBeTruthy();
  });

  it("Should render slots.content", () => {
    expect(false).toBeTruthy();
  });

  it("Target element should has props.contentClass if passed", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.contentFont to the target font class", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.position to the container position class", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.offset to the content offset style", () => {
    expect(false).toBeTruthy();
  });

  it("Should show content on mouse enter", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on mouse leave", () => {
    expect(false).toBeTruthy();
  });

  it("Should show content on focusin", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on focusout", () => {
    expect(false).toBeTruthy();
  });

  it("Should toggle content on click", () => {
    expect(false).toBeTruthy();
  });

  it("Should hide content on Escape button keyup", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.tabindex to the target attr", () => {
    expect(false).toBeTruthy();
  });

  it("Should render props.hasArrow to the container class", () => {
    expect(false).toBeTruthy();
  });

  it("Should emits change event on visibility change", () => {
    expect(false).toBeTruthy();
  });

  it("Should emits update:show event on visibility change", () => {
    expect(false).toBeTruthy();
  });

  it("Should call props.whenChange on visibility change", () => {
    expect(false).toBeTruthy();
  });

  fontSizeClassCase(wrapper, wrapper.find(config.contentClassName));

  outlineClassCase(
    wrapper,
    wrapper.find(config.targetClassName),
    BASE_COLOR_SCHEME,
    SIZE.TINY
  );

  paddingClassesCase(wrapper, wrapper.find(config.contentClassName));

  roundingClassCase(wrapper, wrapper.find(config.contentClassName));

  sizeClassCase(wrapper, wrapper.find(config.contentClassName));

  transitionClassCase(wrapper, wrapper.find(config.contentClassName));

  tagCase(wrapper);
});
