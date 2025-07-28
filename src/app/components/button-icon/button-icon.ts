import { Component, input, output, Type } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

export enum Icon {
  Delete = 'delete_forever',
  ArrowUp = 'arrow_upward_alt',
  ArrowDown = 'arrow_downward_alt',
}

@Component({
  selector: 'app-button-icon',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './button-icon.html',
  styleUrl: './button-icon.scss',
})
export class ButtonIcon {
  iconType = input.required<Icon>()
  disabled = input<boolean>(false)
  onButtonClick = output<Event>()

  buttonClick(e: Event) {
    this.onButtonClick.emit(e)
  }
}
