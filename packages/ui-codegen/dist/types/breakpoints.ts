import { BREAKPOINTS } from "@darwin-studio/ui-codegen/dist/constants/breakpoints";

export type Breakpoints = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
