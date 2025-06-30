import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-editable-form-field',
  imports: [MatFormFieldModule, MatIcon],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField {}
