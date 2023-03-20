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
import getCommonCssClass from "@darwin-studio/vue-ui/src/utils/get-common-css-class";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";
import { Type } from "./types";
import {
  CONTENT_DEFAULTS,
  LABEL_DEFAULTS,
  PROGRESS_DEFAULTS,
  LOADER_DEFAULTS,
  CAPTION_DEFAULTS,
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
     * TODO
     */
    type: generateProp.string<Type>(config.defaultType),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass any attribute to the content element
     */
    contentOptions: generateProp.options<HTMLAttributes>(CONTENT_DEFAULTS),
    /**
     * Pass any DLoader.props to customize it, f.e. { class: "someClass" }
     */
    loaderOptions: generateProp.options<DLoaderProps>(LOADER_DEFAULTS),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Pass any DBackdrop.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(CAPTION_DEFAULTS),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.defaultCaptionOffset),
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
            {...LABEL_DEFAULTS}
            {...this.labelOptions}
            for={String(this.id)}
            style={`${config.labelOffsetCSSPropName}: ${prepareHtmlSize(
              this.labelOffset
            )}`}
          >
            {this.$slots.label || this.label}
          </label>
        );
      }

      return null;
    },

    progressClasses(): (string | undefined)[] {
      return [
        getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme),
        getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
        getCommonCssClass(TOKEN_NAME.MIN_CONTROL_WIDTH, this.size),
        getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition),
      ];
    },

    renderLinear(): VNode {
      // TODO: configurable tag ???
      // TODO: aria-label="Content loading…"
      const Tag = TAG_NAME_DEFAULTS.PROGRESS;
      return (
        <Tag
          {...PROGRESS_DEFAULTS}
          {...this.progressOptions}
          id={String(this.id)}
          value={this.value || this.progressOptions.value}
          class={this.progressClasses}
          aria-valuenow={this.value}
          aria-valuemax={this.progressOptions.max}
        >
          {(this.value || this.progressOptions.value) &&
            `${this.value || this.progressOptions.value}%`}
        </Tag>
      );
    },

    renderCircular(): VNode {
      // TODO: configurable tag ???
      // TODO: aria-label="Content loading…"
      const Tag = TAG_NAME_DEFAULTS.PROGRESS;
      return (
        <Tag
          {...PROGRESS_DEFAULTS}
          {...this.progressOptions}
          id={String(this.id)}
          value={this.value || this.progressOptions.value}
          class={this.progressClasses}
          aria-valuenow={this.value}
          aria-valuemax={this.progressOptions.max}
        >
          {(this.value || this.progressOptions.value) &&
            `${this.value || this.progressOptions.value}%`}
        </Tag>
      );
    },

    renderContent(): VNode | null {
      if (this.value && (this.$slots.default?.() || this.content)) {
        return (
          <div
            {...CONTENT_DEFAULTS}
            {...this.contentOptions}
            class={getCommonCssClass(TOKEN_NAME.COLOR_SCHEME, this.colorScheme)}
          >
            {this.$slots.default?.() || this.content}
          </div>
        );
      }

      if (!this.value) {
        return (
          <div
            class={[
              styles[config.loaderContainerClassName],
              getCommonCssClass(TOKEN_NAME.ROUNDING, this.rounding),
              getCommonCssClass(TOKEN_NAME.SIZE, this.size),
            ]}
          >
            <DLoader
              {...LOADER_DEFAULTS}
              {...this.loaderOptions}
              colorScheme={this.colorScheme}
              font={this.size}
              size={this.size}
              transition={this.transition}
            />
          </div>
        );
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
          {(this.$slots.caption?.() || this.caption) && (
            <DCaption
              {...CAPTION_DEFAULTS}
              {...this.captionOptions}
              font={this.size}
              class={getCommonCssClass(TOKEN_NAME.TRANSITION, this.transition)}
              style={`${config.captionOffsetCSSPropName}: ${prepareHtmlSize(
                this.captionOffset
              )}`}
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
        getCommonCssClass(TOKEN_NAME.FONT, this.size),
        getCommonCssClass(TOKEN_NAME.SIZE, this.size),
      ];
    },
  },

  // TODO: slots.label
  // TODO: slots.default
  // TODO: slots.caption
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
