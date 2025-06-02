import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import type { Group } from '@models/group';
import { findNextGroups } from '@utils/group';
import { ScrollInfo } from '@services/scroll-info';
import { ExerciceLink } from '@components/exercice/exercice-link/exercice-link';

const NB_GROUPS_TO_LOAD = 10;

@Component({
  selector: 'app-exercice-next-links',
  imports: [ExerciceLink],
  templateUrl: './exercice-next-links.html',
  providers: [ScrollInfo],
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class ExerciceNextLinks {
  private _scrollInfo = inject(ScrollInfo);

  group = input.required<Group>();

  state = linkedSignal<{ nextGroups: Group[]; hasNext: boolean }>(() => {
    const fromGroup = this.group();
    const nextGroups = findNextGroups(fromGroup, NB_GROUPS_TO_LOAD);

    return {
      nextGroups,
      hasNext: nextGroups.length === NB_GROUPS_TO_LOAD,
    };
  });
  nextGroups = computed<Group[][]>(() =>
    this.state().nextGroups.reduce((acc, group) => {
      const lastGroup = acc[acc.length - 1];
      if (lastGroup?.length && lastGroup[0].category.id === group.category.id) {
        lastGroup.push(group);
      } else {
        acc.push([group]);
      }

      return acc;
    }, [] as Group[][])
  );

  onScroll() {
    const { nextGroups, hasNext } = this.state();
    const { isScrollingDown, isNearBottom } = this._scrollInfo.compute();

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
