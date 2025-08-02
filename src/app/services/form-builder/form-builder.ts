import { Injectable, signal } from '@angular/core'

import {
  FieldType,
  FormFieldCheckboxOption,
  FormFieldDefinition,
  FormFieldDefinitionValue,
  FormFieldName,
  FormFieldSelectOption,
} from '@model/form-fields'
import { generateUniqueFieldName } from '@helpers/utils'
import { first } from 'rxjs'
import { TEXT_FORM_DEFINITION, TEXTAREA_FORM_DEFINITION } from '@services/field-types/field-types'

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  #initialFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([])
  initialFormFieldDefinitionsList = this.#initialFormFieldDefinitionsList.asReadonly()

  buildedFormFieldDefinitionsList = signal<FormFieldDefinitionValue[]>([])
  formFieldsList = this.buildedFormFieldDefinitionsList.asReadonly()

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

  removeCheckboxOrSelectOption(formField: FormFieldDefinitionValue, optionId: string) {
    let fieldName: FormFieldName.Choices | FormFieldName.Options

    switch (formField.type) {
      case FieldType.Checkbox:
        fieldName = FormFieldName.Choices
        break
      case FieldType.Select:
        fieldName = FormFieldName.Options
        break
      default:
        return
    }

    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => {
        if (f.id === formField.id) {
          return {
            ...f,
            [fieldName]: f[fieldName]?.filter(c => c.id !== optionId),
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
      checked: values[generateUniqueFieldName(FormFieldName.Checked, c.id)],
      choice: values[generateUniqueFieldName(FormFieldName.Choice, c.id)],
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
      selected: false,
      id: this.generateId(),
    }
  }

  //TODO: rewrite updateFormField() method with deep updates
  addSelectOption(formField: FormFieldDefinitionValue) {
    if (formField.type === FieldType.Select) {
      const formFieldOptions = formField.options as FormFieldSelectOption[]

      this.updateFormField(formField.id, {
        options: [...formFieldOptions, this.createSelectOption()],
      })
    }
  }

  updateSelectOptions(formField: FormFieldDefinitionValue, values: any) {
    const formFieldOptions = formField.options as FormFieldSelectOption[]
    const updatedOptions = formFieldOptions.map(o => ({
      ...o,
      selected: values[generateUniqueFieldName(FormFieldName.Selected, o.id)],
      option: values[generateUniqueFieldName(FormFieldName.Option, o.id)],
    }))
    this.updateFormField(formField.id, {
      options: updatedOptions,
    })
  }

  generateId(): string {
    return crypto.randomUUID()
  }
}
