import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Dynamic Form Builder';
}
