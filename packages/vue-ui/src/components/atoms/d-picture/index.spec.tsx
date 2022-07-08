import { mount } from "@vue/test-utils";
import DPicture from "@/components/atoms/d-picture";
import DAspectRatio from "@/components/containers/d-aspect-ratio";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";
import { LOADING, OBJECT_FIT } from "@/components/atoms/d-picture/constants";

describe("DPicture", () => {
  const wrapper = mount(DPicture);

  // TODO: is it right behaviour???
  it("Shouldn't render if there is no props.source", () => {
    expect(wrapper.html()).toBeFalsy();
  });

  it("Should render as <img> if props.source is a string", async () => {
    const source = "/some-image-path.png";
    await wrapper.setProps({ source });
    expect(wrapper.element.tagName).toEqual("IMG");
  });

  baseClassCase(wrapper, config.className);

  it("Should emit load event on img loaded", async () => {
    const imgEl = wrapper.find("img");
    await imgEl.trigger("load");
    expect(wrapper.emitted("load")).toBeTruthy();
  });

  it("Should call props.whenLoad on img loaded if passed", async () => {
    const whenLoad = jest.fn();
    await wrapper.setProps({ whenLoad });
    const imgEl = wrapper.find("img");
    await imgEl.trigger("load");
    expect(whenLoad).toHaveBeenCalledTimes(1);
  });

  it("Should render as <picture> if props.source is an array", async () => {
    const source = [{ min_width: 320, src: "./img_src_string_xs.png" }];
    await wrapper.setProps({ source });
    expect(wrapper.element.tagName).toEqual("PICTURE");
  });

  it("Should use DAspectRation component if aspectRatio is passed", async () => {
    const aspectRatio = "3/2";
    await wrapper.setProps({ aspectRatio });
    expect(wrapper.vm.tag).toBe(DAspectRatio);
  });

  it("Should render img's loading attr if props.loading is passed", async () => {
    const loading = LOADING.EAGER;
    await wrapper.setProps({ loading });
    const imgEl = wrapper.find("img");
    expect(imgEl.attributes()?.loading).toEqual(loading);
  });

  it("Should render img's alt attr if props.alt is passed", async () => {
    const alt = "Some alt text";
    await wrapper.setProps({ alt });
    const imgEl = wrapper.find("img");
    expect(imgEl.attributes()?.alt).toEqual(alt);
  });

  it("Should render img's object-fit style if props.objectFit is passed", async () => {
    const objectFit = OBJECT_FIT.SCALE_DOWN;
    await wrapper.setProps({ objectFit });
    const imgEl = wrapper.find("img");
    expect(imgEl.attributes()?.style).toEqual(`object-fit: ${objectFit};`);
  });

  it("Should render as <figure> if props.caption is passed", async () => {
    const caption = "some caption";
    await wrapper.setProps({ caption });
    expect(wrapper.element.tagName).toEqual("FIGURE");
  });

  it("Should render <figcaption> if props.caption is passed", async () => {
    const caption = "some caption";
    await wrapper.setProps({ caption });
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
  });

  it("<figcaption> should contain props.caption if it passed", async () => {
    const caption = "some caption";
    await wrapper.setProps({ caption });
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl.text()).toEqual(caption);
  });

  it("Should render img's class if props.imageClass is passed", async () => {
    const imageClass = "someExternalImageClass";
    await wrapper.setProps({ imageClass });
    const imgEl = wrapper.find("img");
    expect(imgEl.classes()).toContain(imageClass);
  });

  // TODO: preparedItems structure checks !!!
  // TODO: constructMediaQuery structure checks !!!
});
