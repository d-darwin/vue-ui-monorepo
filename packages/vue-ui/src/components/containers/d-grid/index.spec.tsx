import { mount } from "@vue/test-utils";
import DGrid from "@/components/containers/d-grid/index";
import {
  baseClassCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";
import styles from "./index.css?module";
describe("DGrid", () => {
  const itemClassName = "item";
  const vNodes = [
    <div class={itemClassName} />,
    <div class={itemClassName} />,
    <div class={itemClassName} />,
    <div class={itemClassName} />,
    <div class={itemClassName} />,
  ];

  const wrapper = mount(DGrid, {
    slots: {
      default: vNodes,
    },
  });

  baseClassCase(wrapper, config.className);

  transitionClassCase(wrapper, `.${config.className}`);

  it("Should add config.childClassName to the child elements for default slot", () => {
    const child = wrapper.find(`.${itemClassName}`);
    expect(child.classes()).toContain(styles[config.childClassName]);
  });

  it("Should add config.childClassName to the child elements for props.content", async () => {
    const wrapper = await mount(DGrid, {
      props: {
        content: vNodes,
      },
    });

    const child = wrapper.find(`.${itemClassName}`);
    expect(child.classes()).toContain(styles[config.childClassName]);
  });

  it("Should render style='--grid-col-span: <number>' if props.colSpan is <number>", async () => {
    const colSpan = 4;
    await wrapper.setProps({ colSpan });

    expect(wrapper.attributes("style")).toContain(
      `--grid-col-span: ${colSpan}`
    );
  });

  // TODO: colSpan (deviceWidth ???)
  it("Should ...", async () => {
    expect(true).toBeFalsy();
  });

  it("Should render style='--grid-row-gap: <string>' if props.rowGap is <string>", async () => {
    const rowGap = "10px";
    await wrapper.setProps({ rowGap });

    expect(wrapper.attributes("style")).toContain(`--grid-row-gap: ${rowGap}`);
  });

  // TODO: rowGap (deviceWidth ???)
  it("Should ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: content (string[])
  it("Should ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: content (VNode[]) - or dont ???
  it("Should ...", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: enableHtml
  it("Should ...", async () => {
    expect(true).toBeFalsy();
  });

  tagCase(wrapper);
});
