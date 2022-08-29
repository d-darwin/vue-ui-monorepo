import { CSSProperties, defineComponent, PropType, VNode } from "vue";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import aspectRationValidator from "@darwin-studio/vue-ui/src/utils/aspect-ration-validator"; // TODO: fix relative path
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { parseWidthHeight } from "./utils";
import styles from "./index.module.css";
import config from "./config";

/**
 * The component uses padding-bottom / zero-height hack to simulate aspect-ratio CSS property if it is not supported.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Aspect ratio of the picture. Expected format: 2 || '0.5' || 'width/height' || 'width:height'.
     */
    aspectRatio: {
      type: [String, Number] as PropType<Text>,
      default: "1",
      validator: aspectRationValidator, // TODO: do we need this extra calculations ??
    },
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    content: {
      type: String,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      // TODO: test case
      type: Boolean,
    },
  },

  computed: {
    size(): { width: number; height: number } {
      let width = 1;
      let height = 1;
      const aspectRatio = String(this.aspectRatio);

      config.separatorList.some((separator) => {
        [width, height] = parseWidthHeight(this.aspectRatio, separator);
        return aspectRatio.includes(separator);
      });

      return { width, height };
    },

    formattedAspectRatio(): string {
      if (!isNaN(Number(this.aspectRatio))) {
        return String(this.aspectRatio || 1);
      }

      const { width, height } = this.size;

      return `${width} / ${height}`;
    },

    paddingBottom(): string {
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

    style(): CSSProperties {
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
      if (!this.enableHtml) {
        return (
          <Tag class={styles[config.className]} style={this.style}>
            {this.$slots.default?.()}
          </Tag>
        );
      }

      return (
        <Tag
          class={styles[config.className]}
          style={this.style}
          v-html={this.content}
        />
      );
    }

    if (!this.enableHtml) {
      return (
        <Tag class={styles[config.className]}>
          <div class={styles[config.innerClassName]} style={this.style}>
            {this.$slots.default?.()}
          </div>
        </Tag>
      );
    }

    return (
      <Tag class={styles[config.className]}>
        <div
          class={styles[config.innerClassName]}
          style={this.style}
          v-html={this.content}
        />
      </Tag>
    );
  },
});
