import { Component, inject } from '@angular/core';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { ArrowClockwiseIconComponent } from '../icon/arrow-clockwise-icon/arrow-clockwise-icon.component';
import { SwUpdate } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [Breadcrumb, ArrowClockwiseIconComponent],
})
export class Header {
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
