import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DTable from "./index";
import config from "./config";

describe("DTable", () => {
  const wrapper = shallowMount(DTable);

  baseClassCase(wrapper, config.className);

  it("Should render props.headerClass to the thead element's class", () => {
    expect(true).toBeFalsy();
  });

  it("Should render props.headerClass to the thead element's class", () => {
    expect(true).toBeFalsy();
  });

  // TODO
});
