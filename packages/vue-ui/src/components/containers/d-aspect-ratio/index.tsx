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
      // TODO: do we need this extra calculations ??
      validator: (val: string | number): boolean => {
        if (!isNaN(Number(val))) {
          return Boolean(val);
        }

        const stringVal = String(val);
        let [width, height] = stringVal.split("/");
        if (parseInt(width?.trim()) && parseInt(height?.trim())) {
          return true;
        }

        [width, height] = stringVal.split(":");
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
    widthHeight(): { width: number; height: number } {
      let width = 1;
      let height = 1;
      const aspectRatio = String(this.aspectRatio);
      // TODO: simplify
      if (aspectRatio.includes("/")) {
        const [rawWidth, rawHeight] = aspectRatio.split("/");
        if (parseInt(rawWidth?.trim()) && parseInt(rawHeight?.trim())) {
          width = parseInt(rawWidth?.trim());
          height = parseInt(rawHeight?.trim());
        }
      } else if (aspectRatio.includes(":")) {
        const [rawWidth, rawHeight] = aspectRatio.split(":");
        if (parseInt(rawWidth?.trim()) && parseInt(rawHeight?.trim())) {
          width = parseInt(rawWidth?.trim());
          height = parseInt(rawHeight?.trim());
        }
      }

      return { width, height };
    },

    formattedAspectRatio(): string {
      if (!isNaN(Number(this.aspectRatio))) {
        return String(this.aspectRatio || 1);
      }

      const { width, height } = this.widthHeight;

      return `${width} / ${height}`;
    },

    paddingBottom(): string | null {
      let paddingBottom = null;
      if (!isNaN(Number(this.aspectRatio))) {
        return `${100 / Number(this.aspectRatio || 1)}%`;
      }

      const { width, height } = this.widthHeight;
      paddingBottom = `${(100 * height) / width}%`;

      return paddingBottom;
    },

    style(): Record<string, string | number | null> {
      if (CSS?.supports("aspect-ratio: auto")) {
        return {
          "aspect-ratio": this.formattedAspectRatio,
        };
      }

      return { "padding-bottom": this.paddingBottom };
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
