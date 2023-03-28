import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  Ref,
  ref,
  VNode,
} from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import { sleep } from "@darwin-studio/vue-ui/src/utils/sleep";
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

    // TODO: whenToggle
  },

  setup(props) {
    const detailsRef: Ref<HTMLElement | null> = ref(null);
    const contentRef: Ref<HTMLElement | null> = ref(null);
    const contentHeight = ref(0);
    const isMounted = ref(false);
    const isOpened = ref(props.open);
    const isExpended = ref(props.open); // TODO: naming

    onMounted(async () => {
      contentHeight.value = contentRef.value?.offsetHeight || 0;
      isMounted.value = true;
    });

    return {
      [config.detailsRef]: detailsRef,
      [config.detailsContentRef]: contentRef,
      contentHeight,
      isMounted,
      isOpened,
      isExpended, // TODO: naming
    };
  },

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
        const stableOpened = this.isOpened && this.isExpended; // TODO: naming
        return {
          height: stableOpened ? `${this.contentHeight}px` : 0,
          paddingTop: stableOpened ? undefined : 0,
          paddingBottom: stableOpened ? undefined : 0,
          opacity: stableOpened ? undefined : 0,
        };
      }

      return {};
    },
  },

  methods: {
    async clickHandler(event: MouseEvent): Promise<void> {
      event.preventDefault();
      if (this.isOpened) {
        this.isExpended = false;

        // browser will completely hide .details-content only after transition finishes
        await sleep(1000); // TODO: parse token value???
        this.isOpened = false;
        // TODO this.emitChange();
      } else {
        this.isOpened = true;
        // TODO this.emitChange();

        // use timeout to hack event loop
        await sleep(24); // TODO: experimental value - config
        // await nextTick();
        this.isExpended = true;
      }
    },
  },

  // TODO: slots descr
  render(): VNode {
    return (
      <details
        ref={config.detailsRef}
        open={this.isOpened}
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
