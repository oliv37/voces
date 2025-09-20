import { effect, inject, Injectable, signal } from '@angular/core';
import { Storage } from '@shared/services/storage';
import type { WordGroupCompletion as WordGroupCompletionModel } from '../models/word';
import { WordGroup } from '../models/word';

@Injectable({ providedIn: 'root' })
export class WordGroupCompletion {
  private _storage = inject(Storage);

  private _wordGroupCompletion = signal<WordGroupCompletionModel>(
    this.readGroupCompletion()
  );

  constructor() {
    effect(() => {
      this._storage.write(
        'GROUP_COMPLETION',
        JSON.stringify(this._wordGroupCompletion())
      );
    });
  }

  markAsCompleted(group: WordGroup): void {
    this._wordGroupCompletion.update((_wordGroupCompletion) => ({
      ..._wordGroupCompletion,
      [group.id]: now(),
    }));
  }

  isCompleted(group: WordGroup): boolean {
    const completionTimestamp: number | undefined =
      this._wordGroupCompletion()[group.id];
    return isRecentCompletionTimestamp(completionTimestamp);
  }

  private readGroupCompletion(): WordGroupCompletionModel {
    const value = this._storage.read('GROUP_COMPLETION');

    if (!value) {
      return {};
    }

    try {
      const groupCompletion = JSON.parse(value);
      return Object.keys(groupCompletion).reduce((acc, groupId) => {
        const completionTimestamp = groupCompletion[groupId];
        if (isRecentCompletionTimestamp(completionTimestamp)) {
          acc[groupId] = completionTimestamp;
        }
        return acc;
      }, {} as WordGroupCompletionModel);
    } catch (e) {
      console.error('Error reading group completion', e);
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
