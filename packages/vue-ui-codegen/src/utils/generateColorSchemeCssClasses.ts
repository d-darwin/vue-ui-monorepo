// TODO: descr
export default function (
  className: string,
  customPropertyName: string
): string {
  // TODO: move \n to the caller
  // TODO: different outline colors for hover/active/disabled???
  return `\n.${className} {
  color: var(${customPropertyName});
  background-color: var(${customPropertyName}-background);
  border-color: var(${customPropertyName}-border);
  outline-color: var(${customPropertyName}-outline);
}

.${className}:hover {
  color: var(${customPropertyName}-hover);
  background-color: var(${customPropertyName}-background-hover);
  border-color: var(${customPropertyName}-border-hover);
}

.${className}:active {
  color: var(${customPropertyName}-active);
  background-color: var(${customPropertyName}-background-active);
  border-color: var(${customPropertyName}-border-active);
}

.${className}:disabled {
  color: var(${customPropertyName}-disabled);
  background-color: var(${customPropertyName}-background-disabled);
  border-color: var(${customPropertyName}-border-disabled);
}`;
}
