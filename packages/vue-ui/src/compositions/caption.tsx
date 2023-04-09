import { ref } from "vue";
import type { VNode, Ref } from "vue";
import { Transition as Trans } from "@vue/runtime-dom";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { DCaptionProps } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/types";
import { DCaptionAsync as DCaption } from "@darwin-studio/vue-ui/src/components/atoms/d-caption/async";
import prepareHtmlSize from "@darwin-studio/vue-ui/src/utils/prepare-html-size";
import generateClass from "@darwin-studio/vue-ui/src/utils/generate-class";
import styles from "./caption.css?module";

interface Props {
  caption?: Text | VNode;
  captionOptions?: DCaptionProps;
  captionOffset?: Text;
  size: Size;
  transition: Transition;
}

interface Slots {
  caption?: () => Text | VNode;
}

/**
 * Renders props.caption or $slots.caption()
 * @param props
 * @param slots
 * @param captionDefaults
 */
export default function useCaption(
  props: Props,
  slots: Slots,
  captionDefaults: DCaptionProps
): { renderCaption: Ref<VNode> } {
  /**
   * @slot $slots.caption
   * Use instead of props.caption to fully customize caption content
   * */
  // TODO
  //  [Vue warn]: Slot "caption" invoked outside of the render function: this will not track dependencies used in the slot.
  //  Invoke the slot function inside the render function instead.
  const captionContent = slots.caption?.() || props.caption;
  const renderCaption = ref(
    <Trans
      enterActiveClass={styles.captionTransitionEnterActive}
      leaveActiveClass={styles.captionTransitionLeaveActive}
      appear={true}
    >
      {captionContent && (
        <DCaption
          {...captionDefaults}
          font={props.size}
          style={`--offset: ${prepareHtmlSize(props.captionOffset)}`}
          class={[styles.caption, generateClass.transition(props.transition)]}
          {...props.captionOptions}
        >
          {captionContent}
        </DCaption>
      )}
    </Trans>
  );

  return { renderCaption };
}
