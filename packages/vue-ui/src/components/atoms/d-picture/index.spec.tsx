import { mount } from "@vue/test-utils";
import DPicture from "@/components/atoms/d-picture";
import DAspectRatio from "@/components/containers/d-aspect-ratio";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";
import { LOADING, OBJECT_FIT } from "@/components/atoms/d-picture/constants";

// TODO: case descriptions
// TODO: combine dependent cases (figure + figcaption + caption)
describe("DPicture", () => {
  const wrapper = mount(DPicture);

  /*
  // TODO: is it right behaviour???
  it("Shouldn't render if there is no props.source", () => {
    expect(wrapper.html()).toBeFalsy();
  });

  it("Should render as <img /> if props.source is a string and no props.aspectRatio or props.caption", async () => {
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

  it("Should render as DAspectRatio container if props.source, props.aspectRatio are passed and no props.caption", async () => {
    const aspectRatio = "3/2";
    await wrapper.setProps({ aspectRatio });
    expect(wrapper.findComponent(DAspectRatio)).toBeTruthy();
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

  it("Should render as DAspectRatio container if props.source, props.aspectRatio and props.caption are passed", async () => {
    const aspectRatio = "3/2";
    await wrapper.setProps({ aspectRatio });
    expect(wrapper.findComponent(DAspectRatio)).toBeTruthy();
  });

  it("Should render as <img /> with src attr if props.source is an object with src", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: undefined,
    });
    console.log(wrapper.html());
    expect(wrapper.element.tagName).toEqual("IMG");
  });

  it("Should render as <img /> with srcset if props.source is an object with srcset", async () => {
    const source = {
      srcset: [
        { density: "1x", src: "img_src_string_sm_1x.png" },
        { density: "2x", src: "img_src_string_sm_3x.png" },
      ],
    };
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: undefined,
    });
    expect(wrapper.element.tagName).toEqual("IMG");
  });

*/

  // TODO: what if { srcset: [{ src: '', min/max_media_width: 999, src_width: 999 }]}

  it("Should render as DAspectRatio container if props.source is an object, props.aspectRatio and props.caption are passed", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: "1:1",
      caption: undefined,
    });
    expect(wrapper.findComponent(DAspectRatio)).toBeTruthy();
  });

  it("Should render as <figure> container if props.source is an object, props.caption is passed and props.aspectRatio is not", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: "some caption",
    });
    expect(wrapper.element.tagName).toEqual("FIGURE");
  });

  // TODO: case source -> obj, aspectRatio -> str, caption -> str

  it("Should render as DAspectRatio with container figcaption tag if props.source is an object, props.caption and props.aspectRatio are passed ", async () => {
    const source = { src: "./img_src_string_xs.png" };
    const caption = "some caption";
    await wrapper.setProps({
      source,
      caption,
      aspectRatio: 0.5,
    });
    expect(wrapper.findComponent(DAspectRatio)).toBeTruthy();
    expect(wrapper.element.tagName).toEqual("FIGURE");
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
    expect(figcaptionEl.text()).toEqual(caption);
  });

  // TODO: case source -> arr, aspectRatio -> X, caption -> X
  // TODO: case source -> arr, aspectRatio -> str, caption -> X
  // TODO: case source -> arr, aspectRatio -> X, caption -> str
  // TODO: case source -> arr, aspectRatio -> str, caption -> str

  // TODO: img with srcset min and max with ???
  // TODO: img with srcset types ???

  /*    it("Should render as <picture> if props.source is an array", async () => {
    const source = [{ min_width: 320, src: "./img_src_string_xs.png" }];
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: undefined,
    });
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

  it("Should render img's class if props.imageClass is passed", async () => {
    const imageClass = "someExternalImageClass";
    await wrapper.setProps({ imageClass });
    const imgEl = wrapper.find("img");
    expect(imgEl.classes()).toContain(imageClass);
  });*/
  // TODO: preparedItems (rename?) structure checks !!!
  // TODO: constructMediaQuery (rename?) structure checks !!!
});
