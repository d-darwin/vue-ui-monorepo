import { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { DDetails, DAccordion } from "./index";

export interface DAccordionProvided {
  hideSummaryAfter: boolean;
  colorScheme: ColorScheme;
  padding: Padding;
  rounding: Rounding;
  size: Size;
  transition: Transition;
}

export type DDetailsProps = InstanceType<typeof DDetails>["$props"];
export type DAccordionProps = InstanceType<typeof DAccordion>["$props"];
