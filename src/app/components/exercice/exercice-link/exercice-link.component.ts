import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Group } from '@models/group';
import { GroupCompletion } from '@services/group-completion';

@Component({
  selector: 'app-exercice-link',
  templateUrl: './exercice-link.component.html',
  imports: [RouterLink],
})
export class ExerciceLinkComponent {
  private _groupCompletion = inject(GroupCompletion);

  group = input.required<Group>();

  isGroupCompleted = computed<boolean>(() =>
    this._groupCompletion.isCompleted(this.group())
  );
}
