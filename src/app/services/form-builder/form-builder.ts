import { Injectable, signal } from '@angular/core'

import {
  FieldType,
  FormFieldCheckboxOption,
  FormFieldDefinition,
  FormFieldDefinitionValue,
  FormFieldSelectOption,
} from '@model/form-fields'
import { generateUniqueFieldName } from 'app/helpers/utils'

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
      id: this.generateId(),
    }

    if (field.type === FieldType.Select) {
      formFieldDefinitionContainsID.options = [this.createSelectOption()]
    }

    if (field.type === FieldType.Checkbox) {
      formFieldDefinitionContainsID.choices = [this.createCheckboxOption()]
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

  removeCheckboxOption(firmFieldId: string, choiceId: string) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => {
        if (f.id === firmFieldId) {
          return {
            ...f,
            choices: f.choices?.filter(c => c.id !== choiceId),
          }
        }

        return f
      }),
    )
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
        choices: [...formFieldChoices, this.createCheckboxOption()],
      })
    }
  }

  updateCheckboxOptions(formField: FormFieldDefinitionValue, values: any) {
    const formFieldChoices = formField.choices as FormFieldCheckboxOption[]
    const updatedChoices = formFieldChoices.map(c => ({
      ...c,
      checked: values[generateUniqueFieldName('checked', c.id)],
      choice: values[generateUniqueFieldName('choice', c.id)],
    }))
    this.updateFormField(formField.id, {
      choices: updatedChoices,
    })
  }

  createCheckboxOption(): FormFieldCheckboxOption {
    return {
      choice: '',
      checked: false,
      id: this.generateId(),
    }
  }

  createSelectOption(): FormFieldSelectOption {
    return {
      option: '',
      selected: true,
      id: this.generateId(),
    }
  }

  generateId(): string {
    return crypto.randomUUID()
  }
}
