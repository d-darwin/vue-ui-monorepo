import { SIZE } from "./constants";

export type Size = (typeof SIZE)[keyof typeof SIZE];
