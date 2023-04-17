import { Padding } from "@darwin-studio/ui-codegen/dist/types/padding";
import { Size } from "@darwin-studio/ui-codegen/dist/types/size";
import { Transition } from "@darwin-studio/ui-codegen/dist/types/transition";
import { Text } from "@/types/text";

export interface DTabsProvided {
  disabled: boolean;
  // TODO colorScheme?: ColorScheme;
  padding: Padding;
  // TODO rounding?: Rounding;
  size: Size;
  transition: Transition;
  activeId: Text; // TODO: activeTabId = "tab-" + activeId
  whenChange: (activeId: Text) => void | Promise<void>;
}
export type CommonProps = Required<
  Omit<DTabsProvided, "whenChange" | "openIds">
>;
