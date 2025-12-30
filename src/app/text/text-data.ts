import { Text } from './text.model';

export const TEXT_IDS = [
  'protestas_bolivia_subsidio_combustible',
  'batalla_campal_ring_serbia',
  'eurostar_suspendido_paris_londres',
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
