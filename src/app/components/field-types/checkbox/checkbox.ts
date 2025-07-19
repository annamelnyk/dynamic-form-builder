import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormFieldDefinitionValue } from '@model/form-fields';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  formField = input.required<FormFieldDefinitionValue>();
}
