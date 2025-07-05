import { Injectable } from '@angular/core';

import { FieldType, FormFieldDefinition } from '@model/form-fields';

const TEXT_FORM_DEFINITION = {
  icon: 'text_fields',
  type: FieldType.Text,
  label: FieldType.Text,
};

const TEXTAREA_FORM_DEFINITION = {
  icon: 'local_parking',
  type: FieldType.Textarea,
  label: FieldType.Textarea,
};

const SELECT_FORM_DEFINITION = {
  icon: 'checklist',
  type: FieldType.Select,
  label: FieldType.Select,
};

const CHECKBOX_FORM_DEFINITION = {
  icon: 'check_box',
  type: FieldType.Checkbox,
  label: FieldType.Checkbox,
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
