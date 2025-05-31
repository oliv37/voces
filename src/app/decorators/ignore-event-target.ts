/* eslint-disable @typescript-eslint/no-explicit-any */

export function IgnoreTarget(...tagNames: string[]) {
  const tagNamesToIgnore = tagNames.map((tagName) => tagName?.toLowerCase());
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      const event = args[0];
      const tagName = event?.target?.tagName?.toLowerCase();
      if (tagNamesToIgnore.includes(tagName)) {
        return;
      }

      return originalMethod.call(this, ...args);
    };
  };
}
