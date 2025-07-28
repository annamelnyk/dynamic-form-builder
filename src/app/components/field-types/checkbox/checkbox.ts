import { Component, computed, DestroyRef, effect, inject, input, OnInit } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { ButtonIcon, Icon } from '@components/button-icon/button-icon'
import { PlainButton } from '@components/plain-button/plain-button'
import { FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-checkbox',
  imports: [
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    PlainButton,
    ButtonIcon,
  ],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()

  buildModeService = inject(BuildMode)
  formBuilderService = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  ngFormBuilder = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  Mode = Mode
  Icon = Icon

  checkboxControlsForm = computed<FormGroup>(() =>
    this.formFieldControlService.toCheckboxFormGroup(this.formField()),
  )
  private checkboxControlFormSubscription?: Subscription
  constructor() {
    effect(() => {
      this.checkboxControlFormSubscription?.unsubscribe()

      this.checkboxControlFormSubscription = this.checkboxControlsForm()
        .valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
        .subscribe(values => {
          console.log('CHeckbox updated EFFECT ', values)
          this.formBuilderService.updateCheckboxOptions(this.formField(), values)
        })
    })
  }

  addCheckboxOption(e: Event) {
    e.stopPropagation()
    this.formBuilderService.addCheckboxOption(this.formField())
  }

  removeOptionHandler(choiceId: string) {
    this.formBuilderService.removeCheckboxOption(this.formField().id, choiceId)
  }
}
