import { ActivatedRouteSnapshot } from '@angular/router';

export function getData<T>(
  route: ActivatedRouteSnapshot | null,
  dataKey: string
): T | null {
  while (route != null) {
    if (route.data[dataKey]) {
      return route.data[dataKey] as T;
    }
    route = route.parent;
  }

  return null;
}
