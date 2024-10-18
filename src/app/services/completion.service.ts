import { inject, Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Group } from '@models/group.model';
import { toGroupCompletionAge } from '@utils/completion.util';
import { CompletionAge } from '@models/completion.model';

@Injectable({ providedIn: 'root' })
export class CompletionService {
  private _storageService = inject(StorageService);

  constructor() {
    this.removeOldCompletion();
  }

  markAsCompleted(group: Group): void {
    this._storageService.write(
      'GROUP_COMPLETION',
      group.id,
      new Date().getTime().toString()
    );
  }

  getCompletionAge(group: Group): CompletionAge {
    const completionDateInMs = this._storageService.read(
      'GROUP_COMPLETION',
      group.id
    );
    return toGroupCompletionAge(completionDateInMs);
  }

  private removeOldCompletion(): void {
    this._storageService
      .readAllByKeyPrefix('GROUP_COMPLETION')
      .filter(
        ([, completionDateInMs]) =>
          toGroupCompletionAge(completionDateInMs) === 'LONG_TIME_AGO_OR_NEVER'
      )
      .forEach(([key]) => this._storageService.remove(key));
  }
}
