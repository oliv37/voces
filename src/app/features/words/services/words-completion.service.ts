import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { CompletionAge } from '../models/word.model';
import { toCompletionAge } from '../utils/words-completion.util';

@Injectable()
export class WordsCompletionService {
  private _storageService = inject(StorageService);

  constructor() {
    this.removeOldWordsCompletedKeys();
  }

  markAsCompleted(wordsGroupId: number): void {
    this._storageService.write(
      'WORDS_GROUP_COMPLETION',
      wordsGroupId,
      new Date().getTime().toString()
    );
  }

  getCompletionAge(wordsGroupId: number): CompletionAge {
    const completionDateInMs = this._storageService.read(
      'WORDS_GROUP_COMPLETION',
      wordsGroupId
    );
    return toCompletionAge(completionDateInMs);
  }

  private removeOldWordsCompletedKeys(): void {
    this._storageService
      .getAllByType('WORDS_GROUP_COMPLETION')
      .filter(
        ([_, completionDateInMs]) =>
          toCompletionAge(completionDateInMs) === 'LONG_TIME_AGO_OR_NEVER'
      )
      .forEach(([key, _]) => this._storageService.remove(key));
  }
}
