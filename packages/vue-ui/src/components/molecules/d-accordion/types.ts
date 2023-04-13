import type { ColorScheme } from "@darwin-studio/ui-codegen/dist/types/color-scheme";
import type { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import type { Rounding } from "@darwin-studio/ui-codegen/dist/types/rounding";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import type { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import type { Text } from "@darwin-studio/vue-ui/src/types/text";
import { DDetails, DAccordion } from "./index";

export interface DAccordionProvided {
  hideSummaryAfter?: boolean;
  disabled?: boolean;
  colorScheme?: ColorScheme;
  padding?: Padding;
  rounding?: Rounding;
  size?: Size;
  transition?: Transition;
  openIds?: Text[];
  whenChange?: (id: Text, open: boolean) => void | Promise<void>;
}
export type CommonProps = Required<
  Omit<DAccordionProvided, "whenChange" | "openIds">
>;

export type DDetailsProps = InstanceType<typeof DDetails>["$props"];
export type DAccordionProps = InstanceType<typeof DAccordion>["$props"];
