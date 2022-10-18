import { mount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import { DTabs } from "./index";
import config from "./config";

// TODO: move to the config
jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabs", () => {
  const wrapper = mount(DTabs);

  baseClassCase(wrapper, config.tabsClassName);

  it("Should render config.tablistClassName to the tablist's class name", () => {
    const tablist = wrapper.find(`.${config.tablistClassName}`);
    expect(tablist).toBeTruthy();
  });

  it("Should render props.tablistLabel to the tablist's aria-label attr", async () => {
    const tablistLabel = "Some aria label";
    await wrapper.setProps({ tablistLabel });
    const tablist = wrapper.find(`.${config.tablistClassName}`);
    expect(tablist.attributes("aria-label")).toBe(tablistLabel);
  });

  // TODO: props.tablistClass
  it("Should props.tablistClass to the tablist's class name", async () => {
    const tablistClass = "some-tablist-class";
    await wrapper.setProps({ tablistClass });
    const tablist = wrapper.find(`.${config.tablistClassName}`);
    expect(tablist.classes()).toContain(tablistClass);
  });

  // TODO: props.tabs
  // TODO: slots.tabs
  // TODO: props.tabsSize
  // TODO: ids
  // TODO: props.tabpanels
  // TODO: slots.tabpanels
  // TODO: props.tabpanelsFont
  // TODO: ids
  // Classes and behaviour
  // TODO: props.disabled
  // TODO: props.padding
  // TODO: props.transition
  // TODO: props.tag
  // TODO: props.tablistTag
  // TODO: props.enableHtml
  // TODO: DTab.props
  // active ???
  // TODO: DTab.onClick
  // TODO: DTab.whenClick
  // TODO: DTabpanel.props
  // active ???
});
