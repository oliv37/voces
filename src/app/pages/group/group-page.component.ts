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
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';

@Component({
  standalone: true,
  imports: [RouterLink, BtnDirective, SpacerComponent],
  templateUrl: './group-page.component.html',
})
export class GroupPageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  elementRef = inject(ElementRef);

  group = input.required<Group>();

  constructor() {
    afterNextRender(() => this.elementRef.nativeElement.focus());
  }

  @HostListener('window:keydown.enter', ['$event'])
  @IgnoreTarget('button', 'a')
  handleKeyboardEvent() {
    this.router.navigate(['exercice'], { relativeTo: this.route });
  }
}
