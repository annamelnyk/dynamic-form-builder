import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilderService } from '@services/form-builder/form-builder';

@Component({
  selector: 'app-build-form',
  imports: [RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  router = inject(Router);
  formBuilderService = inject(FormBuilderService);

  activateFormBuilder() {
    this.formBuilderService.formBuilderActivated.set(true);

    this.router.navigate(['/edit']);
  }
}
