// TODO: naming ???
export default function (
  className: string,
  customPropertyName: string
): string {
  // TODO: move \n to the caller
  // TODO: add .${className}[data-focus-visible-added] ???
  return `\n.${className}:focus-visible {
  outline: var(${customPropertyName});
}`;
}
