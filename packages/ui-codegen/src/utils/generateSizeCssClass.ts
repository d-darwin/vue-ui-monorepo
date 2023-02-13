// TODO: descr
export default function(className: string, customProperty: { name: string, value?: string }): string {
  // TODO: move \n to the caller
  // TODO: check if min-... is appropriate
  return `\n.${className} {
  min-height: var(${customProperty.name});
  min-width: var(${customProperty.name});
  --size: var(${customProperty.name});
}`;
}
