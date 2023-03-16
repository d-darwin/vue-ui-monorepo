import {
  defineComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import type { CssPosition } from "./types";
import config from "./config";
import styles from "./index.css?module";
/**
 * The component renders simple backdrop, intended to be used with Drawers, Modals, etc.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(), // TODO: gent defaults base on actual values, not hardcoded
    /**
     * Defines opacity of the component
     */
    opacity: generateProp.number(config.defaultOpacity),
    /**
     * Defines z-index attr of the component
     */
    zIndex: generateProp.number(config.defaultZIndex),
    /**
     * Defines position attr of the component
     */
    position: generateProp.options<CssPosition>(config.defaultPosition),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(),

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  computed: {
    bindings(): HTMLAttributes {
      return {
        class: styles[config.className],
        style: {
          "--background-color": `var(--color-${this.colorScheme}-background)`,
          "--opacity": this.opacity,
          "--z-index": this.zIndex,
          "--position": this.position,
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
      this.$emit(EVENT_NAME.CLICK);
      this.whenClick?.();
    },
  },

  render(): VNode {
    const Tag = this.tag;

    return <Tag {...this.bindings} />;
  },
});
