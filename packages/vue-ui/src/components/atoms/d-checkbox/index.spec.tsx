import { shallowMount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/d-checkbox";
import config from "@/components/atoms/d-checkbox/config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DCheckbox", () => {
  const wrapper = shallowMount(DCheckbox);

  baseClassCase(wrapper, config.className);

  it("Should render input element with checkbox type", () => {
    expect(false).toBeTruthy();
  });

  it("Should render label element with props.label content", () => {
    expect(false).toBeTruthy();
  });

  it("Should render label element with props.label content", () => {
    expect(false).toBeTruthy();
  });
});
