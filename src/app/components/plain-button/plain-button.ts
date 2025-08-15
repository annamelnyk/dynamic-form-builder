import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-plain-button',
  imports: [MatButtonModule],
  templateUrl: './plain-button.html',
  styleUrl: './plain-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainButton {
  title = input.required<string>()
  disabled = input<boolean>(false)
  onButtonClick = output<Event>()

  clickButton(e: Event) {
    this.onButtonClick.emit(e)
  }
}
