import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Storage } from '@shared/storage/storage';
import type { Text, TextCompletions } from './text.model';
import { addIfNotPresent } from '@shared/misc/array';
import { TEXT_IDS } from './text-data';

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
      const textCompletions = JSON.parse(value);

      return Object.fromEntries(
        Object.entries(textCompletions).filter(
          ([textId, textCompletion]) =>
            TEXT_IDS.includes(textId) && isTextCompletion(textCompletion)
        )
      ) as TextCompletions;
    } catch (e) {
      console.error('Error reading group completion', e);
      return {};
    }
  }
}

function isTextCompletion(obj: unknown): obj is TextCompletions[string] {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const textCompletion = obj as TextCompletions[string];

  if (
    textCompletion.currentPage !== undefined &&
    typeof textCompletion.currentPage !== 'number'
  ) {
    return false;
  }

  if (
    textCompletion.completedPages !== undefined &&
    !Array.isArray(textCompletion.completedPages)
  ) {
    return false;
  }

  for (const page of textCompletion.completedPages || []) {
    if (typeof page !== 'number') {
      return false;
    }
  }

  return true;
}
