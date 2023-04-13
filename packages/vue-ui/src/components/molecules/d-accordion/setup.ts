import { inject, onMounted, provide, ref, watch, computed } from "vue";
import { Ref, ComputedRef } from "vue";
import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { DAccordionProvided } from "./types";
import config from "./config";
import EventName from "@/types/event-name";

export function dAccordionSetup(
  props: DAccordionProvided,
  options: { emit: (name: EventName, id: Text, open: boolean) => void }
) {
  const whenChange = (id: Text, open: boolean) => {
    options.emit(EVENT_NAME.CHANGE, id, open);
    // TODO: emit(EVENT_NAME.UPDATE_OPEN), open which one ???
    props.whenChange?.(id, open);
  };

  // TODO: reactivity ???
  provide<ComputedRef<DAccordionProvided>>(
    config.provideInjectKey,
    computed(() => ({
      hideSummaryAfter: props.hideSummaryAfter,
      disabled: props.disabled,
      colorScheme: props.colorScheme,
      padding: props.padding,
      rounding: props.rounding,
      size: props.size,
      transition: props.transition,
      openIds: props.openIds,
      whenChange,
    }))
  );
}

export function dDetailsSetup(props: { id?: Text; open?: boolean }) {
  const contentRef: Ref<HTMLElement | null> = ref(null);
  const contentHeight = ref(0);
  const isMounted = ref(false);
  onMounted(async () => {
    contentHeight.value = Math.floor(contentRef.value?.offsetHeight || 0);
    isMounted.value = true;
  });

  const innerOpen = ref(Boolean(props.open));
  const isExpanded = ref(Boolean(props.open));
  watch(
    () => props.open,
    () => {
      innerOpen.value = Boolean(props.open);
      isExpanded.value = Boolean(props.open);
    }
  );

  return {
    [config.contentOptions.ref]: contentRef,
    contentHeight,
    isMounted,
    [config.details.ref]: ref(null) as Ref<HTMLElement | null>,
    innerOpen,
    isExpanded,
    injection: inject<DAccordionProvided>(config.provideInjectKey, {}),
  };
}
