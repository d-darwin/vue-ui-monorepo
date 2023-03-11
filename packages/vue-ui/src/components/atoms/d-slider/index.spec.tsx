import { shallowMount } from "@vue/test-utils";
import DSlider from "@darwin-studio/vue-ui/src/components/atoms/d-slider";
import { baseClassCase } from "@darwin-studio/vue-ui/src/utils/test-case-factories";
import config from "./config";

describe("DSlider", () => {
  const wrapper = shallowMount(DSlider);

  baseClassCase(wrapper, config.className);
});
