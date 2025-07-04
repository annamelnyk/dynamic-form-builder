import { Injectable, signal } from '@angular/core';

import { FieldType } from '@components/editable-form-field/editable-form-field';

export interface FormBuilderI {
  icon: string;
  name: FieldType;
}
export interface GeneratedFormFieldI {
  id: string;
  type: FieldType;
  label: string; // must contain uuid?
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  buildingTools: FormBuilderI[] = [
    { icon: 'text_fields', name: FieldType.Input },
    { icon: 'local_parking', name: FieldType.Textarea },
    { icon: 'check_box', name: FieldType.Checkbox },
    { icon: 'checklist', name: FieldType.Select },
  ];

  generatedFormFiledsList = signal<GeneratedFormFieldI[]>([]);

  addNewFormField(formField: GeneratedFormFieldI) {
    this.generatedFormFiledsList.update((prevList) => [
      ...prevList,
      {
        ...formField,
      },
    ]);
  }
}
