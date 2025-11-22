import { CanMatchFn } from '@angular/router';
import { WORD_GROUPS_PROMISE } from '../word-data';

export const canMatchWordExercice: CanMatchFn = async (route, segments) => {
  const wordGroups = await WORD_GROUPS_PROMISE;
  const wordGroupId = segments[1].path;
  return wordGroups.find((g) => g.id.toString() === wordGroupId) != null;
};
