import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { Group } from '@models/group.model';
import { findNextGroups } from '@utils/group.util';
import { ScrollInfoService } from '@services/scroll-info.service';
import { ExerciceLinkComponent } from '../exercice-link/exercice-link.component';

const NB_GROUPS_TO_LOAD = 10;

@Component({
  selector: 'app-exercice-next-links',
  imports: [ExerciceLinkComponent],
  templateUrl: './exercice-next-links.component.html',
  providers: [ScrollInfoService],
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class ExerciceNextLinksComponent {
  private _scrollInfoService = inject(ScrollInfoService);

  group = input.required<Group>();

  state = linkedSignal<{ nextGroups: Group[]; hasNext: boolean }>(() => {
    const fromGroup = this.group();
    const nextGroups = findNextGroups(fromGroup, NB_GROUPS_TO_LOAD);

    return {
      nextGroups,
      hasNext: nextGroups.length === NB_GROUPS_TO_LOAD,
    };
  });
  nextGroups = computed(() => this.state().nextGroups);

  onScroll() {
    const { nextGroups, hasNext } = this.state();
    const { isScrollingDown, isNearBottom } = this._scrollInfoService.compute();

    const shouldLoadMoreNextGroups = hasNext && isScrollingDown && isNearBottom;

    if (shouldLoadMoreNextGroups) {
      const fromLastGroup = nextGroups[nextGroups.length - 1];
      const nextGroupsToAdd = findNextGroups(fromLastGroup, NB_GROUPS_TO_LOAD);

      this.state.set({
        nextGroups: [...nextGroups, ...nextGroupsToAdd],
        hasNext: nextGroupsToAdd.length === NB_GROUPS_TO_LOAD,
      });
    }
  }
}
