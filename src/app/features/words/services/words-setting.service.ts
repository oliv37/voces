import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { DEFAULT_SETTING, WordsSetting } from '../models/words-setting.model';
import { WordsFormDirection } from '../models/words-exercice.model';

@Injectable()
export class WordsSettingService {
  private _storageService = inject(StorageService);

  private _setting = signal(this.readSetting());

  setting: Signal<WordsSetting> = this._setting.asReadonly();

  constructor() {
    // [Effect] write setting into storage
    effect(() =>
      this._storageService.write(
        'WORDS_SETTING',
        JSON.stringify(this._setting())
      )
    );
  }

  setFormDirection(formDirection: WordsFormDirection) {
    this._setting.update((setting) => {
      const newSetting: WordsSetting = {
        ...setting,
        formDirection,
      };
      return newSetting;
    });
  }

  private readSetting(): WordsSetting {
    const settingStr: string | null =
      this._storageService.read('WORDS_SETTING');

    return fromString(settingStr) ?? DEFAULT_SETTING;
  }
}

function fromString(str: string | null | undefined): WordsSetting | null {
  if (!str) {
    return null;
  }

  try {
    return JSON.parse(str) as WordsSetting;
  } catch (e) {
    console.error(e);
    return null;
  }
}
