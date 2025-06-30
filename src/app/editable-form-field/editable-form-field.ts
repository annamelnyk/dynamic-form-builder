import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

export enum FieldType {
  Input = 'input',
  Textarea = 'textarea',
  Select = 'select',
  Checkbox = 'checkbox',
}
@Component({
  selector: 'app-editable-form-field',
  imports: [MatFormFieldModule, MatIcon, ReactiveFormsModule],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField {
  fieldType = input.required<FieldType>();
  //formField = input.required<FormControl>();

  title = computed(() => `New ${this.fieldType()} Field`);
  placeholder = computed(() => `Enter ${this.title()}`);
}
