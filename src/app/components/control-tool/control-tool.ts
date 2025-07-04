import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldDefinition } from '@model/form-fields';

@Component({
  selector: 'app-control-tool',
  imports: [MatCardModule, MatIconModule, TitleCasePipe],
  templateUrl: './control-tool.html',
  styleUrl: './control-tool.scss',
})
export class ControlTool {
  tool = input.required<FormFieldDefinition>();
  onToolClick = output<FormFieldDefinition>();

  onToolClickHandler(e: FormFieldDefinition) {
    this.onToolClick.emit(e);
  }
}
