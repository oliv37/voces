export function isPositiveInteger(str?: string): boolean {
  return str != undefined && /^[1-9]\d*$/.test(str);
}
