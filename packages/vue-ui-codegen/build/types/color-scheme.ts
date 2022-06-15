import { COLOR_SCHEME } from "../constants/color-scheme";

export type ColorScheme = (typeof COLOR_SCHEME)[keyof typeof COLOR_SCHEME];
