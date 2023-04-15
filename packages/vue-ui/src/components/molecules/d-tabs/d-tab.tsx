import { defineComponent } from "vue";
import type { PropType, VNode } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import config from "./config";
import styles from "./d-tab.css?module";

export default defineComponent({
  name: config.tabName,

  // TODO: move to props.ts ???
  props: {
    /**
     * Defines <i>id</i> attr of the component
     */
    id: generateProp.text(),
    /**
     * Defines <i>id</i> attr of the corresponding DTabpanel component
     */
    tabpanelId: generateProp.text(), // TODO: try not to use
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass if the component is active
     */
    active: Boolean,
    // TODO: commonProps via provide/inject
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
       as opposed to needing to add them yourself. For controlling tab key functionality for elements with the role tab,
       it is recommended to set all non-active elements to tabindex="-1", and to set the active element to tabindex="0".
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

  computed: {
    classes(): (string | undefined)[] {
      return [
        // TODO
        //  ...generateClasses({
        //    font: this.size,
        //    outline: {colorScheme: this.colorScheme, size: this.size},
        //    ------------- or -------------
        //    padding: [this.padding, this.size]
        //  })
        generateClass.font(this.size),
        generateClass.outline(config.colorScheme, this.size), // TODO: props
        ...generateClass.padding(this.padding, this.size),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
        this.active ? styles.active : undefined, // TODO: config,
        this.disabled ? styles.disabled : undefined, // TODO: config, colorScheme disabled
      ];
    },
  },

  methods: {
    clickHandler(event: MouseEvent): void | Promise<void> {
      if (!this.disabled) {
        /**
         * Emits on click with MouseEvent payload
         * @event click
         * @type {event: MouseEvent}
         */
        this.$emit(EVENT_NAME.CLICK, event);
        this.whenClick?.(event);
      }
    },
  },

  render(): VNode {
    const Tag = this.tag;
    return (
      /** @slot Use instead of props.content to fully customize content */
      <Tag
        {...config.tabOptions}
        id={String(this.id)}
        tabindex={this.active ? 0 : -1}
        aria-selected={this.active || undefined}
        aria-controls={String(this.tabpanelId)}
        class={this.classes}
        onClick={this.clickHandler}
      >
        {this.$slots.default?.() || this.content}
      </Tag>
    );
  },
});
