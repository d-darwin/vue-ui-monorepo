import { mount } from "@vue/test-utils";
// TODO: get @darwin-studio/ui-codegen paths from config.json
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: shorter path ???
import DNotification from "@/components/atoms/d-notification";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { propContentCase, contentHtmlCase } from "@/utils/test-case-factories";
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
    // The thing is the content doesn't appear immediately
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
  // TODO: closable
  // TODO: minWidth
  // TODO: maxWidth
  // TODO: minHeight
  // TODO: maxHeight
  // TODO: duration
  // TODO: notificationClass
  // TODO: target

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
  // TODO: type
  // TODO: padding
  // TODO: rounding
  // TODO: size
  // TODO: transition

  it("Should render as element passed in props.tag", async () => {
    const tag = "section";
    await wrapper.setProps({ tag });

    const notificationEl = wrapper.find(`.${config.className}`);
    expect(notificationEl.element.tagName).toEqual(tag.toLocaleUpperCase());
  });

  // TODO: on\whenClose
});
