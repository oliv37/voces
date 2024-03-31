import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { isPositiveInteger } from '../../shared/string.utils';

export const canMatchCategory: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const categoryNumber = segments[0].path;
  return isPositiveInteger(categoryNumber);
};
