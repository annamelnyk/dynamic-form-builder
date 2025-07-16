import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-build-form',
  imports: [RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {}
