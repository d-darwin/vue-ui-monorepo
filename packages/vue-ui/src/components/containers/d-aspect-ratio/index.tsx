import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "../../../constants/tag-name"; // TODO: fix relative path
import styles from "./index.module.css";

// TODO: description
export default defineComponent({
  name: "DAspectRatio",

  props: {
    /**
     * Aspect ratio of the picture.
     * Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      default: "1",
      validator: (val: string): boolean => {
        if (!Number.isNaN(val)) {
          return Boolean(val);
        }

        let [width, height] = val.split("/");
        if (parseInt(width?.trim()) && parseInt(height?.trim())) {
          return true;
        }

        [width, height] = val.split(":");
        if (parseInt(width?.trim()) && parseInt(height?.trim())) {
          return true;
        }

        return false;
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

    style(): Record<string, string | number | null> {
      if (CSS?.supports("aspect-ratio: auto")) {
        return {
          "aspect-ratio": this.formatAspectRatio(String(this.aspectRatio)),
        };
      }

      return { "padding-bottom": this.paddingBottom };
    },
  },

  methods: {
    formatAspectRatio(rawAspectRatio: string): string | number {
      if (!Number.isNaN(rawAspectRatio)) {
        return rawAspectRatio || 1;
      }

      let width = 1;
      let height = 1;
      if (rawAspectRatio.includes("/")) {
        const [rawWidth, rawHeight] = rawAspectRatio.split("/");
        if (parseInt(rawWidth?.trim()) && parseInt(rawHeight?.trim())) {
          width = parseInt(rawWidth?.trim());
          height = parseInt(rawHeight?.trim());
        }
      } else if (rawAspectRatio.includes(":")) {
        const [rawWidth, rawHeight] = rawAspectRatio.split(":");
        if (parseInt(rawWidth?.trim()) && parseInt(rawHeight?.trim())) {
          width = parseInt(rawWidth?.trim());
          height = parseInt(rawHeight?.trim());
        }
      }

      return `${width} / ${height}`;
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
