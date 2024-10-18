import { Component, effect, inject, input, untracked } from '@angular/core';
import { ClientSideComponent } from '@components/client-side/client-side.component';
import { ExerciceService } from '@services/exercice.service';
import { ExerciceHeaderComponent } from '@components/exercice/exercice-header/exercice-header.component';
import { Category } from '@models/category.model';
import { Group } from '@models/group.model';
import { ExerciceStepPreviewComponent } from '@components/exercice/exercice-step-preview/exercice-step-preview.component';
import { ExerciceStepFormComponent } from '@components/exercice/exercice-step-form/exercice-step-form.component';

@Component({
  standalone: true,
  imports: [
    ClientSideComponent,
    ExerciceHeaderComponent,
    ExerciceStepPreviewComponent,
    ExerciceStepFormComponent,
  ],
  templateUrl: './exercice-page.component.html',
  providers: [ExerciceService],
  host: {
    tabIndex: '-1',
  },
})
export class ExercicePageComponent {
  exerciceService = inject(ExerciceService);

  category = input.required<Category>();
  group = input.required<Group>();

  constructor() {
    effect(() => {
      const category = this.category();
      const group = this.group();
      // signals used inside reinit method must not be tracked
      untracked(() => this.exerciceService.reinit(category, group));
    });
  }
}
