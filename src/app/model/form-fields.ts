import { Type } from '@angular/core'

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

export interface FormFieldSelectOption {
  option: string
  selected: boolean
  id: string
}

export interface FormFieldSelect extends FormFieldDefinition {
  options?: FormFieldSelectOption[]
}

export interface FormFieldCheckboxOption {
  choice: string
  checked: boolean
  id: string
}

export interface FormFieldCheckbox extends FormFieldDefinition {
  choices?: FormFieldCheckboxOption[]
}

export interface FormFieldDefinitionValue
  extends FormFieldDefinition,
    FormFieldSelect,
    FormFieldCheckbox {
  id: string
  required: boolean
}
