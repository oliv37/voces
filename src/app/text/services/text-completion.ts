import { effect, inject, Injectable, signal } from '@angular/core';
import { Storage } from '@shared/services/storage';
import type { Text, TextCompletions } from '../models/text';

@Injectable({ providedIn: 'root' })
export class TextCompletion {
  #storage = inject(Storage);

  #textCompletions = signal<TextCompletions>(this.#readTextCompletions());

  constructor() {
    effect(() => {
      this.#storage.write(
        'TEXT_COMPLETIONS',
        JSON.stringify(this.#textCompletions())
      );
    });
  }

  getCurrentPage(text: Text): number {
    return this.#textCompletions()[text.id]?.currentPage || 1;
  }

  saveCurrentPage(text: Text, page: number) {
    this.#textCompletions.update((textCompletions) => ({
      ...textCompletions,
      [text.id]: {
        ...textCompletions[text.id],
        currentPage: page,
      },
    }));
  }

  saveCompletedPage(text: Text, page: number): void {
    this.#textCompletions.update((textCompletions) => ({
      ...textCompletions,
      [text.id]: {
        ...textCompletions[text.id],
        completedPages: [
          ...new Set([
            ...(textCompletions[text.id]?.completedPages || []),
            page,
          ]),
        ],
      },
    }));
  }

  #readTextCompletions(): TextCompletions {
    const value = this.#storage.read('TEXT_COMPLETIONS');

    if (!value) {
      return {};
    }

    try {
      // TODO : validate schema
      return JSON.parse(value);
    } catch (e) {
      console.error('Error reading group completion', e);
      return {};
    }
  }
}
