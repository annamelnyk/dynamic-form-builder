import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatGridListModule } from '@angular/material/grid-list'

import { Header } from '@components/header/header'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatGridListModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
