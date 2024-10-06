import { booleanAttribute, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBtn]',
  standalone: true,
  host: {
    class:
      'border border-black rounded-md shadow-lg hover:opacity-80 disabled:opacity-40',
  },
})
export class BtnDirective {
  @HostBinding('class.text-xl')
  @Input({ transform: booleanAttribute })
  btnTextXl = true;

  @HostBinding('class.font-bold')
  @Input({ transform: booleanAttribute })
  btnFontBold = true;

  @HostBinding('class.px-2')
  @HostBinding('class.py-1')
  @Input({ transform: booleanAttribute })
  btnPadding = true;

  @HostBinding('class.bg-black')
  @HostBinding('class.text-white')
  @Input({ transform: booleanAttribute })
  btnInverse = false;
}
