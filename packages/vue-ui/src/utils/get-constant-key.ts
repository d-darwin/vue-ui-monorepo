// TODO: naming, descr, tests
import toSnakeCase from "@darwin-studio/vue-ui/src/utils/to-snake-case";

export default function getConstantKey(propName: string): string {
  // TODO: camelCase -> UPPER_SNAKE_CASE
  return toSnakeCase(propName).toUpperCase();
}
