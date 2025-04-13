import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Group } from '@models/group.model';
import { GroupCompletionService } from '@services/group-completion.service';

@Component({
  selector: 'app-exercice-link',
  templateUrl: './exercice-link.component.html',
  imports: [RouterLink],
})
export class ExerciceLinkComponent {
  private _groupCompletionService = inject(GroupCompletionService);

  group = input.required<Group>();
  showCategoryLabel = input(false, {
    transform: booleanAttribute,
  });
  isCompleted = computed<boolean>(() =>
    this._groupCompletionService.isCompleted(this.group())
  );
  headerClass = computed<string>(() =>
    this.isCompleted()
      ? `${this.group().category.color.bgColor} text-white`
      : ''
  );
}
