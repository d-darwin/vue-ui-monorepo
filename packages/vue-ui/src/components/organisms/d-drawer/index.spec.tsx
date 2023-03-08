import { mount } from "@vue/test-utils";
import DDrawer from "@/components/organisms/d-drawer";
import DBackdrop from "@/components/atoms/d-backdrop";
import DButton from "@/components/atoms/d-button";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { POSITION } from "@/constants/position";
import config from "@/components/organisms/d-drawer/config";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import {
  colorSchemeClassCase,
  paddingEqualClassesCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  transitionClassCase,
} from "@/utils/test-case-factories";

describe("DDrawer", () => {
  const content = "Plain string content";
  const wrapper = mount(DDrawer, {
    props: {
      enableInline: true,
      content,
    },
  });

  it("Shouldn't render anything if props.isShown is falsy", async () => {
    await wrapper.setProps({ isShown: false });
    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeFalsy();
  });

  it("Should render backdrop, container, default header and content if props.isShown is true", async () => {
    await wrapper.setProps({ isShown: true });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeTruthy();

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeTruthy();

    const headerEl = wrapper.find(`.${config.headerClassName}`);
    expect(headerEl.exists()).toBeTruthy();

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.text()).toBe(content);
  });

  it("Shouldn't render backdrop if props.isModal is false", async () => {
    await wrapper.setProps({ isShown: true, isModal: false });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeFalsy();
  });

  it("Should render passed props.title in the default header", async () => {
    const title = "Some title";
    await wrapper.setProps({ isShown: true, title });

    const titleEl = wrapper.find(`.${config.titleClassName}`);
    expect(titleEl.text()).toBe(title);
  });

  it("Should render props.titleClass to the title class list", async () => {
    const title = "Some title";
    const titleClass = "someTitleClass";
    await wrapper.setProps({ isShown: true, title, titleClass });

    const titleEl = wrapper.find(`.${config.titleClassName}`);
    expect(titleEl.classes()).toContain(titleClass);
  });

  it("Should render props.titleFont to the title font class", async () => {
    const title = "Some title";
    const titleFont = FONT.TINY;
    await wrapper.setProps({ isShown: true, title, titleFont });

    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      titleFont
    );

    const titleEl = wrapper.find(`.${config.titleClassName}`);
    expect(titleEl.classes()).toContain(className);
  });

  it("Should render props.content to the component element", async () => {
    const content = <b>Some html content</b>;
    await wrapper.setProps({ isShown: true, content });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.html()).toMatchSnapshot();
  });

  it("Should render props.contentClass to the content class list", async () => {
    const contentClass = "someContentClass";
    await wrapper.setProps({ isShown: true, contentClass });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(contentClass);
  });

  it("Should render props.contentFont to the content font class", async () => {
    const contentFont = FONT.HUGE;
    await wrapper.setProps({ isShown: true, contentFont });

    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      contentFont
    );

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(className);
  });

  it("Should props.contentRole to the content role attr", async () => {
    const contentRole = "composite";
    await wrapper.setProps({ isShown: true, contentRole });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.attributes().role).toBe(contentRole);
  });

  it("Should props.contentTag to the content tag", async () => {
    const contentTag = "section";
    await wrapper.setProps({ isShown: true, contentTag });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.element.tagName).toEqual(contentTag.toLocaleUpperCase());
  });

  it("Should render props.position to the container position class", async () => {
    const position = POSITION.BOTTOM;
    await wrapper.setProps({ isShown: true, position });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.classes()).toContain("bottom");
  });

  it("Should props.width to the component style as '--width: props.width'", async () => {
    const width = "45vw";
    await wrapper.setProps({ isShown: true, width });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.attributes("style")).toContain(`--width: ${width}`);
  });

  it("Should props.height to the component style as '--height: props.height'", async () => {
    const height = "45vw";
    await wrapper.setProps({ isShown: true, height });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.attributes("style")).toContain(`--height: ${height}`);
  });

  colorSchemeClassCase(wrapper, `.${config.className}`, COLOR_SCHEME.DANGER);

  paddingEqualClassesCase(wrapper, `.${config.className}`);

  roundingClassCase(wrapper, `.${config.className}`);

  sizeClassCase(wrapper, `.${config.className}`);

  transitionClassCase(wrapper, `.${config.className}`);

  it("Should append the container to the props.target", async () => {
    const target = document.createElement("div");
    target.id = "custom-target";
    document.body.appendChild(target);

    const wrapper = mount(DDrawer, {
      attachTo: document.body,
      props: {
        isShown: true,
        content,
        target,
        focusId: "customFocusId", // for snapshot
      },
    });
    await wrapper.vm.$nextTick();

    expect(document.body.innerHTML).toMatchSnapshot(); // TODO: find a better way
    document.body.innerHTML = "";
  });

  it("Shouldn't move the container to the props.target if props.enableInline is true", async () => {
    const target = document.createElement("div");
    target.id = "custom-target";
    document.body.appendChild(target);

    const wrapper = mount(DDrawer, {
      attachTo: document.body,
      props: {
        isShown: true,
        enableInline: true,
        content,
        target,
        focusId: "why-not", // for snapshot
      },
    });
    await wrapper.vm.$nextTick();

    expect(document.body.innerHTML).toMatchSnapshot(); // TODO: find a better way
    document.body.innerHTML = "";
  });

  it("Should render props.role to the container role attr", async () => {
    const role = "composite";
    await wrapper.setProps({ isShown: true, role });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.attributes().role).toBe(role);
  });

  it("Should props.tag to the container tag", async () => {
    const tag = "article";
    await wrapper.setProps({ isShown: true, tag });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.element.tagName).toEqual(tag.toLocaleUpperCase());
  });

  it("Should render props.zIndex to the container style as '--z-index: props.zIndex'", async () => {
    const zIndex = 0.33;
    await wrapper.setProps({
      zIndex,
    });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.attributes("style")).toContain(`--z-index: ${zIndex}`);
  });

  it("Shouldn't render header if props.hideHeader is true", async () => {
    await wrapper.setProps({ hideHeader: true });

    const headerEl = wrapper.find(`.${config.headerClassName}`);
    expect(headerEl.exists()).toBeFalsy();
  });

  it("Should render props.content as HTML string if props.enableHtml is true", async () => {
    const content = `<div>some <b>html</b> string</div>`;
    await wrapper.setProps({ isShown: true, content, enableHtml: true });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.html()).toMatch(content);
  });

  // TODO: props.enableHtml for header, footer (?)

  it("Should emit close event on backdrop click", async () => {
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    const backdrop = wrapper.findComponent(DBackdrop);
    await backdrop.trigger("click");

    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("Should call props.whenClose on backdrop click", async () => {
    const whenClose = jest.fn();
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenClose,
      },
    });

    const backdrop = wrapper.findComponent(DBackdrop);
    await backdrop.trigger("click");

    expect(whenClose).toBeCalled();
  });

  it("Should emit close event on close button click", async () => {
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    const closeButton = wrapper.findComponent(DButton);
    await closeButton.trigger("click");

    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("Should call props.whenClose on close button click", async () => {
    const whenClose = jest.fn();
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenClose,
      },
    });

    const closeButton = wrapper.findComponent(DButton);
    await closeButton.trigger("click");

    expect(whenClose).toBeCalled();
  });

  it("Should emit close event on Escape button click", async () => {
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    window.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "Escape",
      })
    );
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("Should call props.whenClose on Escape button click", async () => {
    const whenClose = jest.fn();
    const wrapper = mount(DDrawer, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenClose,
      },
    });

    window.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "Escape",
      })
    );
    await wrapper.vm.$nextTick();

    expect(whenClose).toBeCalled();
  });

  slotCase(DDrawer, `.${config.className}`, "default", {
    isShown: true,
    enableInline: true,
  });

  // TODO: header\footer slots

  // TODO: props. ...Options cases
});
