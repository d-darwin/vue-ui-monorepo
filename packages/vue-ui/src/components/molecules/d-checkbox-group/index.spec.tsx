import { shallowMount } from "@vue/test-utils";
import {
  baseClassCase,
  errorClassCase,
  errorFontCase,
  errorHtmlCase,
  errorSlotCase,
  errorStringCase,
  labelAbsenceCase,
  labelClassCase,
  labelFontCase,
  labelPresenceCase,
  labelSlotCase,
  tagCase,
} from "@/utils/test-case-factories";
import DCheckboxGroup from "./index";
import config from "./config";

describe("DCheckboxGroup", () => {
  const wrapper = shallowMount(DCheckboxGroup);

  baseClassCase(wrapper, config.className);

  it("Should render passes props.items", async () => {
    expect(true).toBeFalsy();
  });

  labelAbsenceCase(wrapper); // TODO: add selector
  labelPresenceCase(wrapper); // TODO: labelHtmlCase
  labelSlotCase(wrapper);
  labelClassCase(wrapper);
  labelFontCase(wrapper);

  // TODO: errorAbsenceCase
  errorStringCase(wrapper, config.errorClassName); // TODO: replace with selector
  errorHtmlCase(wrapper, config.errorClassName);
  errorSlotCase(DCheckboxGroup, config.errorClassName);
  errorClassCase(wrapper, config.errorClassName);
  errorFontCase(wrapper, config.errorClassName);

  it("Should add config.checkboxClassName to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants classes
  });

  it("Should pass props.disabled to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  it("Should pass props.colorScheme to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  it("Should pass props.rounding to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  it("Should pass props.size to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  it("Should pass props.transition to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  it("Should pass props.enableHtml to the descendants", async () => {
    expect(true).toBeFalsy();
    // TODO  along with owh descendants props
  });

  tagCase(wrapper);

  // TODO: emits and whens
});
