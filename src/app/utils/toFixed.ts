export function toFixed(value: number, count = 2, unit = ''): string {
  return `${value.toFixed(count)}${unit ? ` ${unit}` : ''}`;
}

/**Adds spaces between thousands */
export function formatNumber(num: number, count: number = 2, unit = '') {
  const parts = num.toFixed(count).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${parts.join('.')}${unit ? ` ${unit}` : ''}`;
}
