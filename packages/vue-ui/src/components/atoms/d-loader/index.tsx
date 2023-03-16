import {
  defineComponent,
  mergeProps,
  type CSSProperties,
  type VNode,
} from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
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
    content: generateProp.content(config.defaultContent),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: generateProp.font(FONT.HUGE),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(ROUNDING.FULL),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines animation duration
     */
    animationDuration: generateProp.string(config.defaultAnimationDuration),
    /**
     * Defines z-index of the component
     */
    zIndex: generateProp.number(config.defaultZIndex),
    /**
     * Adds DBackdrop to fill all available space
     */
    fillAvailable: Boolean,
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
            key={config.backdropKey}
            colorScheme={this.colorScheme}
            class={this.backdropTransitionClass}
            {...mergeProps(this.backdropOptions, BACKDROP_DEFAULTS)}
          />
        </Trans>
      );
    },

    classes(): (string | undefined)[] {
      return [
        styles[config.className],
        getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme),
        getCommonCssClass(TOKEN_NAME.FONT, this.font),
        getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];
    },

    styles(): CSSProperties {
      return {
        "--z-index": this.zIndex, // TODO: config
        "--animation-duration": this.animationDuration, // TODO: config
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
          <div key={config.key} class={this.classes} style={this.styles}>
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
