import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { FieldType } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-preview-form-canvas',
  imports: [MatCardModule],
  templateUrl: './preview-form-canvas.html',
  styleUrl: './preview-form-canvas.scss',
})
export class PreviewFormCanvas {
  formBuilder = inject(FormBuilderService)
  FieldType = FieldType
}
