import type { Text, TextCompletions } from './text.model';

export function getCurrentPage(
  textCompletions: TextCompletions,
  text: Text
): number {
  return getTextCompletion(textCompletions, text.id)?.currentPage || 1;
}

export function getCompletedPages(
  textCompletions: TextCompletions,
  text: Text
): number[] {
  return getTextCompletion(textCompletions, text.id)?.completedPages || [];
}

export function isCompleted(
  textCompletions: TextCompletions,
  text: Text
): boolean {
  const completedPages = getCompletedPages(textCompletions, text);

  return (
    text.contents.length > 0 &&
    text.contents.every((_, idx) => completedPages.includes(idx + 1))
  );
}

function getTextCompletion(
  textCompletions: TextCompletions,
  textId: string
): TextCompletions[string] | undefined {
  return textCompletions[textId];
}
