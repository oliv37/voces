import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {}
