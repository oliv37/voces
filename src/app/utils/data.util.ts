import { Category } from '@models/category.model';
import { Group } from '@models/group.model';
import { Word } from '@models/word.model';

import dataDebutant1 from '@data/debutant1.txt';
import dataDebutant2 from '@data/debutant2.txt';
import dataIntermediaire1 from '@data/intermediaire1.txt';
import dataIntermediaire2 from '@data/intermediaire2.txt';
import dataIntermediaire3 from '@data/intermediaire3.txt';
import dataAvance1 from '@data/avance1.txt';
import { Color } from '@models/color.model';

const GROUP_SIZE = 20;

const COLOR_DEBUTANT: Color = {
  bgColor: 'bg-green-600',
  textColor: 'text-green-600',
  fillColor: 'fill-green-600',
  borderColor: 'border-green-600',
};

const COLOR_INTERMEDIAIRE: Color = {
  bgColor: 'bg-blue-600',
  textColor: 'text-blue-600',
  fillColor: 'fill-blue-600',
  borderColor: 'border-blue-600',
};

const COLOR_AVANCEE: Color = {
  bgColor: 'bg-purple-600',
  textColor: 'text-purple-600',
  fillColor: 'fill-purple-600',
  borderColor: 'border-purple-600',
};

export const DATA: Category[][] = [
  [
    buildCategory(
      'DEBUTANT1',
      'Débutant 1',
      'debutant-1',
      dataDebutant1,
      COLOR_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT2',
      'Débutant 2',
      'debutant-2',
      dataDebutant2,
      COLOR_DEBUTANT
    ),
  ],
  [
    buildCategory(
      'INTERMEDIAIRE1',
      'Intermédiaire 1',
      'intermediaire-1',
      dataIntermediaire1,
      COLOR_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE2',
      'Intermédiaire 2',
      'intermediaire-2',
      dataIntermediaire2,
      COLOR_INTERMEDIAIRE
    ),

    buildCategory(
      'INTERMEDIAIRE3',
      'Intermédiaire 3',
      'intermediaire-3',
      dataIntermediaire3,
      COLOR_INTERMEDIAIRE
    ),
  ],
  [
    buildCategory(
      'AVANCE1',
      'Avancé 1',
      'avance-1',
      dataAvance1,
      COLOR_AVANCEE
    ),
  ],
] as const;

function buildCategory(
  id: string,
  label: string,
  pathParam: string,
  data: string,
  color: Color
): Category {
  const words: Word[] = buildWords(id, data);
  const category: Category = {
    id,
    label,
    pathParam,
    groups: buildGroups(id, words),
    nbWords: words.length,
    color,
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

function buildWords(categoryId: string, data: string): Word[] {
  return data
    .split('\n')
    .filter((line) => !!line)
    .map((line, i) => {
      const [es, fr] = line.split(' : ');
      return {
        id: `${categoryId}_${i}`,
        es,
        fr,
      };
    });
}
