import { mount } from "@vue/test-utils";
import DDialog from "@/components/organisms/d-dialog";
import config from "@/components/organisms/d-dialog/config";
import DBackdrop from "@/components/atoms/d-backdrop";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import {
  colorSchemeClassCase,
  paddingEqualClassesCase,
  propStringCase,
  propVNodeCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  transitionClassCase,
} from "@/utils/test-case-factories";

describe("DDialog", () => {
  const content = "Plain string content";
  const wrapper = mount(DDialog, {
    props: {
      enableInline: true,
      content,
    },
  });

  it("Shouldn't render anything if props.isShown is falsy", async () => {
    await wrapper.setProps({ isShown: false });
    const dialogEl = wrapper.find(`.${config.class}`);
    expect(dialogEl.exists()).toBeFalsy();
  });

  it("Should render backdrop, container, default header and content if props.isShown is true", async () => {
    await wrapper.setProps({ isShown: true });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeTruthy();

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.exists()).toBeTruthy();

    const headerEl = wrapper.find(`.${config.headerClass}`);
    expect(headerEl.exists()).toBeTruthy();

    const contentEl = wrapper.find(`.${config.contentClass}`);
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

    const titleEl = wrapper.find(`.${config.titleClass}`);
    expect(titleEl.text()).toBe(title);
  });

  it("Should render props.titleClass to the title class list", async () => {
    const title = "Some title";
    const titleClass = "someTitleClass";
    await wrapper.setProps({ isShown: true, title, titleClass });

    const titleEl = wrapper.find(`.${config.titleClass}`);
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

    const titleEl = wrapper.find(`.${config.titleClass}`);
    expect(titleEl.classes()).toContain(className);
  });

  it("Should render props.content to the component element", async () => {
    const content = <b>Some html content</b>;
    await wrapper.setProps({ isShown: true, content });

    const contentEl = wrapper.find(`.${config.contentClass}`);
    expect(contentEl.html()).toMatchSnapshot();
  });

  it("Should render props.contentClass to the content class list", async () => {
    const contentClass = "someContentClass";
    await wrapper.setProps({ isShown: true, contentClass });

    const contentEl = wrapper.find(`.${config.contentClass}`);
    expect(contentEl.classes()).toContain(contentClass);
  });

  it("Should render props.contentFont to the content font class", async () => {
    const contentFont = FONT.HUGE;
    await wrapper.setProps({ isShown: true, contentFont });

    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      contentFont
    );

    const contentEl = wrapper.find(`.${config.contentClass}`);
    expect(contentEl.classes()).toContain(className);
  });

  it("Should props.minWidth to the component style as '--min-width: props.minWidth'", async () => {
    const minWidth = "45vw";
    await wrapper.setProps({ isShown: true, minWidth });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes("style")).toContain(`--min-width: ${minWidth}`);
  });

  it("Should props.maxWidth to the component style as '--max-width: props.maxWidth'", async () => {
    const maxWidth = "45vw";
    await wrapper.setProps({ isShown: true, maxWidth });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes("style")).toContain(`--max-width: ${maxWidth}`);
  });

  it("Should props.minHeight to the component style as '--min-height: props.minHeight'", async () => {
    const minHeight = "45vw";
    await wrapper.setProps({ isShown: true, minHeight });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes("style")).toContain(
      `--min-height: ${minHeight}`
    );
  });

  it("Should props.maxHeight to the component style as '--max-height: props.maxHeight'", async () => {
    const maxHeight = "45vw";
    await wrapper.setProps({ isShown: true, maxHeight });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes("style")).toContain(
      `--max-height: ${maxHeight}`
    );
  });

  colorSchemeClassCase(wrapper, `.${config.class}`, COLOR_SCHEME.DANGER);

  paddingEqualClassesCase(wrapper, `.${config.class}`);

  roundingClassCase(wrapper, `.${config.class}`);

  sizeClassCase(wrapper, `.${config.class}`);

  transitionClassCase(wrapper, `.${config.class}`);

  it("Should append the container to the props.target", async () => {
    const target = document.createElement("div");
    target.id = "custom-target";
    document.body.appendChild(target);

    const wrapper = mount(DDialog, {
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

    const wrapper = mount(DDialog, {
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

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes().role).toBe(role);
  });

  it("Should props.tag to the container tag", async () => {
    const tag = "article";
    await wrapper.setProps({ isShown: true, tag });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.element.tagName).toEqual(tag.toLocaleUpperCase());
  });

  it("Should render props.zIndex to the container style as '--z-index: props.zIndex'", async () => {
    const zIndex = 0.33;
    await wrapper.setProps({
      zIndex,
    });

    const drawerEl = wrapper.find(`.${config.class}`);
    expect(drawerEl.attributes("style")).toContain(`--z-index: ${zIndex}`);
  });

  it("Shouldn't render header if props.hideHeader is true", async () => {
    await wrapper.setProps({ hideHeader: true });

    const headerEl = wrapper.find(`.${config.headerClass}`);
    expect(headerEl.exists()).toBeFalsy();
  });

  it("Shouldn't render footer if props.hideFooter is true", async () => {
    await wrapper.setProps({ hideFooter: true });

    const footerEl = wrapper.find(`.${config.footerClass}`);
    expect(footerEl.exists()).toBeFalsy();
    await wrapper.setProps({ hideFooter: false });
  });

  propStringCase(wrapper);
  propVNodeCase(wrapper);

  it("Should emit close event on backdrop click", async () => {
    const wrapper = mount(DDialog, {
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
    const wrapper = mount(DDialog, {
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
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    const closeEl = wrapper.find(`.${config.closeButtonOptions.class}`);
    await closeEl.trigger("click");

    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("Should call props.whenClose on close button click", async () => {
    const whenClose = jest.fn();
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenClose,
      },
    });

    const closeEl = wrapper.find(`.${config.closeButtonOptions.class}`);
    await closeEl.trigger("click");

    expect(whenClose).toBeCalled();
  });

  it("Should emit close event on Escape button click", async () => {
    const wrapper = mount(DDialog, {
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
    const wrapper = mount(DDialog, {
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

  it("Should emit cancel event on cancel button click", async () => {
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    const cancelEl = wrapper.find(`.${config.cancelButtonOptions.class}`);
    await cancelEl.trigger("click");

    expect(wrapper.emitted("cancel")).toBeTruthy();
  });

  it("Should call props.whenCancel on cancel button click", async () => {
    const whenCancel = jest.fn();
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenCancel,
      },
    });

    const cancelEl = wrapper.find(`.${config.cancelButtonOptions.class}`);
    await cancelEl.trigger("click");

    expect(whenCancel).toBeCalled();
  });

  it("Should emit accept event on accept button click", async () => {
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
      },
    });

    const acceptEl = wrapper.find(`.${config.acceptButtonOptions.class}`);
    await acceptEl.trigger("click");

    expect(wrapper.emitted("accept")).toBeTruthy();
  });

  it("Should call props.whenAccept on accept button click", async () => {
    const whenAccept = jest.fn();
    const wrapper = mount(DDialog, {
      props: {
        isShown: true,
        enableInline: true,
        content,
        whenAccept,
      },
    });

    const acceptEl = wrapper.find(`.${config.acceptButtonOptions.class}`);
    await acceptEl.trigger("click");

    expect(whenAccept).toBeCalled();
  });

  slotCase(DDialog, `.${config.class}`, "default", {
    isShown: true,
    enableInline: true,
  });

  slotCase(DDialog, `.${config.headerClass}`, "header", {
    isShown: true,
    enableInline: true,
  });

  slotCase(DDialog, `.${config.footerClass}`, "footer", {
    isShown: true,
    enableInline: true,
  });

  // TODO: props. ...Options cases
});
