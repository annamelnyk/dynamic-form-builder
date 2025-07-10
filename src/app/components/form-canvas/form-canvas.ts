import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { EditableFormField } from '@components/editable-form-field/editable-form-field';
import { FormFieldDefinition } from '@model/form-fields';
import { FieldTypesService } from '@services/field-types/field-types';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField, DragDropModule],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService);
  fieldTypesService = inject(FieldTypesService);

  onFieldTypeDropped(event: CdkDragDrop<any[]>) {
    // console.log('dropped', event.previousContainer.data);
    console.log('dropped', event);
    // console.log('dropped', event.item.data);
    // console.log('dropped index', event.currentIndex);

    this.formBuilderService.addFormFieldToFromFieldDefinitionsList(
      event.item.data,
      event.currentIndex
    );
  }

  moveFieldPosition(fromIndex: number, toIndex: number) {
    console.log('clicked!');
    this.formBuilderService.moveFromFieldDefinitionPosition(fromIndex, toIndex);
  }
}
