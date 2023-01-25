import { TRIGGER } from "./constant";

export type Trigger = typeof TRIGGER[keyof typeof TRIGGER];
