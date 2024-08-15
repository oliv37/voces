import { afterNextRender, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-side',
  standalone: true,
  templateUrl: './client-side.component.html',
})
export class ClientSideComponent {
  render = typeof window !== 'undefined';
}
