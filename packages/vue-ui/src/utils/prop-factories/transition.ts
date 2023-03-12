import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { PropType } from "vue";

/**
 * Defines size of the component
 */
const generateTransitionProp = (
  defaultValue: Transition = TRANSITION.FAST
) => ({
  type: String as PropType<Transition>,
  default: defaultValue, // TODO: gent defaults base on actual values, not hardcoded
});

export default generateTransitionProp;
