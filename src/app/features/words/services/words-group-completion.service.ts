import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { WordsGroup, WordsGroupCompletionAge } from '../models/word.model';
import { toWordsGroupCompletionAge } from '../utils/words-group-completion.util';
import { StorageKey } from '@core/models/storage.model';

@Injectable()
export class WordsGroupCompletionService {
  private _storageService = inject(StorageService);

  constructor() {
    this.removeOldWordsGroupCompletion();
  }

  markAsCompleted(wordsGroup: WordsGroup): void {
    const key = new StorageKey('WORDS_GROUP_COMPLETION', wordsGroup.id);
    this._storageService.write(key, new Date().getTime().toString());
  }

  getCompletionAge(wordsGroup: WordsGroup): WordsGroupCompletionAge {
    const key = new StorageKey('WORDS_GROUP_COMPLETION', wordsGroup.id);
    const completionDateInMs = this._storageService.read(key);
    return toWordsGroupCompletionAge(completionDateInMs);
  }

  private removeOldWordsGroupCompletion(): void {
    this._storageService
      .getAllByType('WORDS_GROUP_COMPLETION')
      .filter(
        ([_key, completionDateInMs]) =>
          toWordsGroupCompletionAge(completionDateInMs) ===
          'LONG_TIME_AGO_OR_NEVER'
      )
      .forEach(([key]) => this._storageService.remove(key));
  }
}
