import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
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
export class EditableFormField implements OnInit {
  formBuilderService = inject(FormBuilderService);

  formField = input.required<GeneratedFormFieldI>();

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

  onTitleChange(e: Event) {
    const value = (e.target as HTMLElement).innerText;
    console.log('Changed value:', value);
    this.formBuilderService.generatedFormFiledsList.update((prevValue) => {
      const updatedFormField = {
        ...this.formField(),
        label: value,
      };

      return prevValue.map((value) =>
        value.id === this.formField().id ? updatedFormField : value
      );
    });
  }
}
