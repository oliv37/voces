import { WordsCompletionAge } from '../models/words-completion.model';

const ONE_DAY_AGE_IN_MS = 24 * 60 * 60 * 1000;

const WORDS_COMPLETION_AGES_ASC: [WordsCompletionAge, number][] = [
  ['LESS_THAN_TWO_DAYS', 2 * ONE_DAY_AGE_IN_MS],
  ['LESS_THAN_FOUR_DAYS', 4 * ONE_DAY_AGE_IN_MS],
];

export function toWordsGroupCompletionAge(
  completionDateInMs: number | string | null
): WordsCompletionAge {
  if (completionDateInMs == null || isNaN(+completionDateInMs)) {
    return 'LONG_TIME_AGO_OR_NEVER';
  }

  const nowInMs = new Date().getTime();
  const distanceInMs = nowInMs - +completionDateInMs;

  return (
    WORDS_COMPLETION_AGES_ASC.find(
      ([, maxDistanceInMs]) => distanceInMs < maxDistanceInMs
    )?.[0] ?? 'LONG_TIME_AGO_OR_NEVER'
  );
}
