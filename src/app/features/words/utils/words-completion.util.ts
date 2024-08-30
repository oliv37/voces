import { CompletionAge } from '../models/word.model';

const ONE_DAY_AGE_IN_MS = 24 * 60 * 60 * 1000;

const COMPLETION_AGES_ASC: [CompletionAge, number][] = [
  ['LESS_THAN_TWO_DAYS', 2 * ONE_DAY_AGE_IN_MS],
  ['LESS_THAN_FOUR_DAYS', 4 * ONE_DAY_AGE_IN_MS],
];

export function toCompletionAge(
  completionDateInMs: number | string | null
): CompletionAge {
  if (completionDateInMs == null || isNaN(+completionDateInMs)) {
    return 'LONG_TIME_AGO_OR_NEVER';
  }

  const nowInMs = new Date().getTime();
  const distanceInMs = nowInMs - +completionDateInMs;

  return (
    COMPLETION_AGES_ASC.find(
      ([_, maxDistanceInMs]) => distanceInMs < maxDistanceInMs
    )?.[0] ?? 'LONG_TIME_AGO_OR_NEVER'
  );
}
