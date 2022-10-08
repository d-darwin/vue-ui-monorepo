import { mount } from "@vue/test-utils";
import { DTabs, DTab } from "./index";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DResponsiveImage", () => {
  const dTabsWrapper = mount(DTabs);
  const dTabWrapper = mount(DTab);

  baseClassCase(dTabsWrapper, config.tabsClassName);
  baseClassCase(dTabWrapper, config.tabClassName);

  // TODO: other cases
});
