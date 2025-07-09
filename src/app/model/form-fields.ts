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
  //required: boolean;
}

export interface GeneratedFormFieldI {
  id: string;
  type: FieldType;
  label: string; // must contain uuid?
  required: boolean;
}
