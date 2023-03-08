import { mount } from "@vue/test-utils";
import DDialog from "@/components/organisms/d-dialog";
import config from "@/components/organisms/d-dialog/config";
import DBackdrop from "@/components/atoms/d-backdrop";

describe("DDialog", () => {
  const content = "Plain string content";
  const wrapper = mount(DDialog, {
    props: {
      isShown: false,
      enableInline: true,
      content,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      whenClose: () => {},
    },
  });

  it("Shouldn't render anything if props.isShown is falsy", async () => {
    await wrapper.setProps({ isShown: false, content });
    const dialogEl = wrapper.find(`.${config.className}`);
    expect(dialogEl.exists()).toBeFalsy();
  });

  it("Should render backdrop, container, default header and content if props.isShown is true", async () => {
    await wrapper.setProps({ isShown: true, content });

    const backdrop = wrapper.findComponent(DBackdrop);
    expect(backdrop.exists()).toBeTruthy();

    const drawerEl = wrapper.find(`.${config.className}`);
    expect(drawerEl.exists()).toBeTruthy();

    const headerEl = wrapper.find(`.${config.headerClassName}`);
    expect(headerEl.exists()).toBeTruthy();

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.text()).toBe(content);
  });
});
