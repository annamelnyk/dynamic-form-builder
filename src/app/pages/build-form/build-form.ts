import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormBuilderI, FormBuilderService } from '../../services/form-builder';
import { Toolbar } from '../../components/toolbar/toolbar';
import {
  EditableFormField,
  FieldType,
} from '../../editable-form-field/editable-form-field';

@Component({
  selector: 'app-build-form',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    Toolbar,
    EditableFormField,
  ],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  formBuilderService = inject(FormBuilderService);
  FieldType = FieldType;

  addFormField(formFieldType: FormBuilderI) {
    console.log({ formFieldType });
    this.formBuilderService.addNewFormField({
      type: formFieldType.name,
      label: '',
    });
  }
}
