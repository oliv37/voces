import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRightCircleFillIconComponent } from '@components/icon/arrow-right-circle-fill/arrow-right-circle-fill-icon.component';
import { Group } from '@models/group.model';

@Component({
  selector: 'app-exercice-group-link',
  imports: [ArrowRightCircleFillIconComponent, RouterLink],
  templateUrl: './exercice-group-link.component.html',
})
export class ExerciceGroupLinkComponent {
  group = input.required<Group>();
}
