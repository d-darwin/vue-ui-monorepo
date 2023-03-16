import {
  defineComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
// TODO: add import/index ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import type { Tag } from "./types";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders as a <b>router-link</b> or just as an <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  // TODO: add props factory ???
  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: generateProp.content(),
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: generateProp.font(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Pass true to disable click events.
     */
    disabled: Boolean,
    /**
     * Pass true to prevent default click behaviour
     */
    preventDefault: Boolean,
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  // TODO: move to setup() ???
  computed: {
    classes(): string[] {
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      // TODO: outline and size and colorScheme separately ???
      const outlineClassName = prepareCssClassName(
        codegenConfig.TOKENS.OUTLINE.CSS_CLASS_PREFIX,
        `primary-medium` // TODO: not flexible at all
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      const classes = [
        styles[config.className],
        fontStyles[fontClassName],
        outlineStyles[outlineClassName],
        sizeStyles[fontClassName],
        transitionStyles[transitionClassName],
      ];

      if (this.disabled) {
        classes.push(styles["__disabled"]);
      }

      return classes;
    },

    tag(): Tag {
      if (this.$attrs["to"]) {
        return config.routerLinkTag;
      }

      return config.linkTag;
    },

    bindings(): HTMLAttributes {
      return {
        class: this.classes,
        onClick: this.clickHandler,
      };
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled) {
        /**
         * Emits on click with MouseEvent payload
         * @event click
         * @type {event: MouseEvent}
         */
        this.$emit("click", event);
        this.whenClick?.(event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <Tag {...this.bindings}>{this.$slots.default?.() || this.label}</Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.label} />;
  },
});
