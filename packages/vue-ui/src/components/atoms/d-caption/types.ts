import { TYPE } from "./constant";

export type Type = typeof TYPE[keyof typeof TYPE];
