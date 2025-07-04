import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { ControlTool } from '@components/control-tool/control-tool';
import { FormFieldDefinition } from '@model/form-fields';

@Component({
  selector: 'app-toolbar',
  imports: [ControlTool, MatCardModule, MatGridListModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  buildingTools = input<FormFieldDefinition[]>([]);

  onSelectTool = output<FormFieldDefinition>();

  onSelectToolHandler(e: FormFieldDefinition) {
    this.onSelectTool.emit(e);
  }
}
