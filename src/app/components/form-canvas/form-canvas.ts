import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatCardModule } from '@angular/material/card'
import { debounceTime } from 'rxjs'

import { EditableFormField } from '@components/editable-form-field/editable-form-field'
import { FieldTypesService } from '@services/field-types/field-types'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'
import { DEBOUNCE_TIME, FieldType } from '@model/form-fields'

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField, DragDropModule, ReactiveFormsModule],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService)
  fieldTypesService = inject(FieldTypesService)
  formFieldControlService = inject(FormFieldControl)
  private destroyRef = inject(DestroyRef)
  protected FieldType = FieldType

  form = computed<FormGroup>(() =>
    this.formFieldControlService.toFormGroup(this.formBuilderService.formFieldsList()),
  )

  aboutForm = signal<FormGroup>(
    this.formFieldControlService.toFormGroup(
      this.formBuilderService.initialFormFieldDefinitionsList(),
    ),
  )

  payloadAboutForm = ''
  payloadBuildedForm = ''

  constructor() {
    effect(() => {
      console.log(this.form())
      console.log(this.aboutForm())
    })
  }

  ngOnInit(): void {
    this.subscribeToAboutForm()
  }

  subscribeToAboutForm() {
    this.aboutForm()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(DEBOUNCE_TIME))
      .subscribe(values => {
        this.formBuilderService.updateAboutFormField(values)
      })
  }

  onFieldTypeDropped(event: CdkDragDrop<any[]>) {
    this.formBuilderService.addFormFieldToFromFieldDefinitionsList(
      event.item.data,
      event.currentIndex,
    )
  }

  moveFieldPosition(fromIndex: number, toIndex: number) {
    this.formBuilderService.moveFromFieldDefinitionPosition(fromIndex, toIndex)
  }

  onSubmit() {
    this.payloadAboutForm = JSON.stringify(this.aboutForm().getRawValue())
    this.payloadBuildedForm = JSON.stringify(this.form().getRawValue())
  }
}
