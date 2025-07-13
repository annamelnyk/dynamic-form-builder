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
import { FormFieldDefinition, GeneratedFormFieldI } from '@model/form-fields';

import { FormBuilderService } from '@services/form-builder/form-builder';

@Component({
  selector: 'app-editable-form-field',
  imports: [MatFormFieldModule, MatIcon, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField implements OnInit {
  formBuilderService = inject(FormBuilderService);

  formField = input.required<GeneratedFormFieldI>();

  onMoveUp = output<Event>();
  onMoveDown = output<Event>();

  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);

  placeholder = computed(() => `Enter ${this.formField().label}`);

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

  removeFieldHandler() {
    this.formBuilderService.removeFormFieldDefinition(this.formField().id);
  }
}
