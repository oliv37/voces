import { Component, input } from '@angular/core';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '8xl' | '12xl';

@Component({
  selector: 'app-spacer',
  template: '',
  host: {
    class: 'block',
    '[class]': 'classBySize[size()]',
  },
})
export class SpacerComponent {
  readonly classBySize: Record<Size, string> = {
    xs: 'py-1',
    sm: 'py-2',
    md: 'py-3',
    lg: 'py-4',
    xl: 'py-5',
    '2xl': 'py-6',
    '4xl': 'py-8',
    '8xl': 'py-12',
    '12xl': 'py-16',
  };

  size = input<Size>('md');
}
