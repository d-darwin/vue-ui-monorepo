import { shallowMount } from "@vue/test-utils";
import { baseClassCase, slotCase } from "@/utils/test-case-factories";
import DAccordion from "./d-accordion";
import config from "./config";

describe("DAccordion", () => {
  const wrapper = shallowMount(DAccordion);

  baseClassCase(wrapper, config.class);

  // slotCase(DDetails, `.${config.summaryOptions.class}`, "summaryAfter");
  slotCase(DAccordion, `.${config.class}`, "default");
});
