import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { ControlTool } from '../control-tool/control-tool';
import { FormBuilderI } from '../../services/form-builder';

@Component({
  selector: 'app-toolbar',
  imports: [ControlTool, MatCardModule, MatGridListModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  buildingTools = input<FormBuilderI[]>([]);

  onSelectTool = output<FormBuilderI>();

  onSelectToolHandler(e: FormBuilderI) {
    this.onSelectTool.emit(e);
  }
}
