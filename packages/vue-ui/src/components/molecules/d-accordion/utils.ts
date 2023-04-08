import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION_VALUE } from "@darwin-studio/ui-codegen/dist/constants/transition";
import getConstantKey from "@darwin-studio/vue-ui/src/utils/get-constant-key";

export function getTransitionDuration(transition?: Transition): number {
  if (!transition) return 0;

  const transitionKey = getConstantKey(
    transition
  ) as keyof typeof TRANSITION_VALUE;

  return TRANSITION_VALUE[transitionKey]?.duration || 0;
}
