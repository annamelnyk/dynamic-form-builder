import { Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GeneratedFormFieldI } from '@model/form-fields';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  formField = input.required<GeneratedFormFieldI>();
}
