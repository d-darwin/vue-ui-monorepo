import {
  defineComponent,
  nextTick,
  ref,
  onMounted,
  watch,
  type CSSProperties,
  type Ref,
  type VNode,
} from "vue";
import { TRANSITION_VALUE } from "@darwin-studio/ui-codegen/dist/constants/transition";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import { sleep } from "@darwin-studio/vue-ui/src/utils/sleep";
import getConstantKey from "@darwin-studio/vue-ui/src/utils/get-constant-key";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { SUMMARY_DEFAULTS, CONTENT_DEFAULTS } from "./constants";
import { dDetailsProps as props } from "./props";
import config from "./config";
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
    const isVisible = ref(props.open || false);
    const innerOpen = ref(props.open || false);

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

    return {
      [config.detailsRef]: detailsRef,
      [config.detailsContentRef]: contentRef,
      contentHeight,
      isMounted,
      isVisible, // TODO: naming
      innerOpen,
    };
  },

  emits: [EVENT_NAME.TOGGLE, EVENT_NAME.UPDATE_OPEN],

  computed: {
    classes(): (string | undefined)[] {
      return [
        styles[config.detailsClassName],
        generateClass.colorScheme(this.colorScheme),
        generateClass.font(this.size),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
      ];
    },

    summaryClasses(): (string | undefined)[] {
      return [
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.outline(`${this.colorScheme}-${this.size}`),
      ];
    },

    contentClasses(): (string | undefined)[] {
      return [
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.transition(this.transition),
      ];
    },

    contentStyles(): CSSProperties | undefined {
      if (this.isMounted) {
        const hasHeight = this.innerOpen && this.isVisible;
        return {
          height: hasHeight ? `${this.contentHeight}px` : 0,
          paddingTop: hasHeight ? undefined : 0,
          paddingBottom: hasHeight ? undefined : 0,
        };
      }

      return {};
    },
  },

  methods: {
    emitToggle(event: MouseEvent): void {
      /**
       * Emits on toggle with generic Event payload
       * @event toggle
       * @type {event: Event}
       */
      this.$emit(EVENT_NAME.TOGGLE, event);
      this.$emit(EVENT_NAME.UPDATE_OPEN, this.innerOpen);
      this.whenToggle?.(event, this.innerOpen);
    },

    async clickHandler(event: MouseEvent): Promise<void> {
      event.preventDefault(); // ???
      if (this.innerOpen) {
        this.isVisible = false;

        const transitionKey = getConstantKey(
          this.transition
        ) as keyof typeof TRANSITION_VALUE;
        // TODO: test case
        const duration = TRANSITION_VALUE[transitionKey]?.duration || 0;
        await sleep(duration * 1000);

        this.innerOpen = false;
        this.emitToggle(event);
      } else {
        this.innerOpen = true;
        this.emitToggle(event);
        // TODO: there is a step in animation on the first open :thinking:
        //  https://github.com/sticker0ne/vue3-rich-accordion/blob/main/src/library/accordion/AccordionItem.vue
        await nextTick();
        this.isVisible = true;
      }
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
        // TODO: onToggle ???
      >
        <summary
          {...SUMMARY_DEFAULTS}
          class={this.summaryClasses}
          onClick={this.clickHandler}
          // TODO: onToggle ???
          {...this.summaryOptions}
        >
          {this.$slots.summary?.() || this.summary}
          {!this.hideSummaryAfter &&
            (this.$slots.summaryAfter?.() || (
              <span
                class={[
                  styles[config.summaryAfterClassName],
                  this.isVisible ? styles.rotatedIcon : undefined,
                  generateClass.transition(this.transition),
                ]}
              >
                {config.summaryIcon}
              </span>
            ))}
        </summary>
        <div
          {...CONTENT_DEFAULTS}
          class={this.contentClasses}
          style={this.contentStyles}
          {...this.contentOptions}
        >
          {this.$slots.default?.() || this.content}
        </div>
      </details>
    );
  },
});
