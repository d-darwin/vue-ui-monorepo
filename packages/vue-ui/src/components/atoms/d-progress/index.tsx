import {
  defineComponent,
  HTMLAttributes,
  LabelHTMLAttributes,
  mergeProps,
  ProgressHTMLAttributes,
  type VNode,
} from "vue";
import { v4 as uuid } from "uuid";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import {
  CONTENT_DEFAULTS,
  LABEL_DEFAULTS,
  PROGRESS_DEFAULTS,
} from "./constants";
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
     Defines offset of .label
     */
    labelOffset: generateProp.text(config.defaultLabelOffset),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateProp.options<LabelHTMLAttributes>(LABEL_DEFAULTS),
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: generateProp.text(),
    /**
     * Pass any attribute to the progress element
     */
    progressOptions:
      generateProp.options<ProgressHTMLAttributes>(PROGRESS_DEFAULTS),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass any attribute to the content element
     */
    contentOptions: generateProp.options<HTMLAttributes>(CONTENT_DEFAULTS),
    /**
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
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
            style={`--offset: ${this.labelOffset}`}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO
            {...mergeProps(LABEL_DEFAULTS, this.labelOptions)}
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
          class={[
            getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme),
            getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
            getCommonCssClass(TOKEN_NAME.MIN_CONTROL_WIDTH, this.size),
            getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
          ]}
          {...{
            ["aria-valuenow"]: this.value,
            ["aria-valuemax"]: this.progressOptions.max,
          }}
          {...mergeProps(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO
            PROGRESS_DEFAULTS,
            this.progressOptions
          )}
          value={this.value || this.progressOptions.value}
        >
          {`${this.value || this.progressOptions.value}%`}
        </Tag>
      );
    },

    renderContent(): VNode | null {
      // TODO: configurable tag ???
      if (this.$slots.default?.() || this.content) {
        return (
          <div
            class={getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme)}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO
            {...mergeProps(CONTENT_DEFAULTS, this.contentOptions)}
          >
            {this.$slots.default?.() || this.content}
          </div>
        );
      }

      return null;
    },

    classes(): (string | undefined)[] {
      return [
        styles[config.className],
        getCommonCssClass(TOKEN_NAME.FONT, this.size),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
      ];
    },
  },

  // TODO: slots.label
  // TODO: slots.default
  // TODO: slots.error
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
      <Tag class={this.classes}>
        {this.renderLabel}
        {/*TODO: or renderCircle*/}
        {this.renderBar}
        {this.renderContent}
        {/*TODO: this.renderError*/}
      </Tag>
    );
  },
});
