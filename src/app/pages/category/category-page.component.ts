import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '@models/group.model';
import { GroupCompletionService } from '@services/group-completion.service';
import { Category } from '@models/category.model';
import { MetaDirective } from '../../directives/meta.directive';
import { fadeIn } from '@animations/fade-in.animation';

@Component({
  imports: [RouterLink, MetaDirective],
  templateUrl: './category-page.component.html',
  animations: [fadeIn('a', '50ms', '0.4s')],
})
export class CategoryPageComponent {
  private _groupCompletionService = inject(GroupCompletionService);

  category = input.required<Category>();

  metaDescription = computed<string>(
    () => `Vocabulaire Espagnol ${this.category().label}`
  );

  groups = computed<GroupCompleted[]>(() => {
    return this.category().groups.map((group) => ({
      ...group,
      completed: this._groupCompletionService.isCompleted(group),
    }));
  });

  getHeaderClass(completed: boolean) {
    if (!completed) {
      return '';
    }

    const bgColor = this.category().color.bgColor;
    return `${bgColor} text-white`;
  }
}

type GroupCompleted = Group & {
  completed: boolean;
};
