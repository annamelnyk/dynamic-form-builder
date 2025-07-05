import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

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
      id: uuidv4(),
      type: formFieldType.type,
      label: '',
    };
  }
}
