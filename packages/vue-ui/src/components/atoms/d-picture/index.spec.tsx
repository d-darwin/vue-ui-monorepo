import { mount } from "@vue/test-utils";
import DPicture from "@/components/atoms/d-picture";
import DAspectRatio from "@/components/containers/d-aspect-ratio";
import { baseClassCase } from "@/utils/test-case-factories";
import config from "./config";
import { LOADING, OBJECT_FIT } from "@/components/atoms/d-picture/constants";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font";
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import { constructMediaQuery } from "@/components/atoms/d-picture/utils"; // TODO: shorter path, default export ???

// TODO: case descriptions
describe("DPicture", () => {
  const wrapper = mount(DPicture);

  // TODO: is it right behaviour???
  it("Shouldn't render if there is no props.source", () => {
    expect(wrapper.html()).toBeFalsy();
  });

  it("Should render as img if props.source is a string and no props.aspectRatio or props.caption", async () => {
    const source = "/some-image-path.png";
    await wrapper.setProps({ source });
    expect(wrapper.element.tagName).toEqual("IMG");
  });

  baseClassCase(wrapper, config.className);

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
  });

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
    await wrapper.setProps({ aspectRatio, caption: undefined });
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
  });

  it("Should render as figure with figcaption if props.caption is passed", async () => {
    const caption = "some caption";
    await wrapper.setProps({ caption });
    expect(wrapper.element.tagName).toEqual("FIGURE");
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
    expect(figcaptionEl.text()).toEqual(caption);
  });

  it("Should render figcaption classes if props.caption is passed", async () => {
    const caption = "some caption";
    const captionClass = "someCaptionClass";
    const captionFont = FONT.HUGE;
    await wrapper.setProps({ caption, captionFont, captionClass });

    const fontClassName = prepareCssClassName(
      codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
      captionFont
    );

    const figcaptionEl = wrapper.find("figcaption");
    const figcaptionElClasses = figcaptionEl.classes();
    expect(figcaptionElClasses).toContain(fontClassName);
    expect(figcaptionElClasses).toContain(captionClass);
  });

  it("Should render as DAspectRatio container if props.source, props.aspectRatio and props.caption are passed", async () => {
    const aspectRatio = "3/2";
    await wrapper.setProps({ aspectRatio });
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
  });

  it("Should render as img with src attr if props.source is an object with src", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: undefined,
    });
    expect(wrapper.element.tagName).toEqual("IMG");
  });

  it("Should render as img with srcset if props.source is an object with srcset", async () => {
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

  // TODO: what if { srcset: [{ src: '', min/max_media_width: 999, src_width: 999 }]}

  it("Should render as DAspectRatio container if props.source is an object, props.aspectRatio and props.caption are passed", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: "1:1",
      caption: undefined,
    });
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
  });

  it("Should render as figure container if props.source is an object, props.caption is passed and props.aspectRatio is not", async () => {
    const source = { src: "./img_src_string_xs.png" };
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: "some caption",
    });
    expect(wrapper.element.tagName).toEqual("FIGURE");
  });

  // TODO: case source -> obj, aspectRatio -> str, caption -> str

  it("Should render as DAspectRatio as figure container figcaption tag if props.source is an object, props.caption and props.aspectRatio are passed ", async () => {
    const source = { src: "./img_src_string_xs.png" };
    const caption = "some caption";
    await wrapper.setProps({
      source,
      caption,
      aspectRatio: 0.5,
    });
    // TODO: move to the test-case-factories
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
    expect(wrapper.element.tagName).toEqual("FIGURE");
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
    expect(figcaptionEl.text()).toEqual(caption);
  });

  it("Should render as picture with sources if props.source is an array", async () => {
    const source = [
      { min_width: 640, src: "./img_src_string_md.png" },
      { min_width: 320, src: "./img_src_string_xs.png" },
    ];
    await wrapper.setProps({
      source,
      aspectRatio: undefined,
      caption: undefined,
    });

    expect(wrapper.element.tagName).toEqual("PICTURE");
    expect(wrapper.find("img")).toBeTruthy();

    const sourceElList = wrapper.findAll("source");
    expect(sourceElList.length).toEqual(2);
    expect(sourceElList[0].attributes()?.src).toBe(source[0].src);
    expect(sourceElList[0].attributes()?.media).toBe(
      `(min-width: ${source[0].min_width}px)`
    );
  });

  it("Should use DAspectRatio component as picture tag if aspectRatio is passed and props.source is an array", async () => {
    const source = [
      { min_width: 640, src: "./img_src_string_md.png" },
      { min_width: 320, src: "./img_src_string_xs.png" },
    ];
    const aspectRatio = "3/2";
    await wrapper.setProps({ source, aspectRatio });

    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
    expect(wrapper.element.tagName).toEqual("PICTURE");
  });

  // case source -> arr, aspectRatio -> X, caption -> str
  it("Should render picture tag with figure wrapper and figcaption if props.source is an array and props.caption is passed", async () => {
    const source = [
      { min_width: 640, src: "./img_src_string_md.png" },
      { min_width: 320, src: "./img_src_string_xs.png" },
    ];
    const caption = "some caption";
    await wrapper.setProps({
      source,
      caption,
      aspectRatio: undefined,
    });
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeFalsy();
    expect(wrapper.element.tagName).toEqual("FIGURE");
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
    expect(figcaptionEl.text()).toEqual(caption);
  });

  // case source -> arr, aspectRatio -> str, caption -> str
  it("Should use DAspectRatio component as figure container and figcaption if props.source is an array and props.caption is passed", async () => {
    // TODO: move to the common consts
    const source = [
      { min_width: 640, src: "./img_src_string_md.png" },
      { min_width: 320, src: "./img_src_string_xs.png" },
    ];
    const caption = "some caption";
    await wrapper.setProps({
      source,
      caption,
      aspectRatio: 3,
    });
    expect(wrapper.findComponent(DAspectRatio).exists()).toBeTruthy();
    expect(wrapper.element.tagName).toEqual("FIGURE");
    const figcaptionEl = wrapper.find("figcaption");
    expect(figcaptionEl).toBeTruthy();
    expect(figcaptionEl.text()).toEqual(caption);
  });

  it("Should render source type if passed", async () => {
    const source = [
      { min_width: 640, src: "./img_src_string_md.webp", type: "image/webp" },
      { min_width: 320, src: "./img_src_string_xs.avif", type: "image/avif" },
    ];
    await wrapper.setProps({ source });

    const sourceElList = wrapper.findAll("source");
    expect(sourceElList[0].attributes()?.type).toBe(source[0].type);
    expect(sourceElList[1].attributes()?.type).toBe(source[1].type);
  });

  it("Should render source media attr if min_width, max_width or media is passed", async () => {
    const source = [
      { min_width: 640, src: "./img_src_string_md.png" },
      { max_width: 320, src: "./img_src_string_xs.png" },
      { min_width: 320, max_width: 640, src: "./img_src_string_xs.png" },
      {
        media: "(min-width: 320px) and (max-width: 640px)",
        src: "./img_src_string_xs.png",
      },
    ];
    await wrapper.setProps({ source });

    const sourceElList = wrapper.findAll("source");
    expect(sourceElList[0].attributes()?.media).toBe("(min-width: 640px)");
    expect(sourceElList[1].attributes()?.media).toBe("(max-width: 320px)");
    expect(sourceElList[2].attributes()?.media).toBe(
      "(min-width: 320px) and (max-width: 640px)"
    );
    expect(sourceElList[3].attributes()?.media).toBe(
      "(min-width: 320px) and (max-width: 640px)"
    );
  });

  it("constructMediaQuery shouldn return nothing if item hasn't min_width, max_width or media", async () => {
    expect(constructMediaQuery({})).toBeFalsy();
  });

  it("Should render source media attr with density mark if source with srcset is passed", async () => {
    const source = [
      {
        min_width: 640,
        srcset: [
          { density: "1x", src: "./img_src_string_md.png" },
          { density: "2x", src: "./img_src_string_md_2x.png" },
        ],
      },
    ];
    await wrapper.setProps({ source });

    const srcsetOutput =
      "./img_src_string_md.png 1x, ./img_src_string_md_2x.png 2x";
    const sourceEl = wrapper.find("source");
    expect(sourceEl.attributes()?.srcset).toBe(srcsetOutput);
    const imgEl = wrapper.find("img");
    expect(imgEl.attributes()?.srcset).toBe(srcsetOutput);
  });
});
