import { Text } from './text.model';

export const TEXT_IDS = [
  'bolsonaro_sala_especial_brasilia',
  'delarosa_emboscada_los_angeles',
  'vaticano_superavit_2024',
];

export const TEXTS_PROMISE: Record<string, Promise<Text>> = TEXT_IDS.reduce(
  (acc, id) => {
    acc[id] = import(`../../data/texts/${id}.txt`).then((m) =>
      buildText(id, m.default)
    );
    return acc;
  },
  {} as Record<string, Promise<Text>>
);

function buildText(id: string, data: string): Text {
  const lines = data.split('\n').map((line) => line.trim());

  return {
    id,
    title: lines[0],
    contents: buildContents(lines.slice(1)),
  };
}

function buildContents(lines: string[]): string[] {
  const contents: string[] = [];
  let content = '';

  for (const line of lines.slice(1)) {
    if (!line && content) {
      contents.push(content);
      content = '';
    } else {
      content += (content ? ' ' : '') + line;
    }
  }

  if (content) {
    contents.push(content);
  }

  return contents;
}
