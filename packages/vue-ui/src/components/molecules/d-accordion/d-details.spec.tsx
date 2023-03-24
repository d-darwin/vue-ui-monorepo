import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DDetails from "./d-details";
import config from "./config";

describe("DDetails", () => {
  const wrapper = shallowMount(DDetails);

  baseClassCase(wrapper, config.detailsClassName);
});
