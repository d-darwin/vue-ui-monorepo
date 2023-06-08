import { mount } from "@vue/test-utils";
import { baseClassCase, tagCase } from "@/utils/test-case-factories";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { DTabs, DTab, DTabpanel } from "./index";
import config from "./config";

jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabs", () => {
  const wrapper = mount(DTabs);

  baseClassCase(wrapper, config.tabsClass);

  it("Should render config.tablistOptions.className to the tablist class name", () => {
    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    expect(tablist).toBeTruthy();
  });

  it("Should render props.tablistLabel to the tablist aria-label attr", async () => {
    const tablistLabel = "Some aria label";
    await wrapper.setProps({
      tablistOptions: { ["aria-label"]: tablistLabel },
    });
    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    expect(tablist.attributes("aria-label")).toBe(tablistLabel);
  });

  it("Should props.tablistOptions.class to the tablist class name", async () => {
    const tablistClass = "some-tablist-class";
    await wrapper.setProps({ tablistOptions: { class: tablistClass } });
    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    expect(tablist.classes()).toContain(tablistClass);
  });

  it("Should render props.tabs as content of the tablist", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      props: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel tabId="111" active={true} content={"Tabpanel 1"} />,
          <DTabpanel tabId="222" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    const tabs = tablist.findAllComponents(DTab);
    expect(tabs?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabs?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should render slots.tabs as content of the tablist", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      slots: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel
            tabId="111"
            id="111-1"
            active={true}
            content={"Tabpanel 1"}
          />,
          <DTabpanel tabId="222" id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    const tabs = tablist.findAllComponents(DTab);
    expect(tabs?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabs?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should inject props.size to commonProps.size of containing DTab components", async () => {
    const size = SIZE.LARGE;
    await wrapper.setProps({
      size,
      tabs: [<DTab id="111" active={true} content={"Tab 1"} />],
    });
    const tabWrapper = wrapper.findComponent(DTab);
    expect(tabWrapper.vm.commonProps?.size).toBe(size);
  });

  it("Should render props.tabpanels as content of the list of tabpanels", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      props: {
        tabs: [
          <DTab id="111" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel tabId="111" active={true} content={"Tabpanel 1"} />,
          <DTabpanel tabId="222" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tabpanels = wrapper.findAllComponents(DTabpanel);
    expect(tabpanels?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabpanels?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should render slots.tabpanels as content of the list of tabpanels", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      slots: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel
            tabId="111"
            id="111-1"
            active={true}
            content={"Tabpanel 1"}
          />,
          <DTabpanel tabId="222" id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tabpanels = wrapper.findAllComponents(DTabpanel);
    expect(tabpanels?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabpanels?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should inject props.size to commonProps.size of the DTabpanel components", async () => {
    const size = FONT.SMALL;
    await wrapper.setProps({
      size,
      tabpanels: [<DTabpanel id="222" tabId="222-2" content={"Tabpanel 2"} />],
    });
    const tabpanelWrapper = wrapper.findComponent(DTabpanel);
    expect(tabpanelWrapper.vm.commonProps?.size).toBe(size);
  });

  it("Should pass props.disabled to the containing DTabs", async () => {
    const disabled = true;
    await wrapper.setProps({
      disabled,
      tabs: [
        <DTab id="111" active={true} content={"Tab 1"} />,
        <DTab id="222" disabled={false} content={"Tab 2"} />,
      ],
    });
    const tabs = wrapper.findAllComponents(DTab);
    expect(tabs[0]?.vm.commonProps.disabled).toBe(disabled);
    expect(tabs[1]?.vm.commonProps.disabled).toBe(true);
  });

  // TODO paddingClassesCase(wrapper, wrapper.findComponent(DTab));
  it(`Should render props.padding to DTab padding classes`, async () => {
    const padding = PADDING.EQUAL;
    const wrapper = mount(DTabs, {
      props: {
        padding,
        tabs: [<DTab id="not empty" content={"Tab 1"} />],
      },
    });
    const tab = wrapper.findComponent(DTab);
    expect(tab.vm.commonProps.padding).toBe(padding);
  });

  // TODO: transitionClassCase(wrapper, wrapper.findComponent(DTab))
  it(`Should render props.transition to DTab transition class`, async () => {
    const transition = TRANSITION.AVERAGE;
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      props: {
        transition,
        tabs: [<DTab id={4345345345345} content={"Tab 1"} />],
      },
    });
    const tab = wrapper.findComponent(DTab);
    expect(tab.vm.commonProps.transition).toBe(transition);
  });

  tagCase(wrapper);

  it("Should render tablist as element passed in props.tablistTag", async () => {
    const tablistTag = "section";
    await wrapper.setProps({ tablistTag });
    const tablist = wrapper.find(`.${config.tablistOptions.class}`);
    expect(tablist.element.tagName).toEqual(tablistTag.toLocaleUpperCase());
  });

  it("Should focus on prev tab on ArrowLeft keydown", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      props: {
        tabs: [
          <DTab id={12} content={"Tab 1"} />,
          <DTab id={23} content={"Tab 2"} />,
        ],
      },
    });

    const tabs = wrapper.findAllComponents(DTab);
    const tab0 = tabs?.[0];
    tab0.vm.$el.focus = jest.fn();
    const tab1 = tabs?.[1];
    tab1.vm.$el.focus = jest.fn();

    await tab0?.trigger("focus");
    await tab0?.trigger("keydown", { key: "ArrowLeft" });
    expect(tab1.vm.$el.focus).toBeCalled();

    await tab1?.trigger("focus");
    await tab1?.trigger("keydown", { key: "ArrowLeft" });
    expect(tab0.vm.$el.focus).toBeCalled();
  });

  it("Should focus on next tab on ArrowRight keydown", async () => {
    // TODO: reactivity is broken ???
    const wrapper = mount(DTabs, {
      props: {
        tabs: [
          <DTab id={1} content={"Tab 1"} />,
          <DTab id={2} content={"Tab 2"} />,
        ],
      },
    });

    const tabs = wrapper.findAllComponents(DTab);
    const tab0 = tabs?.[0];
    tab0.vm.$el.focus = jest.fn();
    const tab1 = tabs?.[1];
    tab1.vm.$el.focus = jest.fn();

    await tab0?.trigger("focus");
    await tab0?.trigger("keydown", { key: "ArrowRight" });
    expect(tab1.vm.$el.focus).toBeCalled();

    await tab1?.trigger("focus");
    await tab1?.trigger("keydown", { key: "ArrowRight" });
    expect(tab0.vm.$el.focus).toBeCalled();
  });

  it("Should call props.whenChange with focused tab id on Enter", async () => {
    // TODO: reactivity is broken ???
    const whenChange = jest.fn();
    const tabId0 = "a";
    const tabId1 = "b";
    const wrapper = mount(DTabs, {
      props: {
        tabs: [
          <DTab id={tabId0} content={"Tab 1"} />,
          <DTab id={tabId1} content={"Tab 2"} />,
        ],
        whenChange,
      },
    });

    const tabs = wrapper.findAllComponents(DTab);
    const tab0 = tabs?.[0];
    const tab1 = tabs?.[1];

    await tab0?.trigger("focus");
    await tab0?.trigger("keydown", { key: "Enter" });
    expect(whenChange).toBeCalledWith(tabId0);

    await tab1?.trigger("focus");
    await tab1?.trigger("keydown", { key: "Enter" });
    expect(whenChange).toBeCalledWith(tabId1);
  });

  it("Shouldn't do anything on keydown if there are less than 2 DTabs", async () => {
    const whenChange = jest.fn();
    const wrapper = mount(DTabs, {
      props: {
        tabs: [<DTab id={12} content={"Tab 1"} />],
        whenChange,
      },
    });

    const tab = wrapper.findComponent(DTab);
    await tab?.trigger("focus");
    await tab?.trigger("keydown", { key: "Enter" });
    expect(whenChange).not.toHaveBeenCalled();
  });

  it("Shouldn't do anything on keydown if DTabs haven't id", async () => {
    const whenChange = jest.fn();
    const wrapper = mount(DTabs, {
      props: {
        tabs: [<DTab content={"Tab 1"} />, <DTab content={"Tab 2"} />],
        whenChange,
      },
    });

    const tab = wrapper.findComponent(DTab);
    await tab?.trigger("focus");
    await tab?.trigger("keydown", { key: "Enter" });
    await tab?.trigger("keydown", { key: "ArrowLeft" });
    await tab?.trigger("keydown", { key: "ArrowRight" });
    expect(whenChange).not.toHaveBeenCalled();
  });

  // TODO: Should following to be a part of the DTabs component:
  // DTabpanel.active ???
  // DTab.active ???
  // DTab.onClick ???
  // DTab.whenClick ???
});
