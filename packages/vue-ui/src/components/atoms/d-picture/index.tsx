import { CSSProperties, defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import type {
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

// TODO: rename Picture -> Responsive image ???
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
     *    { min_width: 320, src: 'img_src_string_xs', type: '???' },<br>
     *    { max_width: 1280, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x', type: '???' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x', type: '???' }<br>
     *      ]<br>
     *    }<br>
     *  ].
     */
    // TODO: what if { srcset: [{ src: '', min/max_width: 999, src_width: 999 }]}
    // https://developer.mozilla.org/ru/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#%D1%80%D0%B0%D0%B7%D0%BD%D1%8B%D0%B5_%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%80%D0%B0%D0%B7%D0%BD%D1%8B%D0%B5_%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%D1%8B
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
      if (typeof this.source === "object" && this.source !== null) {
        return SOURCE_TYPE.OBJECT;
      }
      if (typeof this.source === "string") {
        return SOURCE_TYPE.STRING;
      }

      return null;
    },

    // TODO: introduce prop to avoid casting ???
    alt(): string {
      return (this.$attrs?.alt as string) || this.caption || "";
    },

    // TODO: return type, max-width, refac
    preparedItems() {
      const outPicture = JSON.parse(JSON.stringify(this.source)); // TODO: is there more elegant way to deep copy???
      // TODO: switch/case ???
      if (this.sourceType === SOURCE_TYPE.ARRAY) {
        // Resort Array by min_width (higher is above)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // TODO: min/max width ???
        outPicture.sort(function (a, b) {
          return b.min_width - a.min_width;
        });
        // If srcset is array of images prepare srcset string
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
      } else if (this.sourceType === SOURCE_TYPE.OBJECT) {
        // TODO: reuse
        if (Array.isArray(outPicture.srcset)) {
          let srcset = "";
          outPicture.srcset.forEach(function (
            srcObj: DensityPictureSource,
            i: number
          ) {
            srcset += (i === 0 ? "" : ", ") + srcObj.src + " " + srcObj.density;
          });
          if (srcset) {
            outPicture.srcset = srcset;
          }
        }
        // TODO: src fallback
        return [outPicture];
      } else if (this.sourceType === SOURCE_TYPE.STRING) {
        return [{ min_width: 0, src: outPicture }];
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
      // TODO: move to getter
      const imgVNode = (
        <img
          src={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0]?.src
          }
          srcset={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0]?.srcset
          }
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

      /* hasn't container */
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
    renderPicture(): VNode | null {
      const hasContainer = Boolean(this.aspectRatio || this.caption);
      // TODO
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sourceVNodeList = this.preparedItems?.map((item, index) => (
        <source
          key={index} // TODO
          media={this.constructMediaQuery(item)}
          srcset={item.srcset}
          src={item.src}
          type={item.type}
        />
      ));

      // TODO: move to getter
      const imgVNode = (
        <img
          src={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0]?.src
          }
          srcset={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0]?.srcset
          }
          alt={this.alt}
          loading={this.loading}
          style={this.imageStyle}
          class={[styles[config.imageClassName], this.imageClass]}
          onLoad={this.loadedHandler}
        />
      );

      const pictureVNode = (
        /*TODO: use config for the tag ???*/
        <picture class={styles[config.className]}>
          {sourceVNodeList}
          {imgVNode}
        </picture>
      );

      /* container is the picture itself */
      if (!hasContainer) {
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
            {imgVNode}
          </DAspectRatio>
        );
      }

      /* has figure container with figcaption */
      if (!this.aspectRatio && this.caption) {
        return (
          <figure class={styles[config.className]}>
            {pictureVNode}
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
          {pictureVNode}
          <figcaption>{this.caption}</figcaption> {/*TODO: figcaptionClass*/}
        </DAspectRatio>
      );
    },

    // TODO: render figure ???
  },

  methods: {
    // TODO, rename, media, type
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructMediaQuery(item): string | undefined {
      if (item.media) {
        return item.media;
      }

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
