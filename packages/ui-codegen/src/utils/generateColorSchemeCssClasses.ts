// TODO: descr
export default function (
  className: string,
  customProperty: { name: string, value?: string | Record<string, unknown> }
): string {
  // TODO: move \n to the caller ??
  return `\n.${className} {
  color: var(${customProperty.name});
  background-color: var(${customProperty.name}-background);
  --color: var(${customProperty.name});
  --background-color: var(${customProperty.name}-background);
}

.${className}:hover {
  color: var(${customProperty.name}-hover);
  background-color: var(${customProperty.name}-background-hover);
  --color: var(${customProperty.name}-hover);
  --background-color: var(${customProperty.name}-background-hover);
}

.${className}:active,
.${className}.__active {
  color: var(${customProperty.name}-active);
  background-color: var(${customProperty.name}-background-active);
  --color: var(${customProperty.name}-active);
  --background-color: var(${customProperty.name}-background-active);
}

.${className}:disabled,
.${className}.__disabled {
  color: var(${customProperty.name}-disabled);
  background-color: var(${customProperty.name}-background-disabled);
  --color: var(${customProperty.name}-disabled);
  --background-color: var(${customProperty.name}-background-disabled);
}`;
}
