import { mount } from "@vue/test-utils";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DNotification from "@/components/atoms/d-notification";
import { TYPE } from "@/components/atoms/d-notification/constants";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import {
  propContentCase,
  contentHtmlCase,
  colorSchemeClassCase,
  paddingEqualClassesCase,
  roundingClassCase,
  sizeClassCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import { sleep } from "@/utils/sleep";
import { POSITION } from "@/constants/position";
import config from "./config";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";

describe("DNotification", () => {
  const content = "Some content";
  const wrapper = mount(DNotification, {
    props: {
      disabled: true, // Turn of the Teleport
      content,
      duration: 0, // Do not hide automatically
    },
  });

  beforeEach(async () => {
    // The thing is the content doesn't appear immediately due to this.show() implementation
    await wrapper.vm.$nextTick();
  });

  it(`Renders ${config.className} class name`, async () => {
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl?.classes()).toContain(config.className);
  });

  propContentCase(wrapper);

  contentHtmlCase(wrapper);

  it("Renders $slots.default", async () => {
    const slotContent = `<div>Some <b>slot</b> content</div>`;
    const wrapper = mount(DNotification, {
      props: {
        disabled: true,
      },
      slots: {
        default: slotContent,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.html()).toMatch(slotContent);
  });

  it("Should render the position class depend on props.position", async () => {
    const position = POSITION.BOTTOM_LEFT;
    await wrapper.setProps({ position });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.classes()).toContain(position);
  });

  it("Should add min-width style if props.minWidth is set", async () => {
    const minWidth = 120;
    await wrapper.setProps({ minWidth });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.attributes()?.style).toContain(
      "min-width: " + minWidth + "px"
    );
  });

  it("Should add max-width style if props.maxWidth is set", async () => {
    const maxWidth = "33%";
    await wrapper.setProps({ maxWidth });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.attributes()?.style).toContain(
      "max-width: " + maxWidth
    );
  });

  it("Should add min-height style if props.minHeight is set", async () => {
    const minHeight = 240;
    await wrapper.setProps({ minHeight });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.attributes()?.style).toContain(
      "min-height: " + minHeight + "px"
    );
  });

  it("Should add max-height style if props.maxHeight is set", async () => {
    const maxHeight = "10vh";
    await wrapper.setProps({ maxHeight });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.attributes()?.style).toContain(
      "max-height: " + maxHeight
    );
  });

  it("Should close manually on click if props.closable is true", async () => {
    const wrapper = mount(DNotification, {
      props: {
        disabled: true,
        closable: true,
      },
    });

    await wrapper.vm.$nextTick();
    let notificationEl = wrapper.find(`.${config.className}`);
    await notificationEl.trigger("click");

    notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.exists()).toBeFalsy();
  });

  it("Should not close manually on click if props.closable is false", async () => {
    await wrapper.setProps({ closable: false });
    let notificationEl = wrapper.find(`.${config.className}`);
    await notificationEl.trigger("click");

    notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.exists()).toBeTruthy();
  });

  it("Should not close automatically if props.duration is falsy", async () => {
    const duration = 0;
    const wrapper = mount(DNotification, {
      props: {
        disabled: true,
        duration,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.timeoutId).toBeFalsy();
  });

  it("Should close automatically after props.duration seconds", async () => {
    const duration = 0.1;
    const wrapper = mount(DNotification, {
      props: {
        disabled: true,
        duration,
      },
    });
    const closeSpy = jest.spyOn(wrapper.vm, "close");

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.timeoutId).toBeTruthy();

    const delta = 0.01;
    await sleep((duration + delta) * 1000);
    await wrapper.vm.$nextTick();
    expect(closeSpy).toBeCalled();
  });

  it("Should render props.notificationClass to the notification class list", async () => {
    const notificationClass = "some-custom-class";
    await wrapper.setProps({ notificationClass });

    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.classes()).toContain(notificationClass);
  });

  it("Should append the notification to the props.target", async () => {
    const target = document.createElement("div");
    target.id = "custom-target";
    document.body.appendChild(target);
    const wrapper = mount(DNotification, {
      attachTo: document.body,
      props: {
        target,
      },
    });

    await wrapper.vm.$nextTick();
    expect(document.body.innerHTML).toMatchSnapshot(); // TODO: find a better way
  });

  it("Should props.type to the type class of the notification", async () => {
    const type = TYPE.WARNING;
    await wrapper.setProps({ type });

    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.classes()).toContain(type);
  });

  colorSchemeClassCase(wrapper, `.${config.className}`, COLOR_SCHEME.DANGER);

  paddingEqualClassesCase(wrapper, `.${config.className}`);

  roundingClassCase(wrapper, `.${config.className}`);

  sizeClassCase(wrapper, `.${config.className}`);

  transitionClassCase(wrapper, `.${config.className}`);

  it("Should render as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });

    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.element.tagName).toEqual(tag.toLocaleUpperCase());
  });

  /*
  // TODO: onClose
  it("Should emits close event on close", async () => {
    expect(true).toBeFalsy();
  });

  // TODO: whenClose
  it("Should call props.whenClose when passed", async () => {
    expect(true).toBeFalsy();
  });*/

  it("Should call clearTimeout on unmount", async () => {
    window.clearTimeout = jest.fn();
    const wrapper = mount(DNotification, {
      props: {
        disabled: true,
      },
    });
    await wrapper.unmount();

    await wrapper.vm.$nextTick();
    expect(window.clearTimeout).toBeCalled();
  });
});
