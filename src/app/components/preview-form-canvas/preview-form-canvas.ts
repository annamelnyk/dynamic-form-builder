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
  payload: Record<string, unknown> = {}

  constructor() {
    this.formBuilder.updateBuilderListForPreview()
  }

  form = linkedSignal<FormGroup>(() =>
    this.formFieldControlService.toFormGroup(this.formBuilder.formFieldsList()),
  )

  buildMainFormPayload() {
    const formFieldKeys = Object.entries(this.form().value)

    formFieldKeys.forEach(([key, value]) => {
      const formField = this.formBuilder.formFieldsList().find(f => key.includes(f.id))

      if (!formField) return
      const payloadKey = formField.label || formField.id

      if (formField?.type === FieldType.Checkbox) {
        const optionIndex = Number(key.split('').pop())
        const checkboxOptionValue: string | null = formField.options?.[optionIndex] ?? null

        if (value && checkboxOptionValue) {
          if (this.payload.hasOwnProperty(payloadKey)) {
            this.payload = {
              ...this.payload,
              [payloadKey]: [...(this.payload[payloadKey] as string[]), checkboxOptionValue],
            }
          } else {
            this.payload = {
              ...this.payload,
              [payloadKey]: [checkboxOptionValue],
            }
          }
        }
      } else {
        this.payload = {
          ...this.payload,
          [payloadKey]: value,
        }
      }
    })
  }

  onSubmit() {
    this.buildMainFormPayload()
    const payloadStringified = JSON.stringify(this.payload)
    console.log('payload ', payloadStringified)
  }
}
