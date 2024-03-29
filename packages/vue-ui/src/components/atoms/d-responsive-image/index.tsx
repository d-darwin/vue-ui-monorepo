import { defineComponent } from "vue";
import type { PropType, VNode } from "vue";
import type { DAspectRatioProps } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/types";
import { DAspectRatioAsync as DAspectRatio } from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/async";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type {
  PictureSource,
  Source,
  SourceType,
  PreparedSource,
  Loading,
  ObjectFit,
} from "./types";
import { prepareSource } from "./utils";
import { LOADING, OBJECT_FIT, SOURCE_TYPE } from "./constants";
import config from "./config";

// TODO: separate figure component with caption, loader and no-image placeholder ???
// TODO: is it a molecule, not an atom ???
/**
 * The component renders <b>picture</b> element according to the Responsive Image Principle.<br>
 * Supports plain image source string, object with srcset and array of image assets for different screen width and pixel density.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Expected formats:<br>
     * * '/image_src_string'<br>
     * * { srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x', type: 'image/jpeg' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x', type: 'image/jpeg' }<br>
     *   ]}<br>
     * * [<br>
     *    { min_width: 320, src: 'img_src_string_xs', type: 'image/jpeg' },<br>
     *    { max_width: 1280, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x', type: 'image/jpeg' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x', type: 'image/jpeg' }<br>
     *    ]}<br>
     *  ]
     */
    source: {
      // TODO: what if { srcset: [{ src: '', min/max_width: 999, src_width: 999 }]}
      type: [Array, Object, String] as PropType<Source>, // TODO: add prop generator?
    },
    /**
     * Aspect ratio of the picture.
     * Expected format: 2 || '0.5' || 'width/height' || 'width:height'
     */
    aspectRatio: generateProp.text(),
    /**
     * Pass any DAspectRatio.props to customize aspect ratio container, f.e. { class: "someClass" }
     */
    aspectRatioOptions: generateProp.options<DAspectRatioProps>(),
    /**
     * Renders to the <i>object-fit</i> attr of the <b>img</b> element
     */
    // TODO: imgOptions
    objectFit: generateProp.string<ObjectFit>(OBJECT_FIT.COVER),
    /**
     * You can pass own class name to the <b>img</b> element.
     */
    // TODO: imgOptions
    imageClass: String,
    /**
     * The picture caption. Also used as <i>alt</i> and <i>title</> attrs if they don't present
     */
    // TODO: imgOptions, descr
    alt: String,
    // TODO: use DCaption
    caption: generateProp.content(),
    /**
     * Defines font size of the <b>caption</b> element. By default depends on props.size
     */
    // TODO: captionOptions
    captionFont: generateProp.font(),
    /**
     * You can pass own class name to the <b>caption</b> element.
     */
    // TODO: captionOptions
    captionClass: String,
    /**
     * Renders to the <i>loading</i> attr of the <b>img</b> element
     */
    loading: generateProp.string<Loading>(LOADING.LAZY),
    // TODO: use DLoader???
    // TODO: preventDefault ???
    // TODO: caption gaps/spacing

    /**
     * Alternative way to catch load event
     */
    whenLoad: {
      type: Function as PropType<(event?: Event) => void | Promise<void>>,
    },
    /**
     * Alternative way to catch error event
     */
    whenError: {
      type: Function as PropType<(event?: Event) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.LOAD, EVENT_NAME.ERROR],

  computed: {
    sourceType(): SourceType | null {
      if (Array.isArray(this.source)) {
        return SOURCE_TYPE.ARRAY;
      }
      if (typeof this.source === "object" && this.source !== null) {
        return SOURCE_TYPE.OBJECT; // TODO: test case coverage
      }
      if (typeof this.source === "string") {
        return SOURCE_TYPE.STRING;
      }

      return null;
    },

    preparedSourceList(): PreparedSource[] {
      switch (this.sourceType) {
        case SOURCE_TYPE.ARRAY:
          // TODO: min/max/medium sort order, is it make sense ???
          return (this.source as PictureSource[]).map((pictureSource) => {
            return prepareSource(pictureSource);
          });

        case SOURCE_TYPE.OBJECT:
          return [prepareSource(this.source as PictureSource)];

        case SOURCE_TYPE.STRING:
        default:
          return [{ src: this.source as string }];
      }
    },

    imgVNode(): VNode {
      const src = this.preparedSourceList[0].src; // TODO: use first/last/special element from the array ???
      const srcset = this.preparedSourceList[0].srcset;
      const classes =
        this.hasContainer || this.sourceType === SOURCE_TYPE.ARRAY
          ? [config.innerImageClass, this.imageClass]
          : [config.class, this.imageClass];

      return (
        <img
          src={src}
          srcset={srcset}
          alt={String(this.alt)}
          loading={this.loading}
          style={{ "object-fit": this.objectFit }}
          class={classes}
          onLoad={this.loadedHandler}
          onError={this.errorHandler}
        />
      );
    },

    renderCaption(): VNode {
      return (
        <figcaption
          class={[this.captionClass, generateClass.font(this.captionFont)]}
        >
          {this.$slots.caption?.() || this.caption}
        </figcaption>
      );
    },

    hasContainer(): boolean {
      return Boolean(
        this.aspectRatio || this.$slots.caption?.() || this.caption
      );
    },

    // TODO: simplify
    renderImage(): VNode | null {
      /* hasn't container */
      if (!this.hasContainer) {
        return this.imgVNode;
      }

      /* has aspectRation container */
      if (this.aspectRatio && !this.caption) {
        return (
          <DAspectRatio
            class={config.class}
            aspectRatio={this.aspectRatio}
            {...this.aspectRatioOptions}
          >
            {this.imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && (this.caption || this.$slots.caption)) {
        return (
          <figure class={config.class}>
            {this.imgVNode}
            {this.renderCaption}
          </figure>
        );
      }

      /* has aspect ratio container with figcaption */
      return (
        <DAspectRatio
          class={config.class}
          aspectRatio={this.aspectRatio}
          tag="figure"
          {...this.aspectRatioOptions}
        >
          {this.imgVNode}
          {this.renderCaption}
        </DAspectRatio>
      );
    },

    // TODO: simplify
    renderPicture(): VNode | null {
      const sourceVNodeList = this.preparedSourceList?.map((item) => (
        <source
          key={JSON.stringify(item)} // TODO: use something more efficient
          media={item.media}
          srcset={item.srcset}
          src={item.src}
          type={item.type}
        />
      ));

      const pictureVNode = (
        <picture class={config.class}>
          {sourceVNodeList}
          {this.imgVNode}
        </picture>
      );

      /* container is the picture itself */
      if (!this.hasContainer) {
        return pictureVNode;
      }

      /* has aspectRation container */
      if (this.aspectRatio && !this.caption) {
        return (
          <DAspectRatio
            aspectRatio={this.aspectRatio}
            tag="picture"
            class={config.class}
          >
            {sourceVNodeList}
            {this.imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && (this.caption || this.$slots.caption)) {
        return (
          <figure class={config.class}>
            {pictureVNode}
            {this.renderCaption}
          </figure>
        );
      }

      /* has aspect ratio container with figcaption */
      return (
        <DAspectRatio
          aspectRatio={this.aspectRatio}
          tag="figure"
          class={config.class}
        >
          {pictureVNode}
          {this.renderCaption}
        </DAspectRatio>
      );
    },
  },

  methods: {
    loadedHandler(event: Event): void {
      /**
       * Emits on image load with Event payload
       * @event load
       * @type {event: Event}
       */
      this.$emit(EVENT_NAME.LOAD, event);
      this.whenLoad?.(event);
    },

    errorHandler(event: Event): void {
      /**
       * Emits on image error with Event payload
       * @event click
       * @type {event: Event}
       */
      this.$emit(EVENT_NAME.ERROR, event);
      this.whenError?.(event);
    },
  },

  /**
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
   * */
  render(): VNode | null {
    switch (this.sourceType) {
      case SOURCE_TYPE.ARRAY:
        return this.renderPicture;
      case SOURCE_TYPE.OBJECT:
      case SOURCE_TYPE.STRING:
        return this.renderImage;
      default:
        return null;
    }
  },
});

// TODO: move to the common ???
declare module "@vue/runtime-dom" {
  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: Loading;
  }
}
