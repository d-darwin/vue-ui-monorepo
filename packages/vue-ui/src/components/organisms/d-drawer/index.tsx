import {
  defineComponent,
  VNode,
  Transition as Trans,
  Teleport,
  PropType,
  CSSProperties,
} from "vue";
import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { RendererElement } from "@vue/runtime-core";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import { PositionStrict } from "@darwin-studio/vue-ui/src/types/position";
import {
  POSITION_HORIZONTAL,
  POSITION_VERTICAL,
} from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import DBackdrop from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop";
import prepareElementSize from "@darwin-studio/vue-ui/src/utils/prepare-element-size";
import useClosable from "@darwin-studio/vue-ui/src/compositions/closable";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {
    isShown: {
      type: Boolean,
    },
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      // TODO: array of messages ???
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * Positions on the component.
     * Takes values: 'top', 'right', 'bottom', 'left'.
     */
    position: {
      type: String as PropType<PositionStrict>,
      default: POSITION_HORIZONTAL.RIGHT,
      validator: (val: PositionStrict) =>
        Boolean(
          Object.values(
            Object.assign({}, POSITION_HORIZONTAL, POSITION_VERTICAL)
          ).includes(val)
        ),
    },
    /**
     * Defines width of the component if props.position is "right" or "left"
     */
    width: {
      type: [String, Number],
      default: config.defaultWidth,
    },
    /**
     * Defines height of the component if props.position is "top" or "bottom"
     */
    height: {
      type: [String, Number],
      default: config.defaultHeight,
    },
    /**
     * The component is mounted inside passed element.
     */
    target: {
      type: [String, Object] as PropType<string | RendererElement>,
      default: config.defaultTarget,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      // TODO: other colors ???
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines font size of the component. By default, depends on props.size
     */
    font: {
      type: String as PropType<Font>,
      default: FONT.MEDIUM,
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.DEFAULT, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the component
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.MEDIUM, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Pass props.disable to the <teleport />, so the component will not be moved to the props.target.
     */
    enableInline: {
      type: Boolean,
    },
    /**
     * Defines a11y role of the component
     */
    role: {
      type: String, // TODO: specify type,
      default: config.defaultRole,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.ASIDE,
    },
    /**
     * Defines z-index of the component
     */
    zIndex: {
      type: Number,
      default: config.defaultZIndex,
    },
    // TODO: backdropProps\Options
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch close event
     */
    whenClose: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLOSE],

  setup(props) {
    const { closeButtonId } = useClosable(props);
    return closeButtonId;
  },

  computed: {
    classes(): (string | undefined)[] {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
      );
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.className],
        styles[this.position],
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
    },

    styles(): CSSProperties {
      return {
        "--width": prepareElementSize(this.width),
        "--height": prepareElementSize(this.height),
        "--z-index": this.zIndex,
      };
    },

    backdropBindings(): Record<
      string,
      | string
      | (string | undefined)[]
      | CSSProperties
      | ((event: MouseEvent) => void | Promise<void>)
    > {
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return {
        class: transitionStyles[transitionClassName],
      };
    },

    bindings(): Record<
      string,
      | string
      | (string | undefined)[]
      | CSSProperties
      | ((event: MouseEvent) => void | Promise<void>)
    > {
      return {
        role: this.role,
        class: this.classes,
        style: this.styles,
      };
    },

    backdropTransitionBindings(): {
      enterActiveClass: string;
      leaveActiveClass: string;
    } {
      return {
        enterActiveClass: styles.backdropTransitionEnterActive,
        leaveActiveClass: styles.backdropTransitionLeaveActive,
      };
    },

    // TODO
    transitionBindings(): {
      enterActiveClass: string;
      leaveActiveClass: string;
    } {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },
  },

  methods: {
    closeHandler(): void {
      /**
       * Emits on the component close
       * @event close
       */
      this.$emit(EVENT_NAME.CLOSE);
      this.whenClose?.();
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /** @slot $slots.default
   *  Use instead of props.content to fully customize content
   */
  // TODO: @slot $slots.header ???
  // TODO: @slot $scopedSlots.closeButton (scoped to pass closeButtonId) ???
  // TODO: @slot $slots.footer ???
  // TODO: @slot $slots.slides ???
  render(): VNode {
    const Tag = this.tag;

    // TODO: aria-labelledby="open-menu"
    // TODO: tabindex="0" ???

    if (!this.enableHtml) {
      return (
        <Teleport to={this.target} disabled={Boolean(this.enableInline)}>
          <Trans {...this.backdropTransitionBindings}>
            {this.isShown && (
              <DBackdrop
                {...this.backdropBindings}
                whenClick={this.whenClose}
              />
            )}
          </Trans>
          <Trans {...this.transitionBindings}>
            {this.isShown && (
              <Tag {...this.bindings}>
                {this.$slots.default?.() || this.content}
              </Tag>
            )}
          </Trans>
        </Teleport>
      );
    }

    return (
      <Teleport to={this.target} disabled={Boolean(this.enableInline)}>
        <Trans {...this.backdropTransitionBindings}>
          {this.isShown && (
            <DBackdrop {...this.backdropBindings} whenClick={this.whenClose} />
          )}
        </Trans>
        <Trans {...this.transitionBindings}>
          {this.isShown && <Tag {...this.bindings} v-html={this.content} />}
        </Trans>
      </Teleport>
    );
  },
});
