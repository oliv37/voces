import { Directive, Input } from '@angular/core';

@Directive()
export abstract class IconComponent {
  @Input()
  svgClass = 'w-4 h-4 fill-current';
}
