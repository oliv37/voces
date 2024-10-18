import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '@models/group.model';
import { CompletionAge } from '@models/completion.model';
import { CompletionService } from '@services/completion.service';
import { Category } from '@models/category.model';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {
  private _completionService = inject(CompletionService);

  category = input.required<Category>();

  groups = computed<GroupWithCompletionAge[]>(() => {
    return this.category().groups.map((group) => ({
      ...group,
      completionAge: this._completionService.getCompletionAge(group),
    }));
  });

  getHeaderClass(completionAge: CompletionAge) {
    return HEADER_CLASS_BY_COMPLETION_AGE[completionAge];
  }
}

const HEADER_CLASS_BY_COMPLETION_AGE: Record<CompletionAge, string> = {
  ['LESS_THAN_THREE_DAYS']: 'bg-black text-white bg-opacity-100',
  ['LESS_THAN_SIX_DAYS']: 'bg-black text-white bg-opacity-60',
  ['LONG_TIME_AGO_OR_NEVER']: '',
};

type GroupWithCompletionAge = Group & {
  completionAge: CompletionAge;
};
