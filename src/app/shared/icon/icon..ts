import { Directive, Input } from '@angular/core';

@Directive()
export abstract class Icon {
  @Input()
  className = 'w-4 h-4 fill-current';
}
