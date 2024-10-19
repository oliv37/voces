import { Directive, Input } from '@angular/core';

@Directive()
export abstract class SvgComponent {
  @Input()
  svgClass = 'w-4 h-4 fill-current';
}
