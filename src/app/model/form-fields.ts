import { Type } from '@angular/core'

export const DEBOUNCE_TIME: number = 500
export enum FormFieldName {
  Option = 'option',
  Options = 'options',
}

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
  icon: string
  type: FieldType
  label: string
  value?: string
  component: Type<unknown>
}

export interface FormFieldWithOptions extends FormFieldDefinition {
  options?: string[]
}

export interface FormFieldDefinitionValue extends FormFieldDefinition, FormFieldWithOptions {
  id: string
  required: boolean
}
