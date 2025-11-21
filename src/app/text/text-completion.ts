import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Storage } from '@shared/services/storage';
import type { Text, TextCompletions } from './text';
import { addIfNotPresent } from '@shared/utils/array';

@Injectable({ providedIn: 'root' })
export class TextCompletion {
  #storage = inject(Storage);

  #textCompletions = signal<TextCompletions>(this.#readTextCompletions());
  textCompletions: Signal<TextCompletions> = this.#textCompletions.asReadonly();

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
        completedPages: addIfNotPresent(
          textCompletions[text.id]?.completedPages || [],
          page
        ),
        lastCompletionTimeInMs: getCurrentTimeInMs(),
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
      const textCompletions = JSON.parse(value) as TextCompletions;

      for (const textCompletion of Object.values(textCompletions)) {
        if (hasOldLastPageCompletionTime(textCompletion)) {
          textCompletion.completedPages = [];
        }
      }

      return textCompletions;
    } catch (e) {
      console.error('Error reading group completion', e);
      return {};
    }
  }
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_DISTANCE_MS = 3 * ONE_DAY_MS;

function hasOldLastPageCompletionTime(
  textCompletion: TextCompletions[string]
): boolean {
  return (
    textCompletion?.lastPageCompletionTimeInMs !== undefined &&
    textCompletion?.lastPageCompletionTimeInMs > MAX_DISTANCE_MS
  );
}

function getCurrentTimeInMs() {
  return new Date().getTime();
}
