import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DAccordion from "./d-accordion";
import config from "./config";

describe("DAccordion", () => {
  const wrapper = shallowMount(DAccordion);

  baseClassCase(wrapper, config.className);
});
