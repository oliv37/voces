import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '@models/group.model';
import { GroupCompletionService } from '@services/group-completion.service';
import { Category } from '@models/category.model';
import { CompletionStatus } from '@models/group-completion.model';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  imports: [RouterLink, MetaDirective],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
  private _groupCompletionService = inject(GroupCompletionService);

  category = input.required<Category>();

  metaDescription = computed<string>(
    () => `Vocabulaire Espagnol ${this.category().label}`
  );

  groups = computed<GroupWithCompletionStatus[]>(() => {
    return this.category().groups.map((group) => ({
      ...group,
      completionStatus: this._groupCompletionService.getCompletionStatus(group),
    }));
  });

  getHeaderClass(completionStatus: CompletionStatus) {
    const bgColor = this.category().color.bgColor;
    return HEADER_CLASS[completionStatus](bgColor);
  }
}

const HEADER_CLASS: Record<CompletionStatus, (bgColor: string) => string> = {
  ['RECENT']: (bgColor) => `${bgColor} text-white`,
  ['OLD']: (bgColor) => `${bgColor} text-white opacity-70`,
  ['NEVER']: () => '',
};

type GroupWithCompletionStatus = Group & {
  completionStatus: CompletionStatus;
};
