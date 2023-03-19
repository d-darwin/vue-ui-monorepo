import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DProgress from "@/components/atoms/d-progress";
import config from "@/components/atoms/d-progress/config";

describe("DProgress", () => {
  const wrapper = shallowMount(DProgress);
  baseClassCase(wrapper, config.className);
});
