// TODO: descr
export default function(className: string, customPropertyName: string): string {
  return `\n.${className} {
  font: var(${customPropertyName});
}`;
}
