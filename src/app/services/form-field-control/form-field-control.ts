import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormFieldDefinitionValue } from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormFieldControl {
  toFromGroup(formFields: FormFieldDefinitionValue[]) {
    const group: any = {};
    formFields.forEach((f) => {
      const fieldValue = f?.value ?? '';

      group[f.id] = f.required
        ? new FormControl(fieldValue, Validators.required)
        : new FormControl(fieldValue, null);
    });

    return new FormGroup(group);
  }
}
