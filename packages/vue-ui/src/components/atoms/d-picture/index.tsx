import { CSSProperties, defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import {
  DensityPictureSource,
  Source,
  Loading,
  ObjectFit,
  SourceType,
} from "./types";
import { LOADING, OBJECT_FIT, SOURCE_TYPE } from "./constants";
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import styles from "./index.module.css";
import config from "./config";

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
     * * [<br>
     *    { min_width: 320, src: 'img_src_string_xs' },<br>
     *    { max_width: 1280, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x' }<br>
     *      ]<br>
     *    }<br>
     *  ].
     */
    source: {
      type: [Array, Object, String] as PropType<Source>,
      // TODO: validator
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
    // TODO: separate figure component with caption, loader and no-image placeholder???
    // TODO: captionFont ???
    // TODO: captionClass + tokens gaps/spacing
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

  data() {
    return {
      isLoaded: false, // TODO: do we really need this state
    };
  },

  computed: {
    sourceType(): SourceType | null {
      if (Array.isArray(this.source)) {
        return SOURCE_TYPE.ARRAY;
      }
      if (typeof this.source === "object") {
        return SOURCE_TYPE.STRING;
      }
      if (typeof this.source === "string") {
        return SOURCE_TYPE.STRING;
      }

      return null;
    },

    // TODO: type
    tag(): typeof DAspectRatio | "picture" {
      return this.aspectRatio ? DAspectRatio : "picture";
    },

    // TODO: introduce prop ???
    alt(): string {
      return String(this.$attrs?.alt) || this.caption || "";
    },

    tagProps(): Record<string, Text | Text[] | null> {
      const classes = this.caption
        ? [styles[config.pictureClassName], styles[config.className]]
        : styles[config.className];

      return this.aspectRatio
        ? {
            aspectRatio: this.aspectRatio,
            tag: "picture",
            class: classes,
          }
        : {
            class: classes,
          };
    },

    // TODO: return type, max-width, refac
    preparedItems() {
      const outPicture = JSON.parse(JSON.stringify(this.source));
      if (Array.isArray(outPicture)) {
        // Resort Array by min_width (higher is above)
        outPicture.sort(function (a, b) {
          return b.min_width - a.min_width;
        });
        // If srcset is array of images prepare srcset string
        outPicture.forEach(function (item, k) {
          if (Array.isArray(item.srcset)) {
            let srcset = "";
            item.srcset.forEach(function (
              srcObj: DensityPictureSource,
              i: number
            ) {
              srcset +=
                (i === 0 ? "" : ", ") + srcObj.src + " " + srcObj.density;
            });
            if (srcset) {
              outPicture[k].srcset = srcset;
            }
          }
        });
      } else if (typeof outPicture === "string") {
        return [{ min_width: 0, src: outPicture }];
      } else {
        // fallback
        return this.source;
      }
      return outPicture;
    },

    imageStyle(): CSSProperties | undefined {
      if (this.objectFit) {
        return { "object-fit": this.objectFit };
      }

      return undefined;
    },

    renderImage(): VNode | null {
      const hasContainer = Boolean(this.aspectRatio || this.caption);
      const imgVNode = (
        <img
          src={this.source as string} // TODO: avoid casting
          alt={this.alt}
          loading={this.loading}
          style={this.imageStyle}
          class={
            hasContainer
              ? [styles[config.imageClassName], this.imageClass]
              : styles[config.className]
          }
          onLoad={this.loadedHandler}
        />
      );

      if (!hasContainer) {
        return imgVNode;
      }

      /* has aspectRation container */
      if (this.aspectRatio && !this.caption) {
        return (
          <DAspectRatio
            aspectRatio={this.aspectRatio}
            class={styles[config.className]}
          >
            {imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && this.caption) {
        return (
          <figure class={styles[config.className]}>
            {imgVNode}
            <figcaption>{this.caption}</figcaption> {/*TODO: figcaptionClass*/}
          </figure>
        );
      }

      /* has aspect ratio container with figcaption */
      return (
        <DAspectRatio
          aspectRatio={this.aspectRatio}
          tag="figure" // TODO: config ???
          class={styles[config.className]}
        >
          {imgVNode}
          <figcaption>{this.caption}</figcaption> {/*TODO: figcaptionClass*/}
        </DAspectRatio>
      );
    },

    // TODO: render picture
  },

  methods: {
    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructMediaQuery(item): string | undefined {
      if (item.min_width && item.max_width) {
        return `(min-width: ${item.min_width}px) and (max-width: ${item.max_width}px)`;
      } else if (item.min_width) {
        return `(min-width: ${item.min_width}px)`;
      } else if (item.max_width) {
        return `(max-width: ${item.max_width}px)`;
      }
      return undefined;
    },

    loadedHandler(event: Event): void {
      this.isLoaded = true;
      this.$emit("load", event);
      this.whenLoad?.(event);
    },
  },

  render(): VNode | null {
    // TODO: is it right decision?
    if (!this.sourceType) return null;
    // TODO: switch
    if (this.sourceType === SOURCE_TYPE.ARRAY) {
      return <div>TODO: SOURCE_TYPE.ARRAY</div>;
    }

    if (this.sourceType === SOURCE_TYPE.OBJECT) {
      return <div>TODO: SOURCE_TYPE.OBJECT</div>;
    }

    if (this.sourceType === SOURCE_TYPE.STRING) {
      return this.renderImage;
    }

    const Tag = this.tag;

    // TODO: just <img> branch !!!

    const picture = (
      <Tag {...this.tagProps}>
        {
          // TODO
          typeof this.source === "object" &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems?.map((item, index) => (
              <source
                key={index} // TODO
                media={this.constructMediaQuery(item)}
                srcset={item.srcset}
                // TODO: type
              />
            ))
        }

        <img
          src={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0].src
          }
          srcset={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0].srcset
          }
          alt={this.alt}
          loading={this.loading}
          style={this.imageStyle}
          class={[styles[config.imageClassName], this.imageClass]}
          onLoad={this.loadedHandler}
        />
      </Tag>
    );

    if (this.caption) {
      return (
        <figure class={styles[config.className]}>
          {picture}
          <figcaption>{this.caption}</figcaption>
        </figure>
      );
    }

    return picture;
  },
});

declare module "@vue/runtime-dom" {
  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: Loading;
  }
}
