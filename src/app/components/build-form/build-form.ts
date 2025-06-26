import { Component, inject } from '@angular/core';
import { ControlTool } from '../control-tool/control-tool';
import { MatGridListModule } from '@angular/material/grid-list';

import { FormBuilderI, FormBuilderService } from '../../services/form-builder';

@Component({
  selector: 'app-build-form',
  imports: [ControlTool, MatGridListModule],
  templateUrl: './build-form.html',
  styleUrl: './build-form.scss',
})
export class BuildForm {
  formBuilderService = inject(FormBuilderService);

  addFormField(formFieldType: FormBuilderI) {
    console.log({ formFieldType });
  }
}
