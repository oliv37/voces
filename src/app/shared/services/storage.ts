import { Injectable } from '@angular/core';

type StorageKey = 'WORD_GROUP_COMPLETIONS' | 'TEXT_COMPLETIONS';

@Injectable({ providedIn: 'root' })
export class Storage {
  private _storage: globalThis.Storage | null =
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
