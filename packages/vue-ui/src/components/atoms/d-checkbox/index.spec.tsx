import { shallowMount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/d-checkbox";
import config from "@/components/atoms/d-checkbox/config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DCheckbox", () => {
  const wrapper = shallowMount(DCheckbox);

  baseClassCase(wrapper, config.className);

  it("Should render as input element with type checkbox", () => {
    expect(false).toBeTruthy();
  });
});
