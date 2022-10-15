import { mount } from "@vue/test-utils";
import { baseClassCase } from "@/utils/test-case-factories";
import { DTab } from "./index";
import config from "./config";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTab", () => {
  const dTabWrapper = mount(DTab);

  baseClassCase(dTabWrapper, config.tabClassName);

  // TODO: classes
  // TODO: bindings
  // TODO: props.content
  // TODO: slots.label
  // TODO: props.active
  // TODO: props.id
  // TODO: props.tabpanelId
  // TODO: props.disabled
  // TODO: props.padding
  // TODO: props.size
  // TODO: props.transition
  // TODO: props.tag
  // TODO: props.enableHtml
  // TODO: emits.click
  // TODO: props.whenClick
});
