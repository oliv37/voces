import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import type { Setting as SettingModel } from '../models/setting';
import { fromString } from '../utils/json';
import { Storage } from './storage';

const DEFAULT_SETTING: SettingModel = {
  isExerciceReversed: false,
};

@Injectable({ providedIn: 'root' })
export class Setting {
  private _storage = inject(Storage);

  private _setting = signal<SettingModel>(this.readSetting());

  setting: Signal<SettingModel> = this._setting.asReadonly();

  constructor() {
    // [Effect] write setting into storage
    effect(() =>
      this._storage.write('SETTING', JSON.stringify(this._setting()))
    );
  }

  setIsExerciceReversed(isExerciceReversed: boolean) {
    this._setting.update((setting) => ({
      ...setting,
      isExerciceReversed,
    }));
  }

  private readSetting(): SettingModel {
    const settingStr = this._storage.read('SETTING');
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
