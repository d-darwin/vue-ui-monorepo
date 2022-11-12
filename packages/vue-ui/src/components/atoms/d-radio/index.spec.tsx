import { shallowMount } from "@vue/test-utils";
import DRadio from "@/components/atoms/d-radio";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "@/components/atoms/d-radio/config";

describe("DRadio", () => {
  const wrapper = shallowMount(DRadio);

  baseClassCase(wrapper, config.className);
});
