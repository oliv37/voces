export function ignoreEventTarget(...tagNames: string[]) {
  const tagNamesLowerCase = tagNames.map((tagName) => tagName?.toLowerCase());
  return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      const event = args[0];
      const tagNameLowerCase = event?.target?.tagName?.toLowerCase();
      if (tagNamesLowerCase.includes(tagNameLowerCase)) {
        return;
      }

      return originalMethod.call(this, ...args);
    };
  };
}
