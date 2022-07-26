import { shallowMount } from "@vue/test-utils";
import DInput from "@/components/atoms/d-input";
import config from "@/components/atoms/d-input/config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DInput", () => {
  const wrapper = shallowMount(DInput);

  baseClassCase(wrapper, config.className);

  it("Should render as input element with type checkbox", () => {
    expect(false).toBeTruthy();
  });
});
