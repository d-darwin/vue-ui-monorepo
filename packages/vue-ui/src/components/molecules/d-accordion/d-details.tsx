import {
  CSSProperties,
  defineComponent,
  onMounted,
  PropType,
  Ref,
  ref,
  VNode,
} from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import { sleep } from "@darwin-studio/vue-ui/src/utils/sleep";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import config from "./config";
import styles from "./d-details.css?module";

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
    const isVisible = ref(props.open); // TODO: naming
    const innerOpen = ref(props.open);

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
      ];
    },

    contentClasses(): (string | undefined)[] {
      return [
        styles[config.contentClassName],
        generateClass.padding(this.padding), // TODO: merge in the util
        generateClass.padding(`${this.padding}-${this.size}`), // TODO: merge in the util
        generateClass.transition(this.transition),
      ];
    },

    contentStyles(): CSSProperties {
      if (this.isMounted) {
        const hasHeight = this.innerOpen && this.isVisible;
        return {
          height: hasHeight ? `${this.contentHeight}px` : 0,
          paddingTop: hasHeight ? undefined : 0,
          paddingBottom: hasHeight ? undefined : 0,
          opacity: hasHeight ? undefined : 0,
        };
      }

      return {};
    },
  },

  methods: {
    async clickHandler(event: MouseEvent): Promise<void> {
      event.preventDefault(); // ???
      if (this.innerOpen) {
        this.isVisible = false;
        // TODO: get from the token ???
        await sleep(500); // browser shouldn't hide the content util transition animation will be finished
        this.innerOpen = false;
      } else {
        this.innerOpen = true;
        await sleep(0); // browser should render the content first
        this.isVisible = true;
      }

      /**
       * Emits on toggle with generic Event payload
       * @event toggle
       * @type {event: Event}
       */
      this.$emit(EVENT_NAME.TOGGLE, event);
      this.$emit(EVENT_NAME.UPDATE_OPEN, this.innerOpen);
      this.whenToggle?.(event, this.innerOpen);
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
        <summary class={this.summaryClasses} onClick={this.clickHandler}>
          {/*TODO: $slots.before/after - instead of dropdown icon ? */}
          {this.$slots.summary?.() || this.summary}
          {/*TODO: $slots.before/after - instead of dropdown icon ? */}
        </summary>
        <div
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
