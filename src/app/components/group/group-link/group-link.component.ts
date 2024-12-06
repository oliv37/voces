import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeftCircleFillIconComponent } from '@components/icon/arrow-left-circle-fill/arrow-left-circle-fill-icon.component';
import { ArrowRightCircleFillIconComponent } from '@components/icon/arrow-right-circle-fill/arrow-right-circle-fill-icon.component';
import { Group } from '@models/group.model';

@Component({
  selector: 'app-group-link',
  imports: [
    ArrowLeftCircleFillIconComponent,
    ArrowRightCircleFillIconComponent,
    RouterLink,
  ],
  templateUrl: './group-link.component.html',
})
export class GroupLinkComponent {
  group = input.required<Group>();
  displayPreviousIcon = input(false, { transform: booleanAttribute });
  displayNextIcon = input(false, { transform: booleanAttribute });
}
