import { effect, inject, Injectable, signal } from '@angular/core';
import { Storage } from '@shared/services/storage';
import type { WordGroupCompletions } from '../models/word';
import { WordGroup } from '../models/word';

@Injectable({ providedIn: 'root' })
export class WordGroupCompletion {
  #storage = inject(Storage);

  #wordGroupCompletions = signal<WordGroupCompletions>(
    this.#readGroupCompletions()
  );

  constructor() {
    effect(() => {
      this.#storage.write(
        'WORD_GROUP_COMPLETIONS',
        JSON.stringify(this.#wordGroupCompletions())
      );
    });
  }

  markAsCompleted(wordGroup: WordGroup): void {
    this.#wordGroupCompletions.update((wordGroupCompletions) => ({
      ...wordGroupCompletions,
      [wordGroup.id]: now(),
    }));
  }

  isCompleted(wordGroup: WordGroup): boolean {
    const completionTimestamp: number | undefined =
      this.#wordGroupCompletions()[wordGroup.id];
    return isRecentCompletionTimestamp(completionTimestamp);
  }

  #readGroupCompletions(): WordGroupCompletions {
    const value = this.#storage.read('WORD_GROUP_COMPLETIONS');

    if (!value) {
      return {};
    }

    try {
      const wordGroupCompletions = JSON.parse(value);
      // TODO : validate schema
      return Object.keys(wordGroupCompletions).reduce((acc, groupId) => {
        const completionTimestamp = wordGroupCompletions[groupId];
        if (isRecentCompletionTimestamp(completionTimestamp)) {
          acc[groupId] = completionTimestamp;
        }
        return acc;
      }, {} as WordGroupCompletions);
    } catch (e) {
      console.error('Error reading word group completion', e);
      return {};
    }
  }
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_DISTANCE_MS = 3 * ONE_DAY_MS;

function isRecentCompletionTimestamp(
  completionTimestamp: number | undefined
): boolean {
  if (!completionTimestamp) {
    return false;
  }
  const distanceInMs = now() - completionTimestamp;
  return distanceInMs <= MAX_DISTANCE_MS;
}

function now() {
  return new Date().getTime();
}
