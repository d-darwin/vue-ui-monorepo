// TODO: descr
export default function(
  className: string,
  customPropertyName: string,
  prevCustomPropertyName?: string,
  isLast?: boolean,
): string {

  if (!prevCustomPropertyName) {
    return '';
  }

  const prevPropPrefix = prevCustomPropertyName.replace('breakpoints', 'grid');
  if (isLast) {
    const propPrefix = customPropertyName.replace('breakpoints', 'grid');
    return `\n@media (min-width: var(${prevCustomPropertyName})) and (max-width: var(${customPropertyName}) - 1) {
  :root {
    --grid-column-count: var(${prevPropPrefix}-column-count);
    --grid-column-gap: var(${prevPropPrefix}-column-gap);
    --grid-column-offset: var(${prevPropPrefix}-column-offset);
  }
}
\n@media (min-width: var(${customPropertyName})) {
  :root {
    --grid-column-count: var(${propPrefix}-column-count);
    --grid-column-gap: var(${propPrefix}-column-gap);
    --grid-column-offset: var(${propPrefix}-column-offset);
  }
}`;
  }

  return `\n@media (min-width: var(${prevCustomPropertyName})) and (max-width: var(${customPropertyName}) - 1) {
  :root {
    --grid-column-count: var(${prevPropPrefix}-column-count);
    --grid-column-gap: var(${prevPropPrefix}-column-gap);
    --grid-column-offset: var(${prevPropPrefix}-column-offset);
  }
}`;
}
