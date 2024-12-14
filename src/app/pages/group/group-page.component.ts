import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BtnDirective } from '@directives/btn.directive';
import { Group } from '@models/group.model';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { IgnoreTarget } from '@decorators/ignore-event-target.decorator';
import { WordsGridComponent } from '../../components/words-grid/words-grid.component';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  imports: [
    RouterLink,
    BtnDirective,
    SpacerComponent,
    WordsGridComponent,
    MetaDirective,
  ],
  templateUrl: './group-page.component.html',
})
export class GroupPageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  elementRef = inject(ElementRef);

  group = input.required<Group>();

  metaDescription = computed<string>(() => {
    const group = this.group();
    return `Vocabulaire Espagnol ${group.category.label} Groupe ${group.label}`;
  });

  constructor() {
    afterNextRender(() => this.elementRef.nativeElement.focus());
  }

  @HostListener('window:keydown.enter', ['$event'])
  @IgnoreTarget('button', 'a')
  handleKeyboardEvent() {
    this.router.navigate(['exercice'], { relativeTo: this.route });
  }
}
