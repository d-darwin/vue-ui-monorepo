import {
  defineComponent,
  PropType,
  VNode,
  Teleport,
  Transition as Trans,
} from "vue";
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font"; // TODO: shorter path, default export ???
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name"; // TODO: fix relative path
import config from "./config";
import styles from "./index.css?module";

// TODO
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIV,
    },
    /**
     * Defines how long the notification will be displayed.
     */
    duration: {
      type: Number,
      default: 5,
    },
    // TODO: color-scheme ???
    // TODO: font
    // TODO: padding
    // TODO: rounding
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    // TODO: target
    // TODO: position
    // TODO: offset ???
    /**
     * Enables html string rendering passed in props.label and props.error.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },
  },

  mounted() {
    this.showNotification();
  },

  beforeUnmount() {
    clearTimeout(this.timeoutHandler);
  },

  // TODO: move to setup()
  data() {
    return {
      shown: false as boolean,
      timeoutHandler: undefined as number | undefined,
    };
  },

  computed: {
    classes(): string[] {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.className],
        fontStyles[fontClassName],
        transitionStyles[transitionClassName],
      ];
    },
  },

  methods: {
    showNotification() {
      this.shown = true;
      if (!this.duration) {
        return;
      }

      clearTimeout(this.timeoutHandler);

      this.timeoutHandler = setTimeout(() => {
        this.shown = false;
      }, this.duration * 1000);
    },
  },

  render(): VNode {
    const Tag = this.tag;

    if (!this.enableHtml) {
      /** @slot Use instead of props.content to fully customize content */
      return (
        <Teleport to="body">
          <Trans
            enterActiveClass={styles.transitionEnterActive}
            leaveActiveClass={styles.transitionLeaveActive}
          >
            {this.shown && (
              <Tag class={this.classes}>
                {this.$slots.default?.() || this.content}
              </Tag>
            )}
          </Trans>
        </Teleport>
      );
    }

    return (
      <Teleport to="body">
        <Trans
          enterActiveClass={styles.transitionEnterActive}
          leaveActiveClass={styles.transitionLeaveActive}
        >
          {this.shown && <Tag class={this.classes} v-html={this.content} />}
        </Trans>
      </Teleport>
    );
  },
});
