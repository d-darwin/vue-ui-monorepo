// TODO: descr
export default function(className: string, customPropertyName: string): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  font: var(${customPropertyName});
}`;
}
