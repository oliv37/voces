import type { Category } from '@models/category';
import type { Group } from '@models/group';
import type { Word } from '@models/word';

import dataDebutant1 from '@data/debutant1.txt';
import dataDebutant2 from '@data/debutant2.txt';
import dataDebutant3 from '@data/debutant3.txt';
import dataDebutant4 from '@data/debutant4.txt';
import dataDebutant5 from '@data/debutant5.txt';
import dataIntermediaire1 from '@data/intermediaire1.txt';
import dataIntermediaire2 from '@data/intermediaire2.txt';
import dataIntermediaire3 from '@data/intermediaire3.txt';
import dataIntermediaire4 from '@data/intermediaire4.txt';
import dataIntermediaire5 from '@data/intermediaire5.txt';
import dataIntermediaire6 from '@data/intermediaire6.txt';
import dataIntermediaire7 from '@data/intermediaire7.txt';
import dataIntermediaire8 from '@data/intermediaire8.txt';
import dataIntermediaire9 from '@data/intermediaire9.txt';
import dataIntermediaire10 from '@data/intermediaire10.txt';
import dataIntermediaire11 from '@data/intermediaire11.txt';

import dataAvance1 from '@data/avance1.txt';
import {
  Level,
  LEVEL_AVANCE,
  LEVEL_DEBUTANT,
  LEVEL_INTERMEDIAIRE,
} from '@models/level';
import { COLORS } from '@models/color';

const GROUP_SIZE = 12;

export const DATA: Category[][] = [
  [
    buildCategory(
      'DEBUTANT1',
      'Débutant 1',
      'debutant-1',
      dataDebutant1,
      LEVEL_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT2',
      'Débutant 2',
      'debutant-2',
      dataDebutant2,
      LEVEL_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT3',
      'Débutant 3',
      'debutant-3',
      dataDebutant3,
      LEVEL_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT4',
      'Débutant 4',
      'debutant-4',
      dataDebutant4,
      LEVEL_DEBUTANT
    ),
    buildCategory(
      'DEBUTANT5',
      'Débutant 5',
      'debutant-5',
      dataDebutant5,
      LEVEL_DEBUTANT
    ),
  ],
  [
    buildCategory(
      'INTERMEDIAIRE1',
      'Intermédiaire 1',
      'intermediaire-1',
      dataIntermediaire1,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE2',
      'Intermédiaire 2',
      'intermediaire-2',
      dataIntermediaire2,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE3',
      'Intermédiaire 3',
      'intermediaire-3',
      dataIntermediaire3,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE4',
      'Intermédiaire 4',
      'intermediaire-4',
      dataIntermediaire4,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE5',
      'Intermédiaire 5',
      'intermediaire-5',
      dataIntermediaire5,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE6',
      'Intermédiaire 6',
      'intermediaire-6',
      dataIntermediaire6,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE7',
      'Intermédiaire 7',
      'intermediaire-7',
      dataIntermediaire7,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE8',
      'Intermédiaire 8',
      'intermediaire-8',
      dataIntermediaire8,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE9',
      'Intermédiaire 9',
      'intermediaire-9',
      dataIntermediaire9,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE10',
      'Intermédiaire 10',
      'intermediaire-10',
      dataIntermediaire10,
      LEVEL_INTERMEDIAIRE
    ),
    buildCategory(
      'INTERMEDIAIRE11',
      'Intermédiaire 11',
      'intermediaire-11',
      dataIntermediaire11,
      LEVEL_INTERMEDIAIRE
    ),
  ],
  [buildCategory('AVANCE1', 'Avancé 1', 'avance-1', dataAvance1, LEVEL_AVANCE)],
] as const;

function buildCategory(
  id: string,
  label: string,
  pathParam: string,
  data: string,
  level: Level
): Category {
  const words: Word[] = buildWords(id, data);
  const category: Category = {
    id,
    label,
    pathParam,
    groups: buildGroups(id, words),
    nbWords: words.length,
    level,
    color: COLORS[level],
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
