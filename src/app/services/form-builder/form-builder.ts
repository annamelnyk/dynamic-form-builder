import { computed, Injectable, linkedSignal, signal } from '@angular/core';

import {
  FormFieldDefinition,
  FormFieldDefinitionValue,
  GeneratedFormFieldI,
} from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  buildedFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([]);
  generatedFormFiledsList = linkedSignal<GeneratedFormFieldI[]>(() =>
    this.buildedFormFieldDefinitionsList().map((formField) =>
      this.generateFormField(formField)
    )
  );

  formFieldsList = this.generatedFormFiledsList.asReadonly();

  generateFormField(
    formFieldType: FormFieldDefinitionValue
  ): GeneratedFormFieldI {
    return {
      id: formFieldType.id,
      type: formFieldType.type,
      label: formFieldType.label,
      required: false,
    };
  }

  addFormFieldToFromFieldDefinitionsList(
    field: FormFieldDefinition,
    indexOfInsertedField: number | null = null
  ) {
    const formFieldDefinitionContainsID: FormFieldDefinitionValue = {
      ...field,
      required: false,
      id: crypto.randomUUID(),
    };

    this.buildedFormFieldDefinitionsList.update((prevList) => {
      if (
        typeof indexOfInsertedField === 'number' &&
        !isNaN(indexOfInsertedField)
      ) {
        prevList.splice(indexOfInsertedField, 0, formFieldDefinitionContainsID);

        return [...prevList];
      }

      return [...prevList, formFieldDefinitionContainsID];
    });
  }

  moveFromFieldDefinitionPosition(fromIndex: number, toIndex: number) {
    const formFieldToBeReplaced = {
      ...this.buildedFormFieldDefinitionsList()[fromIndex],
    };

    const updatedOrder = this.buildedFormFieldDefinitionsList().filter(
      (f) => f.id !== formFieldToBeReplaced.id
    );

    updatedOrder.splice(toIndex, 0, formFieldToBeReplaced);

    this.buildedFormFieldDefinitionsList.set([...updatedOrder]);
  }

  removeFormFieldDefinition(id: string) {
    this.buildedFormFieldDefinitionsList.update((prevList) =>
      prevList.filter((f) => f.id !== id)
    );
  }

  toggleRequiredField(id: string) {
    this.buildedFormFieldDefinitionsList.update((prevList) =>
      prevList.map((f) => (f.id === id ? { ...f, required: !f.required } : f))
    );
  }
}
