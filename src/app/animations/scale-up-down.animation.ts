import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function scaleUpDown(
  staggerTimings: number,
  animateTimings: number | string
) {
  return trigger('scaleUpDown', [
    transition(':increment', [
      query(
        ':enter',
        [
          style({ transform: 'scale(0)' }),
          stagger(
            staggerTimings,
            animate(animateTimings, style({ transform: 'scale(1)' }))
          ),
        ],
        { optional: true }
      ),
    ]),
    transition(':decrement', [
      query(
        ':leave',
        [
          style({ transform: 'scale(1)' }),
          stagger(
            -staggerTimings,
            animate(animateTimings, style({ transform: 'scale(0)' }))
          ),
        ],
        { optional: true }
      ),
    ]),
  ]);
}
