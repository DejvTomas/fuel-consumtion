export function toFixed(value: number, count = 2, unit = ''): string {
  return parseFloat(value.toString()).toFixed(count) + ' ' + unit;
}
