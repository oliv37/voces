import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeIn(
  selector: string,
  staggerTimings: number | string,
  animateTimings: number | string
) {
  return trigger('fadeIn', [
    transition(':enter', [
      query(
        selector,
        [
          style({ opacity: 0 }),
          stagger(
            staggerTimings,
            animate(animateTimings, style({ opacity: 1 }))
          ),
        ],
        { optional: true }
      ),
    ]),
  ]);
}
