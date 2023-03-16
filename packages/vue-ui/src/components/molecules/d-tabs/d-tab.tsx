import {
  defineComponent,
  type HTMLAttributes,
  type PropType,
  type VNode,
} from "vue";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import config from "./config";
import styles from "./d-tab.css?module";

export default defineComponent({
  name: config.tabName,

  props: {
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    label: generateProp.content(),
    /**
     * Pass if the component is active
     */
    active: Boolean,
    /**
     * Defines <i>id</i> attr of the component
     */
    id: generateProp.text(), // TODO use .(() => uuid4()) ???
    /**
     * Defines <i>id</i> attr of the corresponding DTabpanel component
     */
    tabpanelId: generateProp.text(),
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
    tag: generateProp.tag(TAG_NAME_DEFAULTS.LI),
    /**
     * Enables html string rendering passed in props.label.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,

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
      const classes = [
        styles[config.tabClassName],
        getCommonCssClass(TOKEN_NAME.FONT, this.size),
        getCommonCssClass(
          TOKEN_NAME.OUTLINE,
          `${config.baseColorScheme}-${this.size}`
        ),
        getCommonCssClass(TOKEN_NAME.PADDING, this.padding),
        getCommonCssClass(TOKEN_NAME.PADDING, `${this.padding}-${this.size}`),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];

      if (this.active) {
        classes.push(styles.active);
      }
      if (this.disabled) {
        classes.push(styles.disabled);
      }

      return classes;
    },

    bindings(): HTMLAttributes {
      return {
        id: this.id ? String(this.id) : undefined,
        tabindex: this.active ? 0 : -1,
        role: "tab",
        ["aria-selected"]: this.active || undefined,
        ["aria-controls"]: this.tabpanelId
          ? String(this.tabpanelId)
          : undefined,
        class: this.classes,
        onClick: this.clickHandler,
      };
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

    if (!this.enableHtml) {
      /** @slot Use instead of props.label to fully customize content */
      return (
        <Tag {...this.bindings}>{this.$slots.default?.() || this.label}</Tag>
      );
    }

    return <Tag {...this.bindings} v-html={this.label} />;
  },
});
