import { defineComponent, ref, onMounted, inject, watch } from "vue";
import type { CSSProperties, Ref, VNode } from "vue";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import sleep from "@darwin-studio/vue-ui/src/utils/sleep";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import {
  SUMMARY_DEFAULTS,
  CONTENT_DEFAULTS,
  PROVIDE_INJECT_KEY,
} from "./constants";
import { dDetailsProps as props } from "./props";
import config from "./config";
import { getTransitionDuration } from "./utils";
import styles from "./d-details.css?module";
import type { DAccordionProvided } from "./types";

/**
 * Renders <b>details</b> element with <b>summary</b>.
 */
export default defineComponent({
  name: config.detailsName,

  /**
   * @prop summary
   * TODO: check if there is jsdoc -> storybook
   * */
  props,

  setup(props) {
    const contentRef: Ref<HTMLElement | null> = ref(null);
    const contentHeight = ref(0);
    const isMounted = ref(false);
    onMounted(async () => {
      contentHeight.value = contentRef.value?.offsetHeight || 0;
      isMounted.value = true;
    });

    const innerOpen = ref(props.open || false);
    const isExpanded = ref(props.open || false);
    watch(
      () => props.open,
      () => {
        innerOpen.value = props.open;
        isExpanded.value = props.open;
      }
    );

    return {
      [config.contentRef]: contentRef,
      contentHeight,
      isMounted,
      [config.detailsRef]: ref(null) as Ref<HTMLElement | null>,
      innerOpen,
      isExpanded,
      injection: inject<DAccordionProvided>(PROVIDE_INJECT_KEY, {}),
    };
  },

  emits: [EVENT_NAME.TOGGLE, EVENT_NAME.UPDATE_OPEN],

  computed: {
    // TODO: computed(() => {
    //  return Object.values(state.value).some(status => status);
    commonProps(): Required<DAccordionProvided> {
      return {
        hideSummaryAfter:
          this.injection?.hideSummaryAfter || this.hideSummaryAfter,
        colorScheme: this.injection?.colorScheme || this.colorScheme,
        padding: this.injection?.padding || this.padding,
        rounding: this.injection?.rounding || this.rounding,
        size: this.injection?.size || this.size,
        transition: this.injection?.transition || this.transition,
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
      ];
    },

    renderSummary(): VNode {
      return (
        <summary
          {...SUMMARY_DEFAULTS}
          class={this.summaryClasses}
          onClick={this.clickHandler}
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
            styles[config.summaryAfterClassName],
            this.innerOpen && this.isExpanded ? styles.rotatedIcon : undefined,
            generateClass.transition(this.commonProps.transition),
          ]}
        >
          {this.$slots.summaryAfter?.() || config.summaryIcon}
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

    renderContent(): VNode {
      return (
        <div
          {...CONTENT_DEFAULTS}
          ref={config.contentRef}
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
        styles[config.detailsClassName],
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

  methods: {
    async clickHandler(event: MouseEvent): Promise<void> {
      event.preventDefault();

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
      this.$emit(EVENT_NAME.UPDATE_OPEN, this.innerOpen);
      this.whenToggle?.(event, this.innerOpen);
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
        ref={config.detailsRef}
        open={this.innerOpen}
        class={this.classes}
      >
        {this.renderSummary}
        {this.renderContent}
      </details>
    );
  },
});
