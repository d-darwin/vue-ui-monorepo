import { shallowMount } from "@vue/test-utils";
import DSlider from "@/components/atoms/d-slider";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DSlider", () => {
  const wrapper = shallowMount(DSlider);

  baseClassCase(wrapper, config.className);
});
