import { defineComponent, PropType, VNode } from "vue";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "../../../constants/tag-name"; // TODO: fix relative path
import styles from "./index.module.css";

// TODO: description
export default defineComponent({
  name: "DAspectRatio",

  props: {
    /**
     * Aspect ratio of the picture.
     * Expected format: 'height:width'.
     */
    aspectRatio: {
      type: String as PropType<string>,
      default: "1:1", // TODO: choose default value
      validator: (val: string): boolean => {
        // TODO: add formats - 1 \ 2, 2 / 3, 0.66
        const [height, width] = val.split(":");
        return Boolean(parseInt(height) && parseInt(width));
      },
    },
    /**
     * TODO: Add description
     */
    html: {
      // TODO: warning
      type: String,
    },
    // TODO: description
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  computed: {
    paddingBottom(): string | null {
      let paddingBottom = null;

      const widthHeight = this.aspectRatio.toString().split(":"); // TODO: different formats
      if (widthHeight[0] && widthHeight[1]) {
        paddingBottom =
          (100 * parseInt(widthHeight[0])) / parseInt(widthHeight[1]) + "%";
      }

      return paddingBottom;
    },

    style(): Record<string, string | null> {
      if (CSS.supports("aspect-ratio: auto")) {
        return { "aspect-ratio": this.formatAspectRatio(this.aspectRatio) };
      }

      return { "padding-bottom": this.paddingBottom };
    },
  },

  methods: {
    formatAspectRatio(rawAspectRatio: string): string {
      return "100 / 66"; // TODO
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (this.html) {
      return (
        <Tag
          class={styles.dAspectRatio}
          style={this.style}
          v-html={this.html}
        />
      );
    }

    return (
      <Tag class={styles.dAspectRatio} style={this.style}>
        {this.$slots.default?.()}
      </Tag>
    );
  },
});
