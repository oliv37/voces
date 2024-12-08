import { CanMatchFn } from '@angular/router';
import { findCategory } from '@utils/category.util';
import { findGroup } from '@utils/group.util';

export const canMatchApp: CanMatchFn = (route, segments) => {
  if (segments.length === 0) {
    return true;
  }

  if (segments.length === 1 && segments[0].path === 'exercice') {
    return true;
  }

  if (segments.length === 1) {
    const categoryPathParam = segments[0].path;
    return !!findCategory(categoryPathParam);
  }

  if (segments.length >= 2) {
    const categoryPathParam = segments[0].path;
    const groupPathParam = segments[1].path;
    return !!findGroup(categoryPathParam, groupPathParam);
  }

  return false;
};
