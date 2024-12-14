import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaDirective } from '../../directives/meta.directive';

@Component({
  imports: [RouterLink, MetaDirective],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
