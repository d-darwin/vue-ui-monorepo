import { shallowMount } from "@vue/test-utils";
import DTooltip from "@/components/atoms/d-tooltip";
import config from "@/components/atoms/d-tooltip/config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DTooltip", () => {
  const wrapper = shallowMount(DTooltip);

  baseClassCase(wrapper, config.className);
});
