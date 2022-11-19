import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DCheckboxGroup from "./index";
import config from "./config";

describe("DCheckboxGroup", () => {
  const wrapper = shallowMount(DCheckboxGroup);

  baseClassCase(wrapper, config.className);
});
