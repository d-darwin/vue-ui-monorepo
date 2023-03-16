import {
  defineComponent,
  mergeProps,
  Transition as Trans,
  Teleport,
  type VNode,
  type PropType,
  type CSSProperties,
  type HTMLAttributes,
} from "vue";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: module, common style ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import { PositionStrict } from "@darwin-studio/vue-ui/src/types/position";
import { POSITION_HORIZONTAL } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import useClosable from "@darwin-studio/vue-ui/src/compositions/closable";
import { BACKDROP_DEFAULTS, CLOSE_BUTTON_DEFAULTS } from "./constants";
import config from "./config";
import styles from "./index.css?module";

/**
 * Renders drawer. It's especially useful for navigation, but default slot may receive any content.
 */
export default defineComponent({
  name: config.name,

  props: {
    /**
     * Defines is component should be rendered
     */
    isShown: generateProp.boolean(true),
    /**
     * Defines if block scroll and backdrop presence
     */
    isModal: generateProp.boolean(true),
    /**
     * Defines content of the <b>title</b> element.
     */
    title: generateProp.content(),
    /**
     * You can pass own class name to the <b>title</b> element.
     */
    // TODO: options
    titleClass: String,
    /**
     * Defines font size of the <b>title</b> element. By default depends on props.size
     */
    // TODO: options
    titleFont: generateProp.font(FONT.HUGE),
    // TODO: header
    // TODO: footer
    /**
     * Plain string, VNode or HTML if props.enableHtml is true
     */
    content: generateProp.content(),
    /**
     * You can pass own class name to the <b>content</b> element.
     */
    // TODO: options
    contentClass: String,
    /**
     * Defines font size of the <b>content</b> element. By default depends on props.size
     */
    // TODO: options
    contentFont: generateProp.font(),
    /**
     * Defines a11y role of the component's content
     */
    contentRole: generateProp.string(config.defaultContentRole),
    /**
     * Defines content element type of the component
     */
    contentTag: generateProp.tag(TAG_NAME_DEFAULTS.NAV),
    /**
     * Positions on the component.
     * Takes values: 'top', 'right', 'bottom', 'left'.
     */
    position: {
      type: String as PropType<PositionStrict>,
      default: POSITION_HORIZONTAL.RIGHT,
    },
    /**
     * Defines width of the component if props.position is "right" or "left"
     */
    width: generateProp.text(config.defaultWidth),
    /**
     * Defines height of the component if props.position is "top" or "bottom"
     */
    height: generateProp.text(config.defaultHeight),
    /**
     * The component is mounted inside passed element.
     */
    target: generateProp.teleportTarget(config.defaultTarget),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(),
    /**
     * Defines corner rounding of the component
     */
    rounding: generateProp.rounding(ROUNDING.LARGE),
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(SIZE.LARGE),
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines a11y role of the component
     */
    role: generateProp.string(config.defaultRole),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME_DEFAULTS.ASIDE),
    /**
     * Defines z-index of the component
     */
    zIndex: generateProp.number(config.defaultZIndex),
    /**
     * Defines component id to be focused on show
     */
    focusId: generateProp.text(),
    /**
     * Hides header if you don't need it
     */
    hideHeader: Boolean,
    /**
     * Pass any DButton.props to customize default close button, f.e. { colorScheme: "danger" }
     */
    closeButtonOptions: generateProp.options<DButtonProps>(
      CLOSE_BUTTON_DEFAULTS
    ),
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: generateProp.options<DBackdropProps>(BACKDROP_DEFAULTS),
    /**
     * Pass props.disable to the <teleport />, so the component will not be moved to the props.target.
     */
    enableInline: Boolean,
    /**
     * Enables html string rendering passed in props.content.<br>
     * ⚠️ Use only on trusted content and never on user-provided content.
     */
    // TODO: remove
    enableHtml: Boolean,

    /**
     * Alternative way to catch close event
     */
    whenClose: {
      type: Function as PropType<() => void | Promise<void>>,
    },
  },

  emits: [EVENT_NAME.CLOSE],

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
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore: TODO: allow unknown props\attrs
          id={this.focusControlId} // TODO: remove if props.focusId ???
          colorScheme={this.colorScheme}
          whenClick={this.closeHandler}
          {...mergeProps(this.closeButtonOptions, CLOSE_BUTTON_DEFAULTS)}
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
      const Tag = this.contentTag;

      const fontClassName = prepareCssClassName(
        codegenConfig.TOKENS.FONT.CSS_CLASS_PREFIX,
        this.contentFont
      );

      const bindings = {
        role: this.contentRole,
        class: [
          styles[config.contentClassName],
          fontStyles[fontClassName],
          this.contentClass,
        ],
      };

      return !this.enableHtml ? (
        <Tag {...bindings}>{this.$slots.default?.() || this.content}</Tag>
      ) : (
        <Tag {...bindings} v-html={this.content} />
      );
    },

    renderFooter(): VNode | null {
      if (!this.$slots.footer) {
        return null;
      }

      // TODO: footer, tag, enableHtml ... (like label in other components)
      return (
        <div class={styles[config.footerClassName]}>{this.$slots.footer()}</div>
      );
    },

    transitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },

    classes(): (string | undefined)[] {
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
        styles[this.position],
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
        "--width": prepareHtmlSize(this.width),
        "--height": prepareHtmlSize(this.height),
        "--z-index": this.zIndex,
      };
    },

    bindings(): HTMLAttributes & { open: boolean } {
      return {
        open: this.isShown,
        role: this.role,
        ["aria-label"]: this.title?.toString(), // TODO: what if this.title is VNode ???
        ["aria-modal"]: this.isModal,
        class: this.classes,
        style: this.styles,
      };
    },

    renderDrawer(): VNode {
      const Tag = this.tag;
      /* TODO
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
  },

  /*TODO: why vue-docgen cant' detect not default slots ???*/
  /** @slot $slots.default
   *  Use instead of props.content to fully customize content
   */
  /** @slot $slots.header
   *  Use instead of default header to fully customize content
   */
  /** @slot $slots.footer
   *  Use to insert footer
   */
  render(): VNode {
    return (
      <Teleport to={this.target} disabled={Boolean(this.enableInline)}>
        {this.renderBackdrop}
        {this.renderDrawer}
      </Teleport>
    );
  },
});
// TODO: long enough
