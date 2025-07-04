export enum FieldType {
  Text = 'Text Input',
  Textarea = 'Textarea',
  Select = 'Select',
  Checkbox = 'Checkbox',
}

export interface FormFieldDefinition {
  icon: string;
  name: FieldType;
  label: string;
}

export interface GeneratedFormFieldI {
  id: string;
  type: FieldType;
  label: string; // must contain uuid?
}
