import { defineComponent, ref, onMounted, inject } from "vue";
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

    const injection = inject<Ref<DAccordionProvided>>(PROVIDE_INJECT_KEY);
    const commonProps = ref({
      hideSummaryAfter:
        injection?.value.hideSummaryAfter || props.hideSummaryAfter,
      colorScheme: injection?.value.colorScheme || props.colorScheme,
      padding: injection?.value.padding || props.padding,
      rounding: injection?.value.rounding || props.rounding,
      size: injection?.value.size || props.size,
      transition: injection?.value.transition || props.transition,
    });

    return {
      [config.contentRef]: contentRef,
      contentHeight,
      isMounted,
      commonProps,
      [config.detailsRef]: ref(null) as Ref<HTMLElement | null>,
      innerOpen: ref(props.open || false),
      isExpanded: ref(props.open || false),
      transitionDuration: ref(
        getTransitionDuration(commonProps.value.transition)
      ),
    };
  },

  emits: [EVENT_NAME.TOGGLE, EVENT_NAME.UPDATE_OPEN],

  computed: {
    summaryClasses(): (string | undefined)[] {
      return [
        generateClass.outline(
          `${this.commonProps.colorScheme}-${this.commonProps.size}`
        ),
        generateClass.rounding(this.commonProps.rounding),
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
      return [
        generateClass.rounding(this.commonProps.rounding),
        generateClass.transition(this.commonProps.transition),
      ];
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
        generateClass.padding(this.commonProps.padding), // TODO: merge in the util
        generateClass.padding(
          `${this.commonProps.padding}-${this.commonProps.size}`
        ), // TODO: merge in the util
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
        await sleep(this.transitionDuration * 1000);
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
