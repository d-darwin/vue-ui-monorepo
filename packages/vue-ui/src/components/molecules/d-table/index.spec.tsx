import { shallowMount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import DTable from "./index";
import config from "./config";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";

const headLabel0 = "head 1";
const headLabel1 = "head 2";
const headLabel2 = "head 3";
const headRows = [
  [
    headLabel0,
    <b>{headLabel1}</b>,
    <div class="inner-th-element">{headLabel2}</div>,
  ],
];

const bodyCell00 = "cell 11";
const bodyCell01 = "cell 12";
const bodyCell02 = "cell 13";
const bodyCell10 = "cell 21";
const bodyCell11 = "cell 12";
const bodyCell12 = "cell 13";
const bodyCell02OnClick = jest.fn();
const bodyRows = [
  [
    bodyCell00,
    <i>{bodyCell01}</i>,
    <div class="inner-td-element" onClick={bodyCell02OnClick}>
      {bodyCell02}
    </div>,
  ],
  [
    <div id="body-cell-10">{bodyCell10}</div>,
    bodyCell11,
    <span data-type="cell-content">{bodyCell12}</span>,
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
    expect(thElements[0].text()).toBe(headLabel0);
    expect(thElements[1].text()).toBe(headLabel1);
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

  it("Should render props.bodyClass to the tbody element class", async () => {
    const bodyClass = "some-body-class";
    await wrapper.setProps({ bodyClass });

    const theadEl = wrapper.find("tbody");
    expect(theadEl).toBeTruthy();
    expect(theadEl.classes()).toContain(bodyClass);
  });

  it("Should render props.bodyRows as tr elements inside the tbody", async () => {
    await wrapper.setProps({ bodyRows });

    const trElements = wrapper.findAll("tbody > tr");

    const tdElements0 = trElements[0].findAll("td");
    expect(tdElements0[0].text()).toBe(bodyCell00);
    expect(tdElements0[1].text()).toBe(bodyCell01);
    expect(tdElements0[2].html()).toMatchSnapshot();
    // TODO: await tdElements0[2].trigger("click");
    // TODO: expect(bodyCell02OnClick).toBeCalled();

    const tdElements1 = trElements[1].findAll("td");
    expect(tdElements1[0].text()).toBe(bodyCell10);
    expect(tdElements1[1].text()).toBe(bodyCell11);
    expect(tdElements1[2].html()).toMatchSnapshot();
  });

  it("Should render props.bodyRowClass as tr elements inside the tbody class", async () => {
    const bodyRowClass = "some-body-row-class";
    await wrapper.setProps({ bodyRows, bodyRowClass });

    const trElements = wrapper.findAll("tbody > tr");
    trElements.forEach((trEl) => {
      expect(trEl.classes()).toContain(bodyRowClass);
    });
  });

  it("Should render props.bodyCellClass as td elements inside the tbody class", async () => {
    const bodyCellClass = "some-body-cell-class";
    await wrapper.setProps({ bodyRows, bodyCellClass });

    const tdElements = wrapper.findAll("tbody > tr > td");
    tdElements.forEach((tdEl) => {
      expect(tdEl.classes()).toContain(bodyCellClass);
    });
  });

  it("Should render props.bodyRowAttrs as tr elements inside the tbody attrs", async () => {
    const bodyRowAttrsArr = [
      {
        style: "background: red;",
        onClick: jest.fn(),
      },
      {
        style: "background: black; color: white;",
        onClick: jest.fn(),
      },
    ];
    await wrapper.setProps({
      bodyRows,
      bodyRowAttrs: (rowIndex: number) => bodyRowAttrsArr[rowIndex],
    });

    const trElements = wrapper.findAll("tbody > tr");
    await Promise.all(
      trElements.map(async (trEl, index) => {
        expect(trEl.attributes("style")).toBe(bodyRowAttrsArr[index].style);
        await trEl.trigger("click");
        expect(bodyRowAttrsArr[index].onClick).toBeCalled();
      })
    );
  });
  // TODO: props.bodyCellAttrs
  it("Should render props.bodyCellAttrs as td elements inside the tbody attrs", async () => {
    const bodyCellAttrsArr = [
      [
        {
          style: "background: red;",
          onClick: jest.fn(),
        },
        {
          style: "background: black; color: white;",
          onClick: jest.fn(),
        },
        {
          style: "visibility: hidden;",
          onClick: jest.fn(),
        },
      ],
      [
        {
          style: "background: black; color: white;",
          onClick: jest.fn(),
        },
        {
          style: "background: red;",
          onClick: jest.fn(),
        },
        {
          style: "visibility: hidden;",
          onClick: jest.fn(),
        },
      ],
    ];
    await wrapper.setProps({
      bodyRows,
      bodyCellAttrs: (rowIndex: number, cellIndex: number) =>
        bodyCellAttrsArr[rowIndex][cellIndex],
    });

    const trElements = wrapper.findAll("tbody > tr");
    await Promise.all(
      trElements.map(async (trEl, rowIndex) => {
        const tdElements = trEl.findAll("td");
        await Promise.all(
          tdElements.map(async (tdEl, cellIndex) => {
            expect(tdEl.attributes("style")).toBe(
              bodyCellAttrsArr[rowIndex][cellIndex].style
            );
            await tdEl.trigger("click");
            expect(bodyCellAttrsArr[rowIndex][cellIndex].onClick).toBeCalled();
          })
        );
      })
    );
  });

  it("Should render props.padding as td elements padding class", async () => {
    const padding = PADDING.EQUAL;
    const paddingClassName = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      padding
    );
    const size = SIZE.MEDIUM;
    const paddingSizeClassName = prepareCssClassName(
      codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
      `${padding}-${size}`
    );
    await wrapper.setProps({ headRows, bodyRows, padding, size });

    const headThElement = wrapper.find("thead > tr > th");
    expect(headThElement.classes()).toContain(paddingClassName);
    expect(headThElement.classes()).toContain(paddingSizeClassName);

    const bodyTdElement = wrapper.find("tbody > tr > td");
    expect(bodyTdElement.classes()).toContain(paddingClassName);
    expect(bodyTdElement.classes()).toContain(paddingSizeClassName);
  });

  it("Should render props.size as td elements size class", async () => {
    const size = SIZE.HUGE;
    await wrapper.setProps({ size });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
      size
    );
    await wrapper.setProps({ headRows, bodyRows, size });

    const headThElement = wrapper.find("thead > tr > th");
    expect(headThElement.classes()).toContain(className);

    const bodyTdElement = wrapper.find("tbody > tr > td");
    expect(bodyTdElement.classes()).toContain(className);
  });

  it("Should render props.transition as td elements transition transition", async () => {
    const transition = TRANSITION.AVERAGE;
    await wrapper.setProps({ transition });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
      transition
    );
    await wrapper.setProps({ headRows, bodyRows, transition });

    const headTrElement = wrapper.find("thead > tr ");
    expect(headTrElement.classes()).toContain(className);

    const bodyTrElement = wrapper.find("tbody > tr");
    expect(bodyTrElement.classes()).toContain(className);
  });

  it("props.enableHtml should allow to pass HTML strings as content of the td elements", async () => {
    const headHtmlString = "<b>head html string</b>";
    const bodyHtmlString = "<i>body html string</i>";
    await wrapper.setProps({
      enableHtml: true,
      headRows: [[headHtmlString]],
      bodyRows: [[bodyHtmlString]],
    });

    const headTdContentElement = wrapper.find("thead > tr > th > b");
    expect(headTdContentElement.html()).toBe(headHtmlString);
    const bodyTdContentElement = wrapper.find("tbody > tr > td > i");
    expect(bodyTdContentElement.html()).toBe(bodyHtmlString);
  });
});
