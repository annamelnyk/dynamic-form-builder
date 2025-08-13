import { Component, computed, inject, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Autofocus } from '@directives/autofocus'

import { FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'

@Component({
  selector: 'app-field-input',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, Autofocus],
  templateUrl: './field-input.html',
  styleUrl: './field-input.scss',
})
export class FieldInput {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
  placeholder = computed(() => `Enter ${this.formField().label}`)

  buildModeService = inject(BuildMode)
  Mode = Mode
}
