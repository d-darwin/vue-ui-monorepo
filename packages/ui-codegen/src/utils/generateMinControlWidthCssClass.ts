// TODO: descr
export default function(className: string, customProperty: { name: string, value?: string | Record<string, unknown> }): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  min-width: var(${customProperty.name});
  --min-width: var(${customProperty.name});
}`;
}
