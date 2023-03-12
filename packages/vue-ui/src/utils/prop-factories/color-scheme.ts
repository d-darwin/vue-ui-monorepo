import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { COLOR_SCHEME } from "@darwin-studio/ui-codegen/dist/constants/color-scheme";
import { PropType } from "vue";

/**
 * Defines color scheme type of the component
 */
const generateColorSchemeProp = (
  defaultValue: ColorScheme = COLOR_SCHEME.PRIMARY // TODO: avoid hardcode figma values
) => ({
  type: String as PropType<ColorScheme>,
  default: defaultValue,
});

export default generateColorSchemeProp;
