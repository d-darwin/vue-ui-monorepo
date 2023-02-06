import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DSwitch from "@/components/atoms/d-switch/index";
import config from "@/components/atoms/d-switch/config";

describe("DSwitch", () => {
  const wrapper = shallowMount(DSwitch);

  baseClassCase(wrapper, config.className);
});
