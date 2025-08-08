import { NgComponentOutlet } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { FieldType } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'

@Component({
  selector: 'app-preview-form-canvas',
  imports: [MatCardModule, NgComponentOutlet],
  templateUrl: './preview-form-canvas.html',
  styleUrl: './preview-form-canvas.scss',
})
export class PreviewFormCanvas {
  formBuilder = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  FieldType = FieldType

  form = computed<FormGroup>(() =>
    this.formFieldControlService.toFormGroup(this.formBuilder.formFieldsList()),
  )
}
