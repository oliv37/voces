import { Component, HostBinding, Input } from '@angular/core';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const CLASS_BY_SIZE: Record<Size, string> = {
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-3',
  lg: 'py-4',
  xl: 'py-5',
};

@Component({
  selector: 'app-spacer',
  standalone: true,
  imports: [],
  template: '',
  host: {
    class: 'block',
  },
})
export class SpacerComponent {
  @Input()
  size: Size = 'md';

  @HostBinding('class')
  get class() {
    return CLASS_BY_SIZE[this.size];
  }
}
