import { computed, Injectable, linkedSignal, signal } from '@angular/core'

import { FieldType, FormFieldDefinition, FormFieldDefinitionValue, Mode } from '@model/form-fields'

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
      mode: Mode.Edit,
    }

    if (field.type === FieldType.Select) {
      formFieldDefinitionContainsID.options = [{ option: 'test', selected: true }]
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

  toggleRequiredField(id: string) {
    this.buildedFormFieldDefinitionsList.update(prevList =>
      prevList.map(f => (f.id === id ? { ...f, required: !f.required } : f)),
    )
  }
}
