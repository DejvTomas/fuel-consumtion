export function toFixed(value: number, count = 2, unit = ''): string {
  return `${value.toFixed(count)}${unit? ` ${unit}` : ''}`;
}
