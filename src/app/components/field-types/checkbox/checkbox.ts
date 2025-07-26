import { Component, DestroyRef, inject, input, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { FormFieldCheckboxOption, FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-checkbox',
  imports: [
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox implements OnInit {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()

  buildModeService = inject(BuildMode)
  formBuilderService = inject(FormBuilderService)
  ngFormBuilder = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  Mode = Mode

  checkboxControlsForm!: FormGroup

  ngOnInit(): void {
    this.addCheckboxControlsForm()
  }

  addCheckboxControlsForm() {
    const choicesMap: Record<string, Array<string | boolean>> = {}
    this.formField().choices?.forEach((v: FormFieldCheckboxOption) => {
      const key1 = `checkbox-${v.id}`
      const key2 = `checkbox-label-${v.id}`
      choicesMap[key1] = [v.checked]
      choicesMap[key2] = [v.choice]
    })
    this.checkboxControlsForm = this.ngFormBuilder.group({
      ...choicesMap,
    })

    this.checkboxControlsForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(values => {
        //this.formBuilderService.updateFormField(this.formField().id, values)
      })
  }

  addCheckboxOption(e: Event) {
    e.stopPropagation()
    this.formBuilderService.addCheckboxOption(this.formField().id)
  }
}
