import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { CompletionAge } from '../models/word.model';
import {
  matchWordsGroupCompletedKey,
  toCompletionAge,
  toWordsGroupCompletedKey,
} from '../utils/words-completion.util';

@Injectable()
export class WordsCompletionService {
  private _storageService = inject(StorageService);

  constructor() {
    this.removeOldWordsCompletedKeys();
  }

  markAsCompleted(wordsGroupId: number): void {
    this._storageService.write(
      toWordsGroupCompletedKey(wordsGroupId),
      new Date().getTime().toString()
    );
  }

  getCompletionAge(wordsGroupId: number): CompletionAge {
    const wordsGroupCompletedKey = toWordsGroupCompletedKey(wordsGroupId);
    return this.getCompletionAgeByKey(wordsGroupCompletedKey);
  }

  private getCompletionAgeByKey(wordsGroupCompletedKey: string) {
    const completionDateInMsStr = this._storageService.read(
      wordsGroupCompletedKey
    );

    if (completionDateInMsStr == null || isNaN(+completionDateInMsStr)) {
      return CompletionAge.NEVER;
    }

    const nowInMs = new Date().getTime();
    const completionDateInMs = +completionDateInMsStr;
    const distanceInMs = nowInMs - completionDateInMs;

    return toCompletionAge(distanceInMs);
  }

  private removeOldWordsCompletedKeys(): void {
    this._storageService
      .getAllKeys()
      .filter((key) => matchWordsGroupCompletedKey(key))
      .filter((key) => {
        const completionAge = this.getCompletionAgeByKey(key);
        return (
          completionAge === CompletionAge.LONG_TIME_AGO ||
          completionAge === CompletionAge.NEVER
        );
      })
      .forEach((key) => this._storageService.remove(key));
  }
}
