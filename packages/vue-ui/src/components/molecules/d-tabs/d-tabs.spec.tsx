import { mount } from "@vue/test-utils";
import { baseClassCase, tagCase } from "@/utils/test-case-factories";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { DTabs, DTab, DTabpanel } from "./index";
import config from "./config";

// TODO: move to the config
jest.mock("chalk", () => ({
  greenBright: jest.fn(),
  red: jest.fn(),
  yellowBright: jest.fn(),
}));

describe("DTabs", () => {
  const wrapper = mount(DTabs);

  baseClassCase(wrapper, config.tabsClass);

  it("Should render config.tablistClassName to the tablist's class name", () => {
    const tablist = wrapper.find(`.${config.tablistClass}`);
    expect(tablist).toBeTruthy();
  });

  it("Should render props.tablistLabel to the tablist's aria-label attr", async () => {
    const tablistLabel = "Some aria label";
    await wrapper.setProps({ tablistLabel });
    const tablist = wrapper.find(`.${config.tablistClass}`);
    expect(tablist.attributes("aria-label")).toBe(tablistLabel);
  });

  it("Should props.tablistClass to the tablist's class name", async () => {
    const tablistClass = "some-tablist-class";
    await wrapper.setProps({ tablistClass });
    const tablist = wrapper.find(`.${config.tablistClass}`);
    expect(tablist.classes()).toContain(tablistClass);
  });

  it("Should render props.tabs as content of the tablist", async () => {
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel id="111-1" active={true} content={"Tabpanel 1"} />,
          <DTabpanel id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tablist = wrapper.find(`.${config.tablistClass}`);
    const tabs = tablist.findAllComponents(DTab);
    expect(tabs?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabs?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should render slots.tabs as content of the tablist", async () => {
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      slots: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel id="111-1" active={true} content={"Tabpanel 1"} />,
          <DTabpanel id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tablist = wrapper.find(`.${config.tablistClass}`);
    const tabs = tablist.findAllComponents(DTab);
    expect(tabs?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabs?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should pass props.tabSize as props.size to containing DTab components", async () => {
    const tabsSize = SIZE.LARGE;
    await wrapper.setProps({
      tabsSize,
      tabs: [<DTab id="111" active={true} content={"Tab 1"} />],
    });
    const tabWrapper = wrapper.findComponent(DTab);
    expect(tabWrapper.props("size")).toBe(tabsSize);
  });

  it("Should pass autogenerated id to containing DTab components if props.id not passed to the DTab", async () => {
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab active={true} content={"Tab 1"} />],
      },
    });
    const id = wrapper.vm?.ids?.[0];
    const tabWrapper = wrapper.findComponent(DTab);
    expect(tabWrapper.attributes("id")).toBe(id?.tabId);
  });

  it("Should pass DTabpanel's prop.id to the corresponding DTab as prop.tabpanelId", async () => {
    const tabpanelId = "tabpanel-id-1";
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab content={"Tab 1"} />],
        tabpanels: [<DTabpanel id={tabpanelId} content={"some content"} />],
      },
    });
    const tabWrapper = wrapper.findComponent(DTab);
    expect(tabWrapper.props("tabpanelId")).toBe(tabpanelId);
  });

  it("Should render props.tabpanels as content of the list of tabpanels", async () => {
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel id="111-1" active={true} content={"Tabpanel 1"} />,
          <DTabpanel id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tabpanels = wrapper.findAllComponents(DTabpanel);
    expect(tabpanels?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabpanels?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should render slots.tabpanels as content of the list of tabpanels", async () => {
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      slots: {
        tabs: [
          <DTab id="111" tabpanelId="111-1" active={true} content={"Tab 1"} />,
          <DTab id="222" tabpanelId="222-2" content={"Tab 2"} />,
        ],
        tabpanels: [
          <DTabpanel id="111-1" active={true} content={"Tabpanel 1"} />,
          <DTabpanel id="222-2" content={"Tabpanel 2"} />,
        ],
      },
    });

    const tabpanels = wrapper.findAllComponents(DTabpanel);
    expect(tabpanels?.[0]?.element).toMatchSnapshot(); // TODO: find out other way to compare
    expect(tabpanels?.[1]?.element).toMatchSnapshot(); // TODO: find out other way to compare
  });

  it("Should pass props.tabpanelsFont as props.font to containing DTabpanel components", async () => {
    const tabpanelsFont = FONT.SMALL;
    await wrapper.setProps({
      tabpanelsFont,
      tabpanels: [<DTabpanel id="222" tabId="222-2" content={"Tabpanel 2"} />],
    });
    const tabpanel = wrapper.findComponent(DTabpanel);
    expect(tabpanel.props("font")).toBe(tabpanelsFont);
  });

  it("Should pass autogenerated id to containing DTabpanel components if not passed", async () => {
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab content={"Tab 1"} />],
        tabpanels: [<DTabpanel content={"Tabpanel 1"} />],
      },
    });
    const id = wrapper.vm?.ids?.[0];
    const tabpanelWrapper = wrapper.findComponent(DTabpanel);
    expect(tabpanelWrapper.attributes("id")).toBe(id?.tabpanelId);
  });

  it("Should pass DTab's prop.id to the corresponding DTabpanel as prop.tabId", async () => {
    const tabId = "tab-id-1";
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab id={tabId} content={"Tab 1"} />],
        tabpanels: [<DTabpanel content={"some content"} />],
      },
    });
    const tabpanelWrapper = wrapper.findComponent(DTabpanel);
    expect(tabpanelWrapper.props("tabId")).toBe(tabId);
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
    expect(tabs[0]?.props("disabled")).toBe(disabled);
    expect(tabs[1]?.props("disabled")).toBe(false);
  });

  // TODO paddingClassesCase(wrapper, wrapper.findComponent(DTab));
  it(`Should render props.padding to DTab padding classes`, async () => {
    const padding = PADDING.EQUAL;
    const wrapper = await mount(DTabs, {
      props: {
        padding,
        tabs: [<DTab content={"Tab 1"} />],
      },
    });
    const tab = wrapper.findComponent(DTab);
    expect(tab.props("padding")).toBe(padding);
  });

  // TODO: transitionClassCase(wrapper, wrapper.findComponent(DTab))
  it(`Should render props.transition to DTab transition class`, async () => {
    const transition = TRANSITION.AVERAGE;
    // TODO: without mounting new component ???
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO
    const wrapper = await mount(DTabs, {
      props: {
        transition,
        tabs: [<DTab content={"Tab 1"} />],
      },
    });
    const tab = wrapper.findComponent(DTab);
    expect(tab.props("transition")).toBe(transition);
  });

  tagCase(wrapper);

  it("Should render tablist as element passed in props.tablistTag", async () => {
    const tablistTag = "section";
    await wrapper.setProps({ tablistTag });
    const tablist = wrapper.find(`.${config.tablistClass}`);
    expect(tablist.element.tagName).toEqual(tablistTag.toLocaleUpperCase());
  });

  it("Should focus on prev tab on ArrowLeft keydown", async () => {
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab content={"Tab 1"} />, <DTab content={"Tab 2"} />],
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
    // TODO: without mounting new component ???
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [<DTab content={"Tab 1"} />, <DTab content={"Tab 2"} />],
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

  it("Should call focused tab props.whenClick on Enter", async () => {
    // TODO: without mounting new component ???
    const whenClick0 = jest.fn();
    const whenClick1 = jest.fn();
    const wrapper = await mount(DTabs, {
      props: {
        tabs: [
          <DTab content={"Tab 1"} whenClick={whenClick0} />,
          <DTab content={"Tab 2"} whenClick={whenClick1} />,
        ],
      },
    });

    const tabs = wrapper.findAllComponents(DTab);
    const tab0 = tabs?.[0];
    const tab1 = tabs?.[1];

    await tab0?.trigger("focus");
    await tab0?.trigger("keydown", { key: "Enter" });
    expect(whenClick0).toBeCalled();

    await tab1?.trigger("focus");
    await tab1?.trigger("keydown", { key: "Enter" });
    expect(whenClick1).toBeCalled();
  });

  // TODO: Should following to be a part of the DTabs component:
  // DTabpanel.active ???
  // DTab.active ???
  // DTab.onClick ???
  // DTab.whenClick ???
});
