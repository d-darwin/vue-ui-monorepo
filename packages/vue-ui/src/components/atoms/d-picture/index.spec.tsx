import { shallowMount } from "@vue/test-utils";
import DPicture from "@/components/atoms/d-picture";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DButton", () => {
  const wrapper = shallowMount(DPicture);

  baseClassCase(wrapper, config.className);

  // TODO
});
