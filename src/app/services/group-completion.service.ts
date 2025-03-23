import { effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Group } from '@models/group.model';
import { GroupCompletion } from '@models/group-completion.model';

@Injectable({ providedIn: 'root' })
export class GroupCompletionService {
  private _storageService = inject(StorageService);

  private _groupCompletion = signal<GroupCompletion>(
    this.readGroupCompletion()
  );

  constructor() {
    effect(() => {
      this._storageService.write(
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
    return this.isCompletionTimestampWithinMaxDistance(completionTimestamp);
  }

  private readGroupCompletion(): GroupCompletion {
    const value = this._storageService.read('GROUP_COMPLETION');

    if (!value) {
      return {};
    }

    try {
      const groupCompletion = JSON.parse(value);
      return Object.keys(groupCompletion).reduce((acc, groupId) => {
        const completionTimestamp = groupCompletion[groupId];
        if (this.isCompletionTimestampWithinMaxDistance(completionTimestamp)) {
          acc[groupId] = completionTimestamp;
        }
        return acc;
      }, {} as GroupCompletion);
    } catch (e) {
      console.error('Error reading group completion', e);
      return {};
    }
  }

  private isCompletionTimestampWithinMaxDistance(
    completionTimestamp: number | undefined
  ): boolean {
    if (!completionTimestamp) {
      return false;
    }
    const distanceInMs = now() - completionTimestamp;
    return distanceInMs <= MAX_DISTANCE_MS;
  }
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_DISTANCE_MS = 3 * ONE_DAY_MS;

function now() {
  return new Date().getTime();
}
