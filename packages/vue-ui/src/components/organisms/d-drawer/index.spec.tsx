import { mount } from "@vue/test-utils";
import DDrawer from "@/components/organisms/d-drawer";
import config from "@/components/organisms/d-drawer/config";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { POSITION } from "@/constants/position";
import {
  colorSchemeClassCase,
  paddingEqualClassesCase,
  roundingClassCase,
  sizeClassCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

describe("DDrawer", () => {
  const content = "Plain string content";
  const wrapper = mount(DDrawer, {
    props: {
      isShown: false,
      content,
      enableInline: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      whenClose: () => {},
    },
  });

  it("Shouldn't render anything if props.isShown is falsy", async () => {
    await wrapper.setProps({ isShown: false, content });
    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeFalsy();
  });

  it("Should render container, default header and content if props.isShown is true", async () => {
    await wrapper.setProps({ isShown: true, content });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeTruthy();

    const headerEl = wrapper.find(`.${config.headerClassName}`);
    expect(headerEl.exists()).toBeTruthy();

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.text()).toBe(content);
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
    await wrapper.setProps({ isShown: true, content, contentClass });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(contentClass);
  });

  it("Should render props.contentFont to the content font class", async () => {
    const contentFont = FONT.HUGE;
    await wrapper.setProps({ isShown: true, content, contentFont });

    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      contentFont
    );

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(className);
  });

  it("Should props.contentRole to the content role attr", async () => {
    const contentRole = "composite";
    await wrapper.setProps({ isShown: true, content, contentRole });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.attributes().role).toBe(contentRole);
  });

  it("Should props.contentTag to the content tag", async () => {
    const contentTag = "section";
    await wrapper.setProps({ isShown: true, content, contentTag });

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
        focusId: "why-not",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        whenClose: () => {},
      },
    });
    await wrapper.vm.$nextTick();

    expect(document.body.innerHTML).toMatchSnapshot(); // TODO: find a better way
  });

  it("Should render props.role to the container role attr", async () => {
    const role = "composite";
    await wrapper.setProps({ isShown: true, content, role });

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.attributes().role).toBe(role);
  });

  it("Should props.tag to the container tag", async () => {
    const tag = "article";
    await wrapper.setProps({ isShown: true, content, tag });

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

  /*
  // TODO: props.hideHeader
  it("Should ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.enableInline
  it("Should ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.enableHtml
  it("Should ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.whenClose onClose
  it("Should ...", async () => {
    expect(true).toBe(false);
  });*/
  // TODO: айдишники кнопки закрытия, авто и свои
  // TODO: айшидники кастомные, авто и свои ?????
  it("Should ...", async () => {
    expect(true).toBe(false);
  });
});
