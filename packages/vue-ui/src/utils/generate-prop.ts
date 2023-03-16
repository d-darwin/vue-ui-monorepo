import type { PropType, VNode } from "vue";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import type { TagName } from "@darwin-studio/vue-ui/src/types/tag-name";
import { TAG_NAME_DEFAULTS } from "@darwin-studio/vue-ui/src/constants/tag-name";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import { PADDING } from "@darwin-studio/ui-codegen/dist/constants/padding";
import { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import { FONT } from "@darwin-studio/ui-codegen/dist/constants/font";
import { RendererElement } from "@vue/runtime-core";

/**
 *
 */
const generateProp = {
  colorScheme: (
    defaultValue: ColorScheme = COLOR_SCHEME.PRIMARY // TODO: avoid hardcode figma values
  ) => ({
    type: String as PropType<ColorScheme>,
    default: defaultValue,
  }),

  content: (defaultValue?: Text | VNode) => ({
    type: [String, Number, Object] as PropType<Text | VNode>,
    default: defaultValue,
  }),

  font: (defaultValue: Font = FONT.MEDIUM, skipDefault = false) => ({
    // TODO: avoid hardcode figma values
    type: String as PropType<Font>,
    default: !skipDefault ? defaultValue : undefined,
  }),

  htmlSize: (defaultValue?: Text) => ({
    types: [String, Number] as PropType<Text>,
    default: defaultValue,
  }),

  padding: (defaultValue: Padding = PADDING.DEFAULT) => ({
    // TODO: avoid hardcode figma values
    type: String as PropType<Padding>,
    default: defaultValue,
  }),

  rounding: (
    defaultValue: Rounding = ROUNDING.MEDIUM // TODO: avoid hardcode figma values
  ) => ({
    type: String as PropType<Rounding>,
    default: defaultValue,
  }),

  size: (
    defaultValue: Size = SIZE.MEDIUM // TODO: avoid hardcode figma values
  ) => ({
    type: String as PropType<Size>,
    default: defaultValue,
  }),

  transition: (defaultValue: Transition = TRANSITION.FAST) => ({
    type: String as PropType<Transition>,
    default: defaultValue, // TODO: avoid hardcode figma values
  }),

  tag: (defaultValue: TagName = TAG_NAME_DEFAULTS.DIV!) => ({
    type: String as PropType<TagName>,
    default: defaultValue,
  }),

  number: (defaultValue?: number) => ({
    type: Number,
    default: defaultValue,
  }),

  string: (defaultValue?: string) => ({
    type: String,
    default: defaultValue,
  }),

  boolean: (defaultValue: boolean) => ({
    type: Boolean,
    default: defaultValue,
  }),

  text: (defaultValue?: Text, required?: boolean) => ({
    type: [String, Number] as PropType<Text>,
    default: defaultValue,
    required,
  }),

  teleportTarget: (defaultValue?: string | RendererElement) => ({
    type: [String, Object] as PropType<string | RendererElement>,
    default: () => defaultValue,
  }),

  options: <T>(defaultValue?: T) => ({
    type: Object as PropType<T>,
    default: () => defaultValue,
  }),
} as const;

export default generateProp;
