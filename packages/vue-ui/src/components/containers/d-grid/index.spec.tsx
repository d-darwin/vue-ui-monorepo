import { mount } from "@vue/test-utils";
import DGrid from "@/components/containers/d-grid/index";
import {
  baseClassCase,
  tagCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import config from "./config";
import styles from "./index.css?module";
import {
  BREAKPOINTS,
  BREAKPOINTS_VALUE,
} from "@darwin-studio/ui-codegen/dist/constants/breakpoints";

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

  it("Should render style='--grid-col-span: <number>' if props.colSpan is { sm: <number>} and breakpoint is sm", async () => {
    const innerWidth = 500;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: innerWidth,
      writable: true,
    });
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    const [breakpointName] =
      Object.entries(BREAKPOINTS_VALUE).find(
        (bpValue) => Number(bpValue[1]) < innerWidth
      ) || [];

    const breakpoint = BREAKPOINTS[breakpointName as keyof typeof BREAKPOINTS];
    const colSpan = 3;
    await wrapper.setProps({ colSpan: { [breakpoint]: colSpan } });

    expect(wrapper.attributes("style")).toContain(
      `--grid-col-span: ${colSpan}`
    );
  });

  it("Should render style='--grid-row-gap: <string>' if props.rowGap is <string>", async () => {
    const rowGap = "10px";
    await wrapper.setProps({ rowGap });

    expect(wrapper.attributes("style")).toContain(`--grid-row-gap: ${rowGap}`);
  });

  it("Should render style='--grid-row-gap: <number>' if props.rowGap is { md: <number>} and breakpoint is md", async () => {
    const innerWidth = 650;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: innerWidth,
      writable: true,
    });
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    const [breakpointName] =
      Object.entries(BREAKPOINTS_VALUE).find(
        (bpValue) => Number(bpValue[1]) < innerWidth
      ) || [];

    const breakpoint = BREAKPOINTS[breakpointName as keyof typeof BREAKPOINTS];
    const rowGap = 3;
    await wrapper.setProps({ rowGap: { [breakpoint]: rowGap } });

    expect(wrapper.attributes("style")).toContain(`--grid-row-gap: ${rowGap}`);
  });

  // TODO: content (string[])
  it("Should render html from prop.content if it is string[] and props.enableHtml is true", async () => {
    const content = [
      `<div class="${itemClassName}"></div>`,
      `<div class="${itemClassName}"></div>`,
      `<div class="${itemClassName}"></div>`,
      `<div class="${itemClassName}"></div>`,
      `<div class="${itemClassName}"></div>`,
    ];
    const wrapper = await mount(DGrid, {
      props: {
        enableHtml: true,
        content,
      },
    });
    console.log(wrapper.html());
    expect(
      wrapper
        .html()
        .replaceAll("\r", "")
        .replaceAll("\n", "")
        .replaceAll(">  <", "><")
    ).toContain(content.join(""));
  });

  it("Should render plain strings if props.content is string[] and props.enableHtml is false", async () => {
    expect(true).toBeFalsy();
  });

  it("Shouldn't render anything it props.content and slots.default is empty", async () => {
    expect(true).toBeFalsy();
  });

  tagCase(wrapper);
});
