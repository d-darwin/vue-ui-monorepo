import { mount } from "@vue/test-utils";
import DGrid from "@/components/containers/d-grid/index";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DGrid", () => {
  const wrapper = mount(DGrid);

  baseClassCase(wrapper, config.className);

  // TODO: props
  // TODO: ???
});
