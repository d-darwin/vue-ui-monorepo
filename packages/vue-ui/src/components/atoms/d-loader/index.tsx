import { defineComponent } from "vue";
import type { CSSProperties, VNode } from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding"; // TODO: shorter path, default export ???
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";
import styles from "./index.css?module";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Plain string or VNode
     */
    content: generateProp.content(config.content),
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
    animationDuration: generateProp.string(config.animationDuration),
    /**
     * Defines z-index of the component
     */
    zIndex: generateProp.number(config.zIndex),
    /**
     * Adds DBackdrop to fill all available space
     */
    fillAvailable: Boolean,
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: generateProp.options<DBackdropProps>(
      config.backdropOptions
    ),
  },

  computed: {
    backdropTransitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.backdropTransitionEnterActive,
        leaveActiveClass: styles.backdropTransitionLeaveActive,
      };
    },

    backdropTransitionClass(): string | undefined {
      return generateClass.transition(this.transition);
    },

    renderBackdrop(): VNode | null {
      return (
        <Trans {...this.backdropTransitionBindings} appear>
          <DBackdrop
            {...config.backdropOptions}
            colorScheme={this.colorScheme}
            class={this.backdropTransitionClass}
            {...this.backdropOptions}
          />
        </Trans>
      );
    },

    classes(): (string | undefined)[] {
      return [
        config.class,
        generateClass.colorScheme(this.colorScheme),
        generateClass.font(this.font),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
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
            {this.$slots.default?.() || this.content}
          </div>
        </Trans>
      );
    },
  },

  render(): VNode {
    return (
      <div class={config.wrapperClass}>
        {this.fillAvailable && this.renderBackdrop}
        {this.renderLoader}
      </div>
    );
  },
});
