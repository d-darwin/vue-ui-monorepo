// TODO: descr
export default function (
  className: string,
  customPropertyName: string
): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  color: var(${customPropertyName});
  background-color: var(${customPropertyName}-background);
}

.${className}:hover {
  color: var(${customPropertyName}-hover);
  background-color: var(${customPropertyName}-background-hover);
}

.${className}:active,
.${className}.__active {
  color: var(${customPropertyName}-active);
  background-color: var(${customPropertyName}-background-active);
}

.${className}:disabled,
.${className}.__disabled {
  color: var(${customPropertyName}-disabled);
  background-color: var(${customPropertyName}-background-disabled);
}`;
}
