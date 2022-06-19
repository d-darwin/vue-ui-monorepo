// TODO: descr
export default function(className: string, sizeCustomPropertyName: string): string {
  return `\n.${className} {
  padding: var(${sizeCustomPropertyName});
}`;
}
