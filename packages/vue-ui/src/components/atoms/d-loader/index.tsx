import {
  CSSProperties,
  defineComponent,
  mergeProps,
  PropType,
  VNode,
} from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { Font } from "@darwin-studio/ui-codegen/dist/types/font";
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
import DBackdrop, {
  DBackdropProps,
} from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop";
import { BACKDROP_DEFAULTS } from "./constants";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {
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
     * Defines z-index of the component
     */
    zIndex: {
      type: Number,
      default: config.defaultZIndex,
    },
    /**
     * TODO
     */
    fillAvailable: {
      type: Boolean,
      default: true,
    },
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: {
      type: Object as PropType<DBackdropProps>,
      default: () => BACKDROP_DEFAULTS,
    },
  },

  computed: {
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
        colorScheme: this.colorScheme,
        class: [
          styles[config.backdropClassName],
          transitionStyles[transitionClassName],
        ],
        ...mergeProps(BACKDROP_DEFAULTS, this.backdropOptions),
      };
    },

    renderBackdrop(): VNode | null {
      if (!this.fillAvailable) {
        return null;
      }

      return (
        <Trans {...this.backdropTransitionBindings} appear>
          <DBackdrop {...this.backdropBindings} />
        </Trans>
      );
    },

    renderLoader(): VNode {
      return (
        <div class={this.classes} style={this.styles}>
          {config.defaultContent}
        </div>
      );
    },
  },

  render(): VNode {
    if (this.fillAvailable) {
      return (
        <div class={styles[config.wrapperClassName]}>
          {this.renderBackdrop}
          {/*TODO: transition*/}
          {this.renderLoader}
        </div>
      );
    }

    // TODO: .content, enableHtml default slot
    // TODO: transition ???
    return this.renderLoader;
  },
});
