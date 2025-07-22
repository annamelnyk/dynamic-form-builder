import { Component, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormFieldDefinitionValue } from '@model/form-fields'

@Component({
  selector: 'app-select',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
}
