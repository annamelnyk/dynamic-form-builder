import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { Toolbar } from '@components/toolbar/toolbar';
import { FormCanvas } from '@components/form-canvas/form-canvas';
import { FormFieldDefinition } from '@model/form-fields';
import { FieldTypesService } from '@services/field-types/field-types';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    DragDropModule,
  ],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  fieldTypesService = inject(FieldTypesService);
  formBuilderService = inject(FormBuilderService);

  addFormField(formField: FormFieldDefinition) {
    console.log({ formField });
    this.formBuilderService.addFormFieldToFromFieldDefinitionsList(formField);
  }
}
