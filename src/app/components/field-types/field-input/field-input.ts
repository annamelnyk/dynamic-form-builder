import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormFieldDefinitionValue, Mode } from '@model/form-fields';

@Component({
  selector: 'app-field-input',
  imports: [MatInputModule, MatFormFieldModule, TitleCasePipe],
  templateUrl: './field-input.html',
  styleUrl: './field-input.scss',
})
export class FieldInput {
  formField = input.required<FormFieldDefinitionValue>();

  placeholder = computed(() => `Enter ${this.formField().label}`);
  Mode = Mode;
}
