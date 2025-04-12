import {
  Level,
  LEVEL_AVANCE,
  LEVEL_DEBUTANT,
  LEVEL_INTERMEDIAIRE,
} from './level.model';

export interface Color {
  bgColor: string;
  textColor: string;
  fillColor: string;
  borderColor: string;
  strokeColor: string;
}

const COLOR_DEBUTANT: Color = {
  bgColor: 'bg-green-600',
  textColor: 'text-green-600',
  borderColor: 'border-green-600',
  fillColor: 'fill-green-600',
  strokeColor: 'stroke-green-600',
};

const COLOR_INTERMEDIAIRE: Color = {
  bgColor: 'bg-blue-600',
  textColor: 'text-blue-600',
  borderColor: 'border-blue-600',
  fillColor: 'fill-blue-600',
  strokeColor: 'stroke-blue-600',
};

const COLOR_AVANCEE: Color = {
  bgColor: 'bg-purple-600',
  textColor: 'text-purple-600',
  borderColor: 'border-purple-600',
  fillColor: 'fill-purple-600',
  strokeColor: 'stroke-purple-600',
};

export const COLORS: Record<Level, Color> = {
  [LEVEL_DEBUTANT]: COLOR_DEBUTANT,
  [LEVEL_INTERMEDIAIRE]: COLOR_INTERMEDIAIRE,
  [LEVEL_AVANCE]: COLOR_AVANCEE,
};
