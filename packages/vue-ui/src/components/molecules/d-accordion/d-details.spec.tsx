import { mount, shallowMount } from "@vue/test-utils";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import {
  baseClassCase,
  colorSchemeClassCase,
  fontSizeClassCase,
  outlineClassCase,
  paddingEqualClassesCase,
  propStringCase,
  propVNodeCase,
  roundingClassCase,
  sizeClassCase,
  slotCase,
  transitionClassCase,
} from "@/utils/test-case-factories";
import DDetails from "./d-details";
import config from "./config";
import sleep from "@/utils/sleep";

describe("DDetails", () => {
  const wrapper = shallowMount(DDetails);

  baseClassCase(wrapper, config.details.class);
  paddingEqualClassesCase(wrapper, `.${config.details.class}`);

  propStringCase(wrapper, `.${config.summaryOptions.class}`, "summary");
  propVNodeCase(wrapper, `.${config.summaryOptions.class}`, "summary");
  slotCase(DDetails, `.${config.summaryOptions.class}`, "summary");
  outlineClassCase(
    wrapper,
    `.${config.summaryOptions.class}`,
    COLOR_SCHEME.INVERSE,
    SIZE.TINY
  );
  it("Should merge props from props.summaryOptions and config.summaryOptions to the summary element attrs", async () => {
    const externalClass = "some-external-class";
    const wrapper = mount(DDetails, {
      props: {
        summary: "not empty",
        summaryOptions: {
          class: externalClass,
        },
      },
    });

    const summaryEl = wrapper.find(`.${config.summaryOptions.class}`);
    expect(summaryEl.classes()).toContain(externalClass);
  });

  it("Shouldn't render default dropdown mark if props.hideSummaryAfter is true", async () => {
    await wrapper.setProps({ hideSummaryAfter: true });
    const afterSummaryEl = wrapper.find(`.${config.summaryAfterOptions.class}`);
    expect(afterSummaryEl.exists()).toBeFalsy();
    await wrapper.setProps({ hideSummaryAfter: false });
  });

  it("Should render default dropdown mark if props.hideSummaryAfter is falsy", async () => {
    await wrapper.setProps({ hideSummaryAfter: false });
    const afterSummaryEl = wrapper.find(`.${config.summaryAfterOptions.class}`);
    expect(afterSummaryEl.exists()).toBeTruthy();
    await wrapper.setProps({ hideSummaryAfter: true });
  });
  slotCase(DDetails, `.${config.summaryOptions.class}`, "summaryAfter");

  propStringCase(wrapper, `.${config.contentOptions.class}`, "content");
  propVNodeCase(wrapper, `.${config.contentOptions.class}`, "content");
  slotCase(DDetails, `.${config.contentOptions.class}`, "default");
  transitionClassCase(wrapper, `.${config.contentOptions.class}`, {
    content: "Not empty",
  });
  it("Should merge props from props.contentOptions and config.contentOptions to the content element attrs", async () => {
    const externalClass = "some-external-class";
    const wrapper = mount(DDetails, {
      props: {
        content: "not empty",
        contentOptions: {
          class: externalClass,
        },
      },
    });

    const contentEl = wrapper.find(`.${config.contentOptions.class}`);
    expect(contentEl.classes()).toContain(externalClass);
  });

  it("Should render height eq to 0, if props.open is false", async () => {
    await wrapper.setProps({ open: false, content: "Not empty" });
    const contentEl = wrapper.find(`.${config.contentOptions.class}`);
    expect(contentEl.attributes("style")).toContain(`height: 0`);
  });

  it("Should change data.innerOpen according to props.open", async () => {
    const open = false;
    await wrapper.setProps({ open });
    expect(wrapper.vm.innerOpen).toBe(open);

    await wrapper.setProps({ open: !open });
    await sleep(wrapper.vm.transitionDuration);
    expect(wrapper.vm.innerOpen).toBe(!open);
  });

  colorSchemeClassCase(
    wrapper,
    `.${config.details.class}`,
    COLOR_SCHEME.SECONDARY,
    {
      content: "Not empty",
    }
  );
  fontSizeClassCase(wrapper, `.${config.details.class}`);
  roundingClassCase(wrapper, `.${config.details.class}`, {
    content: "Not empty",
  });
  sizeClassCase(wrapper, `.${config.details.class}`, {
    content: "Not empty",
  });
  transitionClassCase(wrapper, `.${config.details.class}`, {
    content: "Not empty",
  });

  it("Should emit onToggle event on the summary click", async () => {
    const wrapper = shallowMount(DDetails, { props: { open: false } });
    const summaryEl = wrapper.find(`.${config.summaryOptions.class}`);
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(wrapper.emitted("toggle")?.[0]).toBeTruthy();
    expect(wrapper.emitted("update:open")?.[0]).toStrictEqual([true]);

    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(wrapper.emitted("toggle")?.[1]).toBeTruthy();
    expect(wrapper.emitted("update:open")?.[1]).toStrictEqual([false]);
  });

  it("Should call passed props.whenChange on the summary click", async () => {
    const whenChange = jest.fn();
    const id = "some-id";
    const wrapper = mount(DDetails, {
      props: { whenChange, open: false, id },
    });
    const summaryEl = wrapper.find(`.${config.summaryOptions.class}`);
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(whenChange).toHaveBeenCalledWith(id, true);

    await whenChange.mockReset();
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(whenChange).toHaveBeenCalledWith(id, false);
  });
});
