import { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import { ROUNDING } from "@darwin-studio/ui-codegen/dist/constants/rounding";
import { PropType } from "vue";

/**
 * Defines rounding type of the component
 */
const generateRoundingProp = (
  defaultValue: Rounding = ROUNDING.MEDIUM // TODO: avoid hardcode figma values
) => ({
  type: String as PropType<Rounding>,
  default: defaultValue,
});

export default generateRoundingProp;
