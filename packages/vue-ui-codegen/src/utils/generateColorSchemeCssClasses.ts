// TODO: descr
export default function (
  className: string,
  customPropertyName: string
): string {
  return `\n.${className} {
  color: var(${customPropertyName});
  background-color: var(${customPropertyName}-background);
}

.${className}:hover {
  color: var(${customPropertyName}-hover);
  background-color: var(${customPropertyName}-background-hover);
}

.${className}:active {
  color: var(${customPropertyName}-active);
  background-color: var(${customPropertyName}-background-active);
}

.${className}:disabled {
  color: var(${customPropertyName}-disabled);
  background-color: var(${customPropertyName}-background-disabled);
}`;
}
