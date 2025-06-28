import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormBuilderI, FormBuilderService } from '../../services/form-builder';
import { Toolbar } from '../../components/toolbar/toolbar';

@Component({
  selector: 'app-build-form',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    Toolbar,
  ],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  formBuilderService = inject(FormBuilderService);

  addFormField(formFieldType: FormBuilderI) {
    console.log({ formFieldType });
  }
}
