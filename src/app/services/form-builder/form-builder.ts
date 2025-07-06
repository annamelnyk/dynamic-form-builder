import { Injectable, signal } from '@angular/core';

import { FormFieldDefinition, GeneratedFormFieldI } from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  generatedFormFiledsList = signal<GeneratedFormFieldI[]>([]);

  addNewFormField(formField: GeneratedFormFieldI) {
    this.generatedFormFiledsList.update((prevList) => [
      ...prevList,
      {
        ...formField,
      },
    ]);
  }

  generateFormField(formFieldType: FormFieldDefinition): GeneratedFormFieldI {
    return {
      id: crypto.randomUUID(),
      type: formFieldType.type,
      label: formFieldType.label,
      required: formFieldType.required,
    };
  }
}
