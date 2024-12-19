import { effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Group } from '@models/group.model';
import {
  CompletionStatus,
  GroupCompletion,
} from '@models/group-completion.model';

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

  getCompletionStatus(group: Group): CompletionStatus {
    const completionTimestamp = this._groupCompletion()[group.id];
    return toCompletionStatus(completionTimestamp);
  }

  private readGroupCompletion(): GroupCompletion {
    const value = this._storageService.read('GROUP_COMPLETION');
    return value ? (JSON.parse(value) as GroupCompletion) : {};
  }
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_MAX_DISTANCE_MS = 3 * ONE_DAY_MS;

function toCompletionStatus(
  completionTimestamp: number | undefined
): CompletionStatus {
  if (completionTimestamp == undefined) {
    return 'NEVER';
  }

  const distanceInMs = now() - completionTimestamp;
  return distanceInMs <= RECENT_MAX_DISTANCE_MS ? 'RECENT' : 'OLD';
}

function now() {
  return new Date().getTime();
}
