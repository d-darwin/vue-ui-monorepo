import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";

export type ColorScheme = (typeof COLOR_SCHEME)[keyof typeof COLOR_SCHEME];
