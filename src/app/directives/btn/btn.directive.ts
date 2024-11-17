import { computed, Directive, input } from '@angular/core';

type Type = 'primary' | 'secondary';
type Size = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Weight = 'none' | 'light' | 'normal' | 'bold';
type Border = 'none' | 'normal' | 'large';

@Directive({
  selector: '[appBtn]',
  standalone: true,
  host: {
    '[class]': 'class()',
  },
})
export class BtnDirective {
  appBtnTheme = input<Type>('primary');
  appBtnTextSize = input<Size>('xl');
  appBtnFontWeight = input<Weight>('normal');
  appBtnPadding = input<Size>('md');
  appBtnBorder = input<Border>('normal');

  class = computed<string>(() => {
    return [
      'flex justify-center items-center gap-1',
      'hover:opacity-80 disabled:opacity-40',
      CLASS_THEME[this.appBtnTheme()],
      CLASS_TEXT_SIZE[this.appBtnTextSize()],
      CLASS_FONT_WEIGHT[this.appBtnFontWeight()],
      CLASS_PADDING[this.appBtnPadding()],
      CLASS_BORDER[this.appBtnBorder()],
    ]
      .filter((s) => !!s)
      .join(' ');
  });
}

const CLASS_THEME: Record<Type, string> = {
  primary: 'bg-black text-white',
  secondary: 'bg-white text-black',
};

const CLASS_TEXT_SIZE: Record<Size, string> = {
  none: '',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const CLASS_PADDING: Record<Size, string> = {
  none: '',
  xs: 'px-1 py-0',
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
  xl: 'px-5 py-4',
};

const CLASS_FONT_WEIGHT: Record<Weight, string> = {
  none: '',
  light: 'font-light',
  normal: 'font-normal',
  bold: 'font-bold',
};

const CLASS_BORDER: Record<Border, string> = {
  none: '',
  normal: 'border border-black rounded-md',
  large: 'border-2 border-black rounded-md',
};
