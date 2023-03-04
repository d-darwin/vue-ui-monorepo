import { shallowMount } from "@vue/test-utils";
import DDrawer from "@/components/organisms/d-drawer";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "@/components/molecules/d-table/config";

describe("DTable", () => {
  const wrapper = shallowMount(DDrawer);

  baseClassCase(wrapper, config.className);
});
