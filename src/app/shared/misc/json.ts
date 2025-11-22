export function fromString(
  jsonStr: string | null | undefined
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Record<string, any> | null {
  if (!jsonStr) {
    return null;
  }

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(e);
    return null;
  }
}
