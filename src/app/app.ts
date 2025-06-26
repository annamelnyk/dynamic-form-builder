import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { BuildForm } from './components/build-form/build-form';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, BuildForm, MatGridListModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
