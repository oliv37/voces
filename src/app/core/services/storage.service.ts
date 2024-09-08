import { Injectable } from '@angular/core';
import { StorageKey, StorageType } from '@core/models/storage.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null =
    typeof localStorage !== 'undefined' ? localStorage : null;

  read(key: StorageKey): string | null {
    return this._storage?.getItem(key.toString()) ?? null;
  }

  write(key: StorageKey, value: string) {
    this._storage?.setItem(key.toString(), value);
  }

  remove(key: StorageKey) {
    this._storage?.removeItem(key.toString());
  }

  getAllByType(type: StorageType): [StorageKey, string][] {
    return Object.entries(this._storage || {})
      .map<[StorageKey | null, string]>(([key, value]) => [
        StorageKey.fromString(key),
        value,
      ])
      .filter(
        (keyValue): keyValue is [StorageKey, string] => keyValue[0] != null
      )
      .filter(([key]) => key.type === type);
  }
}
