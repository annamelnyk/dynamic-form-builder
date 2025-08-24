import { inject, Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { generateUniqueFieldName } from '@helpers/utils'
import { FieldType, FormFieldDefinitionValue, FormFieldName, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Injectable({
  providedIn: 'root',
})
export class FormFieldControl {
  formBuildMode = inject(BuildMode)

  toFormGroup(formFields: FormFieldDefinitionValue[]) {
    const group: { [key: string]: FormControl } = {}
    formFields.forEach(f => {
      const fieldValue = f?.value ?? ''

      if (f.type === FieldType.Checkbox && f.options) {
        console.log('CHECKBOXXX ', f)
        if (this.formBuildMode.mode() === Mode.Edit) {
          f.options.forEach((option, index) => {
            group[generateUniqueFieldName(FormFieldName.Option, f.id, index)] = f.required
              ? new FormControl(option, Validators.required)
              : new FormControl(option)
          })
        }

        if (this.formBuildMode.mode() === Mode.Preview) {
          f.options.forEach((option, index) => {
            group[generateUniqueFieldName(FormFieldName.Option, f.id, index)] = f.required
              ? new FormControl(false, Validators.required)
              : new FormControl(false)
          })
        }
      } else {
        group[f.id] = f.required
          ? new FormControl(fieldValue, Validators.required)
          : new FormControl(fieldValue, null)
      }
    })

    return new FormGroup(group)
  }

  toSelectFormGroup(formField: FormFieldDefinitionValue) {
    const group: any = {}

    if (formField.options) {
      formField.options.forEach((option: string, index: number) => {
        group[generateUniqueFieldName(FormFieldName.Option, formField.id, index)] = new FormControl(
          option,
        )
      })
    }

    return new FormGroup(group)
  }
}
