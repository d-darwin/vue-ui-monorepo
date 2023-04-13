import { defineComponent } from "vue";
import type { CSSProperties, VNode } from "vue";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import sleep from "@darwin-studio/vue-ui/src/utils/sleep";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { CommonProps } from "./types";
import { dDetailsProps as props } from "./props";
import { dDetailsSetup as setup } from "./setup";
import { getTransitionDuration } from "./utils";
import config from "./config";

/**
 * Renders <b>details</b> element with <b>summary</b>.
 */
export default defineComponent({
  name: config.details.name,

  props, // TODO: move to the config ???

  // TODO: v-model: open -> value

  setup, // TODO: move to the config ???

  emits: [EVENT_NAME.TOGGLE, EVENT_NAME.UPDATE_OPEN], // TODO: move to the config ???

  computed: {
    // TODO: computed(() => {
    //  return Object.values(state.value).some(status => status);
    // TODO: typing
    // TODO: naming
    commonProps(): CommonProps {
      return {
        hideSummaryAfter:
          this.injection.hideSummaryAfter || this.hideSummaryAfter,
        disabled: this.injection.disabled || this.disabled,
        colorScheme: this.injection.colorScheme || this.colorScheme,
        padding: this.injection.padding || this.padding,
        rounding: this.injection.rounding || this.rounding,
        size: this.injection.size || this.size,
        transition: this.injection.transition || this.transition,
      };
    },

    // TODO: computed(() => {
    transitionDuration(): number {
      return getTransitionDuration(this.commonProps.transition) * 1000;
    },

    summaryClasses(): (string | undefined)[] {
      return [
        generateClass.outline(
          this.commonProps.colorScheme,
          this.commonProps.size
        ),
        generateClass.transition(this.commonProps.transition),
        this.innerOpen && this.isExpanded ? config.summaryOpenClass : undefined,
      ];
    },

    renderSummary(): VNode {
      return (
        <summary
          {...config.summaryOptions}
          class={this.summaryClasses}
          onClick={this.toggle}
          {...this.summaryOptions}
        >
          {this.$slots.summary?.() || this.summary}
          {!this.commonProps?.hideSummaryAfter && this.renderSummaryAfter}
        </summary>
      );
    },

    renderSummaryAfter(): VNode[] | VNode {
      return (
        <span
          class={[
            config.summaryAfterOptions.class,
            this.innerOpen && this.isExpanded
              ? config.summaryAfterOpenClass
              : undefined,
            generateClass.transition(this.commonProps.transition),
          ]}
        >
          {this.$slots.summaryAfter?.() || config.summaryAfterContent}
        </span>
      );
    },

    contentClasses(): (string | undefined)[] {
      return [generateClass.transition(this.commonProps.transition)];
    },

    contentStyles(): CSSProperties | undefined {
      if (this.isMounted) {
        const hasHeight = this.innerOpen && this.isExpanded;
        return {
          height: hasHeight ? `${this.contentHeight}px` : 0,
          padding: hasHeight ? `var(--padding)` : undefined,
        };
      }

      return {};
    },

    // TODO: rounding.full -> the bottom of the content is out of the container
    renderContent(): VNode {
      return (
        <div
          {...config.contentOptions}
          class={this.contentClasses}
          style={this.contentStyles}
          {...this.contentOptions}
        >
          {this.$slots.default?.() || this.content}
        </div>
      );
    },

    classes(): (string | undefined)[] {
      return [
        config.details.class,
        this.commonProps.disabled ? config.details.disabledClass : undefined,
        this.commonProps.disabled
          ? config.details.disabledColorSchemeClass
          : undefined,
        generateClass.colorScheme(this.commonProps.colorScheme),
        generateClass.font(this.commonProps.size),
        ...generateClass.padding(
          this.commonProps.padding,
          this.commonProps.size
        ),
        generateClass.rounding(this.commonProps.rounding),
        generateClass.size(this.commonProps.size),
        generateClass.transition(this.commonProps.transition),
      ];
    },
  },

  watch: {
    open: {
      handler() {
        console.log("open", this.open);
        // TODO: test case
        if (this.open && !this.innerOpen) {
          this.toggle();
        } else if (!this.open && this.innerOpen) {
          this.toggle();
        }
      },
      immediate: true,
    },
    // TODO: config
    "injection.openIds": {
      handler() {
        if (typeof this.injection.openIds === "undefined") {
          return;
        }
        console.log("injection.openIds", this.openIds);
        // TODO: test case
        const shouldBeOpened = this.injection.openIds?.includes(this.id);
        if (shouldBeOpened && !this.innerOpen) {
          this.toggle();
        } else if (!shouldBeOpened && this.innerOpen) {
          this.toggle();
        }
      },
      immediate: true,
    },
  },

  methods: {
    // todo
    /*    whenChange(id: Text, open: boolean): void {
      t
    },*/

    async toggle(event?: MouseEvent): Promise<void> {
      event?.preventDefault();
      // TODO: test case
      if (this.commonProps.disabled) {
        return;
      }

      if (this.innerOpen) {
        this.isExpanded = false;
        await sleep(this.transitionDuration);
        this.innerOpen = false;
      } else {
        this.innerOpen = true;
        await sleep(0);
        this.isExpanded = true;
      }

      /**
       * Emits on toggle with MouseEvent payload
       * @event toggle
       * @type {event: Event}
       */
      this.$emit(EVENT_NAME.TOGGLE, event);
      /**
       * Emits on toggle with current open state
       * @event update:open
       * @type {open: boolean}
       */
      this.$emit(EVENT_NAME.UPDATE_OPEN, this.innerOpen); // TODO: update open
      this.injection.whenChange?.(this.id, this.innerOpen);
      this.whenChange?.(this.id, this.innerOpen);
    },
  },

  /**
   * @slot $slots.summary
   * Use instead of props.summary to fully customize summary element content
   * */
  /**
   * @slot $slots.summaryAfter
   * Use instead of props.summaryAfter to fully customize after summary element
   * */
  /**
   * @slot $slots.default
   * Use instead of props.content to fully customize details content
   * */
  render(): VNode {
    return (
      <details
        ref={config.details.ref}
        id={this.id ? String(this.id) : undefined}
        open={this.innerOpen}
        class={this.classes}
      >
        {this.renderSummary}
        {this.renderContent}
      </details>
    );
  },
});
