import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";

export type Font = (typeof FONT)[keyof typeof FONT];
