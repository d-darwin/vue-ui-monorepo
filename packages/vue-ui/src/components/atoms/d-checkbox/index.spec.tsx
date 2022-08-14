import { shallowMount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/d-checkbox";
import { BASE_COLOR_SCHEME } from "@/components/atoms/d-checkbox/constants";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import config from "@/components/atoms/d-checkbox/config";
import {
  baseClassCase,
  controlIdAbsenceCase,
  controlIdAutogeneratedCase,
  controlIdPresenceCase,
  errorClassCase,
  errorFontCase,
  errorHtmlCase,
  errorSlotCase,
  errorStringCase,
  inputAttrsCase,
  inputClassCase,
  inputValueCase,
  labelClassCase,
  labelFontCase,
  labelHtmlCase,
  labelPresenceCase,
  labelSlotCase,
  minControlWidthCase,
  outlineClassCase,
  sizeClassCase,
  tagCase,
} from "@/utils/test-case-factories";

describe("DCheckbox", () => {
  const wrapper = shallowMount(DCheckbox);

  baseClassCase(wrapper, config.className);

  it("Should render input element with checkbox type", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().type).toBe("checkbox");
  });

  inputValueCase(wrapper);

  inputClassCase(wrapper);

  inputAttrsCase(wrapper);

  minControlWidthCase(wrapper);

  // TODO: default/custom icons

  labelPresenceCase(wrapper, wrapper.find(`.${config.labelInnerClassName}`));

  labelClassCase(wrapper);

  labelFontCase(wrapper);

  labelHtmlCase(wrapper);

  labelSlotCase(DCheckbox);

  controlIdPresenceCase(wrapper);

  controlIdAbsenceCase(wrapper);

  controlIdAutogeneratedCase(wrapper);

  // TODO: fix
  outlineClassCase(
    wrapper,
    wrapper.find("input"),
    BASE_COLOR_SCHEME,
    SIZE.LARGE
  );

  // TODO: fix
  sizeClassCase(wrapper, wrapper.find("input"));

  //  transitionClassCase(wrapper, wrapper.find("input"));

  errorStringCase(wrapper, config.errorClassName);

  errorClassCase(wrapper, config.errorClassName);

  errorFontCase(wrapper, config.errorClassName);

  errorHtmlCase(wrapper, config.errorClassName);

  errorSlotCase(DCheckbox, config.errorClassName);

  // TODO: on\when handlers - factories
  // TODO: more ???

  tagCase(wrapper);
});
