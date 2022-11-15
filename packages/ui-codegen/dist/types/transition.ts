import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";

export type Transition = (typeof TRANSITION)[keyof typeof TRANSITION];
