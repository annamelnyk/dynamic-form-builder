import { Component, computed, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

import { EditableFormField } from '@components/editable-form-field/editable-form-field';
import { FieldTypesService } from '@services/field-types/field-types';
import { FormBuilderService } from '@services/form-builder/form-builder';
import { FormFieldControl } from '@services/form-field-control/form-field-control';

@Component({
  selector: 'app-form-canvas',
  imports: [
    MatCardModule,
    EditableFormField,
    DragDropModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService);
  fieldTypesService = inject(FieldTypesService);
  formFieldControlService = inject(FormFieldControl);

  form = computed<FormGroup>(() =>
    this.formFieldControlService.toFromGroup(
      this.formBuilderService.formFieldsList()
    )
  );

  payload = '';

  onFieldTypeDropped(event: CdkDragDrop<any[]>) {
    console.log('dropped', event);

    this.formBuilderService.addFormFieldToFromFieldDefinitionsList(
      event.item.data,
      event.currentIndex
    );
  }

  moveFieldPosition(fromIndex: number, toIndex: number) {
    console.log('clicked!');
    this.formBuilderService.moveFromFieldDefinitionPosition(fromIndex, toIndex);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form().getRawValue());
  }
}
