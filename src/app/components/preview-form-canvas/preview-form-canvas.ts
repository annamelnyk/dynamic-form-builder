import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { PlainButton } from '@components/plain-button/plain-button'
import { FieldType } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'

@Component({
  selector: 'app-preview-form-canvas',
  imports: [MatCardModule, NgComponentOutlet, PlainButton, ReactiveFormsModule],
  templateUrl: './preview-form-canvas.html',
  styleUrl: './preview-form-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewFormCanvas {
  formBuilder = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  FieldType = FieldType
  payload = ''

  constructor() {
    this.formBuilder.updateBuilderListForPreview()
  }

  form = linkedSignal<FormGroup>(() =>
    this.formFieldControlService.toFormGroup(this.formBuilder.formFieldsList()),
  )

  onSubmit() {
    this.payload = JSON.stringify(this.form().getRawValue())
    console.log('payload ', this.payload)
    console.log('form from service ', this.formBuilder.formFieldsList())
  }
}
