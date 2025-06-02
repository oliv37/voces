import { animate, style, transition, trigger } from '@angular/animations';

export function slideDown(timings: string | number) {
  return trigger('slideDown', [
    transition(':increment', [
      style({ transform: 'translateY(-50%)' }),
      animate(timings, style({ transform: 'translateY(0)' })),
    ]),
  ]);
}
