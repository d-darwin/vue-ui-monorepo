import { defineComponent, Teleport } from "vue";
import type { CSSProperties, PropType, VNode, DialogHTMLAttributes } from "vue";
import { v4 as uuid } from "uuid";
import { Transition as Trans } from "@vue/runtime-dom";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import useClosable from "@darwin-studio/vue-ui/src/compositions/closable";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
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
     * Plain string or VNode
     */
    content: generateProp.content(),
    // TODO: contentOptions instead of contentClass and contentFont ???
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
     * The component is mounted inside passed element.
     */
    target: generateProp.teleportTarget(config.defaultTarget),
    /**
     * Min width of the component.
     */
    minWidth: generateProp.text(config.defaultMinWidth),
    /**
     * Max width of the component.
     */
    maxWidth: generateProp.text(config.defaultMaxWidth),
    /**
     * Min height of the component.
     */
    minHeight: generateProp.text(config.defaultMinHeight),
    /**
     * Max height of the component.
     */
    maxHeight: generateProp.text(config.defaultMaxHeight),
    /**
     * Defines appearance of the component
     */
    colorScheme: generateProp.colorScheme(),
    /**
     * Defines padding type of the component, use 'equal' if the component contains only an icon
     */
    padding: generateProp.padding(PADDING.EQUAL),
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
    tag: generateProp.tag(TAG_NAME.DIALOG),
    /**
     * Defines z-index of the component
     */
    zIndex: generateProp.number(config.defaultZIndex),
    /**
     * Defines component id to be focused on show
     */
    focusId: generateProp.text(() => uuid()),
    /**
     * Hides header if you don't need it
     */
    hideHeader: Boolean,
    /**
     * Hides footer if you don't need it
     */
    hideFooter: Boolean,
    /**
     * Pass any DButton.props to customize default close button, f.e. { colorScheme: "danger" }
     */
    closeButtonOptions: generateProp.options<DButtonProps>(
      config.closeButtonOptions
    ),
    /**
     * Pass any DButton.props to customize default footer cancel button, f.e. { content: "Cancel" }
     */
    cancelButtonOptions: generateProp.options<DButtonProps>(
      config.cancelButtonOptions
    ),
    /**
     * Pass any DButton.props to customize default footer accept button, f.e. { content: "Accept" }
     */
    acceptButtonOptions: generateProp.options<DButtonProps>(
      config.acceptButtonOptions
    ),
    /**
     * Pass any DBackdrop.props to customize backdrop, f.e. { colorScheme: "alternative" }
     */
    backdropOptions: generateProp.options<DBackdropProps>(),
    /**
     * Pass props.disable to the <teleport />, so the component will not be moved to the props.target.
     */
    enableInline: Boolean,

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
    const { closeFocusId } = useClosable(props, emit);
    return { closeFocusId };
  },

  computed: {
    backdropTransitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.backdropTransitionEnterActive,
        leaveActiveClass: styles.backdropTransitionLeaveActive,
      };
    },

    backdropClass(): string | undefined {
      return generateClass.transition(this.transition);
    },

    renderBackdrop(): VNode | null {
      if (!this.isModal) {
        return null;
      }

      return (
        <Trans {...this.backdropTransitionBindings}>
          {this.isShown && (
            <DBackdrop
              colorScheme={this.colorScheme}
              class={this.backdropClass}
              whenClick={this.closeHandler}
              {...this.backdropOptions}
            />
          )}
        </Trans>
      );
    },

    renderTitle(): VNode | null {
      return this.title ? (
        <div
          class={[
            styles[config.titleClassName],
            this.titleClass,
            generateClass.font(this.titleFont),
          ]}
        >
          {this.title}
        </div>
      ) : null;
    },

    renderCloseButton(): VNode {
      // TODO: slot, tag, ... (like content in other components)
      return (
        <DButton
          {...config.closeButtonOptions}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO
          id={this.focusId}
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

      // TODO: header, tag, ... (like content in other components)
      return (
        <div class={styles[config.headerClassName]}>
          {this.$slots.header?.() || [this.renderTitle, this.renderCloseButton]}
        </div>
      );
    },

    renderContent(): VNode {
      return (
        <div
          class={[
            styles[config.contentClassName],
            this.contentClass,
            generateClass.font(this.contentFont),
          ]}
        >
          {this.$slots.default?.() || this.content}
        </div>
      );
    },

    renderFooter(): VNode | null {
      if (this.hideFooter) {
        return null;
      }

      // TODO: footer, tag, ... (like content in other components)
      return (
        <div class={styles[config.footerClassName]}>
          {this.$slots.footer?.() || [
            <DButton
              {...config.cancelButtonOptions}
              whenClick={this.cancelHandler}
              {...this.cancelButtonOptions}
            />,
            <DButton
              {...config.acceptButtonOptions}
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
      return [
        styles[config.className],
        generateClass.colorScheme(this.colorScheme),
        ...generateClass.padding(this.padding, this.size),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
      ];
    },

    styles(): CSSProperties {
      return {
        "--min-width": prepareHtmlSize(this.minWidth), // TODO: config
        "--max-width": prepareHtmlSize(this.maxWidth), // TODO: config
        "--min-height": prepareHtmlSize(this.minHeight), // TODO: config
        "--max-height": prepareHtmlSize(this.maxHeight), // TODO: config
        "--z-index": this.zIndex, // TODO: config
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
