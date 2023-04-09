import { defineComponent } from "vue";
import type { PropType, VNode } from "vue";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme"; // TODO: shorter path, default export ???
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size"; // TODO: shorter path, default export ???
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders group of the DCheckbox components with label and error
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Array of the DCheckbox components, alternatively you can use default slot
     */
    items: {
      type: Array as PropType<VNode[]>, // TODO: more accurate type, what about array of DCheckbox props?
    },
    /**
     * Plain string or VNode
     */
    label: generateProp.content(),
    /**
     * You can pass own class name to the <b>label</b> element.
     */
    // TODO: labelOptions
    labelClass: String,
    /**
     * Defines font size of the <b>label</b> element. By default depends on props.size
     */
    // TODO: labelOptions
    labelFont: generateProp.font(),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DCaption.props to customize it, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(config.captionOptions),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.captionOffset), // TODO: move to captionOptions
    /**
     * Pass true to disable <b>input</b> element.
     */
    disabled: Boolean,
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(COLOR_SCHEME.SECONDARY),
    /**
     * Defines corner rounding of the icon container element
     */
    rounding: generateProp.rounding(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(SIZE.TINY),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME.FIELDSET),

    // TODO: whenChange\WhenInput
  },

  setup(props, { slots }) {
    return useCaption(props, slots, styles, config.captionOptions);
  },

  computed: {
    renderLabel(): VNode | null {
      if (this.$slots.label?.() || this.label) {
        return (
          /*TODO: customizable tag*/
          <legend
            class={[
              styles[config.labelClassName],
              this.labelClass,
              generateClass.font(this.labelFont || this.size),
            ]}
          >
            {this.$slots.label?.() || this.label}
          </legend>
        );
      }

      return null;
    },

    renderItemList(): VNode[] {
      const prepareProps = (checkbox: VNode) => {
        Object.assign(checkbox.props || {}, {
          class: [styles[config.checkboxClassName], checkbox.props?.class],
          disabled:
            typeof checkbox.props?.disabled === "undefined"
              ? this.disabled
              : checkbox.props?.disabled,
          colorScheme: checkbox.props?.colorScheme || this.colorScheme,
          rounding: checkbox.props?.rounding || this.rounding,
          size: checkbox.props?.size || this.size,
          transition: checkbox.props?.transition || this.transition,
        });
        checkbox.key = checkbox.key || checkbox.props?.id;
        return checkbox;
      };

      if (this.items?.length) {
        return this.items.map(prepareProps);
      }

      return this.$slots.default?.().map(prepareProps) || [];
    },
  },

  // TODO: slots descr
  render(): VNode {
    const Tag = this.tag;
    return (
      <Tag class={styles[config.className]}>
        {this.renderLabel}
        {this.renderItemList}
        {this.renderCaption}
      </Tag>
    );
  },
});
