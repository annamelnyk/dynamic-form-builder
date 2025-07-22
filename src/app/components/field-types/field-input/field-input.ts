import { TitleCasePipe } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { FormFieldDefinitionValue, Mode } from '@model/form-fields'

@Component({
  selector: 'app-field-input',
  imports: [MatInputModule, MatFormFieldModule, TitleCasePipe, ReactiveFormsModule],
  templateUrl: './field-input.html',
  styleUrl: './field-input.scss',
})
export class FieldInput {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()

  placeholder = computed(() => `Enter ${this.formField().label}`)
  Mode = Mode
}
