import { Component, computed, DestroyRef, effect, inject, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { DEBOUNCE_TIME, FormFieldDefinitionValue, Mode } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { PlainButton } from '@components/plain-button/plain-button'
import { ButtonIcon, Icon } from '@components/button-icon/button-icon'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'
import { debounceTime, Subscription } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-select',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    PlainButton,
    ButtonIcon,
    NgTemplateOutlet,
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()

  protected buildModeService = inject(BuildMode)
  formBuilderService = inject(FormBuilderService)
  formFieldControlService = inject(FormFieldControl)
  private destroyRef = inject(DestroyRef)

  Mode = Mode
  Icon = Icon

  private selectControlFormSubscription?: Subscription
  selectControlsForm = computed<FormGroup>(() =>
    this.formFieldControlService.toSelectFormGroup(this.formField()),
  )
  constructor() {
    effect(() => this.observeSelectControlFormChanges())
  }

  observeSelectControlFormChanges() {
    this.selectControlFormSubscription?.unsubscribe()

    this.selectControlFormSubscription = this.selectControlsForm()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(DEBOUNCE_TIME))
      .subscribe(values => {
        this.formBuilderService.updateSelectOptions(this.formField(), values)
      })
  }

  addSelectOption(e: Event) {
    e.stopPropagation()
    this.formBuilderService.addSelectOption(this.formField())
  }

  removeOptionHandler(choiceId: string) {
    this.formBuilderService.removeCheckboxOrSelectOption(this.formField(), choiceId)
  }
}
