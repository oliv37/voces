import { Component, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Breadcrumb } from '@components/breadcrumb/breadcrumb';
import { ArrowClockwiseIcon } from '@components/icon/arrow-clockwise-icon/arrow-clockwise-icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [Breadcrumb, ArrowClockwiseIcon],
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
