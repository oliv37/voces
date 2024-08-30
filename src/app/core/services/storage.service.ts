import { Injectable } from '@angular/core';
import { StorageType } from '@core/models/storage.model';

const toKey = (type: StorageType, id: string | number) => `${type}-${id}`;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null =
    typeof localStorage !== 'undefined' ? localStorage : null;

  read(type: StorageType, id: string | number): string | null {
    const key = toKey(type, id);
    return this._storage?.getItem(key) ?? null;
  }

  write(type: StorageType, id: string | number, value: string) {
    const key = toKey(type, id);
    this._storage?.setItem(key, value);
  }

  remove(key: string) {
    this._storage?.removeItem(key);
  }

  getAllByType(type: StorageType): [string, string][] {
    return Object.entries(this._storage || {}).filter(([key, _]) =>
      key?.startsWith(type)
    );
  }
}
