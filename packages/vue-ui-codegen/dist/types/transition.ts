import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export type Transition = (typeof TRANSITION)[keyof typeof TRANSITION];
