import { CanMatchFn } from '@angular/router';
import { findCategory } from '@utils/category';
import { findGroup } from '@utils/group';

export const canMatchCategory: CanMatchFn = (route, segments) => {
  if (segments.length === 0) {
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
