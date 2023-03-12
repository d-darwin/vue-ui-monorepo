import { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { SIZE } from "@darwin-studio/ui-codegen/dist/constants/size";
import { PropType } from "vue";

/**
 * Defines transition type of the component
 */
const generateSizeProp = (
  defaultValue: Size = SIZE.MEDIUM // TODO: avoid hardcode figma values
) => ({
  type: String as PropType<Size>,
  default: defaultValue,
});

export default generateSizeProp;
