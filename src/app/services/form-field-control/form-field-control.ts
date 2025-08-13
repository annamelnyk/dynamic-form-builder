import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { generateUniqueFieldName } from '@helpers/utils'
import { FormFieldDefinitionValue, FormFieldName } from '@model/form-fields'

@Injectable({
  providedIn: 'root',
})
export class FormFieldControl {
  toFormGroup(formFields: FormFieldDefinitionValue[]) {
    const group: any = {}
    formFields.forEach(f => {
      console.log('toFormGroup FIELD: ', f)
      const fieldValue = f?.value ?? ''

      group[f.id] = f.required
        ? new FormControl(fieldValue, Validators.required)
        : new FormControl(fieldValue, null)
    })

    return new FormGroup(group)
  }

  toFieldWithOptionsFormGroup(formField: FormFieldDefinitionValue) {
    const group: any = {}

    if (formField.options) {
      formField.options.forEach((option: string, index: number) => {
        //group[generateUniqueFieldName('selected', f.id)] = new FormControl(f.selected)
        group[generateUniqueFieldName(FormFieldName.Option, formField.id, index)] = new FormControl(
          option,
        )
      })
    }

    return new FormGroup(group)
  }
}
