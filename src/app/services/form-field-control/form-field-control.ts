import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import {
  FormFieldCheckboxOption,
  FormFieldDefinitionValue,
  FormFieldName,
  FormFieldSelectOption,
} from '@model/form-fields'
import { generateUniqueFieldName } from '@helpers/utils'

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
        group[generateUniqueFieldName(FormFieldName.Checked, f.id)] = new FormControl(f.checked)
        group[generateUniqueFieldName(FormFieldName.Choice, f.id)] = new FormControl(f.choice)
      })
    }

    return new FormGroup(group)
  }

  toSelectFormGroup(formField: FormFieldDefinitionValue) {
    const group: any = {}

    if (formField.options) {
      formField.options.forEach((f: FormFieldSelectOption) => {
        //group[generateUniqueFieldName('selected', f.id)] = new FormControl(f.selected)
        group[generateUniqueFieldName(FormFieldName.Option, f.id)] = new FormControl(f.option)
      })
    }

    return new FormGroup(group)
  }
}
