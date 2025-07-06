import { Injectable } from '@angular/core';

import { FieldType, FormFieldDefinition } from '@model/form-fields';

const TEXT_FORM_DEFINITION = {
  icon: 'text_fields',
  type: FieldType.Text,
  label: `New ${FieldType.Text} field`,
  required: false,
};

const TEXTAREA_FORM_DEFINITION = {
  icon: 'local_parking',
  type: FieldType.Textarea,
  label: `New ${FieldType.Textarea} field`,
  required: false,
};

const SELECT_FORM_DEFINITION = {
  icon: 'checklist',
  type: FieldType.Select,
  label: `New ${FieldType.Select} field`,
  required: false,
};

const CHECKBOX_FORM_DEFINITION = {
  icon: 'check_box',
  type: FieldType.Checkbox,
  label: `New ${FieldType.Checkbox} field`,
  required: false,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<FieldType, FormFieldDefinition>([
    [FieldType.Text, TEXT_FORM_DEFINITION],
    [FieldType.Textarea, TEXTAREA_FORM_DEFINITION],
    [FieldType.Select, SELECT_FORM_DEFINITION],
    [FieldType.Checkbox, CHECKBOX_FORM_DEFINITION],
  ]);

  getAllFormFieldDefinitions(): FormFieldDefinition[] {
    return [...this.fieldTypes.values()];
  }

  // getAllFormFieldTypes(): MapIterator<FieldType> {
  //   return this.fieldTypes.keys();
  // }
}
