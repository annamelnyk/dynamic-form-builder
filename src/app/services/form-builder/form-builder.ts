import { Injectable, signal } from '@angular/core';
import { GeneratedFormFieldI } from '@model/form-fields';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  generatedFormFiledsList = signal<GeneratedFormFieldI[]>([]);

  addNewFormField(formField: GeneratedFormFieldI) {
    this.generatedFormFiledsList.update((prevList) => [
      ...prevList,
      {
        ...formField,
      },
    ]);
  }
}
