import { shallowMount } from "@vue/test-utils";
import DAspectRatio from "@/components/containers/d-aspect-ratio/index";
import {
  baseClassCase,
  propHtmlCase,
  slotDefaultCase,
} from "@/utils/test-case-factories";

describe("DTypography", () => {
  const CSS = {};

  const wrapper = shallowMount(DAspectRatio);

  propHtmlCase(wrapper);

  slotDefaultCase(wrapper);

  baseClassCase(wrapper, "dAspectRatio");
});
