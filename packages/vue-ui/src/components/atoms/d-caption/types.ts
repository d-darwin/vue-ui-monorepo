import { TYPE } from "./constant";
import DCaption from "./index";

export type Type = (typeof TYPE)[keyof typeof TYPE];
export type DCaptionProps = InstanceType<typeof DCaption>["$props"];
