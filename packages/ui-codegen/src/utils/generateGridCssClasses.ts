// TODO: descr
export default function(
  className: string,
  customProperty: { name: string, value?: string | Record<string, unknown> },
  prevClassName?: string,
  prevCustomProperty?: { name: string, value?: string | Record<string, unknown> },
  isLast?: boolean,
): string {
  if (!prevCustomProperty || typeof prevCustomProperty.value !== "object"  || typeof customProperty.value !== "object" ) {
    return '';
  }
  const prevColumnCount = Number(prevCustomProperty.value?.count);
  const columnCount = Number(customProperty.value?.count);
  if (!prevColumnCount || !columnCount) {
    return '';
  }

  let prevColSpanClassStrings = '';
  for(let i = 1; i <= prevColumnCount; i++) {
    prevColSpanClassStrings += `  .${prevClassName}ColSpan${i} {
      grid-column-end: span ${i};
  }${i < prevColumnCount ? '\n\n' : ''}`
  }

  if (isLast) {
    let colSpanClassStrings = '';
    for(let i = 1; i <= columnCount; i++) {
      colSpanClassStrings += `  .${className}ColSpan${i} {
    grid-column-end: span ${i};
  }${i < columnCount ? '\n\n' : ''}`
  }
    return `\n@media (min-width: ${prevCustomProperty.value.breakpoint}px) and (max-width: calc(${customProperty.value.breakpoint}px - 1px)) {
${prevColSpanClassStrings}
}

@media (min-width: ${customProperty.value.breakpoint}px) {
${colSpanClassStrings}
}`;
  }

  return `\n@media (min-width: ${prevCustomProperty.value.breakpoint}px) and (max-width: calc(${customProperty.value.breakpoint}px - 1px)) {
${prevColSpanClassStrings}
}`;
}
