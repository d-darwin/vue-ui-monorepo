import { defineComponent, PropType, VNode } from "vue";
import type { Text } from "@/types/text";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import styles from "./index.module.css";
import config from "./config";

// TODO: description
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Aspect ratio of the picture.
     * Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      default: "1",
      // TODO: do we need this extra calculations ??
      validator: aspectRationValidator,
    },
    /**
     * TODO: Add description
     */
    html: {
      // TODO: warning
      type: String,
    },
    /**
     * TODO: Add description
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
  },

  computed: {
    size(): { width: number; height: number } {
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

      const { width, height } = this.size;

      return `${width} / ${height}`;
    },

    paddingBottom(): string | null {
      let paddingBottom = null;
      if (!isNaN(Number(this.aspectRatio))) {
        return `${100 / Number(this.aspectRatio || 1)}%`;
      }

      const { width, height } = this.size;
      paddingBottom = `${(100 * height) / width}%`;

      return paddingBottom;
    },

    hasAspectRationNativeSupport(): boolean {
      return CSS?.supports("aspect-ratio: auto") || false;
    },

    style(): Record<string, string | number | null> {
      if (this.hasAspectRationNativeSupport) {
        return {
          "aspect-ratio": this.formattedAspectRatio,
        };
      }

      return { "padding-bottom": this.paddingBottom };
    },
  },

  render(): VNode {
    const Tag = this.tag;

    // TODO: simplify
    if (this.hasAspectRationNativeSupport) {
      if (this.html) {
        return (
          <Tag
            class={styles[config.className]}
            style={this.style}
            v-html={this.html}
          />
        );
      }

      return (
        <Tag class={styles[config.className]} style={this.style}>
          {this.$slots.default?.()}
        </Tag>
      );
    }

    if (this.html) {
      return (
        <Tag class={styles[config.className]}>
          <div
            class={styles[config.innerClassName]}
            style={this.style}
            v-html={this.html}
          />
        </Tag>
      );
    }

    return (
      <Tag class={styles[config.className]}>
        <div class={styles[config.innerClassName]} style={this.style}>
          {this.$slots.default?.()}
        </div>
      </Tag>
    );
  },
});
