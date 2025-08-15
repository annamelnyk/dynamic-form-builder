import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'

import { ControlTool } from '@components/control-tool/control-tool'
import { FormFieldDefinition } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-toolbar',
  imports: [ControlTool, MatCardModule, MatGridListModule, DragDropModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {
  formBuilderService = inject(FormBuilderService)
  buildingTools = input<FormFieldDefinition[]>([])

  onSelectTool = output<FormFieldDefinition>()

  onSelectToolHandler(e: FormFieldDefinition) {
    this.onSelectTool.emit(e)
  }

  onFieldExit(event: CdkDragDrop<FormFieldDefinition[]>): FormFieldDefinition {
    return this.buildingTools()[event.currentIndex]
  }
}
