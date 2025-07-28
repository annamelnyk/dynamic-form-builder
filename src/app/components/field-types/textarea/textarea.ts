import { Component, computed, inject, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'

@Component({
  selector: 'app-textarea',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
  placeholder = computed(() => `Enter ${this.formField().label}`)

  buildModeService = inject(BuildMode)
  Mode = Mode
}
