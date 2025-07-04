import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidv4 } from 'uuid';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { Toolbar } from '@components/toolbar/toolbar';
import { FormCanvas } from '@components/form-canvas/form-canvas';
import { FieldType, FormFieldDefinition } from '@model/form-fields';
import { FieldTypesService } from '@services/field-types/field-types';

@Component({
  selector: 'app-build-form',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    Toolbar,
    FormCanvas,
  ],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  fieldTypesService = inject(FieldTypesService);
  formBuilderService = inject(FormBuilderService);
  FieldType = FieldType;

  addFormField(formFieldType: FormFieldDefinition) {
    console.log({ formFieldType });
    this.formBuilderService.addNewFormField({
      id: uuidv4(),
      type: formFieldType.name,
      label: '',
    });
  }
}
