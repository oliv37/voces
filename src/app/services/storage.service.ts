import { Injectable } from '@angular/core';

type StorageKey = 'GROUP_COMPLETION' | 'SETTING';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null =
    typeof localStorage !== 'undefined' ? localStorage : null;

  read(key: StorageKey): string | null {
    return this._storage?.getItem(key) ?? null;
  }

  write(key: StorageKey, value: string): void {
    this._storage?.setItem(key, value);
  }

  remove(key: string): void {
    this._storage?.removeItem(key);
  }
}
