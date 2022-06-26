import { defineComponent, PropType, VNode } from "vue";
import type { TagName } from "@/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@/constants/tag-name";

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
      default: "",
      validator: (val: string): boolean => {
        // TODO: add formats - 1 \ 2, 2 / 3, 0.66
        const [height, width] = val.split(":");
        return Boolean(parseInt(height) && parseInt(width));
      },
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
  },

  render(): VNode {
    return <div>DAspectRatio</div>;
  },
});
