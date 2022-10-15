import { mount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import { DTabs } from "./index";
import config from "./config";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabs", () => {
  const dTabsWrapper = mount(DTabs);

  baseClassCase(dTabsWrapper, config.tabsClassName);

  // TODO: props.tablistLabel
  // TODO: config.tablistClassName
  // TODO: props.tablistClass
  // TODO: props.tabs
  // TODO: slots.tabs
  // TODO: ids
  // TODO: props.tabsSize
  // TODO: props.tabpanels
  // TODO: slots.tabpanels
  // TODO: ids
  // TODO: props.tabpanelsFont
  // TODO: props.disabled
  // TODO: props.padding
  // TODO: props.transition
  // TODO: props.tag
  // TODO: props.tablistTag
  // TODO: props.enableHtml
  // TODO: DTab.props
  // TODO: DTab.onClick
  // TODO: DTab.whenClick
  // TODO: DTabpanel.props
});
