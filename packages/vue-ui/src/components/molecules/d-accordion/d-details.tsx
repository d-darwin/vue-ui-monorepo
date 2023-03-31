import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  Ref,
  ref,
  VNode,
} from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import { sleep } from "@darwin-studio/vue-ui/src/utils/sleep";
import getConstantKey from "@darwin-studio/vue-ui/src/utils/get-constant-key";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { PositionStrict } from "@darwin-studio/vue-ui/src/types/position";
import { POSITION } from "@darwin-studio/vue-ui/src/constants/position";
import config from "./config";
import styles from "./d-details.css?module";
import { TRANSITION_VALUE } from "@darwin-studio/ui-codegen/dist/constants/transition";

/**
 * TODO
 */
export default defineComponent({
  name: config.detailsName,

  props: {
    /**
     * Plain string or VNode
     */
    summary: generateProp.content(),
    // TODO: summaryOptions
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    // TODO: contentOptions

    // TODO:
    open: Boolean,

    // TODO: colorScheme
    colorScheme: generateProp.colorScheme(),

    // TODO: padding
    padding: generateProp.padding(),

    // TODO: roundness
    rounding: generateProp.rounding(),

    // TODO: font ???
    // TODO: size
    size: generateProp.size(),

    // TODO: use or remove
    transition: generateProp.transition(),

    // TODO: disabled ???

    /**
     * Alternative way to catch toggle event with current open attr in the payload
     */
    whenToggle: Function as PropType<
      (event: Event, open?: boolean) => void | Promise<void>
    >,
  },

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

    // TODO: watch on open

    return {
      [config.detailsRef]: detailsRef,
      [config.detailsContentRef]: contentRef,
      contentHeight,
      isMounted,
      isVisible, // TODO: naming
      innerOpen, // inner open attr
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
        generateClass.transition(this.transition), // TODO: use or remove
      ];
    },

    summaryClasses(): (string | undefined)[] {
      return [
        styles[config.summaryClassName],
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.outline(`${this.colorScheme}-${this.size}`),
      ];
    },

    contentClasses(): (string | undefined)[] {
      return [
        styles[config.contentClassName],
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.transition(this.transition),
        this.isMounted && !(this.innerOpen && this.isVisible)
          ? styles.closedContent
          : undefined,
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
        const duration = TRANSITION_VALUE[transitionKey]?.duration || 0;
        await sleep(duration * 1000); // browser shouldn't hide the content util transition animation will be finished

        this.innerOpen = false;
        this.emitToggle(event); // TODO: watch on inner open ???
      } else {
        this.innerOpen = true;
        this.emitToggle(event); // TODO: watch on inner open ???
        // TODO: there is a step in animation on the first open closed by default item
        await nextTick();
        this.isVisible = true;
      }
    },
  },

  // TODO: slots descr
  render(): VNode {
    return (
      <details
        ref={config.detailsRef}
        open={this.innerOpen}
        class={this.classes}
      >
        {/*TODO: outline*/}
        {/*TODO: .prevent ???*/}
        <summary
          key="summary"
          class={this.summaryClasses}
          // tabindex={-1} // TODO
          onClick={this.clickHandler}
        >
          {/*TODO: $slots.before/after - instead of dropdown icon ? */}
          {this.$slots.summary?.() || this.summary}
          {/*TODO: $slots.before/after - instead of dropdown icon ? */}
        </summary>
        <div
          key="content"
          ref={config.detailsContentRef}
          class={this.contentClasses}
          style={this.contentStyles}
        >
          {this.$slots.default?.() || this.content}
        </div>
        {/*TODO: or whole content including summary ???*/}
      </details>
    );
  },
});
