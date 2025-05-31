import { effect, inject, Injectable, signal } from '@angular/core';
import type { Group } from '@models/group';
import type { GroupCompletion as GroupCompletionModel } from '@models/group-completion';
import { Storage } from '@services/storage';

@Injectable({ providedIn: 'root' })
export class GroupCompletion {
  private _storage = inject(Storage);

  private _groupCompletion = signal<GroupCompletionModel>(
    this.readGroupCompletion()
  );

  constructor() {
    effect(() => {
      this._storage.write(
        'GROUP_COMPLETION',
        JSON.stringify(this._groupCompletion())
      );
    });
  }

  markAsCompleted(group: Group): void {
    this._groupCompletion.update((_groupCompletion) => ({
      ..._groupCompletion,
      [group.id]: now(),
    }));
  }

  isCompleted(group: Group): boolean {
    const completionTimestamp: number | undefined =
      this._groupCompletion()[group.id];
    return isRecentCompletionTimestamp(completionTimestamp);
  }

  private readGroupCompletion(): GroupCompletionModel {
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
      }, {} as GroupCompletionModel);
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
