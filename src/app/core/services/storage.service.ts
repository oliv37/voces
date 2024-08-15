import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null =
    typeof localStorage !== 'undefined' ? localStorage : null;

  read(key: string): string | null {
    return this._storage?.getItem(key) ?? null;
  }

  write(key: string, value: string) {
    this._storage?.setItem(key, value);
  }

  remove(key: string) {
    this._storage?.removeItem(key);
  }

  getAllKeys(): string[] {
    return Object.keys(this._storage || {});
  }
}
