import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilderI,
  FormBuilderService,
  GeneratedFormFieldI,
} from '../services/form-builder';

export enum FieldType {
  Input = 'Input',
  Textarea = 'Textarea',
  Select = 'Select',
  Checkbox = 'Checkbox',
}
@Component({
  selector: 'app-editable-form-field',
  imports: [MatFormFieldModule, MatIcon, ReactiveFormsModule],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField {
  formBuilderService = inject(FormBuilderService);

  formFieldId = input.required<string>();
  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);

  formField = computed<GeneratedFormFieldI>(
    () =>
      this.formBuilderService
        .generatedFormFiledsList()
        .find((f) => f.id === this.formFieldId()) as GeneratedFormFieldI
  );

  title = computed(
    () => this.formField().label || `New ${this.formField().type} Field`
  );
  placeholder = computed(() => `Enter ${this.title()}`);

  get id(): string {
    return this.formField().id;
  }
}
