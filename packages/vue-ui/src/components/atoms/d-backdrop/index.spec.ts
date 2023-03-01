import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DBackdrop from "@/components/atoms/d-backdrop";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DBackdrop);
  baseClassCase(wrapper, config.className);
});
