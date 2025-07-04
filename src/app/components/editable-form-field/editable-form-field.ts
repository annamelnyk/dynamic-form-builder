import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import {
  FormBuilderService,
  GeneratedFormFieldI,
} from '@services/form-builder/form-builder';

export enum FieldType {
  Input = 'Text Input',
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
export class EditableFormField implements OnInit {
  formBuilderService = inject(FormBuilderService);

  formField = input.required<GeneratedFormFieldI>();

  //label = new FormControl(this.formField().label);

  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);

  title = computed(
    () => this.formField().label || `New ${this.formField().type} Field`
  );
  placeholder = computed(() => `Enter ${this.title()}`);

  get id(): string {
    return this.formField().id;
  }

  ngOnInit(): void {}

  onTitleChange(e: Event) {}
}
