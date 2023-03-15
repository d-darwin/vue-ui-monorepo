import {
  defineComponent,
  mergeProps,
  type CSSProperties,
  type PropType,
  type VNode,
} from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ???
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding"; // TODO: shorter path, default export ???
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition"; // TODO: shorter path, default export ???
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition"; // TODO: shorter path, default export ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName"; // TODO: move to common utils ???
import codegenConfig from "@darwin-studio/ui-codegen/config.json"; // TODO: move to common config ???
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import { BACKDROP_DEFAULTS } from "./constants";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
      default: config.defaultContent,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: {
      type: String as PropType<Font>,
      default: FONT.HUGE, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the component
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.FULL, // TODO: gent defaults base on actual values, not hardcoded
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
     * Defines animation duration
     */
    animationDuration: {
      type: String,
      default: config.defaultAnimationDuration,
    },
    /**
     * Defines z-index of the component
     */
    zIndex: {
      type: Number,
      default: config.defaultZIndex,
    },
    /**
     * Adds DBackdrop to fill all available space
     */
    fillAvailable: {
      type: Boolean,
      default: false,
    },
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: generateProp.options<DBackdropProps>(BACKDROP_DEFAULTS),
  },

  computed: {
    backdropTransitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.backdropTransitionEnterActive,
        leaveActiveClass: styles.backdropTransitionLeaveActive,
      };
    },

    backdropTransitionClass(): string | undefined {
      return getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition);
    },

    renderBackdrop(): VNode | null {
      return (
        <Trans {...this.backdropTransitionBindings} appear>
          <DBackdrop
            colorScheme={this.colorScheme}
            class={this.backdropTransitionClass}
            {...mergeProps(this.backdropOptions, BACKDROP_DEFAULTS)}
          />
        </Trans>
      );
    },

    classes(): string[] {
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      // TODO: font and size separately
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.font
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
        colorSchemeStyles[colorSchemeClassName],
        fontStyles[fontClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
    },

    styles(): CSSProperties {
      return {
        "--z-index": this.zIndex,
        "--animation-duration": this.animationDuration,
      };
    },

    transitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },

    renderLoader(): VNode {
      return (
        <Trans {...this.transitionBindings} appear>
          <div key={"loader"} class={this.classes} style={this.styles}>
            {/*TODO: default slot, enable html*/}
            {this.content}
          </div>
        </Trans>
      );
    },
  },

  render(): VNode {
    return (
      <div class={styles[config.wrapperClassName]}>
        {this.fillAvailable && this.renderBackdrop}
        {this.renderLoader}
      </div>
    );
  },
});
