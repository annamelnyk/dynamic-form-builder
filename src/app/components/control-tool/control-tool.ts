import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilderI } from '../../services/form-builder';

@Component({
  selector: 'app-control-tool',
  imports: [MatCardModule, MatIconModule, TitleCasePipe],
  templateUrl: './control-tool.html',
  styleUrl: './control-tool.scss',
})
export class ControlTool {
  tool = input.required<FormBuilderI>();
  onToolClick = output<FormBuilderI>();

  onToolClickHandler(e: FormBuilderI) {
    this.onToolClick.emit(e);
  }
}
