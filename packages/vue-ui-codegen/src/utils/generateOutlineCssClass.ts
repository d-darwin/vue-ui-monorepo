// TODO: naming ???
export default function (
  className: string,
  customPropertyName: string,
  colorCustomPropertyName?: string,
): string {
  // TODO: add .${className}[data-focus-visible-added] ???
  // TODO: different outline colors for hover/active/disabled???
  // TODO: move \n to the caller
  if (colorCustomPropertyName) {
    return `\n.${className}:focus-visible {
  outline: var(${customPropertyName}) var(${colorCustomPropertyName});
}`
  }

  // TODO: move \n to the caller
  return `\n.${className}:focus-visible {
  outline: var(${customPropertyName});
}`;
}
