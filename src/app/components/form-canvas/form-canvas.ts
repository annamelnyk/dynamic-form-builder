import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { EditableFormField } from '@components/editable-form-field/editable-form-field';
import { FormFieldDefinition } from '@model/form-fields';
import { FieldTypesService } from '@services/field-types/field-types';

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField, DragDropModule],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService);
  fieldTypesService = inject(FieldTypesService);

  onFieldTypeDropped(event: CdkDragDrop<any>) {
    console.log('dropped', event);

    // this.formBuilderService.addNewFormField(
    //   this.formBuilderService.generateFormField(
    //     this.buildingTools()[event.currentIndex]
    //   )
    // );
  }
}
