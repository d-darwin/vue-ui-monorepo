import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";

export type Rounding = (typeof ROUNDING)[keyof typeof ROUNDING];
