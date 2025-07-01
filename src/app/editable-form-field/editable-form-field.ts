import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';

export enum FieldType {
  Input = 'Input',
  Textarea = 'Textarea',
  Select = 'Select',
  Checkbox = 'Checkbox',
}
@Component({
  selector: 'app-editable-form-field',
  imports: [MatFormFieldModule, MatIcon, ReactiveFormsModule],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField {
  uniqueID = uuidv4();
  fieldType = input.required<FieldType>();
  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);

  title = computed(() => `New ${this.fieldType()} Field`);
  placeholder = computed(() => `Enter ${this.title()}`);
}
