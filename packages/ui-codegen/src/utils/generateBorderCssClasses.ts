// TODO: descr
export default function(
  className: string,
  customPropertyName: string,
  colorCustomPropertyName?: string,
): string {
  // TODO: move \n to the caller
  if (colorCustomPropertyName) {
    return `\n.${className} {
  border: var(${customPropertyName}) var(${colorCustomPropertyName});
}

.${className}:hover {
  border-color: var(${colorCustomPropertyName}-hover);
}

.${className}:active {
  border-color: var(${colorCustomPropertyName}-active);
}

.${className}:disabled {
  border-color: var(${colorCustomPropertyName}-disabled);
}`;
  }

  // TODO: move \n to the caller
  return `\n.${className} {
  border: var(${customPropertyName});
}`;
}
