import { defineComponent, PropType, VNode } from "vue";
// TODO: add import/index ???
import type { Font } from "@darwin-studio/vue-ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/vue-ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import fontStyles from "@darwin-studio/vue-ui-codegen/dist/styles/font.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/vue-ui-codegen/dist/styles/outline.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/vue-ui-codegen/dist/styles/size.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/vue-ui-codegen/dist/styles/transition.css"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/vue-ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/vue-ui-codegen/config.json";
import type { Text } from "@/types/text";
import styles from "./index.module.css";
import config from "./config";

/**
 * Renders as a <b>router-link</b> or just as an <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  // TODO: add props factory ???
  props: {
    /**
     * Plain string or HTML if props.enableHtml is true
     */
    label: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Pass true to disable click events.
     */
    disabled: {
      type: Boolean,
    },
    /**
     * Pass true to prevent default click behaviour
     */
    preventDefault: {
      type: Boolean,
    },
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

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
        classes.push("__disabled");
      }

      return classes;
    },

    // TODO: move to types
    tag(): "a" | "router-link" {
      // TODO: how to check $router presence
      if (this.$attrs["to"]) {
        return "router-link";
      }

      return "a";
    },
  },

  methods: {
    // TODO: move to setup()
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled) {
        this.whenClick?.(event);
        this.$emit("click", event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;
    const bindings = {
      class: this.classes,
      onClick: this.clickHandler,
    };

    if (this.enableHtml) {
      return <Tag {...bindings} v-html={this.label} />;
    }

    return <Tag {...bindings}>{this.$slots.default?.() || this.label}</Tag>;
  },
});
