import { inject, onMounted, provide, ref, Ref, watch } from "vue";
import { DAccordionProps, DAccordionProvided } from "./types";
import config from "./config";

export function dAccordionSetup(props: DAccordionProps) {
  provide<Ref<DAccordionProvided>>(
    config.provideInjectKey,
    ref({
      hideSummaryAfter: props.hideSummaryAfter,
      disabled: props.disabled,
      colorScheme: props.colorScheme,
      padding: props.padding,
      rounding: props.rounding,
      size: props.size,
      transition: props.transition,
    })
  );
}

// TODO: specify props type
export function dDetailsSetup(props: Record<string, unknown>) {
  const contentRef: Ref<HTMLElement | null> = ref(null);
  const contentHeight = ref(0);
  const isMounted = ref(false);
  onMounted(async () => {
    contentHeight.value = contentRef.value?.offsetHeight || 0;
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
