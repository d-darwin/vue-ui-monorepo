// TODO: descr
export default function (
  className: string,
  customPropertyName: string
): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  color: var(${customPropertyName});
  border-color: var(${customPropertyName}-border);
  background-color: var(${customPropertyName}-background);
}

.${className}:hover {
  color: var(${customPropertyName}-hover);
  border-color: var(${customPropertyName}-border-hover);
  background-color: var(${customPropertyName}-background-hover);
}

.${className}:active {
  color: var(${customPropertyName}-active);
  border-color: var(${customPropertyName}-border-active);
  background-color: var(${customPropertyName}-background-active);
}

.${className}:disabled {
  color: var(${customPropertyName}-disabled);
  border-color: var(${customPropertyName}-border-disabled);
  background-color: var(${customPropertyName}-background-disabled);
}`;
}
