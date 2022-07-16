import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import type {
  Source,
  SourceType,
  PreparedSource,
  Loading,
  ObjectFit,
} from "./types";
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: module, common style ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import { LOADING, OBJECT_FIT, SOURCE_TYPE } from "./constants";
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import styles from "./index.module.css";
import config from "./config";
import { prepareSource } from "./utils";
import { PictureSource } from "./types";

// TODO: separate figure component with caption, loader and no-image placeholder???
export default defineComponent({
  name: config.name,

  components: { DAspectRatio },

  props: {
    // TODO: think about the structure
    /**
     * An image asset or an array of such assets.
     * If empty, the component renders default <b>DIconImage</b>.<br>
     * Expected formats:<br>
     * * '/image_src_string' or<br>
     * * { srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x', type: 'image/jpeg' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x', type: 'image/jpeg' }<br>
     *      ]<br>
     *   }<br> or<br>
     * * [<br>
     *    { min_width: 320, src: 'img_src_string_xs', type: 'image/jpeg' },<br>
     *    { max_width: 1280, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x', type: 'image/jpeg' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x', type: 'image/jpeg' }<br>
     *      ]<br>
     *    }<br>
     *  ].
     */
    // TODO: what if { srcset: [{ src: '', min/max_width: 999, src_width: 999 }]}
    // https://developer.mozilla.org/ru/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#%D1%80%D0%B0%D0%B7%D0%BD%D1%8B%D0%B5_%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%80%D0%B0%D0%B7%D0%BD%D1%8B%D0%B5_%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%D1%8B
    source: {
      type: [Array, Object, String] as PropType<Source>,
      // TODO: validator or it is not efficient???
    },
    /**
     * Aspect ratio of the picture.
     * Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      validator: aspectRationValidator,
    },
    // TODO: description
    objectFit: {
      type: String as PropType<ObjectFit>,
      default: OBJECT_FIT.COVER,
    },
    // TODO: description
    imageClass: {
      type: String,
    },
    /**
     * The picture caption. Also used as <i>alt</i> and <i>title</> attrs if they aren't presented.
     */
    caption: {
      type: String,
    },
    // TODO: description
    captionFont: {
      type: String as PropType<Font>,
      default: FONT.SMALL, // TODO: flexible default
    },
    // TODO: description
    captionClass: {
      type: String,
    },
    // TODO: caption gaps/spacing
    // TODO: description
    loading: {
      type: String as PropType<Loading>,
      default: LOADING.LAZY,
    },
    // TODO: description
    whenLoad: {
      type: Function as PropType<(event?: Event) => void | Promise<void>>,
    },
  },

  computed: {
    sourceType(): SourceType | null {
      if (Array.isArray(this.source)) {
        return SOURCE_TYPE.ARRAY;
      }
      if (typeof this.source === "object" && this.source !== null) {
        return SOURCE_TYPE.OBJECT;
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
        />
      );
    },

    figcaptionVNode(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.captionFont
      );

      return (
        <figcaption class={[this.captionClass, fontStyles[fontClassName]]}>
          {this.caption}
        </figcaption>
      );
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
      if (!this.aspectRatio && this.caption) {
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
      const sourceVNodeList = this.preparedSourceList?.map((item, index) => (
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
      if (!this.aspectRatio && this.caption) {
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
      this.$emit("load", event);
      this.whenLoad?.(event);
    },
  },

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
