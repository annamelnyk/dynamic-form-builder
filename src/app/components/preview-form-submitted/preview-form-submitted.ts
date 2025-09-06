import { JsonPipe, KeyValuePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { IsArrayPipe } from '@pipes/is-array-pipe'
import { SemicolonPipe } from '@pipes/semicolon-pipe'

@Component({
  selector: 'app-preview-form-submitted',
  imports: [MatCardModule, KeyValuePipe, IsArrayPipe, SemicolonPipe],
  templateUrl: './preview-form-submitted.html',
  styleUrl: './preview-form-submitted.scss',
})
export class PreviewFormSubmitted {
  payload = input.required<Record<string, string | string[]>>()
}
