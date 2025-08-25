import { computed, Injectable, signal } from '@angular/core'

import { generateUniqueFieldName } from '@helpers/utils'
import {
  FieldType,
  FormFieldDefinition,
  FormFieldDefinitionValue,
  FormFieldName,
} from '@model/form-fields'
import { TEXT_FORM_DEFINITION, TEXTAREA_FORM_DEFINITION } from '@services/field-types/field-types'

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  #initialFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([])
  initialFormFieldDefinitionsList = this.#initialFormFieldDefinitionsList.asReadonly()

  buildedFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([])
  formFieldsList = this.buildedFormFieldDefinitionsList.asReadonly()

  previewFormEnabled = computed<boolean>(() => {
    return this.buildedFormFieldDefinitionsList().length > 0
  })

  constructor() {
    this.addInitialFormDescriptionFields()
  }

  addInitialFormDescriptionFields() {
    const title: FormFieldDefinitionValue = {
      ...TEXT_FORM_DEFINITION,
      label: 'Form Title',
      required: false,
      id: this.generateId(),
    }

    const description: FormFieldDefinitionValue = {
      ...TEXTAREA_FORM_DEFINITION,
      value: '',
      label: 'Form Description',
      required: false,
      id: this.generateId(),
    }

    this.#initialFormFieldDefinitionsList.set([title, description])
  }

  updateAboutFormField(values: Record<string, string>) {
    this.#initialFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => ({
        ...f,
        value: values[f.id],
      })),
    )
  }

  addFormFieldToFromFieldDefinitionsList(
    field: FormFieldDefinition,
    indexOfInsertedField: number | null = null,
  ) {
    const formFieldDefinitionContainsID: FormFieldDefinitionValue = {
      ...field,
      required: false,
      id: this.generateId(),
    }

    if (field.type === FieldType.Select || field.type === FieldType.Checkbox) {
      formFieldDefinitionContainsID[FormFieldName.Options] = ['']
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

  removeFieldOption(formField: FormFieldDefinitionValue, optionIndex: number) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => {
        if (f.id === formField.id) {
          const formFieldOptions = f[FormFieldName.Options] as string[]
          if (formFieldOptions.length === 1) return f
          return {
            ...f,
            [FormFieldName.Options]: [
              ...formFieldOptions.slice(0, optionIndex),
              ...formFieldOptions.slice(optionIndex + 1),
            ],
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
  addFormFieldOption(formField: FormFieldDefinitionValue) {
    if (formField.type !== FieldType.Select && formField.type !== FieldType.Checkbox) return

    this.updateFormField(formField.id, {
      [FormFieldName.Options]: [...(formField[FormFieldName.Options] as string[]), ''],
    })
  }

  updateFormFieldOptions(formField: FormFieldDefinitionValue, values: any) {
    const formFieldOptions = formField[FormFieldName.Options] as string[]
    const updatedOptions = formFieldOptions.map(
      (o, index) => values[generateUniqueFieldName(FormFieldName.Option, formField.id, index)],
    )
    this.updateFormField(formField.id, {
      [FormFieldName.Options]: updatedOptions,
    })
  }

  generateId(): string {
    return crypto.randomUUID()
  }

  updateBuilderListForPreview() {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => {
        if (f.type === FieldType.Checkbox) {
          return {
            ...f,
            options: f[FormFieldName.Options]?.filter(o => o),
          }
        }

        return f
      }),
    )
  }
}
