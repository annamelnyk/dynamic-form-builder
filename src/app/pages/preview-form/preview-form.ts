import { Component } from '@angular/core'
import { FormModeSwitcher } from '@components/form-mode-switcher/form-mode-switcher'
import { FieldInput } from '@components/field-types/field-input/field-input'
import { FormCanvas } from '@components/form-canvas/form-canvas'
import { PlainButton } from '@components/plain-button/plain-button'

@Component({
  selector: 'app-preview-form',
  imports: [FormModeSwitcher, FormCanvas],
  templateUrl: './preview-form.html',
  styleUrl: './preview-form.scss',
})
export class PreviewForm {}
