import { Type } from '@angular/core';

export enum FieldType {
  Text = 'text input',
  Textarea = 'textarea',
  Select = 'select',
  Checkbox = 'checkbox',
}

export interface FormFieldDefinition {
  icon: string;
  type: FieldType;
  label: string;
  component: Type<unknown> | null;
}

export interface FormFieldDefinitionValue extends FormFieldDefinition {
  id: string;
  required: boolean;
}
