import { shallowMount } from "@vue/test-utils";
import DCaption from "@/components/atoms/d-caption";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DCaption);

  baseClassCase(wrapper, config.className);
});
