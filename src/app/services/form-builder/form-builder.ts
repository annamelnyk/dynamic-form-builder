import { computed, Injectable, signal } from '@angular/core';

import { FormFieldDefinition, GeneratedFormFieldI } from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  //generatedFormFiledsList = signal<GeneratedFormFieldI[]>([]);
  buildedFormFieldDefinitionsList = signal<FormFieldDefinition[]>([]);
  generatedFormFiledsList = computed<GeneratedFormFieldI[]>(() =>
    this.buildedFormFieldDefinitionsList().map(
      (formField: FormFieldDefinition) => this.generateFormField(formField)
    )
  );

  // addNewFormField(formField: GeneratedFormFieldI) {
  //   this.generatedFormFiledsList.update((prevList) => [
  //     ...prevList,
  //     {
  //       ...formField,
  //     },
  //   ]);
  // }

  generateFormField(formFieldType: FormFieldDefinition): GeneratedFormFieldI {
    return {
      id: crypto.randomUUID(),
      type: formFieldType.type,
      label: formFieldType.label,
      required: false,
    };
  }

  addFormFieldToFromFieldDefinitionsList(field: FormFieldDefinition) {
    this.buildedFormFieldDefinitionsList.update((prevList) => [
      ...prevList,
      field,
    ]);
  }
}
