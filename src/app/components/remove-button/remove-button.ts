import { Component, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-remove-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './remove-button.html',
  styleUrl: './remove-button.scss',
})
export class RemoveButton {
  onFieldRemove = output<Event>()

  clickRemoveField(e: Event) {
    this.onFieldRemove.emit(e)
  }
}
