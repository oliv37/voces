import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeftCircleFillIconComponent } from '@components/icon/arrow-left-circle-fill/arrow-left-circle-fill-icon.component';
import { ArrowRightCircleFillIconComponent } from '@components/icon/arrow-right-circle-fill/arrow-right-circle-fill-icon.component';
import { Group } from '@models/group.model';

@Component({
  selector: 'app-exercice-group-link',
  imports: [
    ArrowLeftCircleFillIconComponent,
    ArrowRightCircleFillIconComponent,
    RouterLink,
  ],
  templateUrl: './exercice-group-link.component.html',
})
export class ExerciceGroupLinkComponent {
  group = input.required<Group>();
  displayPreviousIcon = input(false, { transform: booleanAttribute });
  displayNextIcon = input(false, { transform: booleanAttribute });
}
