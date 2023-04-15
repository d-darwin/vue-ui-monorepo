import { defineComponent, Transition as Trans, Teleport } from "vue";
import type { VNode, PropType, CSSProperties, HTMLAttributes } from "vue";
import { v4 as uuid } from "uuid";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import type { PositionStrict } from "@darwin-studio/vue-ui/src/types/position";
import { POSITION_HORIZONTAL } from "@darwin-studio/vue-ui/src/constants/position";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import { TAG_NAME } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { DBackdropProps } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/types";
import { DBackdropAsync as DBackdrop } from "@darwin-studio/vue-ui/src/components/atoms/d-backdrop/async";
import type { DButtonProps } from "@darwin-studio/vue-ui/src/components/atoms/d-button/types";
import { DButtonAsync as DButton } from "@darwin-studio/vue-ui/src/components/atoms/d-button/async";
import type { TransitionBindings } from "@darwin-studio/vue-ui/src/types/transition-bindings";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateProp from "@darwin-studio/vue-ui/src/utils/generate-prop";
import useClosable from "@darwin-studio/vue-ui/src/compositions/closable";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
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
    titleFont: generateProp.font(FONT.HUGE), // TODO: config
    // TODO: header
    // TODO: footer
    /**
     * Plain string or VNode
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
    contentRole: generateProp.string(config.contentRole),
    /**
     * Defines content element type of the component
     */
    contentTag: generateProp.tag(TAG_NAME.NAV), // TODO: config
    /**
     * Positions on the component.
     * Takes values: 'top', 'right', 'bottom', 'left'.
     */
    position: generateProp.string<PositionStrict>(POSITION_HORIZONTAL.RIGHT), // TODO: config
    /**
     * Defines width of the component if props.position is "right" or "left"
     */
    width: generateProp.text(config.width),
    /**
     * Defines height of the component if props.position is "top" or "bottom"
     */
    height: generateProp.text(config.height),
    /**
     * The component is mounted inside passed element.
     */
    target: generateProp.teleportTarget(config.target),
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
    rounding: generateProp.rounding(ROUNDING.LARGE), // TODO: config
    /**
     * Defines size of the component
     */
    // TODO: fontSize and size separately ???
    size: generateProp.size(SIZE.LARGE), // TODO: config
    /**
     * Defines transition type of the component
     */
    transition: generateProp.transition(),
    /**
     * Defines a11y role of the component
     */
    role: generateProp.string(config.role),
    /**
     * Defines container element type of the component
     */
    tag: generateProp.tag(TAG_NAME.ASIDE), // TODO: config
    /**
     * Defines z-index of the component
     */
    zIndex: generateProp.number(config.zIndex),
    /**
     * Defines component id to be focused on show
     */
    focusId: generateProp.text(() => uuid()),
    /**
     * Hides header if you don't need it
     */
    hideHeader: Boolean,
    /**
     * Pass any DButton.props to customize default close button, f.e. { colorScheme: "danger" }
     */
    closeButtonOptions: generateProp.options<DButtonProps>(
      config.closeButtonOptions
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
  },

  emits: [EVENT_NAME.CLOSE],

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

    backdropBindings(): DBackdropProps {
      return {
        colorScheme: this.colorScheme,
        class: generateClass.transition(this.transition),
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
      // TODO: slot, tag, ... (like content in other components)
      return this.title ? (
        <div
          class={[
            config.titleClass,
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
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore: TODO: allow unknown props\attrs
          id={this.focusId} // TODO: remove if props.focusId ???
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
        <div class={config.headerClass}>
          {this.$slots.header?.() || [this.renderTitle, this.renderCloseButton]}
        </div>
      );
    },

    renderContent(): VNode {
      const Tag = this.contentTag;
      const bindings = {
        role: this.contentRole,
        class: [
          config.contentClass,
          this.contentClass,
          generateClass.font(this.contentFont),
        ],
      };

      return <Tag {...bindings}>{this.$slots.default?.() || this.content}</Tag>;
    },

    renderFooter(): VNode | null {
      if (!this.$slots.footer) {
        return null;
      }

      // TODO: footer, tag, ... (like content in other components)
      return <div class={config.footerClass}>{this.$slots.footer()}</div>;
    },

    transitionBindings(): TransitionBindings {
      return {
        enterActiveClass: styles.transitionEnterActive,
        leaveActiveClass: styles.transitionLeaveActive,
      };
    },

    classes(): (string | undefined)[] {
      return [
        config.class,
        styles[this.position],
        generateClass.colorScheme(this.colorScheme),
        ...generateClass.padding(this.padding, this.size),
        generateClass.rounding(this.rounding),
        generateClass.size(this.size),
        generateClass.transition(this.transition),
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
