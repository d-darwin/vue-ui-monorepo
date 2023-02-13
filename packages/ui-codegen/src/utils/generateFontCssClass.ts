// TODO: descr
export default function(className: string, customProperty: { name: string, value?: string }): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  font: var(${customProperty.name});
}`;
}
