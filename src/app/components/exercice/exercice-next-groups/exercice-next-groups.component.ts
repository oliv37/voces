import { Component, inject, input, linkedSignal } from '@angular/core';
import { ExerciceGroupLinkComponent } from '../exercice-group-link/exercice-group-link.component';
import { Group } from '@models/group.model';
import { findNextGroups } from '@utils/group.util';
import { ScrollInfoService } from '@services/scroll-info.service';

const NB_GROUPS_TO_LOAD = 10;

@Component({
  selector: 'app-exercice-next-groups',
  imports: [ExerciceGroupLinkComponent],
  templateUrl: './exercice-next-groups.component.html',
  providers: [ScrollInfoService],
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class ExerciceNextGroupsComponent {
  private _scrollInfoService = inject(ScrollInfoService);

  group = input.required<Group>();

  nextGroupsState = linkedSignal<{ nextGroups: Group[]; hasNext: boolean }>(
    () => {
      const fromGroup = this.group();
      const nextGroups = findNextGroups(fromGroup, NB_GROUPS_TO_LOAD);

      return {
        nextGroups,
        hasNext: nextGroups.length === NB_GROUPS_TO_LOAD,
      };
    }
  );

  onScroll() {
    const { nextGroups, hasNext } = this.nextGroupsState();
    const { isScrollingDown, isNearBottom } = this._scrollInfoService.compute();

    const shouldLoadMoreNextGroups = hasNext && isScrollingDown && isNearBottom;

    if (shouldLoadMoreNextGroups) {
      const fromLastGroup = nextGroups[nextGroups.length - 1];
      const nextGroupsToAdd = findNextGroups(fromLastGroup, NB_GROUPS_TO_LOAD);

      this.nextGroupsState.set({
        nextGroups: [...nextGroups, ...nextGroupsToAdd],
        hasNext: nextGroupsToAdd.length === NB_GROUPS_TO_LOAD,
      });
    }
  }
}
