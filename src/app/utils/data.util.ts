import { Category } from '@models/category.model';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';

import dataDebutant1 from '@data/debutant1.txt';
import dataDebutant2 from '@data/debutant2.txt';
import dataIntermediaire1 from '@data/intermediaire1.txt';
import dataIntermediaire2 from '@data/intermediaire2.txt';
import dataIntermediaire3 from '@data/intermediaire3.txt';
import dataAvance1 from '@data/avance1.txt';

const GROUP_SIZE = 20;

export const DATA: Category[][] = [
  [
    buildCategory(
      'DEBUTANT1',
      'Débutant 1',
      'debutant-1',
      buildWords(dataDebutant1)
    ),
    buildCategory(
      'DEBUTANT2',
      'Débutant 2',
      'debutant-2',
      buildWords(dataDebutant2)
    ),
  ],
  [
    buildCategory(
      'INTERMEDIAIRE1',
      'Intermédiaire 1',
      'intermediaire-1',
      buildWords(dataIntermediaire1)
    ),
    buildCategory(
      'INTERMEDIAIRE2',
      'Intermédiaire 2',
      'intermediaire-2',
      buildWords(dataIntermediaire2)
    ),

    buildCategory(
      'INTERMEDIAIRE3',
      'Intermédiaire 3',
      'intermediaire-3',
      buildWords(dataIntermediaire3)
    ),
  ],
  [buildCategory('AVANCE1', 'Avancé 1', 'avance-1', buildWords(dataAvance1))],
] as const;

function buildCategory(
  id: string,
  label: string,
  pathParam: string,
  words: Word[]
): Category {
  return {
    id,
    label,
    pathParam,
    groups: buildGroups(id, words),
    nbWords: words.length,
  };
}

function buildGroups(categoryId: string, words: Word[]): Group[] {
  const nbWords = words.length;
  const nbGroups = Math.ceil(nbWords / GROUP_SIZE);
  return [...Array(nbGroups).keys()].map((i) => {
    const start = i * GROUP_SIZE;
    const end = Math.min(start + GROUP_SIZE, nbWords);
    const index = i + 1;
    return {
      id: `${categoryId}_${index}`,
      label: `${index}`,
      pathParam: `${index}`,
      words: words.slice(start, end),
    };
  });
}

function buildWords(data: string): Word[] {
  return decode(data)
    .split('\n')
    .filter((line) => !!line)
    .map((line, id) => {
      const [es, fr] = line.split(' : ');
      return {
        id,
        es,
        fr,
      };
    });
}

function decode(str: string) {
  const base64Prefix = 'data:text/plain;base64,';

  if (str.startsWith(base64Prefix)) {
    return atob(str.substring(base64Prefix.length));
  }
  return str;
}
