// TODO: descr
export default function(className: string, customPropertyName: string): string {
  // TODO: move \n to the caller
  // TODO: check if min-... is appropriate
  return `\n.${className} {
  min-height: var(${customPropertyName});
  min-width: var(${customPropertyName});
  --size: var(${customPropertyName});
}`;
}
