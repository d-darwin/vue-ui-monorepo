import { shallowMount } from "@vue/test-utils";
import DInput from "@/components/atoms/d-input";
import config from "./config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DButton", () => {
  const wrapper = shallowMount(DInput);

  baseClassCase(wrapper, config.className);

  // TODO: value
  // TODO: label
  // TODO: id
  // TODO: size
  // TODO: rounding
  // TODO: error (via Tooltip ???)
  // TODO: events on*, when*
  // TODO: slots (befor / after)
});
