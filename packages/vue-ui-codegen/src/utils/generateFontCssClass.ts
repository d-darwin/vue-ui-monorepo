// TODO: descr
export default function(className: string, customPropertyName: string): string {
  return `.${className} {
  font: var(${customPropertyName});
}`;
}
