import { Directive, input } from '@angular/core';

@Directive()
export abstract class Icon {
  readonly className = input('w-4 h-4 fill-current');
}
