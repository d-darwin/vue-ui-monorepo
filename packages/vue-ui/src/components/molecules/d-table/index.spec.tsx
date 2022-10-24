import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DTable from "./index";
import config from "./config";

describe("DTable", () => {
  const wrapper = shallowMount(DTable);

  baseClassCase(wrapper, config.className);

  // TODO
});
