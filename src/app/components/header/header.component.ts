import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ArrowClockwiseIconComponent } from '../icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { SwUpdate } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [BreadcrumbComponent, ArrowClockwiseIconComponent],
})
export class HeaderComponent {
  hasNewVersionAvailable = toSignal(
    inject(SwUpdate).versionUpdates.pipe(
      filter((evt) => evt.type === 'VERSION_READY'),
      map(() => true)
    ),
    { initialValue: false }
  );

  reloadPage() {
    document.location.reload();
  }
}
