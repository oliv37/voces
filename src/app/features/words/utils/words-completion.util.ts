import { CompletionAge } from '../models/word.model';

const ONE_DAY_AGE_IN_MS = 24 * 60 * 60 * 1000;

const COMPLETION_AGES_ASC: [CompletionAge, number][] = [
  [CompletionAge.LESS_THAN_A_DAY, ONE_DAY_AGE_IN_MS],
  [CompletionAge.LESS_THAN_TWO_DAYS, 2 * ONE_DAY_AGE_IN_MS],
  [CompletionAge.LESS_THAN_THREE_DAYS, 3 * ONE_DAY_AGE_IN_MS],
];

export function toCompletionAge(distanceInMs: number): CompletionAge {
  // The ascending order of COMPLETION_AGES_ASC is important
  const completionAge = COMPLETION_AGES_ASC.find(
    ([_, completionAgeDistanceInMs]) => distanceInMs < completionAgeDistanceInMs
  )?.[0];

  return completionAge ?? CompletionAge.LONG_TIME_AGO;
}

export function toWordsGroupCompletedKey(wordsGroupId: number): string {
  return `WORDS-GROUP-${wordsGroupId}-COMPLETED`;
}

export function matchWordsGroupCompletedKey(key: string): boolean {
  return /WORDS-GROUP-([0-9]+)-COMPLETED/.test(key);
}
