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

  baseClassCase(wrapper, config.detailsClassName);
  paddingEqualClassesCase(wrapper, `.${config.detailsClassName}`);

  propStringCase(wrapper, `.${config.summaryClassName}`, "summary");
  propVNodeCase(wrapper, `.${config.summaryClassName}`, "summary");
  slotCase(DDetails, `.${config.summaryClassName}`, "summary");
  outlineClassCase(
    wrapper,
    `.${config.summaryClassName}`,
    COLOR_SCHEME.INVERSE,
    SIZE.TINY
  );
  it("Should merge props from props.summaryOptions and SUMMARY_DEFAULTS to the summary element attrs", async () => {
    const externalClass = "some-external-class";
    const wrapper = mount(DDetails, {
      props: {
        summary: "not empty",
        summaryOptions: {
          class: externalClass,
        },
      },
    });

    const summaryEl = wrapper.find(`.${config.summaryClassName}`);
    expect(summaryEl.classes()).toContain(externalClass);
  });

  it("Shouldn't render default dropdown mark if props.hideSummaryAfter is true", async () => {
    await wrapper.setProps({ hideSummaryAfter: true });
    const afterSummaryEl = wrapper.find(`.${config.summaryAfterClassName}`);
    expect(afterSummaryEl.exists()).toBeFalsy();
    await wrapper.setProps({ hideSummaryAfter: false });
  });

  it("Should render default dropdown mark if props.hideSummaryAfter is falsy", async () => {
    await wrapper.setProps({ hideSummaryAfter: false });
    const afterSummaryEl = wrapper.find(`.${config.summaryAfterClassName}`);
    expect(afterSummaryEl.exists()).toBeTruthy();
    await wrapper.setProps({ hideSummaryAfter: true });
  });
  slotCase(DDetails, `.${config.summaryClassName}`, "summaryAfter");

  propStringCase(wrapper, `.${config.contentClassName}`, "content");
  propVNodeCase(wrapper, `.${config.contentClassName}`, "content");
  slotCase(DDetails, `.${config.contentClassName}`, "default");
  transitionClassCase(wrapper, `.${config.contentClassName}`, {
    content: "Not empty",
  });
  it("Should merge props from props.contentOptions and CONTENT_DEFAULTS to the content element attrs", async () => {
    const externalClass = "some-external-class";
    const wrapper = mount(DDetails, {
      props: {
        content: "not empty",
        contentOptions: {
          class: externalClass,
        },
      },
    });

    const contentEl = wrapper.find(`.${config.contentClassName}`);
    expect(contentEl.classes()).toContain(externalClass);
  });

  it("Should render height eq to 0, if props.open is false", async () => {
    await wrapper.setProps({ open: false, content: "Not empty" });
    const contentEl = wrapper.find(`.${config.contentClassName}`);
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
    `.${config.detailsClassName}`,
    COLOR_SCHEME.SECONDARY,
    {
      content: "Not empty",
    }
  );
  fontSizeClassCase(wrapper, `.${config.detailsClassName}`);
  roundingClassCase(wrapper, `.${config.detailsClassName}`, {
    content: "Not empty",
  });
  sizeClassCase(wrapper, `.${config.detailsClassName}`, {
    content: "Not empty",
  });
  transitionClassCase(wrapper, `.${config.detailsClassName}`, {
    content: "Not empty",
  });

  it("Should emit onToggle event on the summary click", async () => {
    const wrapper = shallowMount(DDetails, { props: { open: false } });
    const summaryEl = wrapper.find(`.${config.summaryClassName}`);
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(wrapper.emitted("toggle")?.[0]).toBeTruthy();
    expect(wrapper.emitted("update:open")?.[0]).toStrictEqual([true]);

    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(wrapper.emitted("toggle")?.[1]).toBeTruthy();
    expect(wrapper.emitted("update:open")?.[1]).toStrictEqual([false]);
  });

  it("Should call passed props.whenToggle on the summary click", async () => {
    const whenToggle = jest.fn();
    const wrapper = shallowMount(DDetails, {
      props: { whenToggle, open: false },
    });
    const summaryEl = wrapper.find(`.${config.summaryClassName}`);
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(whenToggle).toHaveBeenCalledWith(
      expect.objectContaining({ isTrusted: false }),
      true
    );

    await whenToggle.mockReset();
    await summaryEl.trigger("click");
    await sleep(wrapper.vm.transitionDuration);
    expect(whenToggle).toHaveBeenCalledWith(
      expect.objectContaining({ isTrusted: false }),
      false
    );
  });
});
