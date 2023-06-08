import { defineComponent } from "vue";
import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  ProgressHTMLAttributes,
  VNode,
} from "vue";
import { v4 as uuid } from "uuid";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import { DLoaderAsync as DLoader } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/async";
import type { DLoaderProps } from "@darwin-studio/vue-ui/src/components/atoms/d-loader/types";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import useCaption from "@darwin-studio/vue-ui/src/compositions/caption";
import { Type } from "./types";
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
    id: generateProp.text(() => uuid()),
    /**
     * Defines content of the <b>label</b> element.
     */
    label: generateProp.content(),
    /**
     Defines offset of .label
     */
    labelOffset: generateProp.text(config.labelOffset),
    /**
     * Pass any attrs to customize label, f.e. { class: "someClass" }
     */
    labelOptions: generateProp.options<LabelHTMLAttributes>(
      config.labelOptions
    ),
    /**
     * Defines initial <i>value</i> attr of the <b>input</b> element
     */
    value: generateProp.text(),
    /**
     * Defines type of the component: linear or circular
     */
    type: generateProp.string<Type>(config.type),
    /**
     * Pass any attribute to the progress element
     */
    progressOptions: generateProp.options<ProgressHTMLAttributes>(
      config.progressOptions
    ),
    /**
     * Plain string or VNode
     */
    content: generateProp.content(),
    /**
     * Pass any attribute to the content element
     */
    contentOptions: generateProp.options<HTMLAttributes>(config.contentOptions),
    /**
     * Plain string or VNode
     */
    loader: generateProp.content(),
    /**
     * Pass any DLoader.props to customize it, f.e. { class: "someClass" }
     */
    loaderOptions: generateProp.options<DLoaderProps>(config.loaderOptions),
    /**
     * If not empty renders DCaption below the <b>input</b> element.
     */
    caption: generateProp.content(),
    /**
     * Defines offset of DCaption
     */
    captionOffset: generateProp.text(config.captionOffset), // TODO: move to captionOptions
    /**
     * Pass any DBackdrop.props to customize caption, f.e. { type: "error" }
     */
    captionOptions: generateProp.options<DCaptionProps>(config.captionOptions),
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
    tag: generateProp.tag(TAG_NAME.DIV),
  },

  setup(props, { slots }) {
    return useCaption(props, slots, config.captionOptions);
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
            {...config.labelOptions}
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
        this.type === Type.linear ? config.linearClass : config.circularClass,
        generateClass.colorScheme(this.colorScheme),
        generateClass.rounding(this.rounding),
        this.type === Type.linear
          ? generateClass.minControlWidth(this.size)
          : undefined,
        generateClass.transition(this.transition),
      ];
    },

    renderLinear(): VNode {
      const Tag = TAG_NAME.PROGRESS;
      return (
        <Tag
          {...config.progressOptions}
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
          {...config.progressOptions}
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
        config.loaderContainerClass,
        generateClass.rounding(this.rounding),
      ];
    },

    renderLoader(): VNode {
      return (
        <div class={this.loaderClasses}>
          {this.$slots.loader?.() || this.loader || (
            <DLoader
              {...config.loaderOptions}
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
            {...config.contentOptions}
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

    classes(): (string | undefined)[] {
      return [
        config.class,
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
