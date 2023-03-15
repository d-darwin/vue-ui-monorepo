import {
  defineComponent,
  Teleport,
  type CSSProperties,
  type PropType,
  type VNode,
  HTMLAttributes,
  DialogHTMLAttributes,
} from "vue";
import type { RendererElement } from "@vue/runtime-core";
import { Transition as Trans } from "@vue/runtime-dom";
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import useClosable from "@darwin-studio/vue-ui/src/compositions/closable";
import {
  BACKDROP_DEFAULTS,
  CLOSE_BUTTON_DEFAULTS,
  CANCEL_BUTTON_DEFAULTS,
  ACCEPT_BUTTON_DEFAULTS,
} from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders dialog with accept and cancel buttons. It's especially useful for modals, but default slot may receive any content.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines is component should be rendered
     */
    isShown: {
      type: Boolean,
      default: true,
    },
    /**
     * Defines if block scroll and backdrop presence
     */
    isModal: {
      type: Boolean,
      default: true,
    },
    /**
     * Defines content of the <b>title</b> element.
     */
    title: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    /**
     * You can pass own class name to the <b>title</b> element.
     */
    titleClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>title</b> element. By default depends on props.size
     */
    titleFont: {
      type: String as PropType<Font>,
      default: FONT.HUGE,
    },
    // TODO: header
    // TODO: footer
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: {
      type: [String, Number, Object] as PropType<Text | VNode>,
    },
    // TODO: contentOptions instead of contentClass and contentFont ???
    /**
     * You can pass own class name to the <b>content</b> element.
     */
    contentClass: {
      type: String,
    },
    /**
     * Defines font size of the <b>content</b> element. By default depends on props.size
     */
    contentFont: {
      type: String as PropType<Font>,
      default: FONT.HUGE,
    },
    /**
     * The component is mounted inside passed element.
     */
    target: {
      type: [String, Object] as PropType<string | RendererElement>,
      default: config.defaultTarget,
    },
    /**
     * Min width of the component.
     */
    minWidth: {
      type: [String, Number],
      default: config.defaultMinWidth,
    },
    /**
     * Max width of the component.
     */
    maxWidth: {
      type: [String, Number],
      default: config.defaultMaxWidth,
    },
    /**
     * Min height of the component.
     */
    minHeight: {
      type: [String, Number],
      default: config.defaultMinHeight,
    },
    /**
     * Max height of the component.
     */
    maxHeight: {
      type: [String, Number],
      default: config.defaultMaxHeight,
    },
    /**
     * Defines appearance of the component
     */
    colorScheme: {
      type: String as PropType<ColorScheme>,
      default: COLOR_SCHEME.PRIMARY, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: {
      type: String as PropType<Padding>,
      default: PADDING.EQUAL, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines corner rounding of the component
     */
    rounding: {
      type: String as PropType<Rounding>,
      default: ROUNDING.LARGE, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: {
      type: String as PropType<Size>,
      default: SIZE.LARGE, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines transition type of the component
     */
    transition: {
      type: String as PropType<Transition>,
      default: TRANSITION.FAST, // TODO: gent defaults base on actual values, not hardcoded
    },
    /**
     * Defines a11y role of the component
     */
    role: {
      type: String, // TODO: specify type,
      default: config.defaultRole,
    },
    /**
     * Defines container element type of the component
     */
    tag: {
      type: String as PropType<TagName>,
      default: TAG_NAME_DEFAULTS.DIALOG,
    },
    /**
     * Defines z-index of the component
     */
    zIndex: {
      type: Number,
      default: config.defaultZIndex,
    },
    /**
     * Defines component id to be focused on show
     */
    focusId: {
      type: [String, Number] as PropType<Text>,
    },
    /**
     * Hides header if you don't need it
     */
    hideHeader: {
      type: Boolean,
    },
    /**
     * Hides footer if you don't need it
     */
    hideFooter: {
      type: Boolean,
    },
    /**
     * Pass any DButton.props to customize default close button, f.e. { colorScheme: "danger" }
     */
    closeButtonOptions: {
      type: Object as PropType<DButtonProps>,
      default: () => CLOSE_BUTTON_DEFAULTS,
    },
    /**
     * Pass any DButton.props to customize default footer cancel button, f.e. { label: "Cancel" }
     */
    cancelButtonOptions: {
      type: Object as PropType<DButtonProps>,
      default: () => CANCEL_BUTTON_DEFAULTS,
    },
    /**
     * Pass any DButton.props to customize default footer accept button, f.e. { label: "Accept" }
     */
    acceptButtonOptions: {
      type: Object as PropType<DButtonProps>,
      default: () => ACCEPT_BUTTON_DEFAULTS,
    },
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: {
      type: Object as PropType<DBackdropProps>,
      default: () => BACKDROP_DEFAULTS,
    },
    /**
     * Pass props.disable to the <teleport />, so the component will not be moved to the props.target.
     */
    enableInline: {
      type: Boolean,
    },
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    enableHtml: {
      type: Boolean,
    },

    /**
     * Alternative way to catch close event
     */
    whenClose: {
      type: Function as PropType<() => void | Promise<void>>,
    },
    /**
     * Alternative way to catch cancel event
     */
    whenCancel: {
      type: Function as PropType<() => void | Promise<void>>,
    },
    /**
     * Alternative way to catch confirm event
     */
    whenAccept: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLOSE, EVENT_NAME.CANCEL, EVENT_NAME.ACCEPT],

  setup(props, { emit }) {
    const { focusControlId } = useClosable(props, emit);
    return { focusControlId };
  },

  computed: {
    backdropTransitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.backdropTransitionEnterActive,
        leaveActiveClass: styles.backdropTransitionLeaveActive,
      };
    },

    backdropBindings(): DBackdropProps {
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return {
        colorScheme: this.colorScheme,
        class: transitionStyles[transitionClassName],
        whenClick: this.closeHandler,
        ...this.backdropOptions,
      };
    },

    renderBackdrop(): VNode | null {
      if (!this.isModal) {
        return null;
      }

      return (
        <Trans {...this.backdropTransitionBindings}>
          {this.isShown && <DBackdrop {...this.backdropBindings} />}
        </Trans>
      );
    },

    renderTitle(): VNode | null {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.titleFont
      );

      // TODO: slot, tag, enableHtml ... (like label in other components)
      return this.title ? (
        <div
          class={[
            styles[config.titleClassName],
            fontStyles[fontClassName],
            this.titleClass,
          ]}
        >
          {this.title}
        </div>
      ) : null;
    },

    renderCloseButton(): VNode {
      // TODO: slot, tag, enableHtml ... (like label in other components)
      return (
        <DButton
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO
          id={this.focusControlId}
          colorScheme={this.colorScheme}
          whenClick={this.closeHandler}
          {...this.closeButtonOptions}
        />
      );
    },

    renderHeader(): VNode | null {
      if (this.hideHeader) {
        return null;
      }

      // TODO: header, tag, enableHtml ... (like label in other components)
      return (
        <div class={styles[config.headerClassName]}>
          {this.$slots.header?.() || [this.renderTitle, this.renderCloseButton]}
        </div>
      );
    },

    renderContent(): VNode {
      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.contentFont
      );

      const bindings = {
        class: [
          styles[config.contentClassName],
          fontStyles[fontClassName],
          this.contentClass,
        ],
      };

      return !this.enableHtml ? (
        <div {...bindings}>{this.$slots.default?.() || this.content}</div>
      ) : (
        <div {...bindings} v-html={this.content} />
      );
    },

    renderFooter(): VNode | null {
      if (this.hideFooter) {
        return null;
      }

      // TODO: footer, tag, enableHtml ... (like label in other components)
      return (
        <div class={styles[config.footerClassName]}>
          {this.$slots.footer?.() || [
            <DButton
              whenClick={this.cancelHandler}
              {...this.cancelButtonOptions}
            />,
            <DButton
              whenClick={this.acceptHandler}
              {...this.acceptButtonOptions}
            />,
          ]}
        </div>
      );
    },

    transitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },

    classes(): (string | undefined)[] {
      // TODO: make common class names generator
      const colorSchemeClassName = prepareCssClassName(
        codegenConfig.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        this.colorScheme
      );
      const paddingClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        this.padding
      );
      const paddingSizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.PADDING.CSS_CLASS_PREFIX,
        `${this.padding}-${this.size}`
      );
      const roundingClassName = prepareCssClassName(
        codegenConfig.TOKENS.ROUNDING.CSS_CLASS_PREFIX,
        this.rounding
      );
      const sizeClassName = prepareCssClassName(
        codegenConfig.TOKENS.SIZE.CSS_CLASS_PREFIX,
        this.size
      );
      const transitionClassName = prepareCssClassName(
        codegenConfig.TOKENS.TRANSITION.CSS_CLASS_PREFIX,
        this.transition
      );

      return [
        styles[config.className],
        colorSchemeStyles[colorSchemeClassName],
        paddingStyles[paddingSizeClassName],
        paddingStyles[paddingClassName],
        roundingStyles[roundingClassName],
        sizeStyles[sizeClassName],
        transitionStyles[transitionClassName],
      ];
    },

    styles(): CSSProperties {
      return {
        "--min-width": prepareHtmlSize(this.minWidth),
        "--max-width": prepareHtmlSize(this.maxWidth),
        "--min-height": prepareHtmlSize(this.minHeight),
        "--max-height": prepareHtmlSize(this.maxHeight),
        "--z-index": this.zIndex,
      };
    },

    bindings(): DialogHTMLAttributes {
      return {
        open: this.isShown,
        role: this.role,
        ["aria-label"]: this.title?.toString(), // TODO: what if this.title is VNode ???
        ["aria-modal"]: this.isModal,
        class: this.classes,
        style: this.styles,
      };
    },

    renderModal(): VNode {
      const Tag = this.tag;
      /* TODO
       *  .showModal() or .show()
       *   inert others ???
       *   autofocus
       *   aria-labelledby="dialog1Title"
       *   aria-describedby="dialog1Desc"
       * */
      return (
        <Trans {...this.transitionBindings}>
          {this.isShown && (
            <Tag {...this.bindings}>
              {this.renderHeader}
              {this.renderContent}
              {this.renderFooter}
            </Tag>
          )}
        </Trans>
      );
    },
  },

  methods: {
    closeHandler(): void {
      /**
       * Emits on the component close
       * @event close
       */
      this.$emit(EVENT_NAME.CLOSE);
      this.whenClose?.();
    },

    cancelHandler(): void {
      /**
       * Emits on the component cancel
       * @event cancel
       */
      this.$emit(EVENT_NAME.CANCEL);
      this.whenCancel?.();
    },

    acceptHandler(): void {
      /**
       * Emits on the component confirmation
       * @event confirm
       */
      this.$emit(EVENT_NAME.ACCEPT);
      this.whenAccept?.();
    },
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /** @slot $slots.default
   *  Use instead of props.content to fully customize content
   */
  /** @slot $slots.header
   *  Use instead of default header to fully customize content
   */
  /** @slot $slots.footer
   *  Use instead of default footer to fully customize content
   */
  render(): VNode {
    return (
      <Teleport to={this.target} disabled={Boolean(this.enableInline)}>
        {this.renderBackdrop}
        {this.renderModal}
      </Teleport>
    );
  },
});
// TODO: long enough
