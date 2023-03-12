import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { PropType } from "vue";

// TODO: descr
const generateTransitionProp = (
  defaultTransition: Transition = TRANSITION.FAST
) => ({
  type: String as PropType<Transition>,
  default: defaultTransition, // TODO: gent defaults base on actual values, not hardcoded
});

export default generateTransitionProp;
