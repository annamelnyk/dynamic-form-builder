import { Component, inject, input, output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'

import { ControlTool } from '@components/control-tool/control-tool'
import { FormFieldDefinition } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-toolbar',
  imports: [ControlTool, MatCardModule, MatGridListModule, DragDropModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  formBuilderService = inject(FormBuilderService)
  buildingTools = input<FormFieldDefinition[]>([])

  onSelectTool = output<FormFieldDefinition>()

  onSelectToolHandler(e: FormFieldDefinition) {
    this.onSelectTool.emit(e)
  }

  onFieldExit(event: CdkDragDrop<FormFieldDefinition[]>): FormFieldDefinition {
    console.log('exit', event)
    return this.buildingTools()[event.currentIndex]
  }
}
