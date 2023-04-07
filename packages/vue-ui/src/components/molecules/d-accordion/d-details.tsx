import {
  defineComponent,
  ref,
  onMounted,
  watch,
  inject,
  type CSSProperties,
  type Ref,
  type VNode,
} from "vue";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import { sleep } from "@darwin-studio/vue-ui/src/utils/sleep";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { SUMMARY_DEFAULTS, CONTENT_DEFAULTS } from "./constants";
import { dDetailsProps as props } from "./props";
import config from "./config";
import { getTransitionDuration } from "./utils";
import styles from "./d-details.css?module";

/**
 * Renders <b>details</b> element with <b>summary</b>.
 */
export default defineComponent({
  name: config.detailsName,

  /**
   * @props summary
   * TODO: check if there is jsdoc -> storybook
   * */
  props,

  setup(props) {
    const detailsRef: Ref<HTMLElement | null> = ref(null);
    const contentRef: Ref<HTMLElement | null> = ref(null);
    const contentHeight = ref(0);
    const isMounted = ref(false);
    const innerOpen = ref(props.open || false);
    const isTransitionOpen = ref(false);
    const transitionDuration = ref(getTransitionDuration(props.transition));

    onMounted(async () => {
      contentHeight.value = contentRef.value?.offsetHeight || 0;
      isMounted.value = true;
    });

    watch(
      () => props.open,
      (open) => {
        innerOpen.value = open;
      }
    );

    watch(
      () => props.transition,
      (transition) => {
        transitionDuration.value = getTransitionDuration(transition);
      }
    );

    // TODO: typings, injectedProps
    const injectedColorScheme = inject("colorScheme") as string;
    console.log("injected colorScheme:", injectedColorScheme);

    return {
      [config.detailsRef]: detailsRef,
      [config.contentRef]: contentRef,
      contentHeight,
      isMounted,
      innerOpen,
      isTransitionOpen, // TODO: naming
      transitionDuration,
      injectedColorScheme,
    };
  },

  emits: [EVENT_NAME.TOGGLE, EVENT_NAME.UPDATE_OPEN],

  computed: {
    summaryClasses(): (string | undefined)[] {
      return [
        generateClass.outline(
          `${this.injectedColorScheme || this.colorScheme}-${this.size}`
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
          {!this.hideSummaryAfter && this.renderSummaryAfter}
        </summary>
      );
    },

    renderSummaryAfter(): VNode[] | VNode {
      return (
        this.$slots.summaryAfter?.() || (
          <span
            class={[
              styles[config.summaryAfterClassName],
              this.innerOpen && this.isTransitionOpen
                ? styles.rotatedIcon
                : undefined,
              generateClass.transition(this.transition),
            ]}
          >
            {config.summaryIcon}
          </span>
        )
      );
    },

    contentClasses(): (string | undefined)[] {
      return [generateClass.transition(this.transition)];
    },

    contentStyles(): CSSProperties | undefined {
      if (this.isMounted) {
        const hasHeight = this.innerOpen && this.isTransitionOpen;
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
        generateClass.colorScheme(this.injectedColorScheme || this.colorScheme),
        generateClass.font(this.size),
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
      ];
    },
  },

  methods: {
    async clickHandler(event: MouseEvent): Promise<void> {
      event.preventDefault();

      if (this.innerOpen) {
        this.isTransitionOpen = false;
        await sleep(this.transitionDuration * 1000);
        this.innerOpen = false;
      } else {
        this.innerOpen = true;
        await sleep(0);
        this.isTransitionOpen = true;
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
   * @slot slots.summary
   * Use instead of props.summary to fully customize summary element content
   * */
  /**
   * @slot slots.summaryAfter
   * Use instead of props.summaryAfter to fully customize after summary element
   * */
  /**
   * @slot slots.default
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
