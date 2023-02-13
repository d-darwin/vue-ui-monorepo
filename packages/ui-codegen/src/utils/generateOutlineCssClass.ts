// TODO: naming ???
export default function (
  className: string,
  customProperty: { name: string, value?: string },
  colorCustomProperty?: { name: string, value?: string },
): string {
  // TODO: add .${className}[data-focus-visible-added] ???
  // TODO: different outline colors for hover/active/disabled???
  // TODO: move \n to the caller
  if (colorCustomProperty?.name) {
    return `\n.${className}:focus-visible {
  outline: var(${customProperty.name}) var(${colorCustomProperty.name});
}`
  }

  // TODO: move \n to the caller
  return `\n.${className}:focus-visible {
  outline: var(${customProperty.name});
}`;
}
