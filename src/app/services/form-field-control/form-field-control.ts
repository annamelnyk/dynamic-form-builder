import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { FieldType, FormFieldCheckboxOption, FormFieldDefinitionValue } from '@model/form-fields'

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

      if (f.type === FieldType.Checkbox) {
        ;(f.choices as FormFieldCheckboxOption[]).forEach(c => {
          const choice: string = c.choice

          group[f.id][c.id] = new FormControl(choice, null)
        })
      }
    })

    return new FormGroup(group)
  }
}
