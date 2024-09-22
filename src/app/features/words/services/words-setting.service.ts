import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { DEFAULT_SETTING, WordsSetting } from '../models/words-setting.model';

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

  setIsExerciceReversed(isExerciceReversed: boolean) {
    this._setting.update((setting) => {
      const newSetting: WordsSetting = {
        ...setting,
        isExerciceReversed,
      };
      return newSetting;
    });
  }

  private readSetting(): WordsSetting {
    const settingStr = this._storageService.read('WORDS_SETTING');
    const setting = fromString(settingStr);

    return {
      isExerciceReversed: getOrDefault(setting, 'isExerciceReversed'),
    };
  }
}

function getOrDefault<T extends keyof typeof DEFAULT_SETTING>(
  existingSetting: Record<string, any> | null,
  propName: T
): (typeof DEFAULT_SETTING)[T] {
  if (
    existingSetting?.hasOwnProperty(propName) &&
    typeof existingSetting[propName] === typeof DEFAULT_SETTING[propName]
  ) {
    return existingSetting[propName];
  }

  return DEFAULT_SETTING[propName];
}

function fromString(
  str: string | null | undefined
): Record<string, any> | null {
  if (!str) {
    return null;
  }

  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e);
    return null;
  }
}
