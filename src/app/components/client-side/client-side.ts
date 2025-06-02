import { Component } from '@angular/core';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.html',
})
export class ClientSide {
  isWindowDefined = typeof window !== 'undefined';
}
