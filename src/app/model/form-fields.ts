import { Type } from '@angular/core';

export enum Mode {
  Edit = 'edit',
  Preview = 'preview',
}

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
  value?: string;
  component: Type<unknown>;
}

export interface FormFieldSelectOption {
  option: string;
  selected: boolean;
}

export interface FormFieldSelect extends FormFieldDefinition {
  options?: FormFieldSelectOption[];
}

export interface FormFieldDefinitionValue
  extends FormFieldDefinition,
    FormFieldSelect {
  id: string;
  required: boolean;
  mode: Mode; //TODO: get rid
}
