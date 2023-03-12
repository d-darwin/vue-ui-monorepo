import { PropType, VNode } from "vue";
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

/**
 *
 */
const generateCommonProp = {
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

  htmlSize: (defaultValue?: Text) => ({
    types: [String, Number] as PropType<Text>,
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

  tag: (defaultValue: TagName = TAG_NAME_DEFAULTS.DIV!) => ({
    type: String as PropType<TagName>,
    default: defaultValue,
  }),

  transaction: (defaultValue: Transition = TRANSITION.FAST) => ({
    type: String as PropType<Transition>,
    default: defaultValue, // TODO: gent defaults base on actual values, not hardcoded
  }),
} as const;

export default generateCommonProp;
