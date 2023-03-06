import { mount } from "@vue/test-utils";
import DDrawer from "@/components/organisms/d-drawer";
import config from "@/components/organisms/d-drawer/config";

describe("DTable", () => {
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
    await wrapper.setProps({ content });
    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeFalsy();
  });

  it("Shouldn't render default header and content if props.isShown is true", async () => {
    await wrapper.setProps({ isShown: true, content });
    console.log(wrapper.html());

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeTruthy();

    const headerEl = wrapper.find(`.${config.headerClassName}`);
    expect(headerEl.exists()).toBeTruthy();

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.text()).toBe(content);
  });

  /*  // TODO: props.title
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.titleClass
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.titleFont
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.content
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.contentClass
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.contentFont
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.contentRole
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.contentTag
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.position
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.width
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.height
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.target
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.colorScheme
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.padding
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.rounding
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.size
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.transition
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.role
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.tag
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.zIndex
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.hideHeader
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.enableInline
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.enableHtml
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });
  // TODO: props.whenClose onClose
  it("Shouldn ...", async () => {
    expect(true).toBe(false);
  });*/
});
