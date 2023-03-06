import { shallowMount } from "@vue/test-utils";
import DDrawer from "@/components/organisms/d-drawer";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "@/components/molecules/d-table/config";

describe("DTable", () => {
  const wrapper = shallowMount(DDrawer);

  baseClassCase(wrapper, config.className);

  // TODO: props.isShown
  it("Shouldn't render anything if props.isShown is falsy", async () => {
    expect(true).toBe(false);
  });

  it("Shouldn't render default header and content if props.isShown is true", async () => {
    expect(true).toBe(false);
  });

  // TODO: props.title
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
  });
});
