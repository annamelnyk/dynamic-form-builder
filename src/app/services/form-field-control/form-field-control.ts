import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import {
  FormFieldCheckboxOption,
  FormFieldDefinitionValue,
  FormFieldSelectOption,
} from '@model/form-fields'

@Injectable({
  providedIn: 'root',
})
export class FormFieldControl {
  toFormGroup(formFields: FormFieldDefinitionValue[]) {
    const group: any = {}
    formFields.forEach(f => {
      const fieldValue = f?.value ?? ''

      group[f.id] = f.required
        ? new FormControl(fieldValue, Validators.required)
        : new FormControl(fieldValue, null)
    })

    return new FormGroup(group)
  }

  toCheckboxFormGroup(formField: FormFieldDefinitionValue) {
    const group: any = {}

    if (formField.choices) {
      formField.choices.forEach((f: FormFieldCheckboxOption) => {
        console.log('CHeckbox choices## ', f)
        const key1 = `checked-${f.id}`
        const key2 = `choice-${f.id}`

        group[key1] = new FormControl(f.checked)
        group[key2] = new FormControl(f.choice)
      })
    }

    return new FormGroup(group)
  }

  toSelectFormGroup(formField: FormFieldDefinitionValue) {
    const group: any = {}

    if (formField.options) {
      formField.options.forEach((f: FormFieldSelectOption) => {
        const key1 = `selected-${f.id}`
        const key2 = `option-${f.id}`

        group[key1] = new FormControl(f.selected)
        group[key2] = new FormControl(f.option)
      })
    }

    return new FormGroup(group)
  }
}
