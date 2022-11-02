import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DTable from "./index";
import config from "./config";

const head0Label = "head 1";
const head1Label = "head 2";
const head2Label = "head 3";
const headRows = [
  [
    head0Label,
    <b>{head1Label}</b>,
    <div class="inner-th-element">{head2Label}</div>,
  ],
];

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

  it("Should render props.headRows as tr elements inside the thead", async () => {
    await wrapper.setProps({ headRows });
    const thElements = wrapper.findAll("thead > tr > th");
    expect(thElements.length).toBe(headRows[0].length);
    expect(thElements[0].text()).toBe(head0Label);
    expect(thElements[1].text()).toBe(head1Label);
    expect(thElements[2].html()).toMatchSnapshot();
  });

  it("Should render props.headRowClass as tr elements inside the thead class", async () => {
    const headRowClass = "some-head-row-class";
    await wrapper.setProps({ headRows, headRowClass });
    const headRowEl = wrapper.find("thead > tr");
    expect(headRowEl.classes()).toContain(headRowClass);
  });

  it("Should render props.headCellClass as td elements inside the thead class", async () => {
    const headCellClass = "some-head-row-class";
    await wrapper.setProps({ headRows, headCellClass });
    const thElements = wrapper.findAll("thead > tr > th");
    thElements.forEach((thEl) => {
      expect(thEl.classes()).toContain(headCellClass);
    });
  });

  it("Should render props.headRowAttrs as tr elements inside the thead attrs", async () => {
    const headRowAttrsObj = {
      tabindex: "1",
      "data-id": "123",
    };
    await wrapper.setProps({ headRows, headRowAttrs: () => headRowAttrsObj });
    const headRowEl = wrapper.find("thead > tr");
    expect(headRowEl.attributes("tabindex")).toBe(headRowAttrsObj.tabindex);
    expect(headRowEl.attributes("data-id")).toBe(headRowAttrsObj["data-id"]);
  });

  it("Should render props.headCellAttrs as td elements inside the thead attrs", async () => {
    const headCellAttrsObj = {
      style: "background: red;",
      onClick: jest.fn(),
    };
    await wrapper.setProps({ headRows, headCellAttrs: () => headCellAttrsObj });
    const thElements = wrapper.findAll("thead > tr > th");
    await Promise.all(
      thElements.map(async (thEl) => {
        expect(thEl.attributes("style")).toBe(headCellAttrsObj.style);
        await thEl.trigger("click");
      })
    );
    expect(headCellAttrsObj.onClick).toBeCalledTimes(headRows[0].length);
  });

  /*
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
  });*/
});
