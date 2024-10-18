import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BtnDirective } from '@directives/btn/btn.directive';
import { Group } from '@models/group.model';

@Component({
  standalone: true,
  imports: [RouterLink, BtnDirective],
  templateUrl: './group-page.component.html',
  host: {
    tabIndex: '-1',
    class: 'outline-none',
  },
})
export class GroupPageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  elementRef = inject(ElementRef);

  group = input.required<Group>();

  constructor() {
    afterNextRender(() => this.elementRef.nativeElement.focus());
  }

  @HostListener('keydown.Enter')
  handleKeyboardEvent() {
    this.router.navigate(['exercice'], { relativeTo: this.route });
  }
}
