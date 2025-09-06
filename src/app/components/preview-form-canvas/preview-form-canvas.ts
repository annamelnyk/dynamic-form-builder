import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { PlainButton } from '@components/plain-button/plain-button'
import { PreviewFormSubmitted } from '@components/preview-form-submitted/preview-form-submitted'
import { FieldType } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'

@Component({
  selector: 'app-preview-form-canvas',
  imports: [
    MatCardModule,
    NgComponentOutlet,
    PlainButton,
    ReactiveFormsModule,
    PreviewFormSubmitted,
  ],
  templateUrl: './preview-form-canvas.html',
  styleUrl: './preview-form-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewFormCanvas {
  formBuilder = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  FieldType = FieldType
  payload: Record<string, string | string[]> = {}
  isFormSubmitted = signal(false)

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
            const checkboxValues = [...(this.payload[payloadKey] as string[]), checkboxOptionValue]
            this.updatePayload(payloadKey, checkboxValues as string[])
          } else {
            this.updatePayload(payloadKey, [checkboxOptionValue])
          }
        }
      } else {
        this.updatePayload(payloadKey, value as string)
      }
    })
  }

  private updatePayload(payloadKey: string, value: string | string[]) {
    this.payload = {
      ...this.payload,
      [payloadKey]: value,
    }
  }

  onSubmit() {
    this.buildMainFormPayload()
    const payloadStringified = JSON.stringify(this.payload)
    this.isFormSubmitted.set(true)
    console.log('payload ', payloadStringified)
  }
}
