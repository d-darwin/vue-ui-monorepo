import { INPUT_TYPE } from "./constants";

export type InputTypes = typeof INPUT_TYPE[keyof typeof INPUT_TYPE];
