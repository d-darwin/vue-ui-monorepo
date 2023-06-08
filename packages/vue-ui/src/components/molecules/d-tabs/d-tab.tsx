import { defineComponent, inject, ref } from "vue";
import type { PropType, VNode } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import type { CommonProps, DTabsProvided } from "./types";
import config from "./config";
import styles from "./d-tab.css?module";

/**
 * The component is intended to be a Tab child of the DTabs component.
 */
export default defineComponent({
  name: config.tabName,

  // TODO: move to props.ts ???
  props: {
    /**
     * Defines <i>id</i> attr of the component
     */
    id: generateProp.text(undefined, true),
    /**
     * Defines <i>id</i> attr of the corresponding DTabpanel component
     */
    tabpanelId: generateProp.text(),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass if the component is active
     */
    active: Boolean,
    /**
     * Pass true to disable <b>DTab</b> element.
     */
    disabled: Boolean,
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines size of the component
     */
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /*TODO: It is recommended to use a <button> element with the role tab for their built-in functional and accessible features instead,
       as opposed to needing to add them yourself.
    */
    /**
     * Defines element type of the container component
     */
    tag: generateProp.tag(config.tabTag),

    /**
     * Alternative way to catch click event
     */
    whenClick: {
      type: Function as PropType<(event?: MouseEvent) => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLICK],

  setup(props) {
    return {
      innerActive: ref(props.active),
      injection: inject<DTabsProvided>(config.provideInjectKey, {}),
    };
  },

  watch: {
    active: {
      handler(active) {
        if (active !== this.innerActive) {
          if (active) {
            this.activateHandler();
          } else {
            this.innerActive = false;
          }
        }
      },
      immediate: true,
    },
    [config.injectedActiveIdPath]: {
      handler(activeId) {
        if (typeof activeId === "undefined") {
          return;
        }
        // TODO: test case
        if (activeId === this.id && !this.innerActive) {
          this.activateHandler();
        } else if (activeId !== this.id && this.innerActive) {
          this.innerActive = false;
        }
      },
      immediate: true,
    },
  },

  computed: {
    commonProps(): CommonProps {
      return {
        disabled: this.injection.disabled || this.disabled,
        padding: this.injection.padding || this.padding,
        // TODO rounding: this.injection.rounding || this.rounding,
        size: this.injection.size || this.size,
        transition: this.injection.transition || this.transition,
      };
    },

    classes(): (string | undefined)[] {
      return [
        // TODO ???: single generate fabric for all the classes
        //  ...generateClasses({
        //    font: this.size,
        //    outline: {colorScheme: this.colorScheme, size: this.size},
        //    ------------- or -------------
        //    padding: [this.padding, this.size]
        //  })
        generateClass.font(this.commonProps.size),
        generateClass.outline(config.colorScheme, this.commonProps.size), // TODO: props
        ...generateClass.padding(
          this.commonProps.padding,
          this.commonProps.size
        ),
        generateClass.size(this.commonProps.size),
        generateClass.transition(this.commonProps.transition),
        this.commonProps.disabled ? styles.disabled : undefined, // TODO: config, colorScheme disabled
        this.innerActive ? styles.active : undefined, // TODO: config: to not to import styles here,
      ];
    },
  },

  methods: {
    activateHandler(event?: MouseEvent): void | Promise<void> {
      if (this.commonProps.disabled || this.innerActive) {
        return;
      }

      this.innerActive = true;

      /**
       * Emits on click with MouseEvent payload
       * @event click
       * @type {event: MouseEvent}
       */
      this.$emit(EVENT_NAME.CLICK, event); // TODO ???: pass props.id and props.active
      this.whenClick?.(event); // TODO ???: pass props.id and props.active
      this.injection.whenChange?.(this.id);
    },
  },

  render(): VNode {
    const Tag = this.tag;
    return (
      /** @slot Use instead of props.content to fully customize content */
      <Tag
        {...config.tabOptions}
        key={this.id}
        id={String(this.id)}
        tabindex={this.innerActive ? 0 : -1}
        aria-selected={this.innerActive || undefined}
        aria-controls={this.tabpanelId ? String(this.tabpanelId) : undefined}
        class={this.classes}
        onClick={this.activateHandler}
      >
        {this.$slots.default?.() || this.content}
      </Tag>
    );
  },
});
