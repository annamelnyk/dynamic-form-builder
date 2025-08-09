import { Component } from '@angular/core'

import { FormModeSwitcher } from '@components/form-mode-switcher/form-mode-switcher'
import { PreviewFormCanvas } from '@components/preview-form-canvas/preview-form-canvas'

@Component({
  selector: 'app-preview-form',
  imports: [FormModeSwitcher, PreviewFormCanvas],
  templateUrl: './preview-form.html',
  styleUrl: './preview-form.scss',
})
export class PreviewForm {}
