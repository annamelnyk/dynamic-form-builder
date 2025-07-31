import { Component, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-plain-button',
  imports: [MatButtonModule],
  templateUrl: './plain-button.html',
  styleUrl: './plain-button.scss',
})
export class PlainButton {
  title = input.required<string>()
  position = input<'start' | 'center' | 'end'>('start')
  onButtonClick = output<Event>()

  buttonClasses = {
    position: this.position,
  }

  clickButton(e: Event) {
    this.onButtonClick.emit(e)
  }
}
