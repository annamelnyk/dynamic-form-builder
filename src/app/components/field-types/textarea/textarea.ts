import { TitleCasePipe } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormFieldDefinitionValue, Mode } from '@model/form-fields'

@Component({
  selector: 'app-textarea',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
  placeholder = computed(() => `Enter ${this.formField().label}`)
  Mode = Mode
}
