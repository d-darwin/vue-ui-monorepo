import { TYPE } from "./constants";

// TODO: move upper ???
export type Type = typeof TYPE[keyof typeof TYPE];
