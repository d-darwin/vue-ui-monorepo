import { defineComponent, PropType, VNode } from "vue";
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: module, common style ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
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
import styles from "./index.module.css";
import config from "./config";

// TODO: separate figure component with caption, loader and no-image placeholder ???
// TODO: is it a molecule, not an atom ???
/**
 * The component renders <b>picture</b> element according to the Responsive Image Principle.<br>
 * Supports plain image source string, object with srcset and array of image assets for different screen width and pixel density.
 */
export default defineComponent({
  name: config.name,

  components: { DAspectRatio },

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
      type: [Array, Object, String] as PropType<Source>,
      // TODO: validator or it is not efficient???
    },
    /**
     * Aspect ratio of the picture.
     * Expected format: 2 || '0.5' || 'width/height' || 'width:height'
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      validator: aspectRationValidator,
    },
    /**
     * Renders to the <i>object-fit</i> attr of the <b>img</b> element
     */
    objectFit: {
      type: String as PropType<ObjectFit>,
      default: OBJECT_FIT.COVER,
    },
    /**
     * You can pass own class name to the <b>img</b> element.
     */
    imageClass: {
      type: String,
    },
    /**
     * The picture caption. Also used as <i>alt</i> and <i>title</> attrs if they don't present
     */
    caption: {
      type: String,
    },
    /**
     * Defines font size of the <b>caption</b> element. By default depends on props.size
     */
    captionFont: {
      type: String as PropType<Font>,
    },
    /**
     * You can pass own class name to the <b>caption</b> element.
     */
    captionClass: {
      type: String,
    },
    /**
     * Renders to the <i>loading</i> attr of the <b>img</b> element
     */
    loading: {
      type: String as PropType<Loading>,
      default: LOADING.LAZY,
    },
    // TODO: preventDefault ???
    // TODO: caption gaps/spacing
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      // TODO: use, test case
      type: Boolean,
    },

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
          ? [styles[config.innerImageClassName], this.imageClass]
          : [styles[config.className], this.imageClass];

      return (
        <img
          src={src}
          srcset={srcset}
          alt={(this.$attrs?.alt as string) || this.caption || ""} // TODO: add props.alt ???
          loading={this.loading}
          style={{ "object-fit": this.objectFit }}
          class={classes}
          onLoad={this.loadedHandler}
          onError={this.errorHandler}
        />
      );
    },

    figcaptionVNode(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.captionFont
      );
      const classes = [this.captionClass, fontStyles[fontClassName]];

      if (!this.enableHtml) {
        return (
          /*TODO: this.$slots.caption test case*/
          <figcaption class={classes}>
            {this.$slots.caption?.() || this.caption}
          </figcaption>
        );
      }

      return <figcaption class={classes} v-html={this.caption} />;
    },

    hasContainer(): boolean {
      return Boolean(this.aspectRatio || this.caption);
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
            aspectRatio={this.aspectRatio}
            class={styles[config.className]}
          >
            {this.imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && (this.caption || this.$slots.caption)) {
        return (
          <figure class={styles[config.className]}>
            {this.imgVNode}
            {this.figcaptionVNode}
          </figure>
        );
      }

      /* has aspect ratio container with figcaption */
      return (
        <DAspectRatio
          aspectRatio={this.aspectRatio}
          tag="figure"
          class={styles[config.className]}
        >
          {this.imgVNode}
          {this.figcaptionVNode}
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
        <picture class={styles[config.className]}>
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
            class={styles[config.className]}
          >
            {sourceVNodeList}
            {this.imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && (this.caption || this.$slots.caption)) {
        return (
          <figure class={styles[config.className]}>
            {pictureVNode}
            {this.figcaptionVNode}
          </figure>
        );
      }

      /* has aspect ratio container with figcaption */
      return (
        <DAspectRatio
          aspectRatio={this.aspectRatio}
          tag="figure"
          class={styles[config.className]}
        >
          {pictureVNode}
          {this.figcaptionVNode}
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

declare module "@vue/runtime-dom" {
  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: Loading;
  }
}
