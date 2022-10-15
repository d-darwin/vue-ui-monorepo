import { mount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import { DTabpanel } from "./index";
import config from "./config";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabpanel", () => {
  const dTabpanelWrapper = mount(DTabpanel);

  baseClassCase(dTabpanelWrapper, config.tabpanelClassName);

  // TODO: classes
  // TODO: bindings
  // TODO: props.content
  // TODO: slots.default
  // TODO: props.active
  // TODO: props.id
  // TODO: props.tabId
  // TODO: props.font
  // TODO: props.padding
  // TODO: props.transition
  // TODO: props.tag
  // TODO: props.enableHtml
});
