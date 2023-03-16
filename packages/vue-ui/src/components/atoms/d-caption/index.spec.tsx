import { shallowMount } from "@vue/test-utils";
import {
  baseClassCase,
  contentHtmlCase,
  fontSizeClassCase,
  tagCase,
} from "@/utils/test-case-factories";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import DCaption from "@/components/atoms/d-caption";
import config from "./config";
import { TYPE } from "./constant";
import styles from "./styles.css";

describe("DButton", () => {
  const wrapper = shallowMount(DCaption, {
    props: {
      font: FONT.SMALL,
    },
  });

  baseClassCase(wrapper, config.className);

  it("Should render props.type to appropriate class name", async () => {
    await wrapper.setProps({ type: TYPE.DANGER });
    expect(wrapper.classes()).toContain(styles.danger);
  });

  fontSizeClassCase(wrapper, `.${config.className}`);

  tagCase(wrapper);

  contentHtmlCase(wrapper);
});
