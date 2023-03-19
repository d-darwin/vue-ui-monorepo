import {
  defineComponent,
  LabelHTMLAttributes,
  mergeProps,
  ProgressHTMLAttributes,
  type VNode,
} from "vue";
import { v4 as uuid } from "uuid";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { LABEL_DEFAULTS, PROGRESS_DEFAULTS } from "./constants";
import styles from "./index.css?module";
import config from "./config";

export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines <i>id</i> attr of the <b>progress</b> element.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: generateProp.text(() => uuid()), // TODO: use instead of useControlId ???
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.content(),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateProp.options<LabelHTMLAttributes>(LABEL_DEFAULTS),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(), // TODO: use or remove
    // TODO: contentOptions
    // TODO: value \ min \ max \ indeterminate
    /**
     * TODO
     */
    progressOptions:
      generateProp.options<ProgressHTMLAttributes>(PROGRESS_DEFAULTS),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    font: generateProp.font(),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME_DEFAULTS.DIV),
  },

  computed: {
    renderLabel(): VNode | null {
      if (this.$slots.label || this.label) {
        return (
          <label
            for={String(this.id)}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO
            {...mergeProps(this.labelOptions, config.defaultLabelOptions)}
          >
            {this.$slots.label || this.label}
          </label>
        );
      }

      return null;
    },

    // TODO renderCircle
    renderBar(): VNode {
      // TODO: configurable tag ???
      const Tag = TAG_NAME_DEFAULTS.PROGRESS;
      return (
        <Tag
          id={String(this.id)}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO
          {...mergeProps(this.progressOptions, config.defaultProgressOptions)}
        >
          {this.$slots.default?.() || this.content}
        </Tag>
      );
    },
  },

  // TODO: describe slots
  render(): VNode {
    const Tag = this.tag;
    // TODO: aria-valuemin
    // TODO: aria-valuemax
    /*
      The aria-valuemin and aria-valuemax properties only need to be set for the progressbar role
      when the progress bar's minimum is not 0 or the maximum value is not 100.
    */
    // TODO: indeterminate
    // TODO: aria-label="Content loading…"
    /*
    * <label for="progress-bar">Uploading Document</label>
      <progress id="progress-bar" value="70" max="100">70 %</progress>
    * */
    return (
      <Tag class={styles[config.className]}>
        {this.renderLabel}
        {/*TODO: or renderCircle*/}
        {this.renderBar}
      </Tag>
    );
  },
});
