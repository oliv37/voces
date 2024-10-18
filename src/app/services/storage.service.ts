import { Injectable } from '@angular/core';

const KEY_DELIMITER = '--';

type StorageKey = 'GROUP_COMPLETION' | 'SETTING';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null =
    typeof localStorage !== 'undefined' ? localStorage : null;

  read(key: StorageKey, keySuffix?: string): string | null {
    return this._storage?.getItem(toKey(key, keySuffix)) ?? null;
  }

  write(key: StorageKey, value: string): void;
  write(key: StorageKey, keySuffix: string, value: string): void;
  write(key: StorageKey, keySuffixOrValue: string, value?: string): void {
    const itemKey = value != undefined ? toKey(key, keySuffixOrValue) : key;
    const itemValue = value ?? keySuffixOrValue;

    this._storage?.setItem(itemKey, itemValue);
  }

  remove(key: string): void {
    this._storage?.removeItem(key);
  }

  readAllByKeyPrefix(keyPrefix: StorageKey): [string, string][] {
    return Object.entries(this._storage || {}).filter(
      ([entryKey]: [string, string]) => entryKey?.startsWith(keyPrefix)
    );
  }
}

function toKey(key: StorageKey, keySuffix?: string): string {
  return keySuffix ? `${key}${KEY_DELIMITER}${keySuffix}` : key;
}
