// TODO: descr
export default function(
  className: string,
  customProperty: { name: string, value?: string },
  colorCustomProperty?: { name: string, value?: string },
): string {
  // TODO: move \n to the caller
  if (colorCustomProperty?.name) {
    return `\n.${className} {
  border: var(${customProperty.name}) var(${colorCustomProperty.name});
}

.${className}:hover {
  border-color: var(${colorCustomProperty.name}-hover);
}

.${className}:active {
  border-color: var(${colorCustomProperty.name}-active);
}

.${className}:disabled {
  border-color: var(${colorCustomProperty.name}-disabled);
}`;
  }

  // TODO: move \n to the caller
  return `\n.${className} {
  border: var(${customProperty.name});
}`;
}
