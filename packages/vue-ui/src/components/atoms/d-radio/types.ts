import { TYPE } from "./constants";

export type Type = typeof TYPE[keyof typeof TYPE];
