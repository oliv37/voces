import { CanMatchFn } from '@angular/router';
import { TEXT_IDS } from './text-data';

export const canMatchText: CanMatchFn = async (route, segments) => {
  const textId = segments[1].path;
  return TEXT_IDS.includes(textId);
};
