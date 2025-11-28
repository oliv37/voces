import { effect, inject, Injectable, signal } from '@angular/core';
import { Storage } from '@shared/storage/storage';
import type { WordGroupCompletions } from './word.model';
import { WordGroup } from './word.model';

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
      [wordGroup.id]: getCurrentTimeInMs(),
    }));
  }

  isCompleted(wordGroup: WordGroup): boolean {
    const completionTimestamp: number | undefined =
      this.#wordGroupCompletions()[wordGroup.id];
    return completionTimestamp !== undefined;
  }

  #readGroupCompletions(): WordGroupCompletions {
    const value = this.#storage.read('WORD_GROUP_COMPLETIONS');

    if (!value) {
      return {};
    }

    try {
      const wordGroupCompletions = JSON.parse(value);

      return Object.fromEntries(
        Object.entries(wordGroupCompletions).filter(([, completionTimeInMs]) =>
          isRecentCompletionTime(completionTimeInMs)
        )
      ) as WordGroupCompletions;
    } catch (e) {
      console.error('Error reading word group completion', e);
      return {};
    }
  }
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_DISTANCE_MS = 3 * ONE_DAY_MS;

function isRecentCompletionTime(completionTimeInMs: unknown): boolean {
  if (typeof completionTimeInMs !== 'number') {
    return false;
  }
  const distanceInMs = getCurrentTimeInMs() - completionTimeInMs;
  return distanceInMs <= MAX_DISTANCE_MS;
}

function getCurrentTimeInMs() {
  return new Date().getTime();
}
