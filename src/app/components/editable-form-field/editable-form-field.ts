import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldType, GeneratedFormFieldI } from '@model/form-fields';

import { FormBuilderService } from '@services/form-builder/form-builder';
import { FieldInput } from '@components/field-types/field-input/field-input';
import { Checkbox } from '@components/field-types/checkbox/checkbox';

@Component({
  selector: 'app-editable-form-field',
  imports: [
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    TitleCasePipe,
    MatCheckboxModule,
    FieldInput,
    Checkbox,
  ],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField implements OnInit {
  formBuilderService = inject(FormBuilderService);

  formField = input.required<GeneratedFormFieldI>();
  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);
  onMoveUp = output<Event>();
  onMoveDown = output<Event>();

  FieldType = FieldType;

  get id(): string {
    return this.formField().id;
  }

  ngOnInit(): void {}

  onTitleChange(e: Event) {}

  onClickMoveUp(e: Event) {
    this.onMoveUp.emit(e);
  }

  onClickMoveDown(e: Event) {
    this.onMoveDown.emit(e);
  }
}
