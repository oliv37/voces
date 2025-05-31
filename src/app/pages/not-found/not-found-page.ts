import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta } from '@directives/meta';

@Component({
  imports: [RouterLink, Meta],
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
