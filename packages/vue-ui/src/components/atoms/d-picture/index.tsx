import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import { Source } from "./types";
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import DAspectRatio from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio";
import config from "./config"; // TODO: fix relative path
import dAspectRatioConfig from "./config"; // TODO: fix relative path

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
    /**
     * The picture caption. Also used as <i>alt</i> and <i>title</> attrs if they aren't presented.
     */
    caption: {
      type: String,
    },
  },

  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    tag() {
      return this.aspectRatio ? dAspectRatioConfig.name : config.defaultTag;
    },

    alt(): string | null {
      return (this.$attrs.alt as string) || this.caption || null;
    },

    tagProps(): Record<string, Text | null> {
      return this.aspectRatio
        ? {
            aspectRatio: this.aspectRatio,
            tag: config.defaultTag,
            alt: this.alt,
            class: config.className,
          }
        : {
            alt: this.alt,
            class: config.className,
          };
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return <Tag {...this.tagProps}>DPicture</Tag>;
  },
});
