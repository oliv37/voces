import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { WordsGroup } from '../models/words.model';
import { toWordsGroupCompletionAge } from '../utils/words-group-completion.util';
import { WordsCompletionAge } from '../models/words-completion.model';

@Injectable()
export class WordsCompletionService {
  private _storageService = inject(StorageService);

  constructor() {
    this.removeOldWordsGroupCompletion();
  }

  markAsCompleted(wordsGroup: WordsGroup): void {
    this._storageService.write(
      'WORDS_GROUP_COMPLETION',
      wordsGroup.id,
      new Date().getTime().toString()
    );
  }

  getCompletionAge(wordsGroup: WordsGroup): WordsCompletionAge {
    const completionDateInMs = this._storageService.read(
      'WORDS_GROUP_COMPLETION',
      wordsGroup.id
    );
    return toWordsGroupCompletionAge(completionDateInMs);
  }

  private removeOldWordsGroupCompletion(): void {
    this._storageService
      .readAllByKeyPrefix('WORDS_GROUP_COMPLETION')
      .filter(
        ([_key, completionDateInMs]) =>
          toWordsGroupCompletionAge(completionDateInMs) ===
          'LONG_TIME_AGO_OR_NEVER'
      )
      .forEach(([key, _value]) => this._storageService.remove(key));
  }
}
