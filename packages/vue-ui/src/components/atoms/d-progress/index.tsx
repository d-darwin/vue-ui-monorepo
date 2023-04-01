import {
  defineComponent,
  HTMLAttributes,
  LabelHTMLAttributes,
  ProgressHTMLAttributes,
  type VNode,
} from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import { v4 as uuid } from "uuid";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { Type } from "./types";
import {
  CONTENT_DEFAULTS, // TODO: config???
  LABEL_DEFAULTS, // TODO: config???
  PROGRESS_DEFAULTS, // TODO: config???
  LOADER_DEFAULTS, // TODO: config???
  CAPTION_DEFAULTS, // TODO: config???
} from "./constants";
import styles from "./index.css?module";
import config from "./config";

/**
 * Renders custom progress bar, linear or circular.
 */
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
     * Defines type of the component: linear or circular
     */
    type: generateProp.string<Type>(config.defaultType),
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
     * Plain string or VNode
     */
    loader: generateProp.content(),
    /**
     * Pass any DLoader.props to customize it, f.e. { class: "someClass" }
     */
    loaderOptions: generateProp.options<DLoaderProps>(LOADER_DEFAULTS),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.defaultCaptionOffset), // TODO: move to captionOptions
    /**
     * Pass any DBackdrop.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(CAPTION_DEFAULTS),
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
    indeterminate(): boolean {
      if (
        typeof this.progressOptions?.value === "undefined" &&
        typeof this.value === "undefined"
      ) {
        return true;
      }

      return Number.isNaN(this.progressOptions?.value || this.value);
    },

    renderLabel(): VNode | null {
      if (this.$slots.label || this.label) {
        return (
          <label
            {...LABEL_DEFAULTS}
            for={String(this.id)}
            style={`${config.labelOffsetCSSPropName}: ${prepareHtmlSize(
              this.labelOffset
            )}`}
            {...this.labelOptions}
          >
            {this.$slots.label?.() || this.label}
          </label>
        );
      }

      return null;
    },

    progressClasses(): (string | undefined)[] {
      return [
        styles[config.progressClassName],
        this.type === Type.linear
          ? styles[config.linearClassName]
          : styles[config.circularClassName],
        generateClass.colorScheme(this.colorScheme),
        generateClass.rounding(this.rounding),
        this.type === Type.linear
          ? generateClass.minControlWidth(this.size)
          : undefined,
        generateClass.transition(this.transition),
      ];
    },

    renderLinear(): VNode {
      const Tag = TAG_NAME_DEFAULTS.PROGRESS;
      return (
        <Tag
          /*TODO: should we let redefine only ids?*/
          {...PROGRESS_DEFAULTS}
          key="linear"
          id={this.label ? String(this.id) : undefined}
          value={!this.indeterminate ? this.value : undefined}
          aria-valuenow={!this.indeterminate ? this.value : undefined}
          aria-valuemax={this.progressOptions.max}
          class={this.progressClasses}
          {...this.progressOptions}
        >
          {!this.indeterminate &&
            `${this.progressOptions.value || this.value || 0}%`}
        </Tag>
      );
    },

    renderCircular(): VNode {
      return (
        <div
          {...PROGRESS_DEFAULTS}
          key="circular"
          id={String(this.id)}
          class={this.progressClasses}
          aria-valuenow={!this.indeterminate ? this.value : undefined}
          aria-valuemax={this.progressOptions.max}
          style={`--value: ${this.progressOptions.value || this.value || 0}%`}
          {...this.progressOptions}
        />
      );
    },

    loaderClasses(): (string | undefined)[] {
      return [
        styles[config.loaderContainerClassName],
        generateClass.rounding(this.rounding),
      ];
    },

    renderLoader(): VNode {
      return (
        <div class={this.loaderClasses}>
          {this.$slots.loader?.() || this.loader || (
            <DLoader
              {...LOADER_DEFAULTS}
              colorScheme={this.colorScheme}
              font={this.size}
              size={this.size}
              transition={this.transition}
              {...this.loaderOptions}
            />
          )}
        </div>
      );
    },

    contentClasses(): (string | undefined)[] {
      return [
        generateClass.colorScheme(this.colorScheme),
        this.type === Type.circular
          ? generateClass.rounding(this.rounding)
          : undefined,
      ];
    },

    renderContent(): VNode | null {
      if (!this.indeterminate && (this.$slots.default || this.content)) {
        return (
          <div
            {...CONTENT_DEFAULTS}
            class={this.contentClasses}
            {...this.contentOptions}
          >
            {this.$slots.default?.() || this.content}
          </div>
        );
      }

      if (this.indeterminate) {
        return this.renderLoader;
      }

      return null;
    },

    renderCaption(): VNode {
      return (
        <Trans
          enterActiveClass={styles.captionTransitionEnterActive}
          leaveActiveClass={styles.captionTransitionLeaveActive}
          appear={true}
        >
          {(this.$slots.caption || this.caption) && (
            <DCaption
              {...CAPTION_DEFAULTS}
              font={this.size}
              class={generateClass.transition(this.transition)}
              style={`${config.captionOffsetCSSPropName}: ${prepareHtmlSize(
                this.captionOffset
              )}`}
              {...this.captionOptions}
            >
              {this.$slots.caption?.() || this.caption}
            </DCaption>
          )}
        </Trans>
      );
    },

    classes(): (string | undefined)[] {
      return [
        styles[config.className],
        generateClass.font(this.size),
        generateClass.size(this.size),
      ];
    },
  },

  /** @slot $slots.label
   *  Use instead of props.label to fully customize label
   */
  /** @slot $slots.default
   *  Use instead of props.content to fully customize content
   */
  /** @slot $slots.loader
   *  Use instead of props.loader to fully customize loader
   */
  /** @slot $slots.caption
   *  Use instead of props.caption to fully customize caption
   */
  render(): VNode {
    const Tag = this.tag;
    return (
      <Tag class={this.classes}>
        {this.renderLabel}
        {this.type === Type.linear ? this.renderLinear : this.renderCircular}
        {this.renderContent}
        {this.renderCaption}
      </Tag>
    );
  },
});
