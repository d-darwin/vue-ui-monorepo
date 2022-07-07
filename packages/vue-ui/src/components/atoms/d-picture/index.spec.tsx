import { shallowMount } from "@vue/test-utils";
import DPicture from "@/components/atoms/d-picture";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";

describe("DPicture", () => {
  const wrapper = shallowMount(DPicture);

  // TODO: is it right behaviour???
  it("Shouldn't render if there is no props.source", () => {
    expect(wrapper.html()).toBeFalsy();
  });

  // TODO: Renders as <img> if the sours is a plain string
  it("Should render as <img> if props.source is a string", async () => {
    await wrapper.setProps({
      source: "/some-image-path.png",
    });
    expect(wrapper.element.tagName).toEqual("IMG");
  });

  baseClassCase(wrapper, config.className);

  // TODO: Renders as <picture>

  // TODO: Renders as <DAspectRati>
  // TODO: Renders loading
  // TODO: Renders alt
  // TODO: Renders objectFit
  // TODO: Renders caption
  // TODO: Renders as <figure> with <figcaption>
  // TODO: Renders imageClass
  // TODO: Calls whenLoad

  // TODO: preparedItems structure checks !!!
  // TODO: constructMediaQuery structure checks !!!
});
