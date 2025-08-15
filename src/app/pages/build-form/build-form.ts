import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink, RouterOutlet } from '@angular/router'

import { MatButtonToggleModule } from '@angular/material/button-toggle'

@Component({
  selector: 'app-build-form',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatButtonToggleModule, ReactiveFormsModule],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  router = inject(Router)
}
