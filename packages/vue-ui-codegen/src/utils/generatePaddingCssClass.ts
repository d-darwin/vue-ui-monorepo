// TODO: descr
export default function(className: string, sizeCustomPropertyName: string): string {
  // TODO: move \n to the caller
  return `\n.${className} {
  padding: var(${sizeCustomPropertyName});
}`;
}
