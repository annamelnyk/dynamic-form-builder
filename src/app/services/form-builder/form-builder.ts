import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core'
import { Router } from '@angular/router'

import {
  FieldType,
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
          option: 'test',
          selected: true,
          id: crypto.randomUUID(),
        },
      ]
    }

    if (field.type === FieldType.Checkbox) {
      formFieldDefinitionContainsID.choices = [this.createPlainCheckboxChoice()]
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

  updateFormField(id: string, values: Partial<FormFieldDefinitionValue>) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f =>
        f.id === id
          ? {
              ...f,
              ...values,
              //label: values.label?.length ? values.label : f.label,
            }
          : f,
      ),
    )
  }

  addCheckboxOption(id: string) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f =>
        f.id === id
          ? {
              ...f,
              choices: [...(f?.choices ?? []), this.createPlainCheckboxChoice(f.choices?.length)],
              //label: values.label?.length ? values.label : f.label,
            }
          : f,
      ),
    )
  }

  createPlainCheckboxChoice(index?: number | undefined): FormFieldCheckboxOption {
    return {
      choice: `Add option ${index ?? 1}`,
      checked: false,
      id: crypto.randomUUID(),
    }
  }
}
