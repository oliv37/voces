import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Setting } from '@models/setting.model';
import { fromString } from '@utils/json.util';

const DEFAULT_SETTING: Setting = {
  isExerciceReversed: false,
};

@Injectable({ providedIn: 'root' })
export class SettingService {
  private _storageService = inject(StorageService);

  private _setting = signal(this.readSetting());

  setting: Signal<Setting> = this._setting.asReadonly();

  constructor() {
    // [Effect] write setting into storage
    effect(() =>
      this._storageService.write('SETTING', JSON.stringify(this._setting()))
    );
  }

  setIsExerciceReversed(isExerciceReversed: boolean) {
    this._setting.update((setting) => {
      const newSetting: Setting = {
        ...setting,
        isExerciceReversed,
      };
      return newSetting;
    });
  }

  private readSetting(): Setting {
    const settingStr = this._storageService.read('SETTING');
    const setting = fromString(settingStr);

    return {
      isExerciceReversed: getOrDefault(setting, 'isExerciceReversed'),
    };
  }
}

function getOrDefault<T extends keyof typeof DEFAULT_SETTING>(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  existingSetting: Record<string, any> | null,
  propName: T
): (typeof DEFAULT_SETTING)[T] {
  if (
    existingSetting &&
    Object.hasOwn(existingSetting, propName) &&
    typeof existingSetting[propName] === typeof DEFAULT_SETTING[propName]
  ) {
    return existingSetting[propName];
  }

  return DEFAULT_SETTING[propName];
}
