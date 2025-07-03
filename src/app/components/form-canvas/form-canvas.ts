import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { FormBuilderService } from '../../services/form-builder';
import { EditableFormField } from '../../editable-form-field/editable-form-field';

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService);
}
