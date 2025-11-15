export interface Text {
  id: string;
  title: string;
  contents: string[];
}

interface TextCompletion {
  currentPage?: number;
  completedPages?: number[];
  lastPageCompletionTimeInMs?: number;
}

// { textId: TextCompletion }
export type TextCompletions = Record<string, TextCompletion>;
