import { shallowMount } from "@vue/test-utils";
import {
  baseClassCase,
  controlIdAbsenceCase,
} from "@/utils/test-case-factories";
import DProgress from "@/components/atoms/d-progress";
import config from "@/components/atoms/d-progress/config";

describe("DProgress", () => {
  const wrapper = shallowMount(DProgress);

  baseClassCase(wrapper, config.className);

  // TODO: props.id
  controlIdAbsenceCase(wrapper);

  // TODO: props.label
  // TODO: props.labelOffset
  // TODO: props.labelOptions

  // TODO: props.value
  // TODO: props.type
  // TODO: props.progressOptions

  // TODO: props.content
  // TODO: props.contentOptions

  // TODO: add props.loader and $slots.loader
  // TODO: props.loaderOptions

  // TODO: props.caption
  // TODO: props.captionOffset
  // TODO: props.captionOptions

  // TODO: props.colorScheme
  // TODO: props.rounding
  // TODO: props.size
  // TODO: props.transition
  // TODO: props.tag
});
