// TODO: descr
export default function(
  className: string,
  customProperty: { name: string, value?: string | Record<string, unknown> },
  prevClassName?: string,
  prevCustomProperty?: { name: string, value?: string },
  isLast?: boolean,
): string {

  if (!prevCustomProperty?.value) {
    return '';
  }

  const prevPropPrefix = prevCustomProperty.name.replace('breakpoints', 'grid');
  if (isLast) {
    const propPrefix = customProperty.name.replace('breakpoints', 'grid');
    return `\n@media (min-width: ${prevCustomProperty.value}px) and (max-width: calc(${customProperty.value}px - 1px)) {
  :root {
    --grid-column-count: var(${prevPropPrefix}-column-count);
    --grid-column-gap: var(${prevPropPrefix}-column-gap);
    --grid-column-offset: var(${prevPropPrefix}-column-offset);
    --grid-max-width: var(${prevPropPrefix}-max-width);
  }
}
\n@media (min-width: ${customProperty.value}px) {
  :root {
    --grid-column-count: var(${propPrefix}-column-count);
    --grid-column-gap: var(${propPrefix}-column-gap);
    --grid-column-offset: var(${propPrefix}-column-offset);
    --grid-max-width: var(${propPrefix}-max-width);
  }
}`;
  }

  return `\n@media (min-width: ${prevCustomProperty.value}px) and (max-width: calc(${customProperty.value}px - 1px)) {
  :root {
    --grid-column-count: var(${prevPropPrefix}-column-count);
    --grid-column-gap: var(${prevPropPrefix}-column-gap);
    --grid-column-offset: var(${prevPropPrefix}-column-offset);
    --grid-max-width: var(${prevPropPrefix}-max-width);
  }
}`;
}
