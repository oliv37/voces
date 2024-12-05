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

const BG_COLOR_DEBUTANT = 'bg-green-600';
const BG_COLOR_INTERMEDIAIRE = 'bg-blue-600';
const BG_COLOR_AVANCEE = 'bg-purple-600';

export const DATA: Category[][] = [
  [
    buildCategory(
      'DEBUTANT1',
      'Débutant 1',
      'debutant-1',
      buildWords(dataDebutant1),
      BG_COLOR_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT2',
      'Débutant 2',
      'debutant-2',
      buildWords(dataDebutant2),
      BG_COLOR_DEBUTANT
    ),
  ],
  [
    buildCategory(
      'INTERMEDIAIRE1',
      'Intermédiaire 1',
      'intermediaire-1',
      buildWords(dataIntermediaire1),
      BG_COLOR_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE2',
      'Intermédiaire 2',
      'intermediaire-2',
      buildWords(dataIntermediaire2),
      BG_COLOR_INTERMEDIAIRE
    ),

    buildCategory(
      'INTERMEDIAIRE3',
      'Intermédiaire 3',
      'intermediaire-3',
      buildWords(dataIntermediaire3),
      BG_COLOR_INTERMEDIAIRE
    ),
  ],
  [
    buildCategory(
      'AVANCE1',
      'Avancé 1',
      'avance-1',
      buildWords(dataAvance1),
      BG_COLOR_AVANCEE
    ),
  ],
] as const;

function buildCategory(
  id: string,
  label: string,
  pathParam: string,
  words: Word[],
  bgColor: string
): Category {
  const category: Category = {
    id,
    label,
    pathParam,
    groups: buildGroups(id, words),
    nbWords: words.length,
    bgColor,
  };
  category.groups.forEach((g) => (g.category = category));
  return category;
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
    } as Group;
  });
}

function buildWords(data: string): Word[] {
  return data
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
