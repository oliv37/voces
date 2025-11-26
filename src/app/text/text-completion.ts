import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Storage } from '@shared/storage/storage';
import type { Text, TextCompletions } from './text.model';
import { addIfNotPresent } from '@shared/misc/array';

@Injectable({ providedIn: 'root' })
export class TextCompletion {
  readonly #storage = inject(Storage);

  readonly #textCompletions = signal<TextCompletions>(
    this.#readTextCompletions()
  );

  readonly textCompletions: Signal<TextCompletions> =
    this.#textCompletions.asReadonly();

  constructor() {
    effect(() => {
      this.#storage.write(
        'TEXT_COMPLETIONS',
        JSON.stringify(this.#textCompletions())
      );
    });
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
        completedPages: addIfNotPresent(
          textCompletions[text.id]?.completedPages || [],
          page
        ),
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
      return JSON.parse(value) as TextCompletions;
    } catch (e) {
      console.error('Error reading group completion', e);
      return {};
    }
  }
}
