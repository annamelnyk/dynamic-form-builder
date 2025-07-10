import { computed, Injectable, linkedSignal, signal } from '@angular/core';

import { FormFieldDefinition, GeneratedFormFieldI } from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  buildedFormFieldDefinitionsList = signal<FormFieldDefinition[]>([]);
  generatedFormFiledsList = linkedSignal<GeneratedFormFieldI[]>(() =>
    this.buildedFormFieldDefinitionsList().map((formField) =>
      this.generateFormField(formField as FormFieldDefinition & { id: string })
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

  generateFormField(
    formFieldType: FormFieldDefinition & { id: string }
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
    const formFieldDefinitionContainsID = {
      ...field,
      id: crypto.randomUUID(),
    } as FormFieldDefinition & { id: string };

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
}
