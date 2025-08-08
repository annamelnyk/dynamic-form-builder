import { Component, computed, DestroyRef, effect, inject, input } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { ButtonIcon, Icon } from '@components/button-icon/button-icon'
import { PlainButton } from '@components/plain-button/plain-button'
import { DEBOUNCE_TIME, FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'

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
  protected form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()

  protected buildModeService = inject(BuildMode)
  formBuilderService = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  private destroyRef = inject(DestroyRef)

  Mode = Mode
  Icon = Icon

  private checkboxControlFormSubscription?: Subscription
  checkboxControlsForm = computed<FormGroup>(() =>
    this.formFieldControlService.toCheckboxFormGroup(this.formField()),
  )
  constructor() {
    effect(() => this.observeCheckboxControlFormChanges())
  }

  observeCheckboxControlFormChanges() {
    this.checkboxControlFormSubscription?.unsubscribe()

    this.checkboxControlFormSubscription = this.checkboxControlsForm()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(DEBOUNCE_TIME))
      .subscribe(values => {
        this.formBuilderService.updateCheckboxOptions(this.formField(), values)
      })
  }

  addCheckboxOption(e: Event) {
    e.stopPropagation()
    this.formBuilderService.addCheckboxOption(this.formField())
  }

  removeOptionHandler(choiceId: string) {
    this.formBuilderService.removeCheckboxOrSelectOption(this.formField(), choiceId)
  }
}
