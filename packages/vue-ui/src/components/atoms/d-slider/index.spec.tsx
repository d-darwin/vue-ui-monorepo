import { shallowMount } from "@vue/test-utils";
import DSlider from "@darwin-studio/vue-ui/src/components/atoms/d-slider";
import {
  baseClassCase,
  colorSchemeClassCase,
  disabledAttrCase,
  fontSizeClassCase,
  minControlWidthCase,
  outlineClassCase,
  roundingClassCase,
  sizeClassCase,
  tagCase,
  transitionClassCase,
} from "@darwin-studio/vue-ui/src/utils/test-case-factories";
import config from "./config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";

describe("DSlider", () => {
  const wrapper = shallowMount(DSlider);

  baseClassCase(wrapper, config.className);

  it("Should render props.id ...", async () => {
    expect(true).toBeFalsy();
  });

  it("Should render props.value ...", async () => {
    expect(true).toBeFalsy();
  });

  it("Should render props.min ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.max ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.step ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.label ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.labelOffset ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.caption ...", async () => {
    expect(true).toBeFalsy();
  });
  it("Should render props.captionOffset ...", async () => {
    expect(true).toBeFalsy();
  });

  colorSchemeClassCase(
    wrapper,
    `.${config.trackClassName}`,
    COLOR_SCHEME.DANGER
  );

  colorSchemeClassCase(
    wrapper,
    `.${config.inputClassName}`,
    COLOR_SCHEME.DANGER
  );

  outlineClassCase(
    wrapper,
    `.${config.inputClassName}`,
    COLOR_SCHEME.DANGER,
    SIZE.SMALL
  );

  roundingClassCase(wrapper, `.${config.trackClassName}`);

  roundingClassCase(wrapper, `.${config.inputClassName}`);

  sizeClassCase(wrapper, `.${config.className}`);

  fontSizeClassCase(wrapper, `.${config.labelClassName}`);

  minControlWidthCase(wrapper);

  transitionClassCase(wrapper, `.${config.captionClassName}`);

  disabledAttrCase(wrapper, `.${config.inputClassName}`);

  tagCase(wrapper);

  // TODO on/whenChange
  it("Should render props. ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO on/whenInput
  it("Should render props. ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO on:update:value
  it("Should render props. ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: props. ...Options
});
