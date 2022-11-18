import { shallowMount } from "@vue/test-utils";
import DCaption from "@/components/atoms/d-caption";
import {
  baseClassCase,
  contentHtmlCase,
  fontSizeClassCase,
  tagCase,
} from "@/utils/test-case-factories";
import config from "./config";
import { TYPE } from "@/components/atoms/d-caption/constant";
import styles from "./styles.css";

describe("DButton", () => {
  const wrapper = shallowMount(DCaption);

  baseClassCase(wrapper, config.className);

  it("Should render props.type to appropriate class name", async () => {
    await wrapper.setProps({ type: TYPE.DANGER });
    expect(wrapper.classes()).toContain(styles.danger);
  });

  fontSizeClassCase(wrapper, wrapper);

  tagCase(wrapper);

  contentHtmlCase(wrapper);
});