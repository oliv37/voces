import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBtn]',
  standalone: true,
})
export class BtnDirective {
  @Input()
  appBtnType: 'primary' | 'secondary' = 'primary';

  @Input()
  appBtnText: 'md' | 'xl' = 'md';

  @Input()
  appBtnFont: 'normal' | 'bold' = 'normal';

  @Input()
  appBtnPadding: 'none' | 'md' | 'lg' = 'md';

  @HostBinding('class')
  get class() {
    return (
      'border border-black rounded-md shadow-lg ' +
      'hover:opacity-80 disabled:opacity-40'
    );
  }

  @HostBinding('class.bg-black')
  @HostBinding('class.text-white')
  get isPrimary() {
    return this.appBtnType === 'primary';
  }

  @HostBinding('class.bg-white')
  @HostBinding('class.text-black')
  get isSecondary() {
    return this.appBtnType === 'secondary';
  }

  @HostBinding('class.text-md')
  get isTextMd() {
    return this.appBtnText === 'md';
  }

  @HostBinding('class.text-xl')
  get isTextXl() {
    return this.appBtnText === 'xl';
  }

  @HostBinding('class.font-normal')
  get isFontNormal() {
    return this.appBtnFont === 'normal';
  }

  @HostBinding('class.font-bold')
  get isFontBold() {
    return this.appBtnFont === 'bold';
  }

  @HostBinding('class.px-2')
  @HostBinding('class.py-1')
  get isPaddingMd() {
    return this.appBtnPadding === 'md';
  }

  @HostBinding('class.px-3')
  @HostBinding('class.py-2')
  get isPaddingLg() {
    return this.appBtnPadding === 'lg';
  }
}
