import { inject, onMounted, provide, ref, Ref, watch } from "vue";
import { DAccordionProvided } from "./types";
import config from "./config";

export function dAccordionSetup(props: DAccordionProvided) {
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

export function dDetailsSetup(props: { open?: boolean }) {
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
