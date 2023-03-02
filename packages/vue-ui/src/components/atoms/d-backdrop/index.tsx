import { defineComponent, PropType, VNode } from "vue";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import config from "./config";
import styles from "./index.css?module";

/**
 * The component renders simple backdrop, intended to be used with Drawers, Modals, etc.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines opacity of the component
     */
    opacity: {
      type: Number,
      default: config.defaultOpacity,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  computed: {
    bindings(): Record<
      string,
      string | Record<string, number | string> | (() => void)
    > {
      console.log();
      return {
        class: styles[config.className],
        style: {
          "--opacity": this.opacity,
          "--background-color": `var(--color-${this.colorScheme}-background)`,
        },
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler() {
      /**
       * Just emits click event without any payload.
       *
       * @event click
       * @type {undefined}
       */
      this.$emit("click");
      this.whenClick?.();
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return <Tag {...this.bindings} />;
  },
});
