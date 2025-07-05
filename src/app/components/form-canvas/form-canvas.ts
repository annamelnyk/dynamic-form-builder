import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { EditableFormField } from '@components/editable-form-field/editable-form-field';

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField, DragDropModule],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService);
}
