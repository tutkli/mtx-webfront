export function arrayAttribute(value: string | number): number[] {
  const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
  return [...Array(parsedValue).keys()];
}
