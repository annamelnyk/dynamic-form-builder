import { Component, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { FormFieldDefinitionValue } from '@model/form-fields'

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
}
