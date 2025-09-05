import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { debounceTime } from 'rxjs'

import { EditableFormField } from '@components/editable-form-field/editable-form-field'
import { DEBOUNCE_TIME, FieldType } from '@model/form-fields'
import { BuildMode } from '@services/build-mode/build-mode'
import { FieldTypesService } from '@services/field-types/field-types'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FormFieldControl } from '@services/form-field-control/form-field-control'

@Component({
  selector: 'app-form-canvas',
  imports: [MatCardModule, EditableFormField, DragDropModule, ReactiveFormsModule],
  templateUrl: './form-canvas.html',
  styleUrl: './form-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCanvas {
  formBuilderService = inject(FormBuilderService)
  fieldTypesService = inject(FieldTypesService)
  formFieldControlService = inject(FormFieldControl)
  buildModeService = inject(BuildMode)

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

  ngOnInit() {
    this.subscribeToAboutForm()
  }

  subscribeToAboutForm() {
    this.aboutForm()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(DEBOUNCE_TIME))
      .subscribe(values => this.formBuilderService.updateAboutFormField(values))
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
}
