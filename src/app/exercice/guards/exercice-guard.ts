import { CanMatchFn } from '@angular/router';
import { WORD_GROUPS } from '@shared/utils/data';

export const canMatchExercice: CanMatchFn = async (route, segments) => {
  const wordGroups = await WORD_GROUPS;
  const wordGroupId = segments[1].path;
  return wordGroups.find((g) => g.id.toString() === wordGroupId) != null;
};
