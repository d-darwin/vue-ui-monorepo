import { mount } from "@vue/test-utils";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DNotification from "@/components/atoms/d-notification";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { propContentCase, contentHtmlCase } from "@/utils/test-case-factories";
import { POSITION } from "@/constants/position";
import config from "./config";

describe("DNotification", () => {
  const content = "Some content";
  const wrapper = mount(DNotification, {
    props: {
      disabled: true, // Turn of the Teleport
      content,
      duration: 0,
    },
    global: {
      stubs: {
        transition: true,
      },
    },
  });

  beforeEach(async () => {
    // The thing is the content doesn't appear immediately due to this.show() implementation
    await wrapper.vm.$nextTick();
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

  // TODO: position
  it("Should render the position class depend on props.position", async () => {
    const position = POSITION.BOTTOM_LEFT;
    await wrapper.setProps({ position });
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.classes()).toContain(position);
  });
  // TODO: minWidth
  /*  it("Should add min-width style if props.minWidth is set", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: maxWidth
  it("Should add max-width style if props.maxWidth is set", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: minHeight
  it("Should add min-height style if props.minHeight is set", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: maxHeight
  it("Should add max-height style if props.maxHeight is set", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: closable
  it("Should close manually on click if props.closable is true", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: duration
  it("Should close automatically after props.duration seconds", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: notificationClass
  it("Should render props.notificationClass to the notification class list", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: target
  it("Should append the notification to the props.target", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: type
  it("Should props.type to the type class of the notification", async () => {
    expect(true).toBeFalsy();
  });

  it("Renders props.font to font class when passed", async () => {
    const font = FONT.HUGE;
    await wrapper.setProps({ font });
    const className = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      font
    );

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl?.classes()).toContain(className);
  });

  // TODO: colorScheme
  it("Should props.colorScheme to the colorScheme class of the notification", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: padding
  it("Should props.padding to the padding class of the notification", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: rounding
  it("Should props.rounding to the rounding class of the notification", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: size
  it("Should props.size to the size class of the notification", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: transition
  it("Should props.transition to the transition class of the notification", async () => {
    expect(true).toBeFalsy();
  });

  it("Should render as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });

    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.element.tagName).toEqual(tag.toLocaleUpperCase());
  });

  // TODO: onClose
  it("Should emits close event on close", async () => {
    expect(true).toBeFalsy();
  });
  // TODO: whenClose
  it("Should call props.whenClose when passed", async () => {
    expect(true).toBeFalsy();
  });*/
});
