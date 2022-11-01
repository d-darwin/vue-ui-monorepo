import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DTable from "./index";
import config from "./config";

describe("DTable", () => {
  const wrapper = shallowMount(DTable);

  baseClassCase(wrapper, config.className);

  it("Should render props.headClass to the thead element class", async () => {
    const headClass = "some-head-class";
    await wrapper.setProps({ headClass });
    const theadEl = wrapper.find("thead");
    expect(theadEl).toBeTruthy();
    expect(theadEl.classes()).toContain(headClass);
  });

  // TODO: props.headRows
  it("Should render props.headRows as tr elements inside the thead", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.headRowClass
  it("Should render props.headRowClass as tr elements inside the thead class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.headCellClass
  it("Should render props.headCellClass as td elements inside the thead class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.headRowAttrs
  it("Should render props.headRowAttrs as tr elements inside the thead attrs", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.headCellAttrs
  it("Should render props.headCellAttrs as td elements inside the thead attrs", async () => {
    expect(true).toBeFalsy();
  });

  it("Should render props.bodyClass to the tbody element class", async () => {
    const bodyClass = "some-body-class";
    await wrapper.setProps({ bodyClass });
    const theadEl = wrapper.find("tbody");
    expect(theadEl).toBeTruthy();
    expect(theadEl.classes()).toContain(bodyClass);
  });

  // TODO: props.bodyRows
  it("Should render props.bodyRows as tr elements inside the tbody", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.bodyRowClass
  it("Should render props.bodyRowClass as tr elements inside the tbody class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.bodyCellClass
  it("Should render props.bodyCellClass as td elements inside the tbody class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.bodyRowAttrs
  it("Should render props.bodyRowAttrs as tr elements inside the tbody attrs", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.bodyCellAttrs
  it("Should render props.bodyCellAttrs as td elements inside the tbody attrs", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: props.padding
  it("Should render props.padding as td elements padding class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.size
  it("Should render props.bodyCellAttrs as td elements size class", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: props.transition
  it("Should render props.bodyCellAttrs as td elements transition transition", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: props.enableHtml
  it("props.enableHtml should allow to pass HTML strings as content of the td elements", async () => {
    expect(true).toBeFalsy();
  });
});
