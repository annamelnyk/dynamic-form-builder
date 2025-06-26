import { Injectable } from '@angular/core';

export interface FormBuilderI {
  icon: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  buildingTools: FormBuilderI[] = [
    { icon: 'text_fields', name: 'text' },
    { icon: 'local_parking', name: 'paragraph' },
    { icon: 'check_box', name: 'checkbox' },
    { icon: 'checklist', name: 'select' },
  ];
  constructor() {}
}
