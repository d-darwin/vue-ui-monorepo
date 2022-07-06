import { CSSProperties, defineComponent, PropType, VNode } from "vue";
import { ObjectFitProperty } from "csstype";
import type { Text } from "@/types/text";
import { DensityPictureSource, Source, Loading, LOADING } from "./types"; // TODO: move LOADING to ./constants ???
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import styles from "./index.module.css";
import config from "./config";

declare module "@vue/runtime-dom" {
  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: Loading;
  }
}

export default defineComponent({
  name: config.name,

  components: { DAspectRatio },

  props: {
    /**
     * An image asset or an array of such assets.
     * If empty, the component renders default <b>DIconImage</b>.<br>
     * Expected formats:<br>
     * * '/image_src_string' or<br>
     * * [<br>
     *    { min_width: 320, src: 'img_src_string_xs' },<br>
     *    { min_width: 480, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x' }<br>
     *      ]<br>
     *    }<br>
     *  ].
     */
    source: {
      type: [Array, String] as PropType<Source>,
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
    objectFit: {
      type: String as PropType<ObjectFitProperty>,
      default: "cover",
    },
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
    // TODO: type
    tag(): typeof DAspectRatio | typeof config.defaultTag {
      return this.aspectRatio ? DAspectRatio : config.defaultTag;
    },

    alt(): string {
      return (this.$attrs.alt as string) || this.caption || "";
    },

    tagProps(): Record<string, Text | null> {
      return this.aspectRatio
        ? {
            aspectRatio: this.aspectRatio,
            tag: config.defaultTag,
            alt: this.alt,
            // title ???
            class: styles[config.className],
          }
        : {
            alt: this.alt,
            // title ???
            class: styles[config.className],
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
      console.log(event);
      this.isLoaded = true;
      this.$emit("load", event);
      this.whenLoad?.(event);
    },
  },

  render(): VNode | null {
    // TODO: is it right decision?
    if (!this.source) return null;

    const Tag = this.tag;

    return (
      // TODO: work good with padding-bottom hack but not with native aspect-ratio
      <Tag {...this.tagProps}>
        {
          // TODO
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.preparedItems?.map((item, index) => (
            <source
              key={index} // TODO
              media={this.constructMediaQuery(item)}
              srcset={item.srcset}
              data-src={item.src}
            />
          ))
        }

        <img
          srcset={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0].srcset
          }
          src={
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.preparedItems[0].src
          }
          alt={this.alt}
          loading={this.loading}
          class={[styles[config.imageClassName], this.imageClass]}
          style={this.imageStyle}
          onLoad={this.loadedHandler}
        />
      </Tag>
    );
  },
});
