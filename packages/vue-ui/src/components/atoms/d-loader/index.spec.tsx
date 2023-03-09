import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DLoader from "@/components/atoms/d-loader";
import config from "./config";

describe("DLoader", () => {
  const wrapper = shallowMount(DLoader);

  baseClassCase(wrapper, config.className);
});
