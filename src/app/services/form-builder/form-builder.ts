import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core'
import { Router } from '@angular/router'

import {
  FieldType,
  FormFieldCheckbox,
  FormFieldCheckboxOption,
  FormFieldDefinition,
  FormFieldDefinitionValue,
  Mode,
} from '@model/form-fields'

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  buildedFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([])
  formFieldsList = this.buildedFormFieldDefinitionsList.asReadonly()

  addFormFieldToFromFieldDefinitionsList(
    field: FormFieldDefinition,
    indexOfInsertedField: number | null = null,
  ) {
    const formFieldDefinitionContainsID: FormFieldDefinitionValue = {
      ...field,
      required: false,
      id: crypto.randomUUID(),
    }

    if (field.type === FieldType.Select) {
      formFieldDefinitionContainsID.options = [
        {
          option: 'Option 1',
          selected: true,
          id: crypto.randomUUID(),
        },
      ]
    }

    if (field.type === FieldType.Checkbox) {
      formFieldDefinitionContainsID.choices = [this.createCheckboxOption(1)]
    }

    this.buildedFormFieldDefinitionsList.update(prevList => {
      if (typeof indexOfInsertedField === 'number' && !isNaN(indexOfInsertedField)) {
        prevList.splice(indexOfInsertedField, 0, formFieldDefinitionContainsID)

        return [...prevList]
      }

      return [...prevList, formFieldDefinitionContainsID]
    })
  }

  moveFromFieldDefinitionPosition(fromIndex: number, toIndex: number) {
    const formFieldToBeReplaced = {
      ...this.buildedFormFieldDefinitionsList()[fromIndex],
    }

    const updatedOrder = this.buildedFormFieldDefinitionsList().filter(
      f => f.id !== formFieldToBeReplaced.id,
    )

    updatedOrder.splice(toIndex, 0, formFieldToBeReplaced)

    this.buildedFormFieldDefinitionsList.set([...updatedOrder])
  }

  removeFormFieldDefinition(id: string) {
    this.buildedFormFieldDefinitionsList.update(prevList => prevList.filter(f => f.id !== id))
  }

  updateFormField(formFieldId: string, values: Partial<FormFieldDefinitionValue>) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f =>
        f.id === formFieldId
          ? {
              ...f,
              ...values,
            }
          : f,
      ),
    )
  }

  //TODO: rewrite updateFormField() method with deep updates
  addCheckboxOption(formField: FormFieldDefinitionValue) {
    if (formField.type === FieldType.Checkbox) {
      const formFieldChoices = formField.choices as FormFieldCheckboxOption[]

      this.updateFormField(formField.id, {
        choices: [...formFieldChoices, this.createCheckboxOption(formFieldChoices.length + 1)],
      })
    }
  }

  createCheckboxOption(index: number): FormFieldCheckboxOption {
    return {
      choice: `Option ${index}`,
      checked: false,
      id: crypto.randomUUID(),
    }
  }
}
