// TODO: descr
export default function(className: string, sizeCustomPropertyName: string): string {
  // TODO: check if min-... is appropriate
  return `.${className} {
  min-height: var(${sizeCustomPropertyName});
  min-width: var(${sizeCustomPropertyName});
}`;
}
